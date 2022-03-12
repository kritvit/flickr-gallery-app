# Flickr Gallery App

This repository contains an image gallery demo using the [Flickr Photo Search API](https://www.flickr.com/services/api/flickr.photos.search.html).

## Info

This project is built using [Vite](https://vitejs.dev/), [Express](https://expressjs.com/), vanilla JavaScript and SASS. The code is validated using [ESLint](https://eslint.org/) for JavaScript and [Stylelint](https://stylelint.io/) for SASS.

Accessibility is validated using [WebAIM Wave](https://wave.webaim.org/). Contrast when setting up color palette using [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). The page is tabbable and can be navigatet using the keyboard.

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

to add the Flicker Search API Key, copy the file "example.env" and rename it to ".env" and then add your Flickr Search API Key

```
FLICKR_API_KEY="<your flickr api key>"
```

### Start Vite and Express

Available scripts to run

#### Development

This script will start Vite dev server and Express dev server

```
$ npm run dev
```

#### Preview Project

This script will build a dist folder using Rollup and start Express dev server

```
$ npm run preview
```

#### Build Project
This script will build a dist folder using Rollup

```
$ npm run build
```

## View the project

The URL for viewing the project will be displayed in the terminal

```
Local: http://localhost:{PORT}/
```
