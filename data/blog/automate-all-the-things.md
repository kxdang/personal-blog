---
author: Kien Dang
date: 2023-08-07
title: 🤖 Automating all the things
summary: Using Home Assistant to improve my quality of life.
tags: ['life']
---

I will never forget the day where my partner and I went grocery shopping at Costco and filled up our freezer, only to wake up in the morning and realized that the entire Costco haul had melted.

Yes, it melted.

<div className="flex justify-center"><img alt='sad cry' src="https://i.giphy.com/media/d2lcHJTG5Tscg/giphy.webp"></img></div>

About 400 dollars worth of meats and frozen goodies from Costco wasted and we were devastated.

The fridge's compressor turned off to prevent overheating because the freezer was overfilled which left the door slightly opened.

Needless to say, I immediately bought a fridge and freezer thermometer alarms and now have them in my fridge. They cost about $60 but at least its a piece of mind knowing that if the door was left open, the temperature will increase and it'll warn us.

However, this solution isn't perfect.

It takes awhile for the temperatures to change and by the time it changes to uncomfortable levels, the melting and spoiling might have already begun.

I wanted to know immediately if the fridge or freezer was opened for a certain amount of time. I decided to learn about home automation because I know you could leverage contact sensors and receive notifications as soon as these sensors changed state.

Now my Google speakers alert the household the moment the fridge doors are opened for more than 45 seconds. In addition to this, our phones get notifications every 15 seconds the fridge door stays open after the 45 second threshold. This is all possible with the help of <a href="https://www.home-assistant.io/" target="__blank">Home Assistant</a>.

Home Assistant is an open source software that connects all smart devices under one application regardless of what hubs or apps they use. They are connected via the ZigBee protocol and facilitates the communication between them. Its quite easy to setup and is super powerful once you have it up and running.

This was by far the best quality of life improvement I've managed to do this year.

## The current setup

- A refurbished Dell OptiPlex SSF
- Zonoff Zigbee USB Dongle
- Aqara Presence Sensor FP2
- Aqara contact sensors

I bought a refurbished Dell OptiPlex SSF (Super Small Form Factor). You get more value over a Raspberry Pi and its much more powerful while still maintaining a small foot print with a relatively low wattage so I can keep running it 24/7 as a small server. This runs my Home Assistant on a VM.

I recommend buying the Aqara contact sensors off Aliexpress, since they are much cheaper than Amazon and shipping comes relatively fast, at least for me. The cheapest way to connect the sensors is with a Zigbee USB dongle, which you can use over their proprietary Aqara hub.

Now I have the following automations setup below:

1. **Fridge door alerts**

- If the fridge or freezer door is left open for more than 45 seconds, notifications go off on my phone every 15 seconds alerting me that its opened until I close it
- Google home speakers announce that its been left opened

2. **Turning on the TV**

- Automatically dims my living room lights
- It turns on the TV backlights
- When the TV is paused from watching something, the lights immediately turn to 100% brightness

3. **Automatic lights**

- Walking through my living room and dining area turns on the lights in those areas using a presence detector (not a motion detector!) - this makes me feel like a magician
- I also use a motion sensor for my closet lights to turn on when I walk in the closet - super handy as we sometimes forget to turn off the lights in the closet

4. **Door alerts from Google speakers**

- It triggers only at night, it's my cheapo alarm system
- Garage door notifications when its left open for more than 5 minutes, it automatically sends me a notification every minute to check and close the door

Now this is all great, especially when you're home as Home Assistant runs locally, but if you need to be outside your network, you won't get any notifications. To solve this, I installed the Tailscale plugin on Home Assistant which creates a free VPN and I simply enable my Tailscale on my phone while I'm away and now I can receive notifications as if I was at home.
