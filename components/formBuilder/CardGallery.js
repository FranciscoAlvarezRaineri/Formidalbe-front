import { createElement } from "react";
import {
  generateElementComponentsFromSchemas,
  countElementsFromSchema,
  addCardObj,
  addSectionObj,
} from "./utils";
import Card from "./Card";
import Section from "./Section";
import Add from "./Add";
import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs";

export default function CardGallery(_ref) {
  var definitionSchema = _ref.definitionSchema,
    definitionUiSchema = _ref.definitionUiSchema,
    _onChange = _ref.onChange,
    mods = _ref.mods,
    categoryHash = _ref.categoryHash;
  var elementNum = countElementsFromSchema({
    properties: definitionSchema,
  });
  var defaultCollapseStates = [].concat(Array(elementNum)).map(function () {
    return false;
  });
  var _React$useState = React__default["default"].useState(
      defaultCollapseStates
    ),
    cardOpenArray = _React$useState[0],
    setCardOpenArray = _React$useState[1];
  var allFormInputs = Object.assign(
    {},
    DEFAULT_FORM_INPUTS,
    (mods && mods.customFormInputs) || {}
  );
  var componentArr = generateElementComponentsFromSchemas({
    schemaData: {
      properties: definitionSchema,
    },
    uiSchemaData: definitionUiSchema,
    onChange: function onChange(newDefinitions, newDefinitionUis) {
      var oldUi = newDefinitionUis;
      var newUi = {};
      Object.keys(oldUi).forEach(function (definedUi) {
        if (!["definitions", "ui:order"].includes(definedUi))
          newUi[definedUi] = oldUi[definedUi];
      });
      _onChange(newDefinitions.properties, newUi);
    },
    path: "definitions",
    definitionData: definitionSchema,
    definitionUi: definitionUiSchema,
    cardOpenArray: cardOpenArray,
    setCardOpenArray: setCardOpenArray,
    allFormInputs: allFormInputs,
    mods: mods,
    categoryHash: categoryHash,
    Card: Card,
    Section: Section,
  }).map(function (element) {
    return createElement(
      "div",
      {
        key: typeof element.key === "string" ? element.key : "",
        className: "form_gallery_container",
      },
      element
    );
  });
  return createElement(
    "div",
    {
      className: "form_gallery",
    },
    componentArr,
    componentArr.length === 0 &&
      createElement("h5", null, 'No components in "definitions"'),
    createElement(
      "div",
      {
        className: "form_footer",
      },
      createElement(Add, {
        tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
        addElem: function addElem(choice) {
          if (choice === "card") {
            addCardObj({
              schema: {
                properties: definitionSchema,
              },
              uischema: definitionUiSchema,
              mods: mods,
              onChange: function onChange(newDefinitions, newDefinitionUis) {
                var oldUi = newDefinitionUis;
                var newUi = {};
                Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
                  if (!["definitions", "ui:order"].includes(definedUiSchemaKey))
                    newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
                });
                _onChange(newDefinitions.properties, newUi);
              },
              definitionData: definitionSchema,
              definitionUi: definitionUiSchema,
              categoryHash: categoryHash,
            });
          } else if (choice === "section") {
            addSectionObj({
              schema: {
                properties: definitionSchema,
              },
              uischema: definitionUiSchema,
              onChange: function onChange(newDefinitions, newDefinitionUis) {
                var oldUi = newDefinitionUis;
                var newUi = {};
                Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
                  if (!["definitions", "ui:order"].includes(definedUiSchemaKey))
                    newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
                });
                _onChange(newDefinitions.properties, newUi);
              },
              definitionData: definitionSchema,
              definitionUi: definitionUiSchema,
              categoryHash: categoryHash,
            });
          }
        },
        hidden:
          !!definitionSchema && Object.keys(definitionSchema).length !== 0,
      })
    )
  );
}
