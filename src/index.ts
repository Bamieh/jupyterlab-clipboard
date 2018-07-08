import {
  JupyterLab,
  JupyterLabPlugin,
} from '@jupyterlab/application';

import {
  IFileBrowserFactory
} from '@jupyterlab/filebrowser';

import { INotebookTracker } from '@jupyterlab/notebook';


import {
  retrieveImageFromClipboardAsBlob,
} from './clipboard'

import {
  imageEditor,
} from './image-editor'

import {
  openPasteAsDialog
} from './dialogs';



const plugin: JupyterLabPlugin<void> = {
  id: 'jupyterlab-clipboard',
  requires: [
    IFileBrowserFactory,
    INotebookTracker,
  ],
  autoStart: true,
  activate: activateJupyterlabClipboard,
};

export default plugin;

import {
  PathExt,
} from '@jupyterlab/coreutils';

function activateJupyterlabClipboard(
  app: JupyterLab,
  browserFactory: IFileBrowserFactory,
  notebooks: INotebookTracker,
) {
  const browser = browserFactory.defaultBrowser;

  const {
    saveImageAs,
    insertInCell,
    createMarkdownImageTag,
  } = imageEditor(app, notebooks);

  window.addEventListener("paste", async function(e: ClipboardEvent) {
    const images = retrieveImageFromClipboardAsBlob(e);
    const cwd = browser.model.path;
    const defaultPath = PathExt.resolve(cwd, "untitled.png");
    const path = await openPasteAsDialog(defaultPath)
    if(!path) return;

    await saveImageAs(cwd, path, images[0]);
    const relativePath = PathExt.relative(cwd, path);
    const content = createMarkdownImageTag(relativePath)
    insertInCell(content);
  }, false);
}

