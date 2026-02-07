---
author: Kien Dang
date: 2020-08-18
title: 💻VSCode Productivity Tips
summary: I took a workshop called Visual Studio Code Can Do That? by Burke Holland from Frontend Masters and learned a few tips and tricks to make myself more productive with VSCode!
tags: ['code', 'productivity']
---

This is a hand picked summary of what I use from Burke Holland's <a href="https://burkeholland.gitbook.io/vs-code-can-do-that/" target="_blank">website</a> and his course on frontend masters to improve my productivity with VSCode.

# <center> Useful Shortcuts </center>

| **Shortcut**                    | **Action**             |
| ------------------------------- | ---------------------- |
| Opt/Alt + Shift + Up/Down Arrow | Duplicate Code         |
| Opt/Alt + Up/Down               | Move a line up or down |
| CMD/Ctrl + Shift + K            | Delete a line entirely |

<center> <strong>Multiple line cursors</strong> </center>

| **Shortcut**         | **Action**                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------- |
| CMD/Ctrl + Shift + L | all instances of a word becomes highlighted and can be manipulated                       |
| CMD/Ctrl + D         | selects instances one at a time, CMD/Ctrl + K to skip an instance as you go through them |

<center> <strong>Extracting Methods</strong> </center>

| **Shortcut** | **Action**                        |
| ------------ | --------------------------------- |
| CMD/Ctrl + . | Help dive deeper into the methods |

# <center>Find and Replace</center>

- By clicking on the regex you can use the `|` (pipe) symbol to denote an additional word or field for multiple different strings using regular expression
- Once found, you can press `Opt/Alt + Enter` which will bring your cursor to every found instance in the document and then use your arrow keys to move over to the front of the found instance
- Replace all instances using `F2` - it renames all instances and references to that word

# <center className="pt-10">Navigating in VS Code</center>

| **Shortcut**         | **Action**                                                                                                    |                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------- |
| CMD/Ctrl + Shift + P | Brings you to the command palette\*, removing the `>` brings you to the file switcher                         |                  |
| CMD/Ctrl + PP        | VS Code will allow you switch to the last file you were at (toggling between the two like alt+tab on windows) |                  |
| CMD/Ctrl + 0         | Brings you to the sidebar, you can move up or down using arrow (Windows: Enter to open file                   | Mac: CMD + down) |
| CMD/Ctrl + 1         | Brings you to the editor (toggle between the two by pressing 0 and 1)                                         |                  |
| Ctrl/CMD + Shift + H | Finds relative path of a file - (need to install RelativePath)                                                |                  |

There are other things you can do with the command palette:

<ul>
    <li>Using the symbol browser (@) to jump to any HTML code</li>
    <li>"@:" will segment things off</li>
    <li>"#" searches across files</li>
</ul>

# <center>Theming</center>

One of the things that made me enjoy programming was how nice you can customize the colours of the editors. As a programmer you'll be living in VSCode for the most part, so you might as well make it yours and get comfy.

## <center>Font Ligatures</center>

Makes the font easier to read by combining certain symbols like how we would combine them by writing it out by hand. This is up to personal preference, I didn't like it at first, but it definitely has grown on me. I use Fira Code with font ligatures enabled.

```json
"editor.fontFamily": "Fira Code",
"editor.fontLigatures": true,
```

![](/static/images/vscode/fontligatures.png)

## <center>Material Icons </center>

Adds icons to your folder, provides better cognition around what is in your project

```json
"material-icon-theme.saturation": 0.75,
"material-icon-theme.folders.color": "#C5C5C9",
"material-icon-theme.folders.theme": "classic",
```

This saturates the colours ever so slightly, giving it a nicer look. I took this setting from <a href="https://github.com/TimGr/valley-vscode" target="_blank">Valley VSCode</a>, there's a nice screenshot of how the folders look there.

## <center>Optimizing</center>

### Sidebar goes on the right

- Why?
  - By having the toolbar to the right side, our cognition is not affected since we tend to read from left to right. The code editor does not bounce around when we toggle the bar.
  - We want to hide our toolbar for more code editor space, making it on the right side would be ideal for toggling it.

#### <center>right side bar</center>

![](/static/images/vscode/rightbar.gif)

#### <center>Left side bar</center>

![](/static/images/vscode/leftbar.gif)

### Remove Open Editor

To change Explorer > Open Editors: Visible from 9 to 0

- Why?
  - Do not use it as often, reduntant because you have tabs open
  - Allows more space for your files and your projects to be seen

## <center> Debugging Tips </center>

### Type Checking

- Type `//@ts-check` at the top of your code to use the type checking feature on JavaScript
  - Does not scale though, be careful using this so you can do
  - `javascript.implicitProjectConfig.checkJs`
    - This allows VScode to check your project using the TypeScript compiler (insert it in settings)

### Log points

- Adding log points by right clicking the red dot on the left side of the number of line and then add a log message (alternative to console.log but you don't have to close your app to write console log) - check the debug console
  - You must put it in brackets {} because it string interpolation

![](/static/images/vscode/breakpoint.png)

### TypeScript Debugging

- How to start:

  - CMD/Ctrl + B to build or watch the file
  - Exclude .js files by right clicking the folder and adding a settings

    ```json
    files.exclude: {
    	**/*.js: true,
    	**/*.js.map: true,
    }

    "**/{*.js, *.js.map}: true (glob expression)
    ```

4. Extensions:

- Image Preview - Shows image preview on gutter
- Autorename tag - renames opening and closing tag together at the time
- Bracket pair colorizer - Allows bracket colours that correspond to each other
- ES7 React Snippets - Fast way of generating boiler plate code for React
- Highlight Matching Tag - Matches the opening and closing tags of HTML code
- Indent Rainbow - Shows indentation colours for easier tracking of brackets
- Path Autocomplete - Completes the path of your files you are trying to add
- Version Lens - Shows version information when opening a project or package
- DotENV - Adds syntax highlighting to .env files
- GitLense - Blame annotation, tells you the name of the person, commit message
- Better Comments - Create a nicer way to categorize your comments in code
- Auto Import - Automatically parses and finds your imports
- RelativePath - Allows you to find a files relative path for importing components

# <center className="pt-10">Saving all your VSCode settings</center>

I use <a href="https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync" target="_blank">Settings Sync</a> which is an extension that saves my VSCode settings on Github so I can easily sync when working on different machines. It saves everything including your downloaded extensions.

By no means is this post a substitute for Frontend Masters Visual Studio Code Can Do That course, I still recommend watching it as Burke has other topics regarding SQL, and Docker settings.
