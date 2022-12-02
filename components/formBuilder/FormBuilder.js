import { useState, createElement } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Material UI
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";

// Componentes:
import Add from "./Add";
import Card from "./Card";
import Section from "./Section";

import {
  parse,
  stringify,
  checkForUnsupportedFeatures,
  generateElementComponentsFromSchemas,
  addCardObj,
  addSectionObj,
  onDragEnd,
  countElementsFromSchema,
  generateCategoryHash,
  excludeKeys,
} from "./utils";

import DEFAULT_FORM_INPUTS from "./defaults/defaultFormInputs";

// Esta es la función principal que genera el Form Builder
export default function FormBuilder({ schema, uischema, onChange, mods }) {
  const schemaData = parse(schema) || {};
  schemaData.type = "object";
  const uiSchemaData = parse(uischema) || {};
  const allFormInputs = excludeKeys(
    Object.assign(
      {},
      DEFAULT_FORM_INPUTS,
      (mods && mods.customFormInputs) || {}
    ),
    mods && mods.deactivatedFormInputs
  );
  const unsupportedFeatures = checkForUnsupportedFeatures(
    schemaData,
    uiSchemaData,
    allFormInputs
  );
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = useState(defaultCollapseStates);
  const categoryHash = generateCategoryHash(allFormInputs);
  // Esta sección genera las alertas:
  return createElement(
    Container,
    null,
    unsupportedFeatures.length === 0
      ? null
      : createElement(
          Alert,
          {
            display: unsupportedFeatures.length === 0 ? "none" : "block",
            color: "warning",
          },
          createElement(Typography, { variant: "h5" }, "Unsupported Features:"),
          unsupportedFeatures.map((message, index) =>
            createElement(
              ListItem,
              {
                key: `${index}`,
              },
              message
            )
          )
        ),
    // Esta sección genera el Header, con el título y la descripción:
    (!mods || mods.showFormHead !== false) &&
      createElement(
        Grid,
        {
          container: true,
          columns: 2,
          spacing: 10,
          justifyContent: "center",
          // marginTop: 25,
        },
        // Esta sección genera el input para cambiar el título del formulario
        createElement(
          Grid,
          { item: true, align: "center" },
          createElement(
            Typography,
            { variant: "h5" },
            mods && mods.labels && typeof mods.labels.formNameLabel === "string"
              ? mods.labels.formNameLabel
              : "Nombre"
          ),
          createElement(Input, {
            value: schemaData.title || "Formulario Nuevo",
            placeholder: "Titulo",
            type: "text",
            onChange: (ev) => {
              onChange(
                stringify({
                  ...schemaData,
                  title: ev.target.value,
                }),
                uischema
              );
            },
            className: "form-title",
          })
        ),
        // Esta sección genera el input para cambiar la descripición del formulario
        createElement(
          Grid,
          { item: true, align: "center" },
          createElement(
            Typography,
            { variant: "h5" },
            mods &&
              mods.labels &&
              typeof mods.labels.formDescriptionLabel === "string"
              ? mods.labels.formDescriptionLabel
              : "Descripción"
          ),
          createElement(Input, {
            value: schemaData.description || "",
            placeholder: "Descripción",
            type: "text",
            onChange: (ev) =>
              onChange(
                stringify({
                  ...schemaData,
                  description: ev.target.value,
                }),
                uischema
              ),
            className: "form-description",
          })
        )
      ),
    // Esta sección genera el cuerpo del editor de formularios:
    createElement(
      Container,
      null,
      // "DragDropContext" es un componenete del módulo "beautiful-dnd" y habilita las acciones de drag and drop.
      createElement(
        DragDropContext,
        {
          onDragEnd: (result) =>
            onDragEnd(result, {
              schema: schemaData,
              uischema: uiSchemaData,
              onChange: (newSchema, newUiSchema) =>
                onChange(stringify(newSchema), stringify(newUiSchema)),
              definitionData: schemaData.definitions,
              definitionUi: uiSchemaData.definitions,
              categoryHash,
            }),
        },
        // "Droppable" es un componenete del módulo "beautiful-dnd" que habilita un área donde un elemento puede dropearse.
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
              // Genera un array de elementos a partir del schema y uischema
              generateElementComponentsFromSchemas({
                schemaData,
                uiSchemaData,
                onChange: (newSchema, newUiSchema) =>
                  onChange(stringify(newSchema), stringify(newUiSchema)),
                definitionData: schemaData.definitions,
                definitionUi: uiSchemaData.definitions,
                path: "root",
                cardOpenArray,
                setCardOpenArray,
                allFormInputs,
                mods,
                categoryHash,
                Card,
                Section,
              }).map((element, index) =>
                // Mapea el array y crea un draggable con cada uno.
                // "Draggable" es un elemento arrastrable del módulo "beautiful-dnd".
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
    // Esta sección genera el footer:
    createElement(
      Container,
      null,
      createElement(Add, {
        tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
        addElem: (choice) => {
          if (choice === "card") {
            addCardObj({
              schema: schemaData,
              uischema: uiSchemaData,
              mods: mods,
              onChange: (newSchema, newUiSchema) =>
                onChange(stringify(newSchema), stringify(newUiSchema)),
              definitionData: schemaData.definitions,
              definitionUi: uiSchemaData.definitions,
              categoryHash,
            });
          } else if (choice === "section") {
            addSectionObj({
              schema: schemaData,
              uischema: uiSchemaData,
              onChange: (newSchema, newUiSchema) =>
                onChange(stringify(newSchema), stringify(newUiSchema)),
              definitionData: schemaData.definitions,
              definitionUi: uiSchemaData.definitions,
              categoryHash,
            });
          }
        },
        hidden:
          schemaData.properties &&
          Object.keys(schemaData.properties).length !== 0,
      })
    )
  );
}
