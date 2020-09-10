# Portfolio

## Description

This portfolio project is a way to briefly introduce myself, talk about my personal and professional skills, showcase some of the last projects I worked on, and ultimately challenge myself on some technologies and good practices.

I would love to know your thoughts about this project and get your valuables feedbacks, so I made this code available on GitHub.
Feel free to contact me if you would like to know more.

## Stack

This project is a Single Page Application developed with `Next.js`, which is a `React` framework including features like: 
- static & server rendering
- route pre-fetching
- built-in CSS Modules support
- `Webpack` and `Babel` configuration 
- and more tools that helps create fast and optimized pages without compromising *SEO*.

For styling, I use `SASS` and `TailwindCSS`, an utility-first CSS framework which is: 
- component-friendly
- mobile-first
- designed to be customized 
- it provides low-level and non-opinionated utility classes 
- it has a purge option to tree-shake unused styles and optimize the build size

On top of that, the postcss `autoprefixer` will generate the necessary vendor prefixes to ensure the best browser support.

The linter `eslint` is used to ensure code quality and coding style. 

This project also implements *web font generation from SVG icons* and *custom font subsetting* in order to optimize loading time.

## Structure

Detail of the project file structure:

```bash
├── components/
├── pages/
│   ├── index.js
│   ├── _app.js
│   └── project/
├── middleware/
├── styles/
├── public/
│   ├── images/
│   ├── videos/
│   ├── fonts/
│   └── favicon/
├── utils/
├── font_custom/
├── font_svg/
├── config.js
├── next.config.js
├── postcss.config.js
└── tailwind.config.js
```

Description of the main files and folders:

- `components/`: Contains all components with sometime its CSS module file.
- `pages/`: Contains the pages of the websites. When a file is added to this directory it's automatically available as a route.
- `pages/index.js`: Default entry point. It's the main page, accessible at `/`.
- `pages/_app.js`: Top-level component that wraps the outside of each page. Useful for integrating global styles and librairies.
- `middleware/`: Set of functions for connecting to the DB and retrieving data. 
- `styles/`: Global styles, also contains globally defined elements like *typography*, *variables*.
- `public/`: Contains all publically available assets like *images*, *videos*, *fonts*, *favicon*, etc... *Next.js* static file serving will conveniently map this folder to `/`.
- `utils/`: Contains a set of useful tools like *fontOptimizer*, *scrollRestoration*, string manipulation functions and *translation* utilities.
- `font_custom/`: Contains the source font that will be subsetted at build for an optimal loading time.
- `font_svg/`: Contains source SVGs that will be combined an optimized into a convenient font.
- `config.js`: Centralize variables that need to be accessed globally.
- `next.config.js`: Mainly used to override the default *WebPack* configuration (e.g. Font generated from SVG icons)
- `postcss.config.js`: To configure *postcss* plugin.
- `tailwind.config.js`: To configure *TailwindCSS*, extends its functionnality and define the purge methodology.

## Dependencies 

Main dependencies :
- `next`, `react`, `react-dom`: The core of *Next.js* and *React*.
- `mongodb`, `isomorphic-unfetch`: The database and its tools (fetch polyfill).
- `prop-types`: Necessary for component props validation.
- `aos`, `react-transition-group`: Animation tools (*aos* stands for AppearOnScroll).
- `classnames`: Simple utility for conditionally joining classNames together.
- `react-tooltip`: React component to create dynamic tooltip on hover.

Development dependencies :
- `sass`, `tailwindcss`: We use *SASS* and the CSS utility-first framework *TailwindCSS*.
- `eslint`, `eslint-plugin-react`, `eslint-plugin-tailwind`: The famous linter and it's plugins.
- `fontmin`, `iconfont-plugin-webpack`: Respectively used for subsetting a font and generating a web font from SVGs
- `postcss-preset-env`: Transforms CSS to increase readibility and for better compatibility (e.g. Adding vendor prefixes, determining needed polyfills)

## Tasks

Description of the npm scripts available in `package.json`:
- `npm run dev`: Starts *Next.js* in development mode with hot module replacement, error reporting, watch mode, and more). Use it when you add new features to the project.
- `npm run build`: Creates an optimized production build in the `.next` folder.
- `npm start`: After building, use this to starts a Next.js server in production mode.
- `npm run font`: Generate the font subset from a list of character. Automatically called by the `build` and `build-static`tasks.
- `npm run build-static`: Creates a statically generated production build in the `out` folder.

----

## Install

### 1. Prerequisite

(packages that need to be installed globally)
- `node` (11.9.0)
- `npm` (6.7.0)

### 2. Install the project

1. `git clone https://github.com/aurelienkochalski/portfolio.git` (clone this repository)
2. `cd portfolio` (change to the freshly created folder)
3. `npm install` (to install all project dependencies)

### 3. Configure the database
1. Create a mongodb database called `portfolio` and change the corresponding values in `config.js`
2. Create the following collections: `infos`, `projects`, `skills`, `contacts`. 
3. Add some data.
> TODO : Add a dummy data dump to the project.

### 4. Start development server
- `npm run dev`

----

## Useful documentation

- [Next.js](https://nextjs.org/docs) - Next.js documentation
- [React](https://fr.reactjs.org/docs/getting-started.html) - React documentation
- [TailwindCSS](https://tailwindcss.com/docs/installation) - Tailwind documentation
- [prop-types](https://www.npmjs.com/package/prop-types) - Documentation for component props validation
