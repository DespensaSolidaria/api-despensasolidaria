function validateCPF(cpf: string): boolean {
  let sum: number;
  let resto: number;
  sum = 0;
  if (cpf === "00000000000") return false;

  for (let i = 1; i <= 9; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  resto = (sum * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  resto = (sum * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}

function validateCNPJ(cnpj: string): boolean {
  if (cnpj.length !== 14) {
    return false;
  }
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  ) {
    return false;
  }

  const validatorArray = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstValidationDivision =
    cnpj
      .substr(0, cnpj.length - 2)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;

  const firstDigit =
    firstValidationDivision < 2 ? 0 : 11 - firstValidationDivision;
  if (firstDigit !== parseInt(cnpj.charAt(12), 10)) {
    return false;
  }

  validatorArray.unshift(6);

  const secondValidationDivision =
    cnpj
      .substr(0, cnpj.length - 1)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;

  const secondDigit =
    secondValidationDivision < 2 ? 0 : 11 - secondValidationDivision;
  if (secondDigit !== parseInt(cnpj.charAt(13), 10)) {
    return false;
  }
  return true;
}

export { validateCPF, validateCNPJ };
