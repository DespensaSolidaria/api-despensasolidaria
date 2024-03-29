function formatDocument(document: string): string {
  return document
    .replace(/\.|-|\//gm, "")
    .replace(/\s/g, "")
    .trim();
}

function formatCEP(cep: string): string {
  return cep
    .replace(/\.|-|\//gm, "")
    .replace(/\s/g, "")
    .trim();
}

function formatEmail(email: string): string {
  return email.replace(/\s/g, "").toLowerCase().trim();
}

export { formatDocument, formatCEP, formatEmail };
