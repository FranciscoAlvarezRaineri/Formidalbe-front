import generateElementPropsFromSchemas from "./generateElementPropsFromSchemas";
import updateSchemas from "./updateSchemas";

// function called when drag and drop ends
export default function onDragEnd(result, details) {
  const {
    schema,
    uischema,
    onChange,
    definitionData,
    definitionUi,
    categoryHash,
  } = details;
  const src = result.source.index;
  const dest = result.destination.index;
  const newElementObjArr = generateElementPropsFromSchemas({
    schema,
    uischema,
    definitionData,
    definitionUi,
    categoryHash,
  });
  const tempBlock = newElementObjArr[src];
  newElementObjArr[src] = newElementObjArr[dest];
  newElementObjArr[dest] = tempBlock;
  updateSchemas(newElementObjArr, {
    schema,
    uischema,
    definitionData: definitionData || {},
    definitionUi: definitionUi || {},
    onChange,
  });
}
