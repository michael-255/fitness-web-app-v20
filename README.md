# Web App Template

Fitness Tracker is for tracking workouts, exercises, and measurements as well as charting results.

## Stretch TODOs

-   Use Dexie `transactions` for all DB actions
-   Use Dexie's hooks from `DBCore` for updating previous
-   `DRY` up `Chart` component code
-   Add more tests

## Table of Contents

-   [Usage](#usage)
-   [Project Creation Steps](#project-creation-steps)
-   [Additional Notes](#additional-notes)
-   [Credits](#credits)

## Usage

Install the project dependencies.

```sh
npm i
```

Launch the dev server site.

```sh
npm run dev
```

Build the project `dist` directory.

```sh
npm run build
```

Preview application using built `dist` artifacts.

```sh
npm run preview
```

Run tests.

```sh
npm test
```

Run tests with coverage report.

```sh
npm test:coverage
```

Removes previous GitHub Pages deployment.

```sh
npm run deploy:clean-gh-pages
```

Build and deploy the `dist` directory to GitHub Pages.

```sh
npm run deploy:gh-pages
```

Check for outdated packages.

```sh
npm outdated
```

Update packages based on `package.json` version settings. Test updates to ensure they worked.

```sh
npm upgrade
```

## Project Creation Steps

Details on the steps I took to create this project.

1. Create an empty repository in GitHub with a `PROJECT_NAME`

1. Run `npm init vue@3` in your local Projects directory:

    - Name the project `PROJECT_NAME`
    - TypeScript - Yes
    - JSX - No
    - Vue Router - Yes
    - Pinia - Yes
    - Vitest - Yes
    - End-to-End Testing - No
    - ESLint - Yes
    - Prettier - Yes

1. Install dependencies:

    - `npm i slugify` - For making URL slug from text
    - `npm i dexie` - IndexedDB wrapper
    - `npm i yup` - Data validation
    - `npm i -D gh-pages` - GitHub Pages deployment
    - `npm i @vueuse/core` - Vue component utilities
    - `npm i chart.js vue-chartjs` - Chart.js with a Vue wrapper
    - `npm i -D @types/chart.js`
    - `npm i quasar @quasar/extras` - Vue component framework
    - `npm i -D @quasar/vite-plugin`

1. Use Quasar configurator tool to help setup Quasar:

    - <https://quasar.dev/start/vite-plugin>
    - Roboto font - YES
    - Material Icons - YES
    - Material Icons (Outlined) - YES
    - Auto-import component case - pascal
    - Quasar Config Object

1. Update `main.ts` with the Quasar configurator tool generated code:

    ```typescript
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'
    import { Meta, Dialog, Notify, Quasar } from 'quasar'
    import router from '@/router'
    import App from '@/App.vue'
    import '@quasar/extras/roboto-font/roboto-font.css'
    import '@quasar/extras/material-icons/material-icons.css'
    import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
    import 'quasar/dist/quasar.css'
    // import '@/assets/global.css' // Can create this later to hold global styles

    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(Quasar, {
        plugins: {
            Meta,
            Dialog, // Uses a custom component (SimpleDialog.vue)
            Notify,
        },
        config: {
            dark: true,
            /**
             * Defined app brand colors.
             * @see https://quasar.dev/style/color-palette
             * @see https://quasar.dev/quasar-utils/color-utils
             */
            brand: {
                primary: '#1976d2', // indigo (Primary Brand Color)
                secondary: '#607d8b', // blue-grey (LOG)
                accent: '#673ab7', // deep-purple-6 (DEBUG)
                info: '#0d47a1', // blue-10 (INFO)
                warning: '#ff6f00', // amber-10 (WARN)
                negative: '#C10015', // negative (ERROR)
                positive: '#4caf50', // green
                dark: '#1d1d1d',
                'dark-page': '#121212',
            },
            notify: {
                textColor: 'white',
                position: 'top',
                multiLine: false,
                timeout: 4000,
                actions: [
                    {
                        label: 'Dismiss',
                        color: 'white',
                    },
                ],
            },
            // loading: {...}, // default set of options for Loading Quasar plugin
            // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
            // // ..and many more (check Installation card on each Quasar component/directive/plugin)
        },
    } as any)

    // Assumes you have a <div id="app"></div> in your index.html
    app.mount('#app')
    ```

1. Update `vite.config.js` with the Quasar configurator tool generated code:

    ```javascript
    import { fileURLToPath, URL } from 'node:url'
    import { defineConfig } from 'vite'
    import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
    import vue from '@vitejs/plugin-vue'

    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [vue({ template: { transformAssetUrls } }), quasar({ autoImportComponentCase: 'pascal' })],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        /**
         * This should be your GitHub repo name. You can find it on the GitHub URL.
         * @example
         * https://github.com/my-username/my-app-repo
         * my-app-repo
         */
        base: '/REPO_NAME/',
    })
    ```

1. Additional scripts for `package.json` file. The `deploy` script makes a copy of the `index.html` in `dist` as
   `404.html` to address complications related to routing. This let's you avoid using hash based routing.

    ```json
    {
        "scripts": {
            "test": "vitest",
            "deploy:clean-gh-pages": "gh-pages-clean gh-pages -d dist -m Deployment",
            "deploy:gh-pages": "npm run build && npm version patch && cd dist && cp index.html 404.html && cd .. && gh-pages -d dist -m Deployment"
        }
    }
    ```

1. Define the `ECMAScript` version you want TypeScript to use in the `tsconfig` files:

    ```json
    {
        "compilerOptions": {
            "target": "es2022",
            "lib": ["es2022", "dom"],
            "ignoreDeprecations": "5.0"
        }
    }
    ```

1. Setup `.prettierrc.json` config file:

    ```json
    {
        "$schema": "https://json.schemastore.org/prettierrc",
        "printWidth": 100,
        "tabWidth": 2,
        "useTabs": false,
        "semi": false,
        "singleQuote": true,
        "quoteProps": "as-needed",
        "jsxSingleQuote": true,
        "trailingComma": "es5",
        "bracketSpacing": true,
        "bracketSameLine": false,
        "arrowParens": "always",
        "proseWrap": "always",
        "htmlWhitespaceSensitivity": "css",
        "vueIndentScriptAndStyle": false,
        "endOfLine": "lf"
    }
    ```

1. Setup `.eslintrc.cjs` config file:

    ```javascript
    /* eslint-env node */
    require('@rushstack/eslint-patch/modern-module-resolution')

    module.exports = {
        root: true,
        extends: [
            'plugin:vue/vue3-essential',
            'eslint:recommended',
            '@vue/eslint-config-typescript',
            '@vue/eslint-config-prettier/skip-formatting',
        ],
        parserOptions: {
            ecmaVersion: 'latest',
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    }
    ```

1. Setup other config files as desired:

    - `/.vscode/extensions.json` - Include extensions you recommend for your project
    - `.gitignore`
    - `.prettierignore`

1. Replace `~/index.html` with a the one before since we are using `useMeta`:

    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <!-- Define head values on useMeta in App.vue -->
        </head>
        <body>
            <div id="app"></div>
            <script type="module" src="/src/main.ts"></script>
        </body>
    </html>
    ```

1. Update the `manifest.json` file in `~/public` with the project name and start URL

1. Update `useMeta` in `~/src/App.vue`

1. Add icons to the `~/public` directory (like `favicon.ico`)

1. Run `git init` inside your project directory

1. Commit all changes to the project into it's initial commit

1. Run the follow commands to push the new project to your GitHub repo:

    ```sh
    git remote add origin https://github.com/GITHUB_USER/PROJECT_NAME.git
    git branch -M main
    git push -u origin main
    ```

## Additional Notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for
type checking. In editors, we need
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to
make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a
[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more
performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Credits

<https://favicon.io/emoji-favicons/>

App favicon was generated using the following graphics from Twemoji:

-   Graphics Title: 1f3cb-fe0f-200d-2642-fe0f.svg
-   Graphics Author: Copyright 2020 Twitter, Inc and other contributors (<https://github.com/twitter/twemoji>)
-   Graphics Source: <https://github.com/twitter/twemoji/blob/master/assets/svg/1f3cb-fe0f-200d-2642-fe0f.svg>
-   Graphics License: CC-BY 4.0 (<https://creativecommons.org/licenses/by/4.0/>)
