
import  { useState, createElement, Fragment, useEffect } from "react";
import {Input, Typography, List, Tooltip , Dialog , ListItem, Container, Button} from "@material-ui/core";
import {Close, Add} from "@material-ui/icons";

import { createUseStyles } from "react-jss";

// Importar componentes:
import Example from "./Example";
import FBRadioGroup from "./FBRadioGroup";
import CardSelector from "./CardSelector";
import FBCheckbox from "./FBCheckbox";
import CardEnumOptions from "./CardEnumOptions";

import _extends from "../FormBuilderUtils/_extends";
import getRandomId from "../FormBuilderUtils/getRandomId";

const useStyles$6 = createUseStyles({
  cardModal: {
    "& .card-modal-header": {
      paddingTop: ".5em",
      paddingBottom: ".5em",
    },
    "& .card-modal-entries": {
      padding: "1em",
    },
    "& h4, h5, p, label, li": {
      marginTop: ".5em",
      marginBottom: ".5em",
    },
    "& h5, p, label, li": {
      fontSize: "14px",
    },
    "& h4": {
      fontSize: "16px",
    },
    "& h3": {
      fontSize: "18px",
      marginBottom: 0,
    },
    "& .card-modal-entries > div > input": {
      marginBottom: "1em",
      height: "32px",
    },
    "& .fa-question-circle, & .fa-circle-question": {
      color: "gray",
    },
    "& .card-modal-boolean": {
      "& *": {
        marginRight: "0.25em",
        height: "auto",
        display: "inline-block",
      },
    },
    "& .card-modal-select": {
      "& input": {
        margin: "0",
        height: "20px",
      },
      marginBottom: "1em",
    },
  },
});

const useStyles$7 = createUseStyles({
  dependencyField: {
    "& .fa": {
      cursor: "pointer",
    },
    "& .plus": {
      marginLeft: "1em",
    },
    "& h4": {
      marginBottom: ".5em",
    },
    "& h5": {
      fontSize: "1em",
    },
    "& .form-dependency-select": {
      fontSize: "0.75em",
      marginBottom: "1em",
    },
    "& .form-dependency-conditions": {
      textAlign: "left",
      "& .form-dependency-condition": {
        padding: "1em",
        border: "1px solid gray",
        borderRadius: "4px",
        margin: "1em",
        "& *": {
          textAlign: "initial",
        },
      },
    },
    "& p": {
      fontSize: "0.75em",
    },
    "& .fb-radio-button": {
      display: "block",
    },
  },
});

// handle value options for different card types
function ValueSelector({
  possibility,
  onChange,
  parentEnums,
  parentType,
  parentName,
  parentSchema,
  path,
}) {
  const [elementId] = useState(getRandomId());
  if (possibility.value) {
    // enum type
    if (parentEnums) {
      const enumType = typeof parentEnums[0] === "number" ? "number" : "string";
      if (enumType === "string")
        return createElement(CardSelector, {
          possibleChoices: parentEnums.map((val) => `${val}`),
          chosenChoices: possibility.value.enum,
          onChange: (chosenChoices) =>
            onChange(
              _extends({}, possibility, {
                value: {
                  enum: chosenChoices,
                },
              })
            ),
          placeholder: "Allowed value",
          path: path,
        });
      if (enumType === "number")
        return createElement(CardSelector, {
          possibleChoices: parentEnums.map((val) => `${val}`),
          chosenChoices: possibility.value.enum,
          onChange: (chosenChoices) =>
            onChange(
              _extends({}, possibility, {
                value: {
                  enum: chosenChoices.map((val) => Number.parseFloat(val)),
                },
              })
            ),
          placeholder: "Allowed value",
          path: path,
        });
    }
    // check box type
    if (parentType === "boolean") {
      return createElement(FBCheckbox, {
        onChangeValue: () => {
          if (possibility.value.enum && possibility.value.enum[0]) {
            onChange(
              _extends({}, possibility, {
                value: {
                  enum: [false],
                },
              })
            );
          } else {
            onChange(
              _extends({}, possibility, {
                value: {
                  enum: [true],
                },
              })
            );
          }
        },
        isChecked: possibility.value.enum && possibility.value.enum[0],
        label: parentName,
      });
    }
    // object type
    if (parentType === "object") {
      const enumArr = possibility.value.enum;
      return createElement(
        "div",
        null,
        enumArr.map((combination, index) =>
          createElement(
            "li",
            {
              key: `${elementId}_possibleValue${index}`,
            },
            Object.keys(combination).map((key) => {
              const val = combination[key];
              return createElement(
                "div",
                {
                  key: key,
                },
                createElement(
                  Typography,
                  { variant: "h6" },
                  key,
                  ":"
                ),
                {
                  string: createElement(Input, {
                    value: val || "",
                    placeholder: "String value",
                    type: "string",
                    onChange: (ev) => {
                      const newVal = ev.target.value;
                      const oldCombo = possibility.value.enum[index];
                      onChange(
                        _extends({}, possibility, {
                          value: {
                            enum: [
                              ...enumArr.slice(0, index),
                              _extends({}, oldCombo, {
                                [key]: newVal,
                              }),
                              ...enumArr.slice(index + 1),
                            ],
                          },
                        })
                      );
                    },
                    className: "card-modal-text",
                  }),
                  number: createElement(Input, {
                    value: val || "",
                    placeholder: "Number value",
                    type: "number",
                    onChange: (ev) => {
                      const newVal = Number.parseFloat(ev.target.value);
                      const oldCombo = possibility.value.enum[index];
                      onChange(
                        _extends({}, possibility, {
                          value: {
                            enum: [
                              ...enumArr.slice(0, index),
                              _extends({}, oldCombo, {
                                [key]: newVal,
                              }),
                              ...enumArr.slice(index + 1),
                            ],
                          },
                        })
                      );
                    },
                    className: "card-modal-number",
                  }),
                  array: createElement(Input, {
                    value: JSON.stringify(val) || "",
                    placeholder: "Array in JSON",
                    type: "string",
                    onChange: (ev) => {
                      let newVal = val;
                      try {
                        newVal = JSON.parse(ev.target.value);
                      } catch (error) {
                        console.error("invalid JSON array input");
                      }
                      const oldCombo = possibility.value.enum[index];
                      onChange(
                        _extends({}, possibility, {
                          value: {
                            enum: [
                              ...enumArr.slice(0, index),
                              _extends({}, oldCombo, {
                                [key]: newVal,
                              }),
                              ...enumArr.slice(index + 1),
                            ],
                          },
                        })
                      );
                    },
                    className: "card-modal-text",
                  }),
                  object: createElement(Input, {
                    value: JSON.stringify(val) || "",
                    placeholder: "Object in JSON",
                    type: "string",
                    onChange: (ev) => {
                      let newVal = val;
                      try {
                        newVal = JSON.parse(ev.target.value);
                      } catch (error) {
                        // eslint-disable-next-line no-console
                        console.error("invalid JSON object input");
                      }
                      const oldCombo = possibility.value.enum[index];
                      onChange(
                        _extends({}, possibility, {
                          value: {
                            enum: [
                              ...enumArr.slice(0, index),
                              _extends({}, oldCombo, {
                                [key]: newVal,
                              }),
                              ...enumArr.slice(index + 1),
                            ],
                          },
                        })
                      );
                    },
                    className: "card-modal-text",
                  }),
                }[typeof val]
              );
            }),
            createElement(Close, {
              onClick: () =>
                onChange(
                  _extends({}, possibility, {
                    value: {
                      enum: [
                        ...enumArr.slice(0, index),
                        ...enumArr.slice(index + 1),
                      ],
                    },
                  })
                ),
            })
          )
        ),
        createElement(Add, {
          onClick: () => {
            const newCase = {};
            const propArr = parentSchema ? parentSchema.properties : {};
            Object.keys(propArr).forEach((key) => {
              if (
                propArr[key].type === "number" ||
                propArr[key].type === "integer"
              ) {
                newCase[key] = 0;
              } else if (propArr[key].type === "array" || propArr[key].enum) {
                newCase[key] = [];
              } else if (
                propArr[key].type === "object" ||
                propArr[key].properties
              ) {
                newCase[key] = {};
              } else {
                newCase[key] = "";
              }
            });
            onChange(
              _extends({}, possibility, {
                value: {
                  enum: [...enumArr, newCase],
                },
              })
            );
          },
        })
      );
    }
    return createElement(CardEnumOptions, {
      initialValues: possibility.value.enum,
      onChange: (newEnum) =>
        onChange(
          _extends({}, possibility, {
            value: {
              enum: newEnum,
            },
          })
        ),
      type: parentType || "string",
      showNames: false,
    });
  } else {
    return createElement(
      Typography,
      { variant: "h5" },
      " Appear if defined "
    );
  }
}

// a possible dependency
function DependencyPossibility({
  possibility,
  neighborNames,
  path,
  onChange,
  onDelete,
  parentEnums,
  parentType,
  parentName,
  parentSchema,
}) {
  const [elementId] = useState(getRandomId());
  return createElement(
    "div",
    {
      className: "form-dependency-condition",
    },
    createElement(
      Typography,
      { variant: "h5" },
      "Display the following:",
      " ",
      createElement(Example, {
        id: `${elementId}_bulk`,
        type: "help",
        text: "Choose the other form elements that depend on this one",
      })
    ),
    createElement(CardSelector, {
      possibleChoices:
        neighborNames.filter((name) => name !== parentName) || [],
      chosenChoices: possibility.children,
      onChange: (chosenChoices) =>
        onChange(
          _extends({}, possibility, {
            children: [...chosenChoices],
          })
        ),
      placeholder: "Choose a dependent...",
      path: path,
    }),
    createElement(
      Typography,
      { variant: "h5" },
      'If "',
      parentName,
      '" has ',
      possibility.value ? "the value:" : "a value."
    ),
    possibility.value
      ? createElement(
          "div",
          {
            style: {
              display: possibility.value ? "block" : "none",
            },
          },
          createElement(ValueSelector, {
            possibility: possibility,
            onChange: (newPossibility) => onChange(newPossibility),
            parentEnums: parentEnums,
            parentType: parentType,
            parentName: parentName,
            parentSchema: parentSchema,
            path: path,
          })
        )
      : null,
    createElement(Close, {
      onClick: () => onDelete(),
    })
  );
}

// checks whether an array corresponds to oneOf dependencies
function checkIfValueBasedDependency(dependents) {
  let valueBased = true;
  if (dependents && Array.isArray(dependents) && dependents.length > 0) {
    dependents.forEach((possibility) => {
      if (!possibility.value || !possibility.value.enum) {
        valueBased = false;
      }
    });
  } else {
    valueBased = false;
  }
  return valueBased;
}

// warning message if not all possibilities specified
function DependencyWarning({ parameters }) {
  const [elementId] = useState(getRandomId());
  if (
    parameters.enum &&
    parameters.dependents &&
    parameters.dependents.length &&
    parameters.dependents[0].value
  ) {
    // get the set of defined enum values
    const definedVals = new Set([]);
    (parameters.dependents || []).forEach((possibility) => {
      if (possibility.value && possibility.value.enum)
        possibility.value.enum.forEach((val) => definedVals.add(val));
    });
    const undefinedVals = [];
    if (Array.isArray(parameters.enum))
      parameters.enum.forEach((val) => {
        if (!definedVals.has(val)) undefinedVals.push(val);
      });
    if (undefinedVals.length === 0) return null;
    return createElement(
      Fragment,
      null,
      createElement(
        "p",
        null,
        "Warning! The following values do not have associated dependency values:",
        " ",
        createElement(Example, {
          id: `${elementId}_valuewarning`,
          type: "help",
          text: "Each possible value for a value-based dependency must be defined to work properly",
        })
      ),
      createElement(
        List,
        null,
        undefinedVals.map((val, index) =>
          createElement(
            ListItem,
            {
              key: index,
            },
            val
          )
        )
      )
    );
  }
  return null;
}

function DependencyField({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  const classes = useStyles$7();
  const valueBased = checkIfValueBasedDependency(parameters.dependents || []);
  return createElement(
    "div",
    {
      className: `form-dependency ${classes.dependencyField}`,
    },
    createElement(
      Typography,
      { variant: "h5" },
      "Dependencias",
      " ",
      createElement(Example, {
        id: `${elementId}_dependent`,
        type: "help",
        text: "Control whether other form elements show based on this one",
      })
    ),
    !!parameters.dependents &&
      parameters.dependents.length > 0 &&
      createElement(
        Fragment,
        null,
        createElement(FBRadioGroup, {
          defaultValue: valueBased ? "value" : "definition",
          horizontal: false,
          options: [
            {
              value: "definition",
              label: "Any value dependency",
            },
            {
              value: "value",
              label: createElement(
                Fragment,
                null,
                "Specific value dependency",
                " ",
                createElement(Example, {
                  id: `${elementId}_valuebased`,
                  type: "help",
                  text: "Specify whether these elements should show based on this element's value",
                })
              ),
            },
          ],
          onChange: (selection) => {
            if (parameters.dependents) {
              const newDependents = [...parameters.dependents];
              if (selection === "definition") {
                parameters.dependents.forEach((possibility, index) => {
                  newDependents[index] = _extends({}, possibility, {
                    value: undefined,
                  });
                });
              } else {
                parameters.dependents.forEach((possibility, index) => {
                  newDependents[index] = _extends({}, possibility, {
                    value: {
                      enum: [],
                    },
                  });
                });
              }
              onChange(
                _extends({}, parameters, {
                  dependents: newDependents,
                })
              );
            }
          },
        })
      ),
    createElement(DependencyWarning, {
      parameters: parameters,
    }),
    createElement(
      "div",
      {
        className: "form-dependency-conditions",
      },
      parameters.dependents
        ? parameters.dependents.map((possibility, index) =>
            createElement(DependencyPossibility, {
              possibility: possibility,
              neighborNames: parameters.neighborNames || [],
              parentEnums: parameters.enum,
              parentType: parameters.type,
              parentName: parameters.name,
              parentSchema: parameters.schema,
              path: parameters.path,
              key: `${elementId}_possibility${index}`,
              onChange: (newPossibility) => {
                const newDependents = parameters.dependents
                  ? [...parameters.dependents]
                  : [];
                newDependents[index] = newPossibility;
                onChange(
                  _extends({}, parameters, {
                    dependents: newDependents,
                  })
                );
              },
              onDelete: () => {
                const newDependents = parameters.dependents
                  ? [...parameters.dependents]
                  : [];
                onChange(
                  _extends({}, parameters, {
                    dependents: [
                      ...newDependents.slice(0, index),
                      ...newDependents.slice(index + 1),
                    ],
                  })
                );
              },
            })
          )
        : "",
      createElement(
        Tooltip,
        {
          title:
            "Add another dependency relation linking this element and other form elements",
          id: `${elementId}_adddependency`,
        },
        createElement(Add, {
          onClick: () => {
            const newDependents = parameters.dependents
              ? [...parameters.dependents]
              : [];
            newDependents.push({
              children: [],
              value: valueBased
                ? {
                    enum: [],
                  }
                : undefined,
            });
            onChange(
              _extends({}, parameters, {
                dependents: newDependents,
              })
            );
          },
        })
      )
    )
  );
}

export default function CardModal({
  componentProps,
  onChange,
  isOpen,
  onClose,
  TypeSpecificParameters,
}) {
  const classes = useStyles$6();
  // assign state values for parameters that should only change on hitting "Save"
  const [componentPropsState, setComponentProps] =
  useState(componentProps);
  useEffect(() => {
    setComponentProps(componentProps);
  }, [componentProps]);

  return createElement(
    Dialog,
    {
      open: isOpen,
      children: {},
    },
    createElement(
      Container,
      null,
      createElement(
        "div",
        {
          className: "card-modal-header",
        },
        createElement(
          "div",
          {
            style: {
              display: componentProps.hideKey ? "none" : "initial",
            },
          },
          createElement(
            Typography,
            { variant: "h5" },
            "Additional Settings"
          )
        )
      ),
      createElement(
        "div",
        {
          className: "card-modal-entries",
        },
        createElement(TypeSpecificParameters, {
          parameters: componentPropsState,
          onChange: (newState) => {
            setComponentProps(_extends({}, componentPropsState, newState));
          },
        }),
        createElement(
          "div",
          null,
          createElement(
            Typography,
            { variant: "h6" },
            "Tamaño de la Columna",
            " ",
            createElement(
              "a",
              {
                href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
                target: "_blank",
                rel: "noopener noreferrer",
              },
              createElement(Example, {
                id: "column_size_tooltip",
                type: "help",
                text: "Set the column size of the input",
              })
            )
          ),
          createElement(Input, {
            value: componentPropsState["ui:column"]
              ? componentPropsState["ui:column"]
              : "",
            placeholder: "Tamaño de la columna",
            key: "ui:column",
            type: "number",
            min: 0,
            onChange: (ev) => {
              setComponentProps(
                _extends({}, componentPropsState, {
                  "ui:column": ev.target.value,
                })
              );
            },
            className: "card-modal-text",
          })
        ),
        createElement(DependencyField, {
          parameters: componentPropsState,
          onChange: (newState) => {
            setComponentProps(_extends({}, componentPropsState, newState));
          },
        })
      ),
      createElement(
        Container,
        null,
        createElement(
          Button,
          {
            onClick: () => {
              onClose();
              onChange(componentPropsState);
            },
            color: "primary",
          },
          "Guardar"
        ),
        createElement(
          Button,
          {
            onClick: () => {
              onClose();
              setComponentProps(componentProps);
            },
            color: "secondary",
          },
          "Cancelar"
        )
      )
    )
  );
}
