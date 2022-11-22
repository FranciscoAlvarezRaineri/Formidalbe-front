import * as React from "react";
import React__default, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  UncontrolledTooltip,
  Input,
  FormGroup,
  FormFeedback,
  Alert,
} from "reactstrap";
import { createUseStyles } from "react-jss";
import {
  faArrowUp,
  faArrowDown,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import FontAwesomeIcon from "./FontAwesomeIcon";
import Card from "./Card";
import Add from "./Add";
import Example from "./Example";
import Collapse from "./Collapse";
import FBCheckbox from "./FBCheckbox";
import CardModal from "./CardModal";

import checkForUnsupportedFeatures from "../FormBuilderUtils/checkForUnsupportedFeatures";
import countElementsFromSchema from "../FormBuilderUtils/countElementsFromSchema";
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";
import generateElementComponentsFromSchemas from "../FormBuilderUtils/generateElementComponentsFromSchemas";

function CardDefaultParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ React.createElement("div", null);
}

const useStyles$2 = createUseStyles({
  sectionContainer: {
    "& .section-head": {
      display: "flex",
      borderBottom: "1px solid gray",
      margin: "0.5em 1.5em 0 1.5em",
      "& h5": {
        color: "black",
        fontSize: "14px",
        fontWeight: "bold",
      },
      "& .section-entry": {
        width: "33%",
        textAlign: "left",
        padding: "0.5em",
      },
      "& .section-reference": {
        width: "100%",
      },
    },
    "& .section-footer": {
      marginTop: "1em",
      textAlign: "center",
      "& .fa": {
        cursor: "pointer",
      },
    },
    "& .section-interactions": {
      margin: "0.5em 1.5em",
      textAlign: "left",
      borderTop: "1px solid gray",
      paddingTop: "1em",
      "& .fa": {
        marginRight: "1em",
        borderRadius: "4px",
        padding: "0.25em",
        height: "25px",
        width: "25px",
      },
      "& .fa-pencil-alt, &.fa-pencil, & .fa-arrow-up, & .fa-arrow-down": {
        border: "1px solid #1d71ad",
        color: "#1d71ad",
      },
      "& .fa-trash": {
        border: "1px solid #de5354",
        color: "#de5354",
      },
      "& .fa-arrow-up, & .fa-arrow-down": {
        marginRight: "0.5em",
      },
      "& .fb-checkbox": {
        display: "inline-block",
        label: {
          color: "#9aa4ab",
        },
      },
      "& .interactions-left, & .interactions-right": {
        display: "inline-block",
        width: "48%",
        margin: "0 auto",
      },
      "& .interactions-left": {
        textAlign: "left",
      },
      "& .interactions-right": {
        textAlign: "right",
      },
    },
  },
});
export default function Section({
  name,
  required,
  schema,
  uischema,
  onChange,
  onNameChange,
  onRequireToggle,
  onDependentsChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  path,
  definitionData,
  definitionUi,
  hideKey,
  reference,
  dependents,
  dependent,
  parent,
  neighborNames,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  categoryHash,
}) {
  var _uischema$uiColumn;
  const classes = useStyles$2();
  const unsupportedFeatures = checkForUnsupportedFeatures(
    schema || {},
    uischema || {},
    allFormInputs
  );
  const schemaData = schema || {};
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = React__default.useState(
    defaultCollapseStates
  );
  // keep name in state to avoid losing focus
  const [keyName, setKeyName] = React__default.useState(name);
  const [keyError, setKeyError] = React__default.useState(null);
  // keep requirements in state to avoid rapid updates
  const [modalOpen, setModalOpen] = React__default.useState(false);
  const [elementId] = React__default.useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement(
      Collapse,
      {
        isOpen: cardOpen,
        toggleCollapse: () => setCardOpen(!cardOpen),
        title: /*#__PURE__*/ React__default.createElement(
          React__default.Fragment,
          null,
          /*#__PURE__*/ React__default.createElement(
            "span",
            {
              onClick: () => setCardOpen(!cardOpen),
              className: "label",
            },
            schemaData.title || keyName,
            " ",
            parent
              ? /*#__PURE__*/ React__default.createElement(Example, {
                  text: `Depends on ${parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : ""
          ),
          /*#__PURE__*/ React__default.createElement(
            "span",
            {
              className: "arrows",
            },
            /*#__PURE__*/ React__default.createElement(
              "span",
              {
                id: `${elementId}_moveupbiginfo`,
              },
              /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
                icon: faArrowUp,
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
            /*#__PURE__*/ React__default.createElement(
              UncontrolledTooltip,
              {
                placement: "top",
                target: `${elementId}_moveupbiginfo`,
              },
              "Move form element up"
            ),
            /*#__PURE__*/ React__default.createElement(
              "span",
              {
                id: `${elementId}_movedownbiginfo`,
              },
              /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
                icon: faArrowDown,
                onClick: () => (onMoveDown ? onMoveDown() : {}),
              })
            ),
            /*#__PURE__*/ React__default.createElement(
              UncontrolledTooltip,
              {
                placement: "top",
                target: `${elementId}_movedownbiginfo`,
              },
              "Move form element down"
            )
          )
        ),
        className: `section-container ${classes.sectionContainer} ${
          dependent ? "section-dependent" : ""
        } ${reference ? "section-reference" : ""}`,
      },
      /*#__PURE__*/ React__default.createElement(
        "div",
        {
          className: `section-entries ${reference ? "section-reference" : ""}`,
        },
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "section-head",
          },
          reference
            ? /*#__PURE__*/ React__default.createElement(
                "div",
                {
                  className: "section-entry section-reference",
                },
                /*#__PURE__*/ React__default.createElement(
                  "h5",
                  null,
                  "Reference Section"
                ),
                /*#__PURE__*/ React__default.createElement(Select, {
                  value: {
                    value: reference,
                    label: reference,
                  },
                  placeholder: "Reference",
                  options: Object.keys(definitionData).map((key) => ({
                    value: `#/definitions/${key}`,
                    label: `#/definitions/${key}`,
                  })),
                  onChange: (val) => {
                    onChange(schema, uischema, val.value);
                  },
                  className: "section-select",
                })
              )
            : "",
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: "section-entry",
              "data-test": "section-object-name",
            },
            /*#__PURE__*/ React__default.createElement(
              "h5",
              null,
              "Section Object Name",
              " ",
              /*#__PURE__*/ React__default.createElement(Example, {
                text:
                  mods &&
                  mods.tooltipDescriptions &&
                  mods.tooltipDescriptions &&
                  typeof mods.tooltipDescriptions.cardSectionObjectName ===
                    "string"
                    ? mods.tooltipDescriptions.cardSectionObjectName
                    : "The key to the object that will represent this form section.",
                id: `${elementId}_nameinfo`,
                type: "help",
              })
            ),
            /*#__PURE__*/ React__default.createElement(
              FormGroup,
              null,
              /*#__PURE__*/ React__default.createElement(Input, {
                invalid: keyError !== null,
                value: keyName || "",
                placeholder: "Key",
                type: "text",
                onChange: (ev) => setKeyName(ev.target.value),
                onBlur: (ev) => {
                  const { value } = ev.target;
                  if (
                    value === name ||
                    !(neighborNames && neighborNames.includes(value))
                  ) {
                    setKeyError(null);
                    onNameChange(value);
                  } else {
                    setKeyName(name);
                    setKeyError(`"${value}" is already in use.`);
                    onNameChange(name);
                  }
                },
                className: "card-text",
                readOnly: hideKey,
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
              className: "section-entry",
              "data-test": "section-display-name",
            },
            /*#__PURE__*/ React__default.createElement(
              "h5",
              null,
              "Section Display Name",
              " ",
              /*#__PURE__*/ React__default.createElement(Example, {
                text:
                  mods &&
                  mods.tooltipDescriptions &&
                  mods.tooltipDescriptions &&
                  typeof mods.tooltipDescriptions.cardSectionDisplayName ===
                    "string"
                    ? mods.tooltipDescriptions.cardSectionDisplayName
                    : "The name of the form section that will be shown to users of the form.",
                id: `${elementId}_titleinfo`,
                type: "help",
              })
            ),
            /*#__PURE__*/ React__default.createElement(Input, {
              value: schemaData.title || "",
              placeholder: "Title",
              type: "text",
              onChange: (ev) =>
                onChange(
                  _extends({}, schema, {
                    title: ev.target.value,
                  }),
                  uischema
                ),
              className: "card-text",
            })
          ),
          /*#__PURE__*/ React__default.createElement(
            "div",
            {
              className: "section-entry",
              "data-test": "section-description",
            },
            /*#__PURE__*/ React__default.createElement(
              "h5",
              null,
              "Section Description",
              " ",
              /*#__PURE__*/ React__default.createElement(Example, {
                text:
                  mods &&
                  mods.tooltipDescriptions &&
                  mods.tooltipDescriptions &&
                  typeof mods.tooltipDescriptions.cardSectionDescription ===
                    "string"
                    ? mods.tooltipDescriptions.cardSectionDescription
                    : "A description of the section which will be visible on the form.",
                id: `${elementId}_descriptioninfo`,
                type: "help",
              })
            ),
            /*#__PURE__*/ React__default.createElement(Input, {
              value: schemaData.description || "",
              placeholder: "Description",
              type: "text",
              onChange: (ev) =>
                onChange(
                  _extends({}, schema, {
                    description: ev.target.value,
                  }),
                  uischema
                ),
              className: "card-text",
            })
          ),
          /*#__PURE__*/ React__default.createElement(
            Alert,
            {
              style: {
                display: unsupportedFeatures.length === 0 ? "none" : "block",
              },
              color: "warning",
            },
            /*#__PURE__*/ React__default.createElement(
              "h5",
              null,
              "Unsupported Features:"
            ),
            unsupportedFeatures.map((message) =>
              /*#__PURE__*/ React__default.createElement(
                "li",
                {
                  key: `${elementId}_${message}`,
                },
                message
              )
            )
          )
        ),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "section-body",
          },
          /*#__PURE__*/ React__default.createElement(
            DragDropContext,
            {
              onDragEnd: (result) =>
                onDragEnd(result, {
                  schema,
                  uischema,
                  onChange,
                  definitionData,
                  definitionUi,
                  categoryHash,
                }),
              className: "section-body",
            },
            /*#__PURE__*/ React__default.createElement(
              Droppable,
              {
                droppableId: "droppable",
              },
              (providedDroppable) =>
                /*#__PURE__*/ React__default.createElement(
                  "div",
                  _extends(
                    {
                      ref: providedDroppable.innerRef,
                    },
                    providedDroppable.droppableProps
                  ),
                  generateElementComponentsFromSchemas({
                    schemaData: schema,
                    uiSchemaData: uischema,
                    onChange,
                    path,
                    definitionData,
                    definitionUi,
                    cardOpenArray,
                    setCardOpenArray,
                    allFormInputs,
                    mods,
                    categoryHash,
                    Card,
                    Section,
                  }).map((element, index) =>
                    /*#__PURE__*/ React__default.createElement(
                      Draggable,
                      {
                        key: element.key,
                        draggableId: element.key,
                        index: index,
                      },
                      (providedDraggable) =>
                        /*#__PURE__*/ React__default.createElement(
                          "div",
                          _extends(
                            {
                              ref: providedDraggable.innerRef,
                            },
                            providedDraggable.draggableProps,
                            providedDraggable.dragHandleProps
                          ),
                          element
                        )
                    )
                  ),
                  providedDroppable.placeholder
                )
            )
          )
        ),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "section-footer",
          },
          /*#__PURE__*/ React__default.createElement(Add, {
            tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
            addElem: (choice) => {
              if (choice === "card") {
                addCardObj({
                  schema,
                  uischema,
                  mods,
                  onChange,
                  definitionData,
                  definitionUi,
                  categoryHash,
                });
              } else if (choice === "section") {
                addSectionObj({
                  schema,
                  uischema,
                  onChange,
                  definitionData,
                  definitionUi,
                  categoryHash,
                });
              }
            },
            hidden:
              schemaData.properties &&
              Object.keys(schemaData.properties).length !== 0,
          })
        ),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "section-interactions",
          },
          /*#__PURE__*/ React__default.createElement(
            "span",
            {
              id: `${elementId}_editinfo`,
            },
            /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
              icon: faPencilAlt,
              onClick: () => setModalOpen(true),
            })
          ),
          /*#__PURE__*/ React__default.createElement(
            UncontrolledTooltip,
            {
              placement: "top",
              target: `${elementId}_editinfo`,
            },
            "Additional configurations for this form element"
          ),
          /*#__PURE__*/ React__default.createElement(
            "span",
            {
              id: `${elementId}_trashinfo`,
            },
            /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
              icon: faTrash,
              onClick: () => (onDelete ? onDelete() : {}),
            })
          ),
          /*#__PURE__*/ React__default.createElement(
            UncontrolledTooltip,
            {
              placement: "top",
              target: `${elementId}_trashinfo`,
            },
            "Delete form element"
          ),
          /*#__PURE__*/ React__default.createElement(FBCheckbox, {
            onChangeValue: () => onRequireToggle(),
            isChecked: required,
            label: "Required",
            id: `${elementId}_required`,
          })
        )
      ),
      /*#__PURE__*/ React__default.createElement(CardModal, {
        componentProps: {
          dependents,
          neighborNames,
          name: keyName,
          schema,
          type: "object",
          "ui:column":
            (_uischema$uiColumn = uischema["ui:column"]) != null
              ? _uischema$uiColumn
              : "",
        },
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        onChange: (newComponentProps) => {
          onDependentsChange(newComponentProps.dependents);
          onChange(
            schema,
            _extends({}, uischema, {
              "ui:column": newComponentProps["ui:column"],
            })
          );
        },
        TypeSpecificParameters: CardDefaultParameterInputs,
      })
    ),
    addElem
      ? /*#__PURE__*/ React__default.createElement(Add, {
          tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
          addElem: (choice) => addElem(choice),
        })
      : ""
  );
}
