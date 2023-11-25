function updateEntrance(originalValue: any, newValue: any): any {
  const returned =
    newValue === null || newValue === undefined ? originalValue : newValue;
  return returned;
}

export { updateEntrance };
