---
author: Kien Dang
date: 2021-06-22
title: 🌿 One Year Work reflection
summary: It's already been one year! Time really flies.
tags: ['life']
---

June 8th marks my one year work anniversary.

After one year of working professionally, I compare what it was like going through the self-taught programming versus programming at a company with a large team and learning from very talented individuals.

Here I try to answer the following questions below:

1. [What did I learn working at Coveo as a programmer?](#what-did-i-learn-at-coveo)
2. [Where I am in my current programming journey?](#where-i-am-in-my-current-programming-journey)
3. [What other things do I want to learn?](#what-other-things-do-i-want-to-learn)
4. [What is it like after a year of working as a programmer?](#what-is-it-like-after-a-year-of-working-as-a-programmer)

# Reflection

To be honest, I don't know where to start with this one but its been one heck of a journey. Looking back, I was extremely lucky to have found a position during the development of a global pandemic.

I spent a year learning how to program by myself and learned just enough to enter the workforce. A year later, I was able to apply what I learned and solve actual problems at work and learned a ton of stuff along the way.

Starting a job with no prior experience in the field will always be the most challenging aspect of starting a new career. For me, its probably the most fun I've had so far.

# What did I learn at Coveo?

Well, TL;DR: A lot

- Learning legacy code (Backbone.js) to debug
- Navigating a massive codebase (micro-frontend architecture)
- Build processes (bumping a major version of Webpack v5 and changing compilers)
- Unit testing with Enzyme, Jasmine and React Testing Library
- TypeScript and Redux
- Using Git collaboratively with the team
- New ways to code solutions from doing PR reviews
- Delivering new UI features and changes to the platform
- A.I is literally the future of everything and is extremely powerful
- French (2 semesters of private classes, although I am no where near being able to speak)

As part of the Research and Development team at Coveo, things are always changing and that's one of the challenges at work. There were a few that came to mind when I think about the changes in my own personal development in programming.

## Unit testing

When I first joined, I had no idea about a concept called unit testing. It was something I had not learned how to do on my own in my self-taught journey.

I had all these questions about it: what is unit testing? what was it good for? and why do we even do them? They took extra time to do and I didn't realize their added value until after I did a refactor.

After doing a refactor, you realize that if it failed, then it was not 100% perfect. This meant we didn't have to manually test the behavior which definitely saves a lot of time and this was a pretty big eye opener.

Our codebase uses Enzyme and Jasmine for unit testing. However, we eventually made the switch to using the React Testing Library for our new tests.

This change really made me appreciate the React Testing Library philosophy of unit testing. I found the library more intuitive to use and I'm really glad I learned the more difficult way (imo) to unit test because now if I ever needed to use Enzyme, I can comfortably to use either of them.

My co-worker has a great <a href="https://source.coveo.com/2021/06/21/UI-testing-booster-pack/" target="_blank"> blog post </a> about unit testing and how we approach it at work.

## TypeScript and Redux

Another big one for me was learning TypeScript. It's all over the React code I'm working on and I don't think I can ever switch back to regular JavaScript.

It just makes coding easier by giving you static checking. It allows your code to be checked before execution so you know what kind of values need fixing.

In addition to the changes in unit tests, there were changes on how we developed new components using the latest features of Redux, a state management system for React. There was a slight learning curve, especially when trying to understand how React components are connected to the store.

Since we had an older version of Redux, we used the mapStateToProps and mapDispatchToProps where we would have to connect our component to extract data or dispatch actions to the store by mapping it to the props.

When I developed a feature using this method, I recently found out there was a better and faster way to connect our components to the store. But, this required upgrading our packages to the latest version.

We recently bumped two major versions of Redux which was a huge task that was done over a period of 2 days during a hackathon.

I learned that when you're bumping major versions, you'll end up with breaking changes that needed to be fixed. In our case, we bumped **two** major versions which required us fix over 3000 broken unit tests in order to use the good stuffs.

After doing this bump, we were able to leverage the hooks API from React and no longer required us to connect components. This saved us a lot of time by reducing boilerplate code and made it much easier to read.

It's similar to where you learn about class components initially and then eventually you learn about functional components and start replacing lifecycle methods with hooks.

You just appreciate how much better the improvements are.

<p align="center">
  <img src="https://media.giphy.com/media/l3q2LH45XElELRzRm/giphy.gif" />
</p>

Both of these experiences made me realize how exciting the web development space is. The technology is rapidly improving and making it easier to develop and when you're at a company whose willing to make those major changes to improve the development space, its just awesome.

# Where I am in my current programming journey?

Right now my programming journey is definitely running its course at work where I'm constantly learning more by developing features in our product which includes the continuous use of TypeScript, React, Redux and debugging skills.

I learned Git collaboratively, learned how to rebase, work on the same branch to drive the velocity of our development and learned how to work with different teammates for our projects which include the UX, Product managers, Solution Architect and Sales.

Sometimes, I forget to mention that I've worked professionally for 2 years in the automotive industry that helped me acquire the skills in teamwork, communication and being able to work in a fast pace environment.

For the time being, most of my development work and programming is staying at work as I am looking forward to enjoying the summer outdoors. I am currently spending more time biking to keep my physical health in check. The pandemic really kept us in for the most part anyways, so I might as well take advantage of being out.

But when winter rolls around, I think I will pick up some more personal projects and dab in Gatsby or Next.js which leads me to the next topic.

# What other things do I want to learn?

I want to be a Git Jedi. I'm always in awe when I see my co-worker help out my teammates and tells me all these Git commands to restore the work that I need or even help out those who have their branch at a dirty state.

I want to be able to learn this skill and eventually become a Git master. My current course I'm taking to level up this skill is from <a href="https://codewithmosh.com/p/the-ultimate-git-course" target="_blank">codewithmosh.</a>

There are other tech stacks I would like to go in-depth, mainly GraphQL because I think its pretty cool. Maybe I could create a new blog from scratch using Next.js or make a new one using Gatsby again.

# What is it like after a year of working as a programmer?

There are many things you learn when you start working at a company that you would not otherwise experience if you were learning by yourself and I think it goes to say that yes, professional work experience will always give you the edge in accelerating your skills not only in programming but as an overall developer.

These include understanding the workflow and development cycles of how production code gets released, the structure of JIRA and bug submission, the scrum meetings and the constant ability to jump between branches to fix your code, applying code reviews and being able to work with code that isn't yours and most importantly learning from others.

To be quite honest, I don't think I was ever prepared for this at all; no Udemy or online courses will teach you this stuff, but the great thing is that you learn on the job and develop lifelong skills.

Also, one of the most important thing I learned while programming at work was not to give up. I think this is the best way to gain experience as a developer, by constantly learning the reasons why code works the way it does and grinding your teeth until you realize that the solution was so simple that you want to cry in a corner.

But these experiences will humble you and make you a better problem solver because you'll know how to solve it for next time.

There are always solutions to a problem and sometimes it can take days, even weeks to figure it out. When you do find it, its the most satisfying thing ever and I think that's what makes programming pretty addicting.
