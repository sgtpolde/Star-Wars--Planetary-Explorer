<!---->

<div align="center">
    <h1>STAR WARS PLANETARY EXPLORER</h1>
    <h3>Explore the Star Wars Universe with Planetary Explorer</h3>
    <h3>Built with the Force of JavaScript, TypeScript, Vue.js, Git, and GitHub</h3>
</div>

<p align="center">
  <a href="https://skillicons.dev">
    <img src=https://skillicons.dev/icons?i=js,ts,vue,git,github />
  </a>
</p>

---

## 📖 Table of Contents

- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 repository Structure](#-repository-structure)
- [⚙️ Modules](#modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Star-Wars--Planetary-Explorer](#-running-Star-Wars--Planetary-Explorer)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

Welcome to Planetary Explorer, a Vue.js application designed to delve into the vast Star Wars universe. This project allows you to retrieve detailed information about various Star Wars planets, including climate, terrain, and population.
---

## 📦 Features

- **Dynamic Planet List:** Explore a list of Star Wars planets, each with its unique characteristics.
- **Detailed Planet Information:** Retrieve in-depth details about a selected planet, including climate, terrain, and population.
- **Resident Details:** Discover information about residents of a specific planet, adding depth to your exploration.
- **Responsive Design:** Enjoy a seamless experience on various devices, from desktop to mobile.
---


## 📂 Repository Structure

```sh
└── Star-Wars--Planetary-Explorer/
    ├── app.vue
    ├── components/
    │   ├── Loading.vue
    │   ├── PlanetCard.vue
    │   ├── PlanetDetails.vue
    │   ├── PlanetList.vue
    │   └── Residents.vue
    ├── nuxt.config.ts
    ├── package-lock.json
    ├── package.json
    ├── pages/
    │   ├── index.vue
    │   └── planet/
    │       └── [name].vue
    ├── public/
    ├── server/
    │   └── tsconfig.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── utils/
        ├── store/
        │   └── index.ts
        └── swapi.ts

```

---


## ⚙️ Modules

<details closed><summary>Root</summary>

| File                                                                                                         | Summary       |
| ---                                                                                                          | ---           |
| [nuxt.config.ts](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/nuxt.config.ts)         | The main configuration file for the Vue.js application, where settings and plugins are defined. |
| [package-lock.json](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/package-lock.json)   | The package lock file for Node.js, ensuring consistent dependency versions across different environments. |
| [tailwind.config.js](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/tailwind.config.js) | Configuration file for Tailwind CSS, a utility-first CSS framework. Defines styles and themes for the application. |
| [tsconfig.json](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/tsconfig.json)           | TypeScript configuration file, specifying compiler options and project settings for TypeScript in the project. |
| [app.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/app.vue)                       | The main Vue component representing the root of the application. This is where the overall structure and layout of the app are defined. |
| [package.json](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/package.json)             | Node.js package configuration file, specifying metadata about the project and its dependencies. |

</details>

<details closed><summary>Utils</summary>

| File                                                                                           | Summary       |
| ---                                                                                            | ---           |
| [swapi.ts](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/utils/swapi.ts) | A utility file providing functions to interact with the Star Wars API (SWAPI). It contains methods for fetching data about planets and residents. |

</details>

<details closed><summary>Store</summary>

| File                                                                                                 | Summary       |
| ---                                                                                                  | ---           |
| [index.ts](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/utils/store/index.ts) | The Vuex store index file, managing the global state of the Vue.js application. It includes state, mutations, actions, and getters for managing data and state changes across components. |

</details>

<details closed><summary>Components</summary>

| File                                                                                                                  | Summary       |
| ---                                                                                                                   | ---           |
| [PlanetList.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/components/PlanetList.vue)       | Vue component responsible for rendering the list of Star Wars planets. It dynamically displays planet cards based on the data received. |
| [Loading.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/components/Loading.vue)             | A loading spinner component to indicate that data is being fetched or processed. |
| [PlanetDetails.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/components/PlanetDetails.vue) | Vue component displaying detailed information about a selected Star Wars planet, including climate, terrain, and population. |
| [Residents.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/components/Residents.vue)         | Vue component for displaying information about residents of a specific planet. |
| [PlanetCard.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/components/PlanetCard.vue)       | Vue component representing a card displaying basic information about a Star Wars planet. |

</details>

<details closed><summary>Pages</summary>

| File                                                                                             | Summary       |
| ---                                                                                              | ---           |
| [index.vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/pages/index.vue) | The main landing page of the application, displaying the list of Star Wars planets. |

</details>

<details closed><summary>Planet</summary>

| File                                                                                                      | Summary       |
| ---                                                                                                       | ---           |
| [[name].vue](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/pages/planet/[name].vue) | Vue component representing the page for a specific Star Wars planet. It fetches and displays detailed information about the selected planet.T |

</details>

<details closed><summary>Server</summary>

| File                                                                                                      | Summary       |
| ---                                                                                                       | ---           |
| [tsconfig.json](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/server/tsconfig.json) | TypeScript configuration for the server-side code. It specifies compiler options and project settings for the server-side TypeScript in the project. |

</details>

---

## 🚀 Getting Started

***Dependencies***

Please ensure you have the following dependencies installed on your system:

`ℹ️ Pinia`

`ℹ️ Pinia nuxt`

`ℹ️ Axios`

### 🔧 Installation

1. Clone the Star-Wars--Planetary-Explorer repository:
```sh
git clone https://github.com/sgtpolde/Star-Wars--Planetary-Explorer
```

2. Change to the project directory:
```sh
cd Star-Wars--Planetary-Explorer
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Running Star-Wars--Planetary-Explorer

```sh
npm run dev
```



---


## 🛣 Project Roadmap

> - [X] `ℹ️  Currently completed`
> - [ ] `ℹ️  Maybe something in the future?`

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/sgtpolde/Star-Wars--Planetary-Explorer/issues)**: Submit bugs found or log feature requests for SGTPOLDE.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---



## 👏 Acknowledgments

 - "A long time ago, in a loading screen far, far away...",
 - "May the loading force be with you",
 - "Loading, you are. Patience, you must have.",
 - "The loading is strong with this one.",
 - "Waiting for the loading crawl...",
 - "A loading screen, I sense. Much to load, it has.",
 - "Loading at lightspeed!",
 - "The Force is loading...",
 - "In loading, we trust.",
 - "Your loading screen, it is.",

[**Return**](#Top)

---
