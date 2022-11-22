import _extends from "./_extends";

// convert an element into a schema equivalent
function generateSchemaElementFromElement(element) {
  if (element.$ref !== undefined) {
    var _element$schema, _element$schema$requi;
    const title =
      element.schema !== undefined && element.schema.title !== undefined
        ? element.schema.title
        : element.dataOptions.title;
    const description =
      element.schema !== undefined && element.schema.description !== undefined
        ? element.schema.description
        : element.dataOptions.description;
    let returnElement = {
      $ref: element.$ref,
      title: title,
      description: description,
    };
    const length =
      element == null
        ? void 0
        : (_element$schema = element.schema) == null
        ? void 0
        : (_element$schema$requi = _element$schema.required) == null
        ? void 0
        : _element$schema$requi.length;
    if (length !== undefined && length > 0) {
      returnElement = _extends({}, returnElement, {
        required: element.schema.required,
      });
    }
    return returnElement;
  } else if (element.propType === "card") {
    if (element.dataOptions.category === "section") {
      return {
        type: "object",
      };
    } else {
      const prop = {};
      Object.keys(element.dataOptions).forEach((key) => {
        if (
          ![
            "category",
            "hideKey",
            "path",
            "definitionData",
            "definitionUi",
            "allFormInputs",
          ].includes(key) &&
          element.dataOptions[key] !== ""
        )
          prop[key] = element.dataOptions[key];
      });
      return prop;
    }
  } else if (element.propType === "section") {
    return element.schema;
  } else {
    throw new Error("Element that is neither card, section, nor ref");
  }
}

// generate a new schema from a complete array of card objects
function generateSchemaFromElementProps(elementArr) {
  if (!elementArr) return {};
  const newSchema = {};
  const props = {};
  const dependencies = {};
  const elementDict = {};
  const dependentElements = new Set([]);
  for (let index = 0; index < elementArr.length; index += 1) {
    const element = elementArr[index];
    elementDict[element.name] = _extends({}, element);
    if (element.dependents)
      element.dependents.forEach((possibility) => {
        possibility.children.forEach((dependentElement) => {
          dependentElements.add(dependentElement);
        });
      });
  }
  Object.keys(elementDict).forEach((elementName) => {
    const element = elementDict[elementName];
    if (element.dependents && element.dependents[0]) {
      if (element.dependents[0].value) {
        // handle value based case
        dependencies[elementName] = {
          oneOf: element.dependents.map((possibility) => {
            const childrenComponents = {};
            const requiredValues = [];
            possibility.children.forEach((child) => {
              if (elementDict[child]) {
                childrenComponents[child] = generateSchemaElementFromElement(
                  elementDict[child]
                );
                if (elementDict[child].required) requiredValues.push(child);
              }
            });
            return {
              properties: _extends(
                {
                  [elementName]: possibility.value,
                },
                childrenComponents
              ),
              required: requiredValues,
            };
          }),
        };
      } else {
        // handle definition based case
        const childrenComponents = {};
        const requiredValues = [];
        element.dependents[0].children.forEach((child) => {
          childrenComponents[child] = generateSchemaElementFromElement(
            elementDict[child]
          );
          if (elementDict[child].required) requiredValues.push(child);
        });
        dependencies[elementName] = {
          properties: childrenComponents,
          required: requiredValues,
        };
      }
    }
    if (!dependentElements.has(elementName))
      props[element.name] = generateSchemaElementFromElement(element);
  });
  newSchema.properties = props;
  newSchema.dependencies = dependencies;
  newSchema.required = elementArr
    .filter(({ required, dependent }) => required && !dependent)
    .map(({ name }) => name);
  return newSchema;
}
function generateUiSchemaFromElementProps(elementArr, definitionUi) {
  if (!elementArr) return {};
  const uiSchema = {};
  const uiOrder = [];
  const definitions = definitionUi;
  elementArr.forEach((element) => {
    uiOrder.push(element.name);
    if (element.$ref !== undefined) {
      // look for the reference
      const pathArr =
        typeof element.$ref === "string" ? element.$ref.split("/") : [];
      if (definitions && definitions[pathArr[2]])
        uiSchema[element.name] = definitions[pathArr[2]];
    }
    if (element.propType === "card" && element.uiOptions) {
      Object.keys(element.uiOptions).forEach((uiOption) => {
        if (!uiSchema[element.name]) uiSchema[element.name] = {};
        if (uiOption.startsWith("ui:*")) {
          uiSchema[element.name][uiOption.substring(4)] =
            element.uiOptions[uiOption];
        } else {
          uiSchema[element.name][uiOption] = element.uiOptions[uiOption];
        }
      });
    } else if (
      element.propType === "section" &&
      Object.keys(element.uischema).length > 0
    ) {
      uiSchema[element.name] = element.uischema;
    }
  });
  uiSchema["ui:order"] = uiOrder;
  return uiSchema;
}

// takes in an array of Card Objects and updates both schemas
export default function updateSchemas(elementArr, parameters) {
  const { schema, uischema, onChange, definitionUi } = parameters;
  const newSchema = Object.assign(
    _extends({}, schema),
    generateSchemaFromElementProps(elementArr)
  );
  const newUiSchema = generateUiSchemaFromElementProps(
    elementArr,
    definitionUi
  );
  if (uischema.definitions) {
    newUiSchema.definitions = uischema.definitions;
  }

  // mandate that the type is an object if not already done
  newSchema.type = "object";
  onChange(newSchema, newUiSchema);
}
