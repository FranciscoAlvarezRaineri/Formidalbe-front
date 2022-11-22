import _extends from "./_extends";

// determines a card's category based on it's properties
// mostly useful for reading a schema for the first time
function getCardCategory(cardProps, categoryHash) {
  const currentHash = `type:${cardProps.dataOptions.type || ""};widget:${
    cardProps.uiOptions["ui:widget"] || ""
  };field:${cardProps.uiOptions["ui:field"] || ""};format:${
    cardProps.dataOptions.format || ""
  };$ref:${cardProps.$ref !== undefined ? "true" : "false"};enum:${
    cardProps.dataOptions.enum ? "true" : "false"
  }`;
  const category = categoryHash[currentHash];
  if (!category) {
    if (cardProps.$ref) return "ref";
    // eslint-disable-next-line no-console
    console.error(`No match for card': ${currentHash} among set`);
    return "shortAnswer";
  }
  return category;
}

// make an element out of the corresponding properties and UI properties
function generateDependencyElement(
  name,
  dataProps,
  uiProperties,
  requiredNames,
  definitionData,
  definitionUi,
  categoryHash,
  useDefinitionDetails = true // determines whether to use an element's definition details or not.
) {
  let uiProps = _extends({}, uiProperties);
  const newElement = {};
  let elementDetails =
    dataProps && typeof dataProps === "object" ? dataProps : {};

  // populate newElement with reference if applicable
  if (elementDetails.$ref !== undefined && definitionData) {
    const pathArr =
      typeof elementDetails.$ref === "string"
        ? elementDetails.$ref.split("/")
        : [];
    if (
      pathArr[0] === "#" &&
      pathArr[1] === "definitions" &&
      definitionData[pathArr[2]] &&
      useDefinitionDetails === true
    ) {
      elementDetails = _extends({}, elementDetails, definitionData[pathArr[2]]);
    }
    const definedUiProps = (definitionUi || {})[pathArr[2]];
    uiProps = _extends({}, definedUiProps || {}, uiProps);
  }
  newElement.name = name;
  newElement.required = requiredNames.includes(name);
  newElement.$ref =
    typeof elementDetails.$ref === "string" ? elementDetails.$ref : undefined;
  if (elementDetails.type && elementDetails.type === "object") {
    // create a section
    newElement.schema = elementDetails;
    newElement.uischema = uiProps || {};
    newElement.propType = "section";
  } else {
    // create a card
    newElement.dataOptions = elementDetails;
    newElement.uiOptions = uiProps || {};

    // ensure that uiOptions does not have duplicate keys with dataOptions
    const reservedKeys = Object.keys(newElement.dataOptions);
    Object.keys(newElement.uiOptions).forEach((uiKey) => {
      if (reservedKeys.includes(uiKey)) {
        newElement.uiOptions[`ui:*${uiKey}`] = newElement.uiOptions[uiKey];
      }
    });
    newElement.dataOptions.category = getCardCategory(newElement, categoryHash);
    newElement.propType = "card";
  }
  return newElement;
}

function updateElementNames(elementArray) {
  const elementNames = elementArray.map((elem) => elem.name);
  return elementArray.map((elem) => {
    const newElem = elem;
    newElem.neighborNames = elementNames;
    return newElem;
  });
}

// generate an array of element objects from a schema and uischema
export default function generateElementPropsFromSchemas(parameters) {
  const { schema, uischema, definitionData, definitionUi, categoryHash } =
    parameters;
  if (!schema.properties) return [];
  const elementDict = {};
  const requiredNames = schema.required ? schema.required : [];

  // read regular elements from properties
  Object.entries(schema.properties).forEach(([parameter, element]) => {
    const newElement = {};
    let elementDetails = element && typeof element === "object" ? element : {};

    // populate newElement with reference if applicable
    if (elementDetails.$ref !== undefined && definitionData) {
      if (
        elementDetails.$ref &&
        !elementDetails.$ref.startsWith("#/definitions")
      )
        throw new Error(
          `Invalid definition, not at '#/definitions': ${elementDetails.$ref}`
        );
      const pathArr =
        elementDetails.$ref !== undefined ? elementDetails.$ref.split("/") : [];
      if (
        pathArr[0] === "#" &&
        pathArr[1] === "definitions" &&
        definitionData[pathArr[2]]
      ) {
        elementDetails = _extends(
          {},
          definitionData[pathArr[2]],
          elementDetails
        );
      }
      const definedUiProps = (definitionUi || {})[pathArr[2]];
      uischema[parameter] = _extends(
        {},
        definedUiProps || {},
        uischema[parameter]
      );
    }
    newElement.name = parameter;
    newElement.required = requiredNames.includes(parameter);
    newElement.$ref = elementDetails.$ref;
    newElement.dataOptions = elementDetails;
    if (elementDetails.type && elementDetails.type === "object") {
      // create a section
      newElement.schema = elementDetails;
      newElement.uischema = uischema[parameter] || {};
      newElement.propType = "section";
    } else {
      // create a card
      newElement.uiOptions = uischema[parameter] || {};

      // ensure that uiOptions does not have duplicate keys with dataOptions
      const reservedKeys = Object.keys(newElement.dataOptions);
      Object.keys(newElement.uiOptions).forEach((uiKey) => {
        if (reservedKeys.includes(uiKey)) {
          newElement.uiOptions[`ui:*${uiKey}`] = newElement.uiOptions[uiKey];
        }
      });
      newElement.dataOptions.category = getCardCategory(
        newElement,
        categoryHash
      );
      newElement.propType = "card";
    }
    elementDict[newElement.name] = newElement;
  });
  // read dependent elements from dependencies
  if (schema.dependencies) {
    const useDefinitionDetails = false;
    Object.keys(schema.dependencies).forEach((parent) => {
      const group = schema.dependencies[parent];
      if (group.oneOf) {
        let possibilityIndex = 0;
        group.oneOf.forEach((possibility) => {
          if (!(elementDict[parent] || {}).dependents) {
            elementDict[parent] = elementDict[parent] || {};
            elementDict[parent].dependents = [];
          }
          elementDict[parent].dependents.push({
            children: [],
            value: possibility.properties[parent],
          });
          const requiredValues = possibility.required || [];
          Object.entries(possibility.properties).forEach(
            ([parameter, element]) => {
              // create a new element if not present in main properties
              if (
                !elementDict[parameter] ||
                (parameter !== parent &&
                  Object.keys(elementDict[parameter]).length === 1 &&
                  elementDict[parameter].dependents)
              ) {
                const newElement = generateDependencyElement(
                  parameter,
                  element,
                  uischema[parameter],
                  requiredNames,
                  definitionData,
                  definitionUi,
                  categoryHash,
                  useDefinitionDetails
                );
                if (
                  elementDict[parameter] &&
                  elementDict[parameter].dependents
                ) {
                  newElement.dependents = elementDict[parameter].dependents;
                }
                newElement.required = requiredValues.includes(newElement.name);
                elementDict[newElement.name] = newElement;
              }
              if (parameter !== parent) {
                const newElement = elementDict[parameter];
                newElement.dependent = true;
                newElement.parent = parent;
                elementDict[parent].dependents[possibilityIndex].children.push(
                  parameter
                );
              }
            }
          );
          possibilityIndex += 1;
        });
      } else if (group.properties) {
        const requiredValues = group.required || [];
        Object.entries(group.properties).forEach(([parameter, element]) => {
          const newElement = generateDependencyElement(
            parameter,
            element,
            uischema[parameter],
            requiredNames,
            definitionData,
            definitionUi,
            categoryHash,
            useDefinitionDetails
          );
          newElement.required = requiredValues.includes(newElement.name);
          newElement.dependent = true;
          newElement.parent = parent;
          elementDict[newElement.name] = newElement;
          if (elementDict[parent]) {
            if (elementDict[parent].dependents) {
              elementDict[parent].dependents[0].children.push(parameter);
            } else {
              elementDict[parent].dependents = [
                {
                  children: [parameter],
                },
              ];
            }
          } else {
            elementDict[parent] = {};
            elementDict[parent].dependents = [
              {
                children: [parameter],
              },
            ];
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.error("unsupported dependency type encountered");
      }
    });
  }

  // now reorder in accordance with ui:order if defined
  const cardPropList = [];
  if (uischema["ui:order"]) {
    // in case there are any options not in ui:order
    const remainder = [];
    Object.keys(elementDict).forEach((name) => {
      if (!uischema["ui:order"].includes(name))
        remainder.push(elementDict[name]);
    });

    // map ui order elements into the right order
    uischema["ui:order"].forEach((name) => {
      // if contains the wildcard *, insert remainder cards there
      if (name === "*") {
        remainder.forEach((remCard) => {
          cardPropList.push(remCard);
        });
      } else if (elementDict[name]) {
        cardPropList.push(elementDict[name]);
      }
    });
  } else {
    Object.keys(elementDict).forEach((name) => {
      cardPropList.push(elementDict[name]);
    });
  }
  updateElementNames(cardPropList);
  return cardPropList;
}
