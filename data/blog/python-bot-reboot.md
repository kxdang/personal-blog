---
author: Kien Dang
date: 2021-02-15
title: 💻 How to start your Telegram bot on boot
summary: Solving a repetitive task when my Telegram bot goes offline.
tags: ['code']
---

[Scroll to solution](#systemd)

When the power turns off or the internet goes out, my Raspberry Pi turns off which kills my Telegram bot. I wanted to solve a problem where I had to manually boot up my Telegram bot via command line after an outage -- this is a process I want automated.

I use my Telegram bot for personal reminders. Although this may sound silly, like dude, why not set up an alarm clock or use a task app? Well I've tried those solutions and nothing seems to trigger my brain like a Telegram message or a message notification for that matter.

Perhaps it's because I grew up with MSN messenger. That glowing taskbar at the bottom capturing your attention while you browsed the internet on dial-up. Little did we know that the notifications caused gravitational and profound effects in our brain. Then it was upgrading to SMS messages from regular phones to Blackberry Messenger and eventually the coming of smartphones.

After trying many different reminder and to-do apps, I think I was able to hack my brain into actually doing the reminders I set out. By having a personal Telegram bot messaging me to take Vitamin D everyday at 9:30 am or telling me to make sure Biscuit, our cat, gets her prednisone every night at 9 pm, this personal assistant that I created makes me actually do them because it's like having an external Jarvis from Iron Man checking up on you.

It is only when I "Mark as read", I tell myself the notification can be dismissed because the task has been done.

So now, the only Telegram messages I will ever get will either be from my girlfriend or my Telegram bot that I programmed myself... both are pretty important 😋

# <center>Solution</center>

Scroll <a href="#systemd"> here </a>for the `systemd` solution.

I tried using crontab but I wasn't sure how to trigger it after the network comes on because it will tell me that there's an HTTP issue.

I used systemd because it looked like I was able to trigger and execute a command after the network came on, however, I also ran into an issue on both methods, the crontab and systemd method, where it says `No module named 'telegram'` was found. An import error.

The fix was simple; the solution was to add `User=pi` because when running your python script as a systemd service, the script will run by the root user rather than the pi user. Thus, having this flag allows the system to run it as pi user.

Doing this solved my No module named 'telegram problem.

However, like mentioned before, I needed to trigger it after the network comes on so that the Telegram bot can go online. Checking the network status can be used with the
`After` and `Wants` or `Requires` flag.

But I never got this to work... so my workaround was to trigger a restart of the execution after the bot fails to connect and returns a exit code after 5 seconds. This will keep looping the execution of my bot until it goes online.

You need to create a service in your RB Pi4 cmdline by using:

`sudo systemctl edit --force --full telegram.bot_service`

You'll receive a blank service where you can start filling out the Unit, Service and Install which is triggered by your Raspberry Pi 4 on boot (or reboot)

### systemd

```bash
[Unit]
summary=Telegram Bot

[Service]
User=pi
ExecStart=/usr/bin/python3 /home/pi/kikibot.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

```

Once you fill out something like above, press Ctrl + X and hit Y and then ENTER to save the changes.

Then enable this systemd by running:

`sudo systemctl enable telegram.bot_service`

Reboot by running the command below to see if it works:

`sudo reboot`

And that's it! That's the configuration to get your Raspberry Pi 4 to boot up your Telegram bot as soon as its back online. No more manual command-line triggering.

If you do not see your Telegram bot online, you can use this command below to check if there's any issues or errors with your Python script:

`systemctl status telegram.bot_service`

To remove this script just simply use the `disabled` flag on your systemd service.
