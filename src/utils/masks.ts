function maskCPFCNPJ(document: string): string {
  if (document.length <= 11)
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "***.$2.$3-**");
  return document.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
}

function maskCardNumber(cardNumber: string): string {
  return cardNumber.replace(/(\d{4})(\d{8})(\d{4})/g, "XXXX XXXX XXXX $3");
}

export { maskCPFCNPJ, maskCardNumber };
