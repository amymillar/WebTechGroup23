# GitHub Actions Workflows

This project uses **GitHub Actions** to automate tasks such as linting, deployment, and accessibility testing. Below is a breakdown of the workflows implemented and how they work.

## Workflows Overview

| Workflow Name           | File Name            | Purpose |
|-------------------------|----------------------|----------------------------------------------------|
| JavaScript Linter         | `lint.yml`           | Checks JavaScript code for errors using ESLint. |
| Deploy to GitHub Pages | `deploy.yml`             | Automatically updates the live website when changes are pushed to `main`. |
| Accessibility Check       | `accessibility.yml`  | Runs an accessibility audit to ensure WCAG compliance. |

---

## JavaScript Linter (`lint.yml`)

**Purpose:** Ensures JavaScript code quality using ESLint.  
**Triggers:** Runs on every push.  
**Actions:**
- Installs Node.js and ESLint.
- Scans JavaScript files for syntax errors.
- Outputs any issues to the GitHub Actions log.

### How to Fix ESLint Errors Locally
```sh
npm install -g eslint  # Install ESLint globally
eslint script.js --fix  # Auto-fix errors (if possible)


## Deploy to GitHub Pages (deploy.yml)

Purpose: Automatically deploys the website when changes are pushed to main.
Triggers: Runs when new changes are pushed to main.
Actions:

    Fetches the latest project files.
    Deploys them to the gh-pages branch (GitHub Pages hosting).

    

## Accessibility Check (accessibility.yml)

Purpose: Runs Google Lighthouse audits to check for accessibility issues.
Triggers: Runs on every push.
Actions:

    Tests the website for accessibility problems.
    Flags issues like missing alt text, low contrast, and bad HTML structure.
    Provides a score for accessibility improvements.

How to Manually Run an Accessibility Audit

You can also test accessibility in Google Chrome:

    Open DevTools (F12) → Lighthouse tab.
    Select Accessibility and click Run Audit.


Troubleshooting
Workflow Fails

    Check GitHub Actions logs for errors.
    If ESLint errors occur, run:

    eslint script.js --fix

    Ensure GitHub Pages is enabled under Settings > Pages.

Website Not Updating

    Confirm you pushed to main.
    Check that the gh-pages branch is being updated.
    Wait a few minutes for GitHub Pages to refresh.