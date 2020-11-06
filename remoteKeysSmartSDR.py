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


async def flex_freq_up():
    lastfreq = redis.get('lastfreq')
    offset = redis.get('offset')
    i = myround(int(lastfreq) + int(offset))
    redis.set('setfreq', str(i))


async def flex_freq_down():
    lastfreq = redis.get('lastfreq')
    offset = redis.get('offset')
    i = myround(int(lastfreq) - int(offset))
    redis.set('setfreq', str(i))


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
                redis.set('pttoff', '1')
                keybow.set_led(index, 0, 0, 0)
                ptt = 0
            else:
                redis.set('ptton', '1')
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
