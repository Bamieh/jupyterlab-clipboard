# jupyterlab Clipboard

Paste images from clipboard into your notebook. [find it on npm](https://www.npmjs.com/package/jupyterlab-clipboard).


What it does on pasting clipboard images:
1. prompts user for path to save image as, defaulting in `${cwd}/untitled.png`.
2. saves image on confirmation.
2. links image as markdown in the cell.

Current Limitations:
- inserts markdown image tag for all kinds of cells, it should only do so with markdown for now at least.
- assumes png image type (super easy fix to accommodate all browser types)
- the save as needs a small preview image
- listens to paste event only
- not sure about browser support.
- does not warn on file overwrite

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab-clipboard
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```
