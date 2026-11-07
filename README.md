# PwnRef

**A browser-based penetration-testing command reference.**

PwnRef collects command examples and short operational notes across common penetration-testing workflows. The interface is designed for fast lookup, copyable examples, and personal favorites.

> **Authorization:** Use these commands only against systems you own or have explicit permission to assess. Some examples can generate significant traffic, modify target state, expose sensitive data, or disrupt services.

## What is included

- **34 reference sections** across reconnaissance, enumeration, exploitation, password attacks, Active Directory, post-exploitation, Linux, wireless, and pivoting.
- **141 command cards** with concise descriptions and copy controls.
- Search across the reference, with a `Ctrl+K` / `⌘K` shortcut.
- A favorites list stored in the browser.
- Export of saved favorites to a text file.
- Responsive navigation for desktop and smaller screens.

PwnRef is a static front-end application. It does not execute commands, scan targets, or provide a remote service.

## Quick start

No build step or package installation is required.

### Run with Python

From the repository root:

```bash
python3 -m http.server 8000
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

You can also open `index.html` directly in a browser. Serving it locally is recommended because browser clipboard permissions vary by context.

### Deploy with Firebase Hosting

The repository includes a root-level `firebase.json` configured to publish the repository root.

```bash
firebase login
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

The Firebase CLI must be installed and authenticated before deployment. Replace `YOUR_FIREBASE_PROJECT_ID` with the ID of the Firebase project you intend to deploy to.

## Repository layout

```text
.
├── index.html       # Reference content and page structure
├── styles.css       # Interface styling and responsive layout
├── app.js           # Search, navigation, clipboard, and favorites
├── 404.html         # Hosting not-found page
├── firebase.json    # Firebase Hosting configuration
├── .gitignore       # Local and generated files excluded from Git
└── README.md
```

## Browser storage and external resources

Favorites are stored in the current browser profile using `localStorage`. They are not synchronized between browsers or devices.

The interface loads fonts from Google Fonts. The application itself has no application backend or database.

## Accuracy and safe use

Command examples are starting points, not universal instructions. Addresses and credentials shown in examples are placeholders (for example, `10.10.10.10`, `domain.htb`, `user@domain.htb`, and `password`); they are not real targets or credentials. Replace them with values from an authorized lab or assessment.

Before executing an example:

1. Confirm that the target and activity are within the authorized scope.
2. Check the installed tool version and its current help or manual page.
3. Replace example IP addresses, domains, usernames, paths, and wordlists with values appropriate to your lab.
4. Understand the effect of the command, including possible service disruption, account lockout, data modification, or credential exposure.
5. Preserve evidence and follow the rules of engagement for the assessment.

The catalog is a personal reference and is subject to ongoing technical review. Tool behavior and recommended options may change between releases. Verify important commands against upstream documentation.

## Validation status

The repository currently contains a static HTML/CSS/JavaScript application. A dedicated automated test suite and a complete command-by-command compatibility review have not yet been added.

## License and permissions

This repository is **proprietary; all rights reserved**. You may view it where access is granted. For a public repository, GitHub's Terms of Service permit users to view and fork it on GitHub. Those platform permissions do not grant a general right to reuse, modify, redistribute, sublicense, or commercially exploit the original material outside GitHub.

Obtain prior, express, written permission from the copyright holder before any such use beyond the rights GitHub grants. Sending a request is not approval; wait for written authorization. See [LICENSE](./LICENSE) for the full scope, exclusions, permission-request route, and treatment of earlier license grants.

**Third-party material:** This notice covers only original material that the repository owner owns or is authorized to license. Third-party software, images, fonts, trademarks, curricula, standards, datasets, contributions, and other external content remain subject to their respective rights and terms. This repository does not relicense them.

**Tool-reference boundary:** Tool names, command behavior, official documentation, and third-party product marks belong to their respective owners. The permission requirement applies only to original explanatory text and project code that the repository owner owns.

