# jupyterlab Clipboard

Paste images from clipboard into your notebook.
[find it on npm](https://www.npmjs.com/package/jupyterlab-clipboard).


What it does on pasting clipboard images:
1. prompts user for path to save image as.
2. saves image on confirmation.
3. links image as markdown in the cell.


## Browser support
The most browser restrictive feature used in this extension is the clipboard. Support
table can be [found here](https://caniuse.com/#feat=clipboard)

- Chrome: 58 
- Edge: (yes)
- Firefox: 22
- IE: 11
- Opera: 45
- Safari: (yes)

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab-clipboard
```

## Development

For a development install (requires npm version 4 or later), do the following in the
repository directory:

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

### Todo
If you want to jump in and help, here is my todo list:

- [ ] detect active cell type and insert text based on that.
- [ ] Add a small preview image in the the save as dialog.


Please open an issue for taking on the development of an action item to avoid duplicating
efforts.