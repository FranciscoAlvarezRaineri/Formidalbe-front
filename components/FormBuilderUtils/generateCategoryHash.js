export default function generateCategoryHash(allFormInputs) {
  const categoryHash = {};
  Object.keys(allFormInputs).forEach((categoryName) => {
    const formInput = allFormInputs[categoryName];
    formInput.matchIf.forEach((match) => {
      match.types.forEach((type) => {
        const hash = `type:${type === "null" ? "" : type};widget:${
          match.widget || ""
        };field:${match.field || ""};format:${match.format || ""};$ref:${
          match.$ref ? "true" : "false"
        };enum:${match.enum ? "true" : "false"}`;
        if (categoryHash[hash]) {
          throw new Error(`Duplicate hash: ${hash}`);
        }
        categoryHash[hash] = categoryName;
      });
    });
  });
  return categoryHash;
}
