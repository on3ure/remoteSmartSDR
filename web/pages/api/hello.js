import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST); 

export default async (req, res) => {
  const {
    body,
    method,
  } = req;

  const data = {
    smartSDRip: null,
    smartSDRport: null,
    pttDelay: null,
    offset: null,
  };
  
  switch (method) {
    case 'GET':
      const keys =  Object.keys(data);
      const pipe = keys.map(key => ['get', key]);

      await redis
      .pipeline(pipe)
      .exec()
      .then((result) => {
        result.forEach((item, key) => {
          if (item[0]) {
            console.error(item[0]);
            return;
          }

          data[keys[key]] = item[1];
        });
      });
      res.status(200).json(data);
      break
    case 'PUT':
      await redis.mset(body);
      res.status(200).json(body);
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
