# Portfolio

## Description

This portfolio project is a way to briefly introduce myself, talk about my personal and professional skills, showcase some of the last projects I worked on, and ultimately challenge myself on some technologies and good practices.

I would love to know your thoughts about this project and get your valuables feedbacks, so I made this code available on GitHub.
Feel free to contact me if you would like to know more.

![preview](https://raw.githubusercontent.com/aurelienkochalski/portfolio/dev/public/images/preview.jpg)

## Stack

This project is a Single Page Application developed with `Next.js`, which is a `React` framework including features like:

- static & server rendering
- route pre-fetching
- built-in CSS Modules support
- `Webpack` and `Babel` configuration
- and more tools that helps create fast and optimized pages without compromising _SEO_.

For styling, I use `SASS` and `TailwindCSS`, an utility-first CSS framework which is:

- component-friendly
- mobile-first
- designed to be customized
- it provides low-level and non-opinionated utility classes
- it has a purge option to tree-shake unused styles and optimize the build size

On top of that, the postcss `autoprefixer` will generate the necessary vendor prefixes to ensure the best browser support.

The linter `eslint` and the code formatter `prettier` are used to ensure code quality and coding style.

This project also implements _web font generation from SVG icons_ and _custom font subsetting_ in order to optimize loading time.

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
├── config.js
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
├── dummy-data.json
└── _sources/
```

Description of the main files and folders:

- `components/`: Contains all components with sometime its CSS module file.
- `pages/`: Contains the pages of the websites. When a file is added to this directory it's automatically available as a route.
- `pages/index.js`: Default entry point. It's the main page, accessible at `/`.
- `pages/_app.js`: Top-level component that wraps the outside of each page. Useful for integrating global styles and librairies.
- `middleware/`: Set of functions for connecting to the DB and retrieving data.
- `styles/`: Global styles, also contains globally defined elements like _typography_, _variables_.
- `public/`: Contains all publically available assets like _images_, _videos_, _fonts_, _favicon_, etc... _Next.js_ static file serving will conveniently map this folder to `/`.
- `utils/`: Contains a set of useful tools like _fontOptimizer_, _scrollRestoration_, string manipulation functions and _translation_ utilities.
- `config.js`: Centralize variables that need to be accessed globally.
- `next.config.js`: Mainly used to override the default _WebPack_ configuration (e.g. Font generated from SVG icons)
- `postcss.config.js`: To configure _postcss_ plugin.
- `tailwind.config.js`: To configure _TailwindCSS_, extends its functionnality and define the purge methodology.
- `dummy-data.json`: This file could be used to understand the data structure or to create a dummy dataset for testing purposes.
- `_sources/font_custom/`: Contains the source font (.ttf files) that will be subsetted at build for an optimal loading time.
- `_sources/font_svg/`: Contains source SVG icons that will be combined and optimized into a convenient font.

## Dependencies

Main dependencies :

- `next`, `react`, `react-dom`: The core of _Next.js_ and _React_.
- `mongodb`, `isomorphic-unfetch`: The database and its tools (fetch polyfill).
- `prop-types`: Necessary for component props validation.
- `aos`, `react-transition-group`: Animation tools (_aos_ stands for AppearOnScroll).
- `classnames`: Simple utility for conditionally joining classNames together.
- `react-tooltip`: React component to create dynamic tooltip on hover.

Development dependencies :

- `sass`, `tailwindcss`: We use _SASS_ and the CSS utility-first framework _TailwindCSS_.
- `prettier` : To ensure code formatting in a consistent way.
- `eslint`, `eslint-plugin-react`, `eslint-plugin-tailwind`, `eslint-plugin-prettier` : The famous linter and it's plugins, to ensure code quality.
- `fontmin`, `iconfont-plugin-webpack`: Respectively used for subsetting a font and generating a web font from SVGs
- `postcss-preset-env`: Transforms CSS to increase readibility and for better compatibility (e.g. Adding vendor prefixes, determining needed polyfills)

Global tools :

- `imagemagick` is used in bash to optimize projects images.
- `ffmpeg` is used in bash to optimize projects videos.

## Tasks

Description of the npm scripts available in `package.json`:

- `npm run dev`: Starts _Next.js_ in development mode with hot module replacement, error reporting, watch mode, and more). Use it when you add new features to the project.
- `npm run build-static`: Creates an optimized production build in the `.next` folder and generate a static production build in the `out` folder. This tasks will automatically remove old assets with `clean` and rebuild them with `build-assets` in order to bundle up-to-date assets.
- `npm run clean`: Remove all generated assets (images, videos, fonts), useful for a full rebuild.
- `npm run build-assets`: Run every assets generation tasks (see below).
- `npm run font`: Generate the font subset from a list of character.
- `npm run optim-projects`: Generates optimized versions of projects images, videos and previews found in the `_sources/projects/` directory. (See the next section for detailed explanation)

## Other tasks

- `optim-projects-images` loop through projects images (.jpg and .png) to reduce filesize by resizing to a defined width and by applying compression. (And it's a very similar operation for `optim-projects-preview`)

```bash
magick convert # ImageMagick is the tool choosed to manipulate images
    -resize '1000x>' # Resize the file to 1000px width max, don't upscale if file is smaller
    -quality 80  # Set jpg quality compression
    -set filename:f '%t' # Keep a reference to the current iterated filename
    ./_sources/projects/images/*.* # Loop through the source files
    ./public/images/projects/'%[filename:f]'.jpg # Output file
```

- `optim-projects-videos` loop through projects videos (.mov) to reduce filesize by resizing to a defined width and by applying h264 mp4 compression.

```bash
for i in ./_sources/projects/videos/*.mov; do # Loop through the source files
    ffmpeg # FFmpeg is the tool choosed to manipulate videos
    -y # Force overwrite if file already exists
    -i $i # Input file
    -an # Remove the audio track
    -vcodec h264 -acodec mp2 # The output codec
    -vf "scale=min'(800,iw)':-2" # Resize the file to 800px width max, don't upscale if file is smaller, -2 force width and height to be a multiple of 2 (as requested by the codec)
    ./public/videos/$(basename ${i%.*}).mp4; # Output file (strip the directory with basename and strip the extension with %.* parameter expansion)
done
```

- `optim-projects-videos-previews` loop through the optimized projects videos (.mp4) to export only the first frame in jpg. It's useful to generate the HTML5 video poster attribute.

```bash
for i in ./public/videos/*.mp4; do # Loop through the already optimized video files
    ffmpeg # FFmpeg is the tool choosed to manipulate videos
    -y # Force overwrite if file already exists
    -i $i # Input file
    -frames:v 1 # Export only the first frame
    -f image2 # jpg export format
    ./public/images/projects/$(basename ${i%.*})-preview.jpg; # Output file (strip the directory with basename and strip the extension with %.* parameter expansion), add -preview suffix
done
```

---

## Install

### 1. Prerequisite

(packages that need to be installed globally)

- `node` (11.9.0)
- `npm` (6.7.0)

### 2. Install the project

1. `git clone https://github.com/aurelienkochalski/portfolio.git` (clone this repository)
2. `cd portfolio` (change to the freshly created folder)
3. `npm install` (to install all project dependencies)
4. Create the folder `_sources/font_svg/` at the root and put at least one SVG inside in order to generate a font.

### 3. Configure the database

1. Create a mongodb database called `portfolio` and change the corresponding values in `config.js`
2. Create the following collections: `infos`, `projects`, `skills`, `contacts`.
3. Add some data to these collections by using the `dummy-data.json` or by creating your own dataset.

### 4. Start development server

- `npm run dev`

---

## Deploy (a static build)

### 1. Build the project

- `npm run build-static`

### 2. Deploy

- Deploy the generated `out` folder using FTP

---

## Useful documentation

- [Next.js](https://nextjs.org/docs) - Next.js documentation
- [React](https://fr.reactjs.org/docs/getting-started.html) - React documentation
- [TailwindCSS](https://tailwindcss.com/docs/installation) - Tailwind documentation
- [prop-types](https://www.npmjs.com/package/prop-types) - Documentation for component props validation
