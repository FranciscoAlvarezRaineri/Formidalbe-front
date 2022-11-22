import * as React from "react";
import React__default, { useState } from "react";

import { UncontrolledTooltip } from "reactstrap";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import {
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

// Importar componentes:
import Example from "./Example";
import FontAwesomeIcon from "./FontAwesomeIcon";
import FBRadioGroup from "./FBRadioGroup";
import CardSelector from "./CardSelector";

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
        return /*#__PURE__*/ React__default.createElement(CardSelector, {
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
        return /*#__PURE__*/ React__default.createElement(CardSelector, {
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
      return /*#__PURE__*/ React__default.createElement(FBCheckbox, {
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
      return /*#__PURE__*/ React__default.createElement(
        "div",
        null,
        enumArr.map((combination, index) =>
          /*#__PURE__*/ React__default.createElement(
            "li",
            {
              key: `${elementId}_possibleValue${index}`,
            },
            Object.keys(combination).map((key) => {
              const val = combination[key];
              return /*#__PURE__*/ React__default.createElement(
                "div",
                {
                  key: key,
                },
                /*#__PURE__*/ React__default.createElement(
                  "h5",
                  null,
                  key,
                  ":"
                ),
                {
                  string: /*#__PURE__*/ React__default.createElement(Input, {
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
                  number: /*#__PURE__*/ React__default.createElement(Input, {
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
                  array: /*#__PURE__*/ React__default.createElement(Input, {
                    value: JSON.stringify(val) || "",
                    placeholder: "Array in JSON",
                    type: "string",
                    onChange: (ev) => {
                      let newVal = val;
                      try {
                        newVal = JSON.parse(ev.target.value);
                      } catch (error) {
                        // eslint-disable-next-line no-console
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
                  object: /*#__PURE__*/ React__default.createElement(Input, {
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
            /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
              icon: faTimes,
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
        /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
          icon: faPlus,
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
    return /*#__PURE__*/ React__default.createElement(CardEnumOptions, {
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
    return /*#__PURE__*/ React__default.createElement(
      "h5",
      null,
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
  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      className: "form-dependency-condition",
    },
    /*#__PURE__*/ React__default.createElement(
      "h5",
      null,
      "Display the following:",
      " ",
      /*#__PURE__*/ React__default.createElement(Example, {
        id: `${elementId}_bulk`,
        type: "help",
        text: "Choose the other form elements that depend on this one",
      })
    ),
    /*#__PURE__*/ React__default.createElement(CardSelector, {
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
    /*#__PURE__*/ React__default.createElement(
      "h5",
      null,
      'If "',
      parentName,
      '" has ',
      possibility.value ? "the value:" : "a value."
    ),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        style: {
          display: possibility.value ? "block" : "none",
        },
      },
      /*#__PURE__*/ React__default.createElement(ValueSelector, {
        possibility: possibility,
        onChange: (newPossibility) => onChange(newPossibility),
        parentEnums: parentEnums,
        parentType: parentType,
        parentName: parentName,
        parentSchema: parentSchema,
        path: path,
      })
    ),
    /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
      icon: faTimes,
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
    return /*#__PURE__*/ React__default.createElement(
      React__default.Fragment,
      null,
      /*#__PURE__*/ React__default.createElement(
        "p",
        null,
        "Warning! The following values do not have associated dependency values:",
        " ",
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_valuewarning`,
          type: "help",
          text: "Each possible value for a value-based dependency must be defined to work properly",
        })
      ),
      /*#__PURE__*/ React__default.createElement(
        "ul",
        null,
        undefinedVals.map((val, index) =>
          /*#__PURE__*/ React__default.createElement(
            "li",
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
  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      className: `form-dependency ${classes.dependencyField}`,
    },
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Dependencies",
      " ",
      /*#__PURE__*/ React__default.createElement(Example, {
        id: `${elementId}_dependent`,
        type: "help",
        text: "Control whether other form elements show based on this one",
      })
    ),
    !!parameters.dependents &&
      parameters.dependents.length > 0 &&
      /*#__PURE__*/ React__default.createElement(
        React__default.Fragment,
        null,
        /*#__PURE__*/ React__default.createElement(FBRadioGroup, {
          defaultValue: valueBased ? "value" : "definition",
          horizontal: false,
          options: [
            {
              value: "definition",
              label: "Any value dependency",
            },
            {
              value: "value",
              label: /*#__PURE__*/ React__default.createElement(
                React__default.Fragment,
                null,
                "Specific value dependency",
                " ",
                /*#__PURE__*/ React__default.createElement(Example, {
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
    /*#__PURE__*/ React__default.createElement(DependencyWarning, {
      parameters: parameters,
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "form-dependency-conditions",
      },
      parameters.dependents
        ? parameters.dependents.map((possibility, index) =>
            /*#__PURE__*/ React__default.createElement(DependencyPossibility, {
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
      /*#__PURE__*/ React__default.createElement(
        "span",
        {
          className: "plus",
          id: `${elementId}_adddependency`,
        },
        /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
          icon: faPlus,
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
      ),
      /*#__PURE__*/ React__default.createElement(
        UncontrolledTooltip,
        {
          placement: "top",
          target: `${elementId}_adddependency`,
        },
        "Add another dependency relation linking this element and other form elements"
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
    React.useState(componentProps);
  React.useEffect(() => {
    setComponentProps(componentProps);
  }, [componentProps]);
  return /*#__PURE__*/ React.createElement(
    Modal,
    {
      isOpen: isOpen,
      "data-test": "card-modal",
      className: classes.cardModal,
    },
    /*#__PURE__*/ React.createElement(
      ModalHeader,
      {
        className: "card-modal-header",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            display: componentProps.hideKey ? "none" : "initial",
          },
        },
        /*#__PURE__*/ React.createElement("h3", null, "Additional Settings")
      )
    ),
    /*#__PURE__*/ React.createElement(
      ModalBody,
      {
        className: "card-modal-entries",
      },
      /*#__PURE__*/ React.createElement(TypeSpecificParameters, {
        parameters: componentPropsState,
        onChange: (newState) => {
          setComponentProps(_extends({}, componentPropsState, newState));
        },
      }),
      /*#__PURE__*/ React.createElement(
        "div",
        null,
        /*#__PURE__*/ React.createElement(
          "h4",
          null,
          "Column Size",
          " ",
          /*#__PURE__*/ React.createElement(
            "a",
            {
              href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            /*#__PURE__*/ React.createElement(Example, {
              id: "column_size_tooltip",
              type: "help",
              text: "Set the column size of the input",
            })
          )
        ),
        /*#__PURE__*/ React.createElement(Input, {
          value: componentPropsState["ui:column"]
            ? componentPropsState["ui:column"]
            : "",
          placeholder: "Column size",
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
      /*#__PURE__*/ React.createElement(DependencyField, {
        parameters: componentPropsState,
        onChange: (newState) => {
          setComponentProps(_extends({}, componentPropsState, newState));
        },
      })
    ),
    /*#__PURE__*/ React.createElement(
      ModalFooter,
      null,
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: () => {
            onClose();
            onChange(componentPropsState);
          },
          color: "primary",
        },
        "Save"
      ),
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: () => {
            onClose();
            setComponentProps(componentProps);
          },
          color: "secondary",
        },
        "Cancel"
      )
    )
  );
}
