import { createElement, useState, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//import Select from "react-select";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
import ListItem from "@material-ui/core/ListItem";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

import FBCheckbox from "./checkbox/FBCheckbox";
import Collapse from "./Collapse/Collapse";
import CardModal from "./CardModal";
import { CardDefaultParameterInputs } from "./defaults/defaultInputs";
import Example from "./Tooltip";
import Add from "./Add";
import Card from "./Card";
import {
  checkForUnsupportedFeatures,
  generateElementComponentsFromSchemas,
  countElementsFromSchema,
  addCardObj,
  addSectionObj,
  onDragEnd,
  getRandomId,
} from "./utils";

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
  const unsupportedFeatures = checkForUnsupportedFeatures(
    schema || {},
    uischema || {},
    allFormInputs
  );
  const schemaData = schema || {};
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = useState(defaultCollapseStates);
  // keep name in state to avoid losing focus
  const [keyName, setKeyName] = useState(name);
  const [keyError, setKeyError] = useState(null);
  // keep requirements in state to avoid rapid updates
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
              onClick: () => setCardOpen(!cardOpen),
              display: "inline",
            },
            schemaData.title || keyName,
            " ",
            parent
              ? createElement(Example, {
                  text: `Depende de ${parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : ""
          ),
          createElement(
            "span",
            null,
            createElement(
              Tooltip,
              {
                title: "Mover sección hacia arriba",
                id: `${elementId}_moveupbiginfo`,
              },
              createElement(ArrowUpward, {
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
            createElement(
              Tooltip,
              {
                title: "Mover sección hacia abajo",
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
        reference
          ? createElement(
              "div",
              {
                className: "section-entry section-reference",
              },
              createElement(
                Typography,
                { variant: "h5", display: "inline" },
                "Sección de Referencia"
              ),

              <Select
                value={reference}
                id="reference"
                onChange={(val) => {
                  onChange(schema, uischema, val.value);
                }}
              >
                {Object.keys(definitionData).map((key, index) => (
                  <MenuItem key={index} value={`#/definitions/${key}`}>
                    {`#/definitions/${key}`}
                  </MenuItem>
                ))}
              </Select>

              /////////////////ORIGINAL ////////////////////////
              // createElement(Select, {
              //   value: {
              //     value: reference,
              //     label: reference,
              //   },
              //   placeholder: "Referencia",
              //   options: Object.keys(definitionData).map((key) => ({
              //     value: `#/definitions/${key}`,
              //     label: `#/definitions/${key}`,
              //   })),
              //   onChange: (val) => {
              //     onChange(schema, uischema, val.value);
              //   },
              // })
            )
          : "",
        createElement(
          "div",
          null,
          createElement(
            Typography,
            { variant: "h6" },
            "Nombre de la Sección",
            " ",
            createElement(Example, {
              text:
                mods &&
                mods.tooltipDescriptions &&
                mods.tooltipDescriptions &&
                typeof mods.tooltipDescriptions.cardSectionObjectName ===
                  "string"
                  ? mods.tooltipDescriptions.cardSectionObjectName
                  : "El nombre que representa a la sección en el JSON.",
              id: `${elementId}_nameinfo`,
              type: "help",
            })
          ),
          createElement(
            FormGroup,
            null,
            createElement(Input, {
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
                  setKeyError(`"${value}" ya está en uso.`);
                  onNameChange(name);
                }
              },
              readOnly: hideKey,
            }),
            createElement(FormHelperText, null, keyError)
          )
        ),
        createElement(
          "div",
          null,
          createElement(
            Typography,
            { variant: "h6" },
            "Título de la Sección",
            " ",
            createElement(Example, {
              text:
                mods &&
                mods.tooltipDescriptions &&
                mods.tooltipDescriptions &&
                typeof mods.tooltipDescriptions.cardSectionDisplayName ===
                  "string"
                  ? mods.tooltipDescriptions.cardSectionDisplayName
                  : "El título de la sección que se mostrará al usuario.",
              id: `${elementId}_titleinfo`,
              type: "help",
            })
          ),
          createElement(Input, {
            value: schemaData.title || "",
            placeholder: "Title",
            type: "text",
            onChange: (ev) =>
              onChange(
                {
                  ...schema,
                  title: ev.target.value,
                },
                uischema
              ),
            onBlur: (ev) => {
              const { value } = ev.target;
              if (
                value === name ||
                !(neighborNames && neighborNames.includes(value))
              ) {
                setKeyName(value);
                setKeyError(null);
                onNameChange(value);
              } else {
                setKeyName(name);
                setKeyError(`"${value}" ya está en uso.`);
                onNameChange(name);
              }
            },
            className: "card-text",
          })
        ),
        createElement(FormHelperText, null, keyError),
        createElement(
          "div",
          null,
          createElement(
            Typography,
            { variant: "h6" },
            "Descripción",
            " ",
            createElement(Example, {
              text:
                mods &&
                mods.tooltipDescriptions &&
                mods.tooltipDescriptions &&
                typeof mods.tooltipDescriptions.cardSectionDescription ===
                  "string"
                  ? mods.tooltipDescriptions.cardSectionDescription
                  : "Una descripción corta de la sección.",
              id: `${elementId}_descriptioninfo`,
              type: "help",
            })
          ),
          createElement(Input, {
            value: schemaData.description || "",
            placeholder: "Descripción",
            type: "text",
            onChange: (ev) =>
              onChange(
                {
                  ...schema,
                  description: ev.target.value,
                },
                uischema
              ),
            className: "card-text",
          })
        ),
        unsupportedFeatures.length === 0
          ? null
          : createElement(
              Alert,
              {
                severity: "warning",
              },
              createElement(
                Typography,
                { variant: "h5" },
                "Unsupported Features:"
              ),
              unsupportedFeatures.map((message) =>
                createElement(
                  ListItem,
                  {
                    key: `${elementId}_${message}`,
                  },
                  message
                )
              )
            ),
        createElement(
          "div",
          null,
          createElement(
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
            createElement(
              Droppable,
              {
                droppableId: "droppable",
              },
              (providedDroppable) =>
                createElement(
                  "div",
                  {
                    ref: providedDroppable.innerRef,
                    ...providedDroppable.droppableProps,
                  },
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
                    createElement(
                      Draggable,
                      {
                        key: element.key,
                        draggableId: element.key,
                        index: index,
                      },
                      (providedDraggable) =>
                        createElement(
                          "div",
                          {
                            ref: providedDraggable.innerRef,
                            ...providedDraggable.draggableProps,
                            ...providedDraggable.dragHandleProps,
                          },
                          element
                        )
                    )
                  ),
                  providedDroppable.placeholder
                )
            )
          )
        ),
        createElement(
          "div",
          {
            className: "section-footer",
          },
          createElement(Add, {
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
        createElement(
          "div",
          {
            className: "section-interactions",
          },
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
              title: "Eliminar sección",
              id: `${elementId}_trashinfo`,
            },
            createElement(Delete, {
              onClick: () => (onDelete ? onDelete() : {}),
            })
          ),
          createElement(FBCheckbox, {
            onChangeValue: () => onRequireToggle(),
            isChecked: required,
            label: "Required",
            id: `${elementId}_required`,
          })
        )
      ),
      createElement(CardModal, {
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
          onChange(schema, {
            ...uischema,
            "ui:column": newComponentProps["ui:column"],
          });
        },
        TypeSpecificParameters: CardDefaultParameterInputs,
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
