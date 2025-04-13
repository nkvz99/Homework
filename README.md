| Command                     | Description                                                                 | Example Usage                          |
|-----------------------------|-----------------------------------------------------------------------------|----------------------------------------|
| `git init`                  | Initializes a new Git repository.                                           | `git init`                             |
| `git clone <repo_url>`      | Clones an existing repository.                                              | `git clone https://github.com/user/repo.git` |
| `git status`                | Shows the status of changes in the working directory.                       | `git status`                           |
| `git add <file>`            | Stages a specific file for commit.                                          | `git add index.html`                   |
| `git add .`                 | Stages all changes in the directory.                                        | `git add .`                            |
| `git commit -m "message"`   | Commits staged changes with a message.                                      | `git commit -m "Initial commit"`       |
| `git push`                  | Pushes local commits to the remote repository.                              | `git push origin main`                 |
| `git pull`                  | Fetches and merges changes from the remote repository.                      | `git pull origin main`                 |
| `git branch`                | Lists all branches in the repository.                                       | `git branch`                           |
| `git branch <branch_name>`  | Creates a new branch.                                                       | `git branch feature-branch`            |
| `git checkout <branch>`     | Switches to a different branch.                                             | `git checkout feature-branch`          |
| `git checkout -b <branch>`  | Creates and switches to a new branch.                                       | `git checkout -b feature-branch`       |
| `git merge <branch>`        | Merges a branch into the current branch.                                    | `git merge feature-branch`             |
| `git stash`                 | Temporarily saves uncommitted changes.                                      | `git stash`                            |
| `git stash pop`             | Applies the most recent stashed changes.                                    | `git stash pop`                        |
| `git log`                   | Displays commit history.                                                    | `git log --oneline --graph`            |
| `git reset --hard <commit>` | Resets the repo to a specific commit, discarding changes.                   | `git reset --hard abc123`              |
| `git revert <commit>`       | Creates a new commit that undoes a previous commit.                         | `git revert abc123`                    |
| `git rebase <branch>`       | Moves or combines commits from another branch.                              | `git rebase main`                      |
| `git remote -v`             | Shows the remote repository URLs.                                           | `git remote -v`                        |
| `git fetch`                 | Downloads changes from the remote but doesn't merge.                        | `git fetch origin`                     |
| `git diff`                  | Shows the differences between commits or working state.                     | `git diff HEAD`                        |
