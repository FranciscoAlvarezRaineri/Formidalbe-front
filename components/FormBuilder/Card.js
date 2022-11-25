import { useState, createElement, Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

// Importar componentes:
import Collapse from "./Collapse";
import Example from "./Example";
import Add from "./Add";
import FBCheckbox from "./FBCheckbox";
import CardModal from "./CardModal";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

// Reemplazar
import classnames from "classnames";
import Select from "react-select";

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
  return createElement(
    "div",
    null,
    createElement(CardBody, {
      parameters: parameters,
      onChange: onChange,
      mods: mods || {},
    })
  );
}

// specify the inputs required for any type of object
function CardGeneralParameterInputs({
  parameters,
  onChange,
  allFormInputs,
  mods,
  showObjectNameInput = true,
}) {
  const [keyState, setKeyState] = useState(parameters.name);
  const [keyError, setKeyError] = useState(null);
  const [titleState, setTitleState] = useState(parameters.title);
  const [descriptionState, setDescriptionState] = useState(
    parameters.description
  );
  const [elementId] = useState(getRandomId());
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
  return createElement(
    Fragment,
    null,
    createElement(
      "div",
      null,
      showObjectNameInput &&
        createElement(
          "div",
          null,
          createElement(
            Typography,
            { variant: "h5" },
            null,
            `${objectNameLabel} `,
            createElement(Example, {
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
          createElement(
            FormGroup,
            null,
            createElement(Input, {
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
            createElement(FormHelperText, null, keyError)
          )
        ),
      createElement(
        "div",
        {
          className: `card-entry ${
            parameters.$ref === undefined ? "" : "disabled-input"
          }`,
        },
        createElement(
          Typography,
          { variant: "h5" },
          null,
          `${displayNameLabel} `,
          createElement(Example, {
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
        createElement(Input, {
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
    createElement(
      "div",
      {
        className: "card-entry-row",
      },
      createElement(
        "div",
        {
          className: `card-entry ${parameters.$ref ? "disabled-input" : ""}`,
        },
        createElement(
          Typography,
          { variant: "h5" },
          null,
          `${descriptionLabel} `,
          createElement(Example, {
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
        createElement(
          FormGroup,
          null,
          createElement(Input, {
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
      createElement(
        "div",
        {
          className: classnames("card-entry", {
            "wide-card-entry": !showObjectNameInput,
          }),
        },
        createElement(
          Typography,
          { variant: "h5" },
          null,
          `${inputTypeLabel} `,
          createElement(Example, {
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
        createElement(Select, {
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
    createElement(
      "div",
      {
        className: "card-category-options",
      },
      createElement(GeneralParameterInputs, {
        category: parameters.category,
        parameters: parameters,
        onChange: onChange,
        mods: mods,
        allFormInputs: allFormInputs,
      })
    )
  );
}

export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [elementId] = useState(getRandomId());
  return createElement(
    Fragment,
    null,
    createElement(
      Collapse,
      {
        isOpen: !cardOpen,
        toggleCollapse: () => setCardOpen(!cardOpen),
        title: createElement(
          Fragment,
          null,
          createElement(
            Typography,
            {
              variant: "h5",
              display: "inline",
              onClick: () => setCardOpen(!cardOpen),
            },
            componentProps.title || componentProps.name,
            " ",
            componentProps.parent
              ? createElement(Example, {
                  text: `Depende de ${componentProps.parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : "",
            componentProps.$ref !== undefined
              ? createElement(Example, {
                  text: `Es una instancia del elemento pre-configurado ${componentProps.$ref}`,
                  id: `${elementId}_refinfo`,
                  type: "alert",
                })
              : ""
          ),
          createElement(
            "span",
            {
              display: "inline",
              id: `${elementId}_arrows`,
            },
            createElement(
              Tooltip,
              {
                title: "Mover elemento hacia arriba",
                id: `Hola`,
              },
              createElement(ArrowUpward, {
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
            createElement(
              Tooltip,
              {
                title: "Mover elemento hacia abajo",
                id: `${elementId}_movedownbiginfo`,
              },
              createElement(ArrowDownward, {
                onClick: () => (onMoveDown ? onMoveDown() : {}),
              })
            )
          )
        ),
      },
      createElement(
        Container,
        null,
        createElement(CardGeneralParameterInputs, {
          parameters: componentProps,
          onChange: onChange,
          allFormInputs: allFormInputs,
          mods: mods,
          showObjectNameInput: showObjectNameInput,
        })
      ),
      createElement(
        Container,
        null,
        createElement(
          Tooltip,
          {
            title: "Configuraciones adicionales",
            id: `${elementId}_editinfo`,
          },
          createElement(Edit, {
            onClick: () => setModalOpen(true),
          })
        ),
        createElement(
          Tooltip,
          {
            title: "Eliminar elemento",
            id: `${elementId}_trashinfo`,
          },
          createElement(Delete, {
            onClick: onDelete || (() => {}),
          })
        ),
        createElement(FBCheckbox, {
          onChangeValue: () =>
            onChange(
              _extends({}, componentProps, {
                required: !componentProps.required,
              })
            ),
          isChecked: !!componentProps.required,
          label: "Requerido",
          id: `${elementId}_required`,
        })
      ),
      createElement(CardModal, {
        componentProps: componentProps,
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        onChange: (newComponentProps) => {
          onChange(newComponentProps);
        },
        TypeSpecificParameters: TypeSpecificParameters,
      })
    ),
    addElem
      ? createElement(Add, {
          tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
          addElem: (choice) => addElem(choice),
        })
      : ""
  );
}
