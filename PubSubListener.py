import redis
import threading


class Listener(threading.Thread):
    def __init__(self, r):
        threading.Thread.__init__(self)
        self.redis = r
        self.pubsub = self.redis.pubsub()
        self.pubsub.subscribe(['SmartSDRfrequency'])
        self.pubsub.subscribe(['SmartSDRptt'])

    def work(self, item):
        print(item['channel'], ":", item['data'])

    def run(self):
        for item in self.pubsub.listen():
            if item['data'] == "KILL":
                self.pubsub.unsubscribe()
                print(self, "unsubscribed and finished")
                break
            else:
                self.work(item)


if __name__ == '__main__':
    r = redis.Redis('127.0.0.1')
    client = Listener(r)
    client.start()
