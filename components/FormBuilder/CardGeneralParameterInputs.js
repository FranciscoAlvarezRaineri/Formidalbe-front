import * as React from "react";
import React__default from "react";

import { Input, FormGroup, FormFeedback } from "reactstrap";

import classnames from "classnames";
import Select from "react-select";

import Example from "./Example";
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

function defaultDataProps(category, allFormInputs) {
  return allFormInputs[category].defaultDataSchema;
}

function defaultUiProps(category, allFormInputs) {
  return allFormInputs[category].defaultUiSchema;
}

function categoryType(category, allFormInputs) {
  return allFormInputs[category].type;
}

function categoryToNameMap(category, allFormInputs) {
  const categoryNameMap = {};
  Object.keys(allFormInputs).forEach((inputName) => {
    categoryNameMap[inputName] = allFormInputs[inputName].displayName;
  });
  return categoryNameMap;
}

function getCardBody(category, allFormInputs) {
  return (
    (allFormInputs[category] && allFormInputs[category].cardBody) ||
    (() => null)
  );
}

// Member-wise subtraction of array2 from array1
function subtractArray(array1, array2) {
  if (array2 === undefined || array2 === null) return array1;
  const keys = array2.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});
  return array1.filter((v) => !keys[v]);
}

// specify the inputs required for any type of object
function GeneralParameterInputs({
  category,
  parameters,
  onChange,
  mods,
  allFormInputs,
}) {
  const CardBody = getCardBody(category, allFormInputs);
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(CardBody, {
      parameters: parameters,
      onChange: onChange,
      mods: mods || {},
    })
  );
}

// specify the inputs required for any type of object
export default function CardGeneralParameterInputs({
  parameters,
  onChange,
  allFormInputs,
  mods,
  showObjectNameInput = true,
}) {
  const [keyState, setKeyState] = React__default.useState(parameters.name);
  const [keyError, setKeyError] = React__default.useState(null);
  const [titleState, setTitleState] = React__default.useState(parameters.title);
  const [descriptionState, setDescriptionState] = React__default.useState(
    parameters.description
  );
  const [elementId] = React__default.useState(getRandomId());
  const categoryMap = categoryToNameMap(parameters.category, allFormInputs);
  const fetchLabel = (labelName, defaultLabel) => {
    return mods && mods.labels && typeof mods.labels[labelName] === "string"
      ? mods.labels[labelName]
      : defaultLabel;
  };
  const objectNameLabel = fetchLabel("objectNameLabel", "Object Name");
  const displayNameLabel = fetchLabel("displayNameLabel", "Display Name");
  const descriptionLabel = fetchLabel("descriptionLabel", "Description");
  const inputTypeLabel = fetchLabel("inputTypeLabel", "Input Type");
  const availableInputTypes = () => {
    const definitionsInSchema =
      parameters.definitionData &&
      Object.keys(parameters.definitionData).length !== 0;

    // Hide the "Reference" option if there are no definitions in the schema
    let inputKeys = Object.keys(categoryMap).filter(
      (key) => key !== "ref" || definitionsInSchema
    );
    // Exclude hidden inputs based on mods
    if (mods) inputKeys = subtractArray(inputKeys, mods.deactivatedFormInputs);
    return inputKeys
      .map((key) => ({
        value: key,
        label: categoryMap[key],
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-entry-row",
      },
      showObjectNameInput &&
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "card-entry",
          },
          /*#__PURE__*/ React__default.createElement(
            "h5",
            null,
            `${objectNameLabel} `,
            /*#__PURE__*/ React__default.createElement(Example, {
              text:
                mods &&
                mods.tooltipDescriptions &&
                typeof mods.tooltipDescriptions.cardObjectName === "string"
                  ? mods.tooltipDescriptions.cardObjectName
                  : "The back-end name of the object",
              id: `${elementId}_nameinfo`,
              type: "help",
            })
          ),
          /*#__PURE__*/ React__default.createElement(
            FormGroup,
            null,
            /*#__PURE__*/ React__default.createElement(Input, {
              invalid: keyError !== null,
              value: keyState || "",
              placeholder: "Key",
              type: "text",
              onChange: (ev) => setKeyState(ev.target.value),
              onBlur: (ev) => {
                const { value } = ev.target;
                if (
                  value === parameters.name ||
                  !(
                    parameters.neighborNames &&
                    parameters.neighborNames.includes(value)
                  )
                ) {
                  setKeyError(null);
                  onChange(
                    _extends({}, parameters, {
                      name: value,
                    })
                  );
                } else {
                  setKeyState(parameters.name);
                  setKeyError(`"${value}" is already in use.`);
                  onChange(_extends({}, parameters));
                }
              },
              className: "card-text",
            }),
            /*#__PURE__*/ React__default.createElement(
              FormFeedback,
              null,
              keyError
            )
          )
        ),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: `card-entry ${
            parameters.$ref === undefined ? "" : "disabled-input"
          }`,
        },
        /*#__PURE__*/ React__default.createElement(
          "h5",
          null,
          `${displayNameLabel} `,
          /*#__PURE__*/ React__default.createElement(Example, {
            text:
              mods &&
              mods.tooltipDescriptions &&
              typeof mods.tooltipDescriptions.cardDisplayName === "string"
                ? mods.tooltipDescriptions.cardDisplayName
                : "The user-facing name of this object",
            id: `${elementId}-titleinfo`,
            type: "help",
          })
        ),
        /*#__PURE__*/ React__default.createElement(Input, {
          value: titleState || "",
          placeholder: "Title",
          type: "text",
          onChange: (ev) => setTitleState(ev.target.value),
          onBlur: (ev) => {
            onChange(
              _extends({}, parameters, {
                title: ev.target.value,
              })
            );
          },
          className: "card-text",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-entry-row",
      },
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: `card-entry ${parameters.$ref ? "disabled-input" : ""}`,
        },
        /*#__PURE__*/ React__default.createElement(
          "h5",
          null,
          `${descriptionLabel} `,
          /*#__PURE__*/ React__default.createElement(Example, {
            text:
              mods &&
              mods.tooltipDescriptions &&
              typeof mods.tooltipDescriptions.cardDescription === "string"
                ? mods.tooltipDescriptions.cardDescription
                : "This will appear as help text on the form",
            id: `${elementId}-descriptioninfo`,
            type: "help",
          })
        ),
        /*#__PURE__*/ React__default.createElement(
          FormGroup,
          null,
          /*#__PURE__*/ React__default.createElement(Input, {
            value: descriptionState || "",
            placeholder: "Description",
            type: "text",
            onChange: (ev) => setDescriptionState(ev.target.value),
            onBlur: (ev) => {
              onChange(
                _extends({}, parameters, {
                  description: ev.target.value,
                })
              );
            },
            className: "card-text",
          })
        )
      ),
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: classnames("card-entry", {
            "wide-card-entry": !showObjectNameInput,
          }),
        },
        /*#__PURE__*/ React__default.createElement(
          "h5",
          null,
          `${inputTypeLabel} `,
          /*#__PURE__*/ React__default.createElement(Example, {
            text:
              mods &&
              mods.tooltipDescriptions &&
              typeof mods.tooltipDescriptions.cardInputType === "string"
                ? mods.tooltipDescriptions.cardInputType
                : "The type of form input displayed on the form",
            id: `${elementId}-inputinfo`,
            type: "help",
          })
        ),
        /*#__PURE__*/ React__default.createElement(Select, {
          value: {
            value: parameters.category,
            label: categoryMap[parameters.category],
          },
          placeholder: inputTypeLabel,
          options: availableInputTypes(),
          onChange: (val) => {
            // figure out the new 'type'
            const newCategory = val.value;
            const newProps = _extends(
              {},
              defaultUiProps(newCategory, allFormInputs),
              defaultDataProps(newCategory, allFormInputs),
              {
                name: parameters.name,
                required: parameters.required,
              }
            );
            if (newProps.$ref !== undefined && !newProps.$ref) {
              // assign an initial reference
              const firstDefinition = Object.keys(parameters.definitionData)[0];
              newProps.$ref = `#/definitions/${firstDefinition || "empty"}`;
            }
            onChange(
              _extends({}, newProps, {
                title: newProps.title || parameters.title,
                default: newProps.default || "",
                type: newProps.type || categoryType(newCategory, allFormInputs),
                category: newProps.category || newCategory,
              })
            );
          },
          className: "card-select",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-category-options",
      },
      /*#__PURE__*/ React__default.createElement(GeneralParameterInputs, {
        category: parameters.category,
        parameters: parameters,
        onChange: onChange,
        mods: mods,
        allFormInputs: allFormInputs,
      })
    )
  );
}
