import { useMemo, useEffect, createElement } from "react";
import CardGallery from "./CardGallery";
import {
  parse,
  stringify,
  propagateDefinitionChanges,
  generateCategoryHash,
  excludeKeys,
} from "./utils";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs";

export default function PredefinedGallery(_ref) {
  var schema = _ref.schema,
    uischema = _ref.uischema,
    _onChange = _ref.onChange,
    mods = _ref.mods;
  var schemaData = useMemo(
    function () {
      return parse(schema) || {};
    },
    [schema]
  );
  var uiSchemaData = useMemo(
    function () {
      return parse(uischema) || {};
    },
    [uischema]
  );
  var allFormInputs = excludeKeys(
    Object.assign(
      {},
      DEFAULT_FORM_INPUTS,
      (mods && mods.customFormInputs) || {}
    ),
    mods && mods.deactivatedFormInputs
  );
  var categoryHash = generateCategoryHash(allFormInputs);
  useEffect(
    function () {
      if (!uiSchemaData.definitions) {
        // eslint-disable-next-line no-console
        console.log("Parsing UI schema to assign UI for definitions");
        // need to create definitions from scratch
        var references = [];
        // recursively search for all $refs in the schemaData
        var findRefs = function findRefs(name, schemaObject) {
          if (!schemaObject) return;
          if (typeof schemaObject === "object")
            Object.keys(schemaObject).forEach(function (key) {
              if (typeof key === "string") {
                if (key === "$ref") references.push(name);
                findRefs(key, schemaObject[key]);
              }
            });
          if (Array.isArray(schemaObject))
            schemaObject.forEach(function (innerObj) {
              findRefs(name, innerObj);
            });
        };
        findRefs("root", schemaData);
        uiSchemaData.definitions = {};
        var referenceSet = new Set(references);
        Object.keys(uiSchemaData).forEach(function (uiProp) {
          if (referenceSet.has(uiProp))
            uiSchemaData.definitions[uiProp] = uiSchemaData[uiProp];
        });
        if (!Object.keys(uiSchemaData.definitions).length) {
          uiSchemaData.definitions = undefined;
        }
        _onChange(stringify(schemaData), stringify(uiSchemaData));
      }
    },
    [uiSchemaData, schemaData, _onChange]
  );
  return /*#__PURE__*/ createElement(
    "div",
    null,
    /*#__PURE__*/ createElement(CardGallery, {
      definitionSchema: schemaData.definitions || {},
      definitionUiSchema: uiSchemaData.definitions || {},
      onChange: function onChange(newDefinitions, newDefinitionsUi) {
        // propagate changes in ui definitions to all relavant parties in main schema

        propagateDefinitionChanges(
          { ...schemaData, definitions: newDefinitions },
          { ...uiSchemaData, definitions: newDefinitionsUi },
          (newSchema, newUiSchema) =>
            onChange(stringify(newSchema), stringify(newUiSchema)),
          categoryHash
        );
      },
      mods: mods,
      categoryHash: categoryHash,
    })
  );
}
