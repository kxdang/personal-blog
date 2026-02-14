---
title: The philosophical views of code
date: 2026-02-14T18:19:39.717Z
tags:
  - code
  - biochemistry
draft: false
summary: 'From being that junior, to maturing into a professional who sees code in a different light.'
author: Kien
---

\# Code Is Not a Museum Piece

I’ve been thinking about something that happened pretty early in my career, about 5 years ago.

When I first started in software development, I watched two senior engineers clash over a pull request. It wasn’t loud, but there was real philosophical tension there.

One of them came from a strong open source background. Everything had to be clean, naming had to feel right and the abstractions had to make sense. If something was slightly awkward, it got paused, requested to refactor and sometimes rewritten entirely.

The other engineer had been at the company for years. He was frustrated; PRs were sitting too long. The features weren’t getting out the door and it felt like momentum kept getting interrupted in the name of polish.

At one point he said something that stuck with me.

When you work at a private company, most of the code you write will never see the light of day. It exists to produce business value.

And if I’m being honest, I agreed with him.

We had nitpickers, comments about code style, minor preferences. Things that technically worked but “didn’t read right.” At some point we even made a simple rule as a web guild: if eslint didn’t catch it, the suggestion was quite simply a suggestion, not an action item.

That wasn’t about lowering standards. It was about drawing a line between objective issues and personal taste.

I didn’t see it as cutting corners. I saw it as protecting momentum.

\---

\## Clean Code vs Moving Forward

I still care about clean code, that hasn’t changed.

Clean code makes things easier to reason about. It reduces friction, it helps the next person and of course, it helps future me.

But I don’t think “perfect” code is the goal… it never was.

The goal is impact. Shipping something users can actually interact with, validating an idea, improving a metric and solving a real problem.

Sometimes that means introducing a bit of technical debt, but not out of recklessness

Because here’s the other thing.

Software is churn.

Developers grow, they end up leaving, they move teams and outgrow the company. They leave behind code with context that only existed in their head and to their best of their abilities, write code clean enough for the PR reviewers to understand, so that it gets in. What made perfect sense at the time and between the devs that were there slowly becomes confusing six months later for the next cohort of devs.

In a perfect world, code would stay pristine. Clean abstractions, clear comments, no weird patterns and things are documented well.

But real systems are touched by dozens of hands over years. We get different eras and iterations of the product as the company evolves.

Of course there’s debt.

The real skill isn’t pretending it shouldn’t exist. The real skill is being able to read through it, understand it, improve it where it matters, and still continue producing value.

\---

\## Recently, I Felt It Myself

I ***merged*** something that wasn’t my cleanest work. But behind a feature flag, this code will never run in production. This is was expected. My manager mentioned this was the point and while working with another senior developer,  we were bouncing ideas back and forth, code being landed the way it is is not without communication. The code gets cleaned up in every PR we iterate.

Communication with the work here is key, things get refactored for clarity as the project nears completion.

One thing about my code was that:

* It worked.
* There were tests.
* The pipeline didn't fail.
* It was behind a future flag.
* It had basically no production exposure.

Some of it was AI assisted. And yeah, if someone really wanted to, they could argue the structure wasn’t ideal. It wasn’t something I’d showcase as pristine architecture.

But it did what it needed to do.

And that old conversation came back to me.

What’s the point of a feature flag?

It’s there so you can move quickly. So you can experiment. So you can validate direction without fully committing. It’s controlled risk.

If something is intentionally behind a flag and isolated, holding it back because it doesn’t look perfect at first glance starts to feel like optimizing for aesthetics over progress.

Now, if tests are failing or it’s unstable, that’s different. That deserves attention and that requires a proper rework.

But if it works, is safe, and is temporary by design, I don’t think it needs to be beautiful before it can exist.

\---

\## When It’s Not Really About the Code

Over time I’ve realized that sometimes the tension isn’t about code quality at all.

It’s about **trust**.

If someone repeatedly asks for full rewrites of working code, especially experimental code, it might not be about the structure itself. It might be about philosophy, comfort, or risk tolerance.

Some engineers optimize for elegance. Others optimize for iteration speed.

Neither is wrong.

But if you’re not aligned on what matters in that moment, it shows up in PR comments instead of real conversations.

And that’s harder to fix than messy code.

\---

\## AI and Ownership

AI adds another layer.

Yes, AI generated code can feel slightly awkward. Slightly verbose and sometimes oddly structured.

But at the end of the day, I’m the one merging it.

So the real questions are simple:

\- Does it work?
\- Is it tested?
\- Can someone reasonably understand it?
\- Does it create value?

If the answer is yes, then the tool used to write it feels secondary.

AI speeds things up. It doesn’t remove responsibility.

\---

\## A Note to Myself

Not everything needs to be beautiful.

Speed, when it’s intentional and controlled, isn’t sloppiness. When you operate lean and the business calls for it after major organizational changes, this is the code aligning with the business value.

But I also don’t want to hide behind “it works” forever. Debt compounds, patterns harden and it becomes messy. 

The balance is the hard part.

* Ship when it’s safe.
* Refactor when it matters.
* Learn to decipher messy systems
* Keep producing value.
