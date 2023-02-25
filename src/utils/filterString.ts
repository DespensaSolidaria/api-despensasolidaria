function filterString(text: string): string {
  const a = "àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
      // .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[\s\W-]+/g, " ")
      .trim()
      .toUpperCase()
  );
  // Replace spaces, non-word characters and dashes with a single dash (-)
}

export { filterString };
