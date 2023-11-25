function validateDate(dateString: string): boolean {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateString);
}

export { validateDate };
