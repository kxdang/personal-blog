---
author: Kien Dang
date: 2020-05-25
title: 🎲 The Creation of Not Codenames
summary: An online multiplayer board game similar to codenames!
tags: ['code']
---

# <center><a href="https://notcodenames.com/">Not Codenames</a></center>

![](./startgame.gif)
My friend and I built an online version of codenames over a weekend! Check it out <a href="https://notcodenames.com/">here</a>

I'm super proud of this project as it has helped me learn about how a full stack application is created and I had a chance to pair program with my friend who is an experienced developer.

In addition, building this project really helped exercise the React skills I’ve been developing for the past few months, using React Hooks throughout our project and using functional components.

## <center>Goal</center>

We wanted to make this project because other online codenames implementations felt like they lacked a lot of key functionalities of an actual board game. They had a few flaws which included:

1. The ability to reveal all the cards for everyone, you could peek at the cards as a guesser 🤮
2. It was hard to determine what was going on or whose turn it was 😕
3. Anyone can click on the cards even if it wasn't your turn! 😂

So, we decided to fix the problem ourselves by developing our own online implementation.

It comes fully featured with a turn-based functionality that limits user interactions based on the turns and the ability to hide cards from players that were not spymasters. In addition, we added many useful features that we thought would be nice to have including:

- Hint submission box so that users know what hint was given out and how many cards to select
- Previous hints given which is located under the clue givers
- The ability to refresh the game and have continuity (being able to reconnect)
- Hover effect for players about to click on a card
- Hides clicked card from view (option to hover to see who picked it)
- Clear visual colours to see aid on what is currently going on

### <center>The Design Process</center>

![](/static/images/notcodenames/sketch.png)

We sketched our initial project using <a href="https://excalidraw.com/" target="_blank">Excalidraw</a>, a whiteboard collaboration tool which allowed us to have a clear vision of what we wanted to see in the front-end as we brainstormed.

Slowly, as we made progress, everything started to come along. We worked on different files to accomplish both the front-end and back-end simultaneously and bounced ideas back and forth. We used <a ahref="https://codesandbox.io/">codesandbox.io</a> which is a great browser IDE to share and collaborate together.

#### <center> Day 1 </center>

![](/static/images/notcodenames/day1.png)
The live browser really helped us visualize and show exactly what we were building real time.

Having the live browser really helped our pair programming experience because of the immediate feedback, it made developing feel more like we were sitting next to each other and providing a second set of eyes to catch bugs which really improved our productivity.

#### <center> Day 2 </center>

![](/static/images/notcodenames/day2.png)

Once we had our front-end slightly developed, we started to talk about the game state and how they should change and when they should change. One of the cool things I learned about Firebase was their real-time database and how quickly it was able to update.

Overall, this was a super fun project to build, I enjoyed collaborating with my friend Adrian as we brainstormed how to develop this project and definitely learned a ton.

The project is now open sourced for those who want to add new features to it. I am currently maintaining and fixing some issues at the moment and planning to add a timer option, the source code can be found <a href="https://github.com/kxdang/notcodenames">here</a>
