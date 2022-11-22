import _extends from "./_extends";
import generateElementPropsFromSchemas from "./generateElementPropsFromSchemas";
import getIdFromElementsBlock from "./getIdFromElementsBlock";
import updateSchemas from "./updateSchemas";

const DEFAULT_INPUT_NAME = "Nuevo Elemento ";

function getNewElementDefaultDataOptions(i, mods) {
  if (mods && mods.newElementDefaultDataOptions !== undefined) {
    const title = `${mods.newElementDefaultDataOptions.title} ${i}`;
    return _extends({}, mods.newElementDefaultDataOptions, {
      title: title,
    });
  } else {
    return {
      title: `New Input ${i}`,
      type: "string",
      default: "",
    };
  }
}

// given an initial schema, update with a new card appended
export default function addCardObj(parameters) {
  const {
    schema,
    uischema,
    mods,
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
  const dataOptions = getNewElementDefaultDataOptions(i, mods);
  const newElement = {
    name: `${DEFAULT_INPUT_NAME}${i}`,
    required: false,
    dataOptions: dataOptions,
    uiOptions: (mods && mods.newElementDefaultUiSchema) || {},
    propType: "card",
    schema: {},
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
