export
function retrieveImageFromClipboardAsBlob (pasteEvent:ClipboardEvent) {
  const items:any[] = [];
  if(!pasteEvent.clipboardData) return items;

  let rawItems = pasteEvent.clipboardData.items;
  if(!rawItems || ! rawItems.length) return items;

  for (let i = 0, len = rawItems.length; i < len; i++) {
    const item = rawItems[i];
    if(!item.type.includes("image")) continue;
    items.push(item.getAsFile())
  }
  return items;
}
