const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocket = require('ws');
const Redis = require("ioredis");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = dev ? 3000 : 80;

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const {
            pathname,
            query
        } = parsedUrl

        if (pathname === '/a') {
            app.render(req, res, '/a', query)
        } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log('> Server ready on http://localhost:' + port)
    })
})


const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const pub = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis.subscribe("SmartSDRfrequency", "SmartSDRptt", () => {
    console.log('subscribing to SmartSDRfrequency and SmartSDRptt')
});

const wss = new WebSocket.Server({
    port: 8080
});

redis.on("message", (channel, message) => {
    const data = JSON.stringify(
        [
            {
                channel,
                message
            },
        ]
    );
    wss.clients.forEach((client) => {
        client.send(data);
    });
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        pub.publish(data.channel, data.message);
        pub.set(data.channel, data.message);
    });
    
    // Send the default values.
    const frequency = pub.get('SmartSDRfrequency');
    const ptt = pub.get('SmartSDRptt');

    const data = JSON.stringify([
        {
            channel: 'SmartSDRfrequency',
            message: frequency
        },
        {
            channel: 'SmartSDRptt',
            message: ptt,
        },
    ]);
    ws.send(data);
});

console.log('> WebSocker ready on http://localhost:8080')