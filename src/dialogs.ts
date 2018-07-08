import {
  showDialog,
  Dialog,
} from '@jupyterlab/apputils';

import { Widget } from '@phosphor/widgets';

export
function openPasteAsDialog(path: string, image?: Blob) : Promise<string | null> {
  const saveBtn = Dialog.okButton({ label: 'SAVE' });
  return showDialog({
    title: 'Save Image As..',
    body: new SaveWidget(path),
    buttons: [Dialog.cancelButton(), saveBtn]
  }).then(result => result.button.label === 'SAVE' ? result.value : null)
}

// export
// const confirmOverwriteDialog = () => {

// }

class SaveWidget extends Widget {
  inputElement: HTMLElement
  constructor(path: string) {
    const inputElement = createInput(path);
    super({ node: inputElement });
    this.inputElement = inputElement
  }
  getValue(): string {
    return (this.inputElement as HTMLInputElement).value;
  }
}


function createInput(path: string): HTMLElement {
  let input = document.createElement('input');
  input.value = path;
  return input;
}