# html-css-js-mysql

## New repository name: school
<code>git switch main</code>

<code>git remote remove origin</code>

<code>git remote add origin git@github.com:cyvu/school.git</code>

<code>git fetch --all</code>
<br />
<br />

## Time to learn
This project is meant to go through the basics of html and css, and later some more advanced techniques
<br />
<br />

# Git Commands
<details>
<summary>Disclaimer (click to open)</summary>
<hr>

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
<br />
Common commands are described in the following sections

## Branches
- <code>git branch</code> - see current and other local branches
- <code>git branch --remote</code> - check remote branches 
- <code>git branch --all</code> - check both local and remote branches 
- <code>git switch <i>&lt;branch&gt;</i></code> - switch to a given branch
- <code>git checkout <i>&lt;branch&gt;</i></code> - switch to a given branch along with any local changes (good if you have made changes to the main branch but need to continue on a testing branch)

<br />

## Download 
- <code>git switch &lt;local_branch&gt;</code>
- <code>git pull origin <i>&lt;remote_branch&gt;</i></code> - pulling from <i>main</i> is recommended (unless you know what you're doing)

<br />

## Create project branch 
- <code>git switch main</code>
- <code>git checkout -b <i>&lt;new_branch&gt;</i></code> - the new branch should correspond, in name, with the work you're doing

<br />

## Upload
- <code>git status</code> - see all changed files
- <code>git add <i>&lt;files or .&gt;</i></code> - add specific files for the commit, or all files using a dot (.)
- <code>git commit -m "<i>message</i>"</code> - each push should be associated with a relevant message (ie. "increased readability")
- <code>git push origin <i>&lt;branch&gt;</i></code> 

<br />

## Clean local repository
- <code>git switch main</code>
- <code>git branch --delete <i>&lt;old_branch&gt;</i></code>
- <code>git branch --delete --force <i>&lt;old_branch&gt;</i></code> - deletes a branch with unmerged code

<br />

## Clean online repository
- <code>git push origin --delete <i>&lt;old_branch&gt;</i></code> - deletes a remote branch (make sure it is unused)
