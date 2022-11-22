const DEFAULT_INPUT_NAME = "Nuevo Elemento ";

// ensure that each added block has a unique name
export default function getIdFromElementsBlock(elements) {
  const names = elements.map((element) => element.name);
  const defaultNameLength = DEFAULT_INPUT_NAME.length;
  return names.length > 0
    ? Math.max(
        ...names.map((name) => {
          if (name.startsWith(DEFAULT_INPUT_NAME)) {
            const index = name.substring(defaultNameLength, name.length);
            const value = Number.parseInt(index);
            if (!isNaN(value)) {
              return value;
            }
          }
          return 0;
        })
      ) + 1
    : 1;
}
