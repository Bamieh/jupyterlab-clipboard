import {
  JupyterLab,
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';

import {
  Contents,
} from '@jupyterlab/services';

import {
  PathExt,
} from '@jupyterlab/coreutils';

const insertAt = (a: string, b: string, position: number) => a.substr(0, position) + b + a.substr(position);

export
const imageEditor = (app: JupyterLab, notebooks: INotebookTracker) => {
  const reader = new FileReader();

  const getContent = (blob: Blob) : Promise<string> => {
    return new Promise(resolve => {
      reader.readAsDataURL(blob)
      reader.onload = () => resolve(reader.result.replace(/^data:image\/.*?;base64,/, ''));
    })
  }

  return {
    insertInCell(content: string) {
      if(notebooks.activeCell) {
        console.log('got active cell', notebooks.activeCell);
        const {line, column} = notebooks.activeCell.editor.getCursorPosition();
        const cellContent = notebooks.activeCell.editor.model.value;
        const newContent = cellContent.text.split("\n");

        newContent[line] = insertAt(newContent[line], content, column);
        cellContent.text = newContent.join("\n");
        
        notebooks.activeCell.editor.setCursorPosition({
          line: line + content.length,
          column: column
        });

      }
    },
    createMarkdownImageTag(path: string) {
      return `![](${path})`
    },
    async saveImageAs(cwd: string, path:string, image: Blob) {
      const blobType = image.type;

      const name = PathExt.basename(path)

      const content = new Blob([image], { type: blobType });

      const model: Partial<Contents.IModel> = {
        created: new Date().toISOString(),
        format: "base64",
        last_modified: new Date().toISOString(),
        mimetype: blobType,
        name,
        path,
        type: "file",
        writable: true,
        content: await getContent(content),
      }
      console.log('app:::', app)
      await app.serviceManager.contents.save(path, model);
      return model;
    },
  }
}