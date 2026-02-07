---
author: Kien Dang
date: 2020-11-25
title: 🤖 How to web scrape with Python for deals
summary: How to web scrape with Python in 2020. A beginners guide on how to check any site for changes and generate an email notification when it changes. Just in time for Black Friday and Cyber Monday!
tags: ['code']
---

It's been quite sometime since I programmed with Python. I started diving into Al Sweigart's Automate The Boring Stuff with Python book shortly after university to learn basic programming and eventually stopped after landing my first full time job.

I decided to jump back into Python to spice up the programming scenery a bit from JavaScript.

I created a Python bot to constantly check a website for a specific item and notify me when its in stock. I was looking for a specific projector that did not have a **notify me when in stock** button on their site. Lame.

For this guide, I will provide brief explanation of my code and hopefully you can get this running on your own machine.

_Disclaimer: Please web scrape at your own risk. I am not responsible for anything beyond my control. I will assume you have Python v3+ setup._

# Step 1: Import the libraries.

First, we will need a few libraries:

- `Request` is a very simple HTTP library for Python. We will be utilizing this to send an HTTP request.
- `BeautifulSoup` will allow us to pull data out of HTML and XML files.
- `smtplib` is a library that will allow you to send emails for notifications

```python
import requests
from bs4 import BeautifulSoup
import smtplib
```

# Step 2: Accessing the web using Python.

In order to utilize the request library we imported, we need to access the `request.get()` method and pass in your URL you want to scrape. Below I am storing it in as a variable called `response`.

Next, we will use the BeautifulSoup library and pass in the data we get back from response as the first argument and in the second argument we put `html.parser`

```python
URL = 'yourwebsiteyouwannascrape.com'
response = requests.get(URL)
soup = BeautifulSoup(response.text, 'html.parser')

```

Nice. Now if you end up printing out the data `soup` in our Python file `print(soup)` you'll end up printing out the DOM like how would see in the inspect element of your browser.

# Step 3: Select the element

Now, we want to select the element you want to keep track of. It could be something specific on the page or a text.

In order to do this, you use the BeautifulSoup `select` method to select the `div` element or whichever element you want and then follow the syntax below to access its class.

For this example, I stored my element in a variable called `OOS` because the element it selects shows an **OUT OF STOCK** div.

```python
OOS = soup.select("div.promo-bug.out")
# this checks for the class names in a div element
# e.g <div class="promo-bug out"/>
# soup.text will give you the text if theres 1 match
#
# If there's more than 1 match:
# soup.select() returns a list of all matches,
# so you can iterate each item with a loop
```

# Step 4: Apply the logic and notify!

I recommend you create a dummy Gmail account for your bot. You can enter the credentials below to get this to work. Mind you, the email might go to the junk mail so make sure to whitelist it for incoming mail.

Now this last step is basically checking whether this element exists or not in web page. I ended up using Python's built in `len` method because the `select` method returns the data in an array.

If the array has a length of one, then we know that element is showing in the HTML. If it doesn't, well, that means it disappeared and something has changed. That's when we'll send out the email.

Also, if the text changes for whatever reason, you can change the conditional to check whether the text is a different value. This is useful if you are checking if a price drops.

```python{numberLines: true}
print(len(OOS))
# This will show ["<div class="promo-bug out"/>"]

if len(OOS) == 1:
    print('OUT OF STOCK ITEM')

else:
    print('IN STOCK')
    msg = 'Subject: Hello, there is stock!'
    fromaddr = 'YOURBOT@gmail.com'
    toaddrs = 'TOADDRESS@gmail.com'

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("YOURBOT@gmail.com", "GMAIL PASSWORD")
    server.sendmail(fromaddr, toaddrs, msg)
    server.quit()

    print('From: ' + fromaddr)
    print('To: ' + str(toaddrs))
    print('Message: ' + msg)
```

This is where we utilize the `smtplib` library. The code above starting from line 8 is all boilerplate code I found <a href="https://stackabuse.com/how-to-send-emails-with-gmail-using-python/" target="_blank">here</a>.

And there you have it! A Python bot that will send you an email if something changes. Make sure to save it and name it something like `webscraper.py`.

# <center>Conclusion</center>

This is a very simple implementation. We basically will need to run this script by running `python3 webscraper.py` in your commandline to run the check once. However, you can keep this running by itself using a `while` loop and a `sleep` command like shown below (don't forget to import `sleep`).

Although the solution below requires you to keep your computer on and it's not really ideal so I recommend a Raspberry Pi and using a crontab to trigger this script every 30 minutes (only works for Linux based system) since they are very low powered devices that can be left one 24/7.

```python{numberLines: true}
import requests
from bs4 import BeautifulSoup
import smtplib
import time


while True:
    URL = 'YOUR WEBSITE URL'

    # header = optional here (to mock a browser)
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    OOS = soup.select("div.promo-bug.out")
    if len(OOS) == 1:
        print('OUT OF STOCK ITEM')

    else:
        print('IN STOCK')
        msg = 'Subject: Hello, there is stock!'
        fromaddr = 'YOURBOT@gmail.com'
        toaddrs = 'TOADDRESS@gmail.com'

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("YOURBOT@gmail.com", "GMAIL PASSWORD")
        server.sendmail(fromaddr, toaddrs, msg)
        server.quit()

        print('From: ' + fromaddr)
        print('To: ' + str(toaddrs))
        print('Message: ' + msg)

        time.sleep(1800)
#Sleep this function for 30 minutes (time in seconds)
#It will webscrape at 30 minute intervals to avoid being blocked
```

Another way to handle this is to use a scheduler library found <a href="https://pypi.org/project/schedule/" target="_blank">here</a>.

Instead of email, I'll have a quick tutorial on how to setup a 24/7 telegram bot on a Raspberry Pi to send you a text notification instead of having to run your computer.

My next post will show you how to do both.

The full code can be seen [here](https://github.com/kxdang/SimpleWebscraperEmailNotifyTemplate.py/blob/main/webscrape.py) on my Github repo.
