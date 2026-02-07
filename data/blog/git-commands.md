---
author: Kien Dang
date: 2022-01-30
title: 🤖 My top 10 Git commands I use
summary: Writing a post about my most used commands at work and what commands I learned to improve my workflow.
tags: ['code']
---

There are a ton of commands and many things you can do with Git. Here are the ones I commonly use for my workflow. These include fixing commit messages, debugging with Git and finding shortcuts to improve my workflow.

<TOCInline toc={props.toc} asDisclosure />

## 1. Changing commit messages

1. `git commit --amend -m "new commit message"`
2. `git push -f`

This command allows you to edit your commit messages if you've made a typo or a mistake in the convention you use to create commit messages.

## 2. Uncommit and remove some files that was accidentally pushed

1. `git reset --soft HEAD^1`

This brings back all the files to staging and remove whatever files you need

2. `git restore --staged <individual_file>`

## 3. Quickly bounce back to a previous branch

`git checkout --`

Shorthand for going back to the previous checked out branch

## 4. Rebasing your branch to remote origin or on another branch

1. `git fetch origin master:master && git rebase -i master`
2. If you have conflicts, fix them and then `git add .` and do step 3.
3. `git rebase --continue`
4. `git push -f` after you successfully rebase

Allows me to start right at the tip of main branch or helps me resolve any conflicts I have in the main branch

## 5. Resetting your changes to remote branch

1. `git reset --hard origin/branch-name`

or

1. `git reset HEAD~1`
2. `git clean -f -d`

These steps are destructive, you will not be able to retrieve your changes

## 6. Git stash saving with name

1. `git stash save "WIP: making progress on foo" --include-untracked`

Then run `git stash list` and find what you saved

2. `git apply stash@{n}`

## 7. Taking all of main branches changes

1. `git checkout --ours .`

When you simply just want to take all the changes made from master.

## 8. Renaming your branch after its been pushed

If you are already on the branch:

1. `git branch -m new-name`

If you're on different branch

1. `git branch -m old-name-branch new-name`

2. `git push origin:old-name new-name`

Then reset the upstream branch:

3. `git push origin -u new-name`

This comes in handy when I accidentally have the wrong branch name

## 9. Using Git to debug using Git bisect

This actually comes in super handy, there are times where a bug randomly appears and you have no idea what caused it and it could have been a specific package bump.
I have used this command multiple times and found bugs that have been difficult to find or when they have unknown origins.

Go to the bad branch and start it:

1. `git bisect start`
2. `git bisect bad`
3. `git bisect good <commit-number>` - find the commit number that you know the bug was not there before
4. Continue checking whether the commit was bad or good by typing `git commit bad/good`

As the bisect goes through, it does a binary search and tell you the commit where the bug was introduced.

## 10. Git worktree to jump between branch builds

Ever wanted to quickly switch branches but didn't want to stash your changes and then re-apply them when you switched branches?

Git worktree solves this issue by creating a brand new folder for that specific branch. It has been super helpful for context switching in between workflows as you don't have to stash any changes at all and have two separate builds installed seamlessly.

1. `git worktree add ../worktree-name-folder <branch-name>`
   This will add a folder outside of your project root

2. `cd ..` and `cd worktree-name-folder`
3. `code .` to open a new instance of VSCode in that folder
4. `npm install` or whatever command used to install all your project files

Now you can start up your project as if you've checked into this branch and do what you need to do.

Once you're done you can just change back to your original folder (yay no more need for stashing changes!).

Remove your worktree by:

1. `git worktree list` - shows a list of different worktree names
2. `git worktree remove worktree-name-folder`, you might need to add `--force` if you have unstashed changes

# Conclusion

And thats it! Those are my most common used Git commands I use at work.
