// check for unsupported feature in schema and uischema
const supportedPropertyParameters = new Set([
  "title",
  "description",
  "enum",
  "minLength",
  "maxLength",
  "multipleOf",
  "minimum",
  "maximum",
  "format",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "type",
  "default",
  "pattern",
  "required",
  "properties",
  "items",
  "definitions",
  "$ref",
  "minItems",
  "maxItems",
  "enumNames",
  "dependencies",
  "$id",
  "$schema",
  "meta",
  "additionalProperties",
]);
const supportedUiParameters = new Set([
  "ui:order",
  "ui:widget",
  "ui:autofocus",
  "ui:autocomplete",
  "ui:options",
  "ui:field",
  "ui:placeholder",
  "ui:column",
  "items",
  "definitions",
]);

// recursively called function to check an object for unsupported features
function checkObjectForUnsupportedFeatures(
  schema,
  uischema,
  supportedWidgets,
  supportedFields,
  supportedOptions
) {
  // add each unsupported feature to this array
  const unsupportedFeatures = [];

  // check for unsupported whole object features
  if (schema && typeof schema === "object")
    Object.keys(schema).forEach((property) => {
      if (
        !supportedPropertyParameters.has(property) &&
        property !== "properties"
      )
        unsupportedFeatures.push(`Unrecognized Object Property: ${property}`);
    });
  if (uischema && typeof uischema === "object")
    Object.keys(uischema).forEach((uiProperty) => {
      let propDefined = false;
      // search for the property in the schema properties and dependencies
      if (
        schema.properties &&
        Object.keys(schema.properties).includes(uiProperty)
      )
        propDefined = true;
      if (schema.dependencies) {
        Object.keys(schema.dependencies).forEach((dependencyKey) => {
          Object.keys(schema.dependencies[dependencyKey]).forEach(
            (parameter) => {
              if (parameter === "oneOf") {
                schema.dependencies[dependencyKey].oneOf.forEach((grouping) => {
                  if (grouping.properties)
                    if (Object.keys(grouping.properties).includes(uiProperty))
                      propDefined = true;
                });
              } else if (parameter === "properties") {
                if (
                  Object.keys(
                    schema.dependencies[dependencyKey].properties
                  ).includes(uiProperty)
                )
                  propDefined = true;
              }
            }
          );
        });
      }
      if (!propDefined && !supportedUiParameters.has(uiProperty))
        unsupportedFeatures.push(
          `Unrecognized UI schema property: ${uiProperty}`
        );
    });

  // check for unsupported property parameters
  if (schema.properties)
    Object.entries(schema.properties).forEach(([parameter, element]) => {
      if (
        element &&
        typeof element === "object" &&
        element.type &&
        element.type !== "object"
      ) {
        // make sure that the type is valid
        if (
          !["array", "string", "integer", "number", "boolean"].includes(
            element.type
          )
        )
          unsupportedFeatures.push(
            `Unrecognized type: ${element.type} in ${parameter}`
          );
        // check the properties of each property if it is a basic object
        Object.keys(element).forEach((key) => {
          if (!supportedPropertyParameters.has(key))
            unsupportedFeatures.push(
              `Property Parameter: ${key} in ${parameter}`
            );
        });
      } else {
        // check the properties of each property if it is a basic object
        Object.keys(element).forEach((key) => {
          if (!supportedPropertyParameters.has(key))
            unsupportedFeatures.push(
              `Property Parameter: ${key} in ${parameter}`
            );
        });
      }

      // check for unsupported UI components
      if (
        uischema &&
        uischema[parameter] &&
        element &&
        (!element.type || element.type !== "object")
      ) {
        // check for unsupported ui properties
        Object.keys(uischema[parameter]).forEach((uiProp) => {
          if (!supportedUiParameters.has(uiProp))
            unsupportedFeatures.push(`UI Property: ${uiProp} for ${parameter}`);

          // check for unsupported ui widgets
          if (
            uiProp === "ui:widget" &&
            !supportedWidgets.has(uischema[parameter][uiProp])
          ) {
            unsupportedFeatures.push(
              `UI Widget: ${uischema[parameter][uiProp]} for ${parameter}`
            );
          }

          // check for unsupported ui fields
          if (
            uiProp === "ui:field" &&
            !supportedFields.has(uischema[parameter][uiProp])
          )
            unsupportedFeatures.push(
              `UI Field: ${uischema[parameter][uiProp]} for ${parameter}`
            );

          // check unsupported ui option
          if (uiProp === "ui:options")
            Object.keys(uischema[parameter]["ui:options"]).forEach(
              (uiOption) => {
                if (!supportedOptions.has(uiOption))
                  unsupportedFeatures.push(
                    `UI Property: ui:options.${uiOption} for ${parameter}`
                  );
              }
            );
        });
      }
    });
  return unsupportedFeatures;
}

// parent function that checks for unsupported features in an entire document
export default function checkForUnsupportedFeatures(
  schema,
  uischema,
  allFormInputs
) {
  // add each unsupported feature to this array
  const unsupportedFeatures = [];
  const widgets = [];
  const fields = [];
  const options = [];
  Object.keys(allFormInputs).forEach((inputType) => {
    allFormInputs[inputType].matchIf.forEach((match) => {
      if (match.widget && !widgets.includes(match.widget))
        widgets.push(match.widget || ""); // || '' is redundant but here to appease flow
      if (match.field && !fields.includes(match.field))
        fields.push(match.field || ""); // || '' is redundant but here to appease flow
    });

    if (
      allFormInputs[inputType].possibleOptions &&
      Array.isArray(allFormInputs[inputType].possibleOptions)
    ) {
      options.push(...allFormInputs[inputType].possibleOptions);
    }
  });
  const supportedWidgets = new Set(widgets);
  const supportedFields = new Set(fields);
  const supportedOptions = new Set(options);

  // check for unsupported whole form features
  if (schema && typeof schema === "object" && schema.type === "object") {
    unsupportedFeatures.push(
      ...checkObjectForUnsupportedFeatures(
        schema,
        uischema,
        supportedWidgets,
        supportedFields,
        supportedOptions
      )
    );
  } else {
    unsupportedFeatures.push("jsonSchema form is not of type object");
  }
  return unsupportedFeatures;
}
