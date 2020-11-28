// server.js
const {
    createServer
} = require('http')
const {
    parse
} = require('url')
const next = require('next')
const WebSocket = require('ws');
const Redis = require("ioredis");

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

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
// const pub = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);


redis.subscribe("SmartSDRfrequency", "SmartSDRptt", () => {
    console.log('subscribing to SmartSDRfrequency and SmartSDRptt')
});
const wss = new WebSocket.Server({
    port: 8080
});


redis.on("message", (channel, message) => {
    console.log(channel, message)
    const data = JSON.stringify(
        {
            channel,
            message
        }
    );
    wss.clients.forEach((client) => {
        client.send(data);
    });
});


wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // pub.publish("news", "Hello world!");
        console.log('received: %s', message);
    });

    ws.send('something');
});

console.log('> WebSocker ready on http://localhost:8080')