#!/usr/bin/env python3
import redis
import asyncio
import requests
from datetime import datetime

modes = {0: "LSB",
         1: "USB",
         2: "USB",
         3: "CW",
         4: "CW",
         5: "FM",
         6: "AM",
         7: "USB",
         8: "LSB",
         9: "LSB",
         10: "AM",
         11: "FM"}

redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)


def myround(x):
    return 50 * round(x/50)


async def tcp():
    ip = redis.get('smartSDRip')
    port = int(redis.get('smartSDRport'))
    reader, writer = await asyncio.open_connection(
        ip, port)
    message = 'ZZFA;'
    writer.write(message.encode())
    data = await reader.read(100)
    i = myround(int(data.decode()[4:-2] + '0'))
    frequency = str(i)
    message = 'ZZMD;'
    writer.write(message.encode())
    data = await reader.read(100)
    try:
        mode = int(data.decode()[4:-1])
    except ValueError:
        mode = 0
    if frequency != redis.get('lastfreq') or modes[mode] != redis.get('lastmode'):
        redis.publish('SmartSDRfrequency', frequency)
        redis.set('lastfreq', frequency)
        redis.set('lastmode', modes[mode])
        now = datetime.now()
        response = requests.post(redis.get('cloudlogURL') + '/index.php/api/radio',
                                 json={'key': redis.get('cloudlogAPIkey'), 'radio': 'SmartSDR',
                                       "frequency": frequency, "mode": modes[mode], "timestamp": now.strftime("%Y/%m/%d %H:%M")})
        if response.status_code != 200:
            print("Status code: ", response.status_code)
            print(response.json)
    setfreq = redis.get('setfreq')
    if setfreq:
        redis.publish('SmartSDRfrequency', setfreq)
        redis.set('lastfreq', setfreq)
        message = 'ZZFA' + str(setfreq).zfill(11) + ';'
        writer.write(message.encode())
        writer.close()
        redis.delete('setfreq')
    ptton = redis.get('ptton')
    if ptton:
        message = 'ZZTX1;'
        writer.write(message.encode())
        writer.close()
        redis.publish('SmartSDRptt', 'True')
        redis.delete('ptton')
    pttoff = redis.get('pttoff')
    if pttoff:
        message = 'ZZTX0;'
        writer.write(message.encode())
        redis.publish('SmartSDRptt', 'False')
        writer.close()
        redis.delete('pttoff')


async def main():
    while True:
        await tcp()
        await asyncio.sleep(0.2)


asyncio.run(main())
