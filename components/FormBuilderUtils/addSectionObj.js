import generateElementPropsFromSchemas from "./generateElementPropsFromSchemas";
import getIdFromElementsBlock from "./getIdFromElementsBlock";
import updateSchemas from "./updateSchemas";

const DEFAULT_INPUT_NAME = "Nueva Sección ";

// given an initial schema, update with a new section appended
export default function addSectionObj(parameters) {
  const {
    schema,
    uischema,
    onChange,
    definitionData,
    definitionUi,
    index,
    categoryHash,
  } = parameters;
  const newElementObjArr = generateElementPropsFromSchemas({
    schema,
    uischema,
    definitionData,
    definitionUi,
    categoryHash,
  });
  const i = getIdFromElementsBlock(newElementObjArr);
  const newElement = {
    name: `${DEFAULT_INPUT_NAME}${i}`,
    required: false,
    dataOptions: {
      title: `Nueva Sección ${i}`,
      type: "object",
      default: "",
    },
    uiOptions: {},
    propType: "section",
    schema: {
      title: `Nueva Sección ${i}`,
      type: "object",
    },
    uischema: {},
    neighborNames: [],
  };
  if (index !== undefined && index !== null) {
    newElementObjArr.splice(index + 1, 0, newElement);
  } else {
    newElementObjArr.push(newElement);
  }
  updateSchemas(newElementObjArr, {
    schema,
    uischema,
    definitionData,
    definitionUi,
    onChange,
  });
}
