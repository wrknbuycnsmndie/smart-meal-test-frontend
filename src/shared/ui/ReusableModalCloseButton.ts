export const closeDialog = (id: string): void => {
  const dialog = document.getElementById(id);
  if (dialog instanceof HTMLDialogElement) {
    dialog.close();
  }
};
