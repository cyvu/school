# School project (html | css | js) - client
This project is meant to go through the basics of html, css and js. Later on we will move over to typescript and after that a framework, such as react or vue.
This is developed alongside the server project "School project (node | express | cors | trcp | mysql) - server" which is a requisite for storing and fetching data.
<br />
<br />

## New repository name: school
<details>
<summary>View</summary>

<code>git switch main</code>

<code>git remote remove origin</code>

<code>git remote add origin git@github.com:cyvu/school.git</code>

<code>git fetch --all</code>
<hr>
</details>
<br />

## Structure of the project
<details>
<summary>View</summary>

> TLDR; duplicate <code>(root)/src/components/modules/example</code> and then duplicate the example in <code>(root)/src/components/index.js</code> and set the paths. Replace the names of both steps to your module.

<br />

This project is based on modules - each of which should be added as described in the numerated parts below.
The root folder contains <code>index.html</code> and this file shouldn't be changed, since this is where the modules will be injected into. 

<br />

1. <code>(root)/src/components/modules/example</code>
- The "<code>example</code>" is the module you what to create. It should do one thing, like display a gallery or a login page.
- Duplicate this for your own module
- The "<code>example</code>" contains the following paths, which should be used if neccessary and can be removed if not: 

> 1. <code>(example)/img</code>
> - Contains images for the module

> 2. <code>(example)/css</code>
> - Styles only related to the module (use #"your_module" before every style block. Also, replace "your_module" with the name of your module)

> 3. <code>(example)/js</code>
> - Contains functions, eventlisterners, classes, and such for the module

> 4. <s><code>(example)/nav</code></s>
> - Contains a navigation as an aside which should link to relevant topics on the module <i>(to be implemented)</i>

> 5. <code>"your_module".htm</code>
> - Use this file as your module base. Start with a <code>&lt;section id="your_module"&gt;</code><code>&lt;/section&gt;</code> and keep your content within that section.

<br />

2. <code>(root)/src/components/index.js</code>
- The index.js is where you would add the module, and any accompanying folder (css | js | img). Just copy the example module in there and set up the correct paths. 

Some notes: 

At the moment the script only takes ony file per folder and the user has to mannually add a module to index.js. This will change in the future where you would just have to create the module itself for it to work.

the modules script is read sequentially, from top to bottom, so the order you add your module matters.
<hr>
</details>
<br />
<br />

# Git Commands
<details>
<summary>View</summary>

All text consisting of <code>&lt;explaination&gt;</code> should replace both the symbols and text; 

> <code>dummy command &lt;example&gt;</code>
>
> <code>dummy command value</code>
>
> Example:
> 
> <code>git switch <i>&lt;branch&gt;</i></code> - you want to switch to the main branch
>
> Corresponds to:
> 
> <code>git switch main</code>

But quotation-marks should remain while the inner text is changed ie.

> <code>dummy command "example message"</code>
>
> <code>dummy command "true message"</code>
> 
> Example:
> 
> <code>git commit -m "<i>message</i>"</code> - you want to commit an image update
>
> Corresponds to:
> 
> <code>git commit -m "image now haunts people"</code>
<hr>
</details>
<br />

<span style="background: #0060df; color: white; border-radius: 4px; padding: 4px 8px;">Info: It is recommended to use <code>git pull</code> from main before you create a new branch</span>

<br />
<span style="background: #f44336; color: white;  border-radius: 4px; padding: 4px 8px;">Warning: don't checkout changes to main; use switch instead</span>

<br />
Common commands are described in the following sections
<br />
<br />

## Branches
<details>
<summary>View</summary>

<code>git branch</code> - see current and other local branches

<code>git branch --remote</code> - check remote branches 

<code>git branch --all</code> - check both local and remote branches 

<code>git switch <i>&lt;branch&gt;</i></code> - switch to a given branch

<code>git checkout <i>&lt;branch&gt;</i></code> - switch to a given branch along with any local changes (good if you have made changes to the main branch but need to continue on a testing branch)
<hr>
</details>
<br />

## Download
<details>
<summary>View</summary>

<code>git switch main</code>

<code>git pull origin <i>&lt;remote_branch&gt;</i></code> - pulling from <i>main</i> is recommended (unless you know what you're doing)
<hr>
</details>
<br />

## Create project branch 
<details>
<summary>View</summary>

<code>git switch main</code>

<code>git checkout -b <i>&lt;new_branch&gt;</i></code> - the new branch should correspond, in name, with the work you're doing
<hr>
</details>
<br />

## Upload
<details>
</summary>View</summary>

<code>git status</code> - see all changed files

<code>git add <i>&lt;files or .&gt;</i></code> - add specific files for the commit, or all files using a dot (.)

<code>git commit -m "<i>message</i>"</code> - each push should be associated with a relevant message (ie. "increased readability")

<code>git push origin <i>&lt;branch&gt;</i></code> 
<hr>
</details>
<br />

## Clean local repository
<details>
<summary>View</summary>

<code>git switch main</code>

<code>git branch --delete <i>&lt;old_branch&gt;</i></code>

<code>git branch --delete --force <i>&lt;old_branch&gt;</i></code> - deletes a branch with unmerged code
<hr>
</details>
<br />

## Clean online repository
<details>
<summary>View</summary>

<code>git push origin --delete <i>&lt;old_branch&gt;</i></code> - deletes a remote branch (make sure it is unused)
<hr>
</details>
<br />
