#!/usr/bin/env python3
import keybow
import time
import redis
import asyncio

ptt = 0
freq_up = 0
pttbutton = 1
pttlight = 0
freq_down = 2

keybow.setup(keybow.MINI)
redis = redis.Redis(host='localhost', port=6379, db=0)


def myround(x):
    offset = int(redis.get('offset'))
    return offset * round(x/offset)


async def flex_msg(message):
    ip = redis.get('smartSDRip')
    port = int(redis.get('smartSDRport'))
    reader, writer = await asyncio.open_connection(
ip, port)
    writer.write(message.encode())
    writer.close()


async def flex_freq_up():
    ip = redis.get('smartSDRip')
    port = int(redis.get('smartSDRport'))
    offset = redis.get('offset')
    reader, writer = await asyncio.open_connection(
        ip, port)
    message = 'ZZFA;'
    writer.write(message.encode())
    data = await reader.read(100)
    i = myround(int(data.decode()[4:-2] + '0')) + int(offset)
    message = str(i)
    message = 'ZZFA' + message.zfill(11) + ';'
    writer.write(message.encode())
    writer.close()


async def flex_freq_down():
    ip = redis.get('smartSDRip')
    port = int(redis.get('smartSDRport'))
    offset = redis.get('offset')
    reader, writer = await asyncio.open_connection(
        ip, port)
    message = 'ZZFA;'
    writer.write(message.encode())
    data = await reader.read(100)
    i = myround(int(data.decode()[4:-2] + '0')) - int(offset)
    message = str(i)
    message = 'ZZFA' + message.zfill(11) + ';'
    writer.write(message.encode())
    writer.close()


@keybow.on()
def handle_key(index, state):
    global pttbutton
    global freq_up
    global freq_down
    global ptt

    if state:
        if index == pttbutton:
            if ptt == 1:
                delay = int(redis.get('pttDelay'))/10
                time.sleep(delay)
                asyncio.run(flex_msg('ZZTX0;'))
                keybow.set_led(index, 0, 0, 0)
                ptt = 0
            else:
                asyncio.run(flex_msg('ZZTX1;'))
                keybow.set_led(index, 255, 0, 0)
                ptt = 1

        if index == freq_up:
            keybow.set_led(index, 0, 0, 255)
            asyncio.run(flex_freq_up())
        if index == freq_down:
            keybow.set_led(index, 0, 0, 255)
            asyncio.run(flex_freq_down())
    else:
        if index != pttbutton:
            keybow.set_led(index, 0, 0, 0)
    keybow.show()


loop = asyncio.get_event_loop()
try:
    loop.run_forever()
finally:
    loop.close()
