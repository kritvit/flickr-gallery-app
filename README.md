# Flickr Gallery App

This repository contains an image gallery demo using the [Flickr Photo Search API](https://www.flickr.com/services/api/flickr.photos.search.html).

## Info

This project is built using [Vite](https://vitejs.dev/), [Express](https://expressjs.com/), [JavaScript](https://tc39.es/) compiled with [Babel](https://babeljs.io/) via [Vite Legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy) and [SASS](https://sass-lang.com/). The code is validated using [ESLint](https://eslint.org/) for [JavaScript](https://tc39.es/) and [Stylelint](https://stylelint.io/) for [SASS](https://sass-lang.com/).

Accessibility is validated using [WebAIM Wave](https://wave.webaim.org/). Contrast when setting up color palette using [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

## Setup

To set up the project you need to

* Install 
* Add API Key
* Start Vite and Express

### Install

```
$ npm install
```

### Add API Key

If you don't hav an API key, visit [Flickr](https://www.flickr.com/services/apps/create/apply) for more information.

To add the Flicker Search API key, copy the file "example.env" and rename it to ".env" and then add your Flickr Search API Key

```
FLICKR_API_KEY="{KEY}"
```

### Start Vite and Express

Available scripts to run

#### Development

This script will start [Vite](https://vitejs.dev/) dev server and [Express](https://expressjs.com/) dev server

```
$ npm run dev
```

#### Preview Project

This script will build a dist folder using [Rollup](https://rollupjs.org/) and start [Express](https://expressjs.com/) dev server

```
$ npm run preview
```

#### Build Project
This script will build a dist folder using [Rollup](https://rollupjs.org/)

```
$ npm run build
```

## View the project

The URL for viewing the project will be displayed in the terminal

```
Local: http://localhost:3000/
```
