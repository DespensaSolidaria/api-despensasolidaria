function formatDocument(document: string): string {
  return document.trim().replace(/\.|-|\//gm, "");
}

function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}

export { formatDocument, formatEmail };
