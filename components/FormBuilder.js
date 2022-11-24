import { useState, createElement, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Material UI
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";

// Componentes:
import FBCheckbox from "./FormBuilder/FBCheckbox";
import RefChoice from "./FormBuilder/RefChoice";
import CardReferenceParameterInputs from "./FormBuilder/CardReferenceParameterInputs";
import CardArrayParameterInputs from "./FormBuilder/CardArrayParameterInput";
import CardShortAnswerParameterInputs from "./FormBuilder/CardShortAnswerParameterInputs";
import Add from "./FormBuilder/Add";
import Card from "./FormBuilder/Card";
import Section from "./FormBuilder/Section";
import Checkbox from "./FormBuilder/Checkbox";
import ShortAnswerField from "./FormBuilder/ShortAnswerField";
import MultipleChoice from "./FormBuilder/MultipleChoice";
import Password from "./FormBuilder/Password";
import LongAnswer from "./FormBuilder/LongAnswer";
import NumberField from "./FormBuilder/NumberField";
import CardLongAnswerParameterInputs from "./FormBuilder/CardLongAnswerParameterInputs";
import CardNumberParameterInputs from "./FormBuilder/CardNumberParameterInputs";
import CardDefaultParameterInputs from "./FormBuilder/CardDefaultParameterInputs";

// Utils:
import getRandomId from "./FormBuilderUtils/getRandomId";
import checkForUnsupportedFeatures from "./FormBuilderUtils/checkForUnsupportedFeatures";
import countElementsFromSchema from "./FormBuilderUtils/countElementsFromSchema";
import _extends from "./FormBuilderUtils/_extends";
import generateElementComponentsFromSchemas from "./FormBuilderUtils/generateElementComponentsFromSchemas";
import { parse, stringify } from "./FormBuilderUtils/json";
import addCardObj from "./FormBuilderUtils/addCardObj";
import addSectionObj from "./FormBuilderUtils/addSectionObj";
import onDragEnd from "./FormBuilderUtils/onDragEnd";
import generateCategoryHash from "./FormBuilderUtils/generateCategoryHash";
import excludeKeys from "./FormBuilderUtils/excludeKeys";

const getInputCardBodyComponent = ({ type }) =>
  function InputCardBodyComponent({ parameters, onChange }) {
    return createElement(
      Fragment,
      null,
      createElement("h5", null, "Default value"),
      createElement(Input, {
        value: parameters.default || "",
        placeholder: "Default",
        type: type,
        onChange: (ev) =>
          onChange(
            _extends({}, parameters, {
              default: ev.target.value,
            })
          ),
        className: "card-text",
      })
    );
  };

const defaultInputs = {
  dateTime: {
    displayName: "Date-Time",
    matchIf: [
      {
        types: ["string"],
        format: "date-time",
      },
    ],
    defaultDataSchema: {
      format: "date-time",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "datetime-local",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  date: {
    displayName: "Date",
    matchIf: [
      {
        types: ["string"],
        format: "date",
      },
    ],
    defaultDataSchema: {
      format: "date",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "date",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  time: {
    displayName: "Time",
    matchIf: [
      {
        types: ["string"],
        format: "time",
      },
    ],
    defaultDataSchema: {
      format: "time",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: getInputCardBodyComponent({
      type: "time",
    }),
    modalBody: CardDefaultParameterInputs,
  },
  checkbox: {
    displayName: "Checkbox",
    matchIf: [
      {
        types: ["boolean"],
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "boolean",
    cardBody: Checkbox,
    modalBody: CardDefaultParameterInputs,
  },
  radio: {
    displayName: "Radio",
    matchIf: [
      {
        types: ["string", "number", "integer", "array", "boolean", "null"],
        widget: "radio",
        enum: true,
      },
    ],
    defaultDataSchema: {
      enum: [],
    },
    defaultUiSchema: {
      "ui:widget": "radio",
    },
    type: "string",
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs,
  },
  dropdown: {
    displayName: "Dropdown",
    matchIf: [
      {
        types: ["string", "number", "integer", "array", "boolean", "null"],
        enum: true,
      },
    ],
    defaultDataSchema: {
      enum: [],
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs,
  },
};

const shortAnswerInput = {
  shortAnswer: {
    displayName: "Short Answer",
    matchIf: [
      {
        types: ["string"],
      },
      ...["email", "hostname", "uri", "regex"].map((format) => ({
        types: ["string"],
        format,
      })),
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "string",
    cardBody: ShortAnswerField,
    modalBody: CardShortAnswerParameterInputs,
  },
  password: {
    displayName: "Password",
    matchIf: [
      {
        types: ["string"],
        widget: "password",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "password",
    },
    type: "string",
    cardBody: Password,
    modalBody: CardShortAnswerParameterInputs,
  },
};

const longAnswerInput = {
  longAnswer: {
    displayName: "Long Answer",
    matchIf: [
      {
        types: ["string"],
        widget: "textarea",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "textarea",
    },
    type: "string",
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs,
  },
};

const numberInputs = {
  integer: {
    displayName: "Integer",
    matchIf: [
      {
        types: ["integer"],
      },
      {
        types: ["integer"],
        widget: "number",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "integer",
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
  number: {
    displayName: "Number",
    matchIf: [
      {
        types: ["number"],
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: "number",
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
};

function getInnerCardComponent({ defaultFormInputs }) {
  return function InnerCard({ parameters, onChange, mods }) {
    const [elementId] = useState(getRandomId);
    const newDataProps = {};
    const newUiProps = {};
    const allFormInputs = excludeKeys(
      Object.assign(
        {},
        defaultFormInputs,
        (mods && mods.customFormInputs) || {}
      ),
      mods && mods.deactivatedFormInputs
    );

    // parse components into data and ui relevant pieces
    Object.keys(parameters).forEach((propName) => {
      if (propName.startsWith("ui:*")) {
        newUiProps[propName.substring(4)] = parameters[propName];
      } else if (propName.startsWith("ui:")) {
        newUiProps[propName] = parameters[propName];
      } else if (!["name", "required"].includes(propName)) {
        newDataProps[propName] = parameters[propName];
      }
    });
    const definitionData = parameters.definitionData
      ? parameters.definitionData
      : {};
    const definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
    const [cardOpen, setCardOpen] = useState(true);
    if (parameters.type !== "array") {
      return createElement("h4", null, "Not an array ");
    }
    return createElement(
      "div",
      {
        className: "card-array",
      },
      createElement(FBCheckbox, {
        onChangeValue: () => {
          if (newDataProps.items.type === "object") {
            onChange(
              _extends({}, parameters, {
                items: _extends({}, newDataProps.items, {
                  type: "string",
                }),
              })
            );
          } else {
            onChange(
              _extends({}, parameters, {
                items: _extends({}, newDataProps.items, {
                  type: "object",
                }),
              })
            );
          }
        },
        isChecked: newDataProps.items.type === "object",
        label: "Section",
        id: `${elementId}_issection`,
      }),
      generateElementComponentsFromSchemas({
        schemaData: {
          properties: {
            item: newDataProps.items,
          },
        },
        uiSchemaData: {
          item: newUiProps.items,
        },
        onChange: (schema, uischema) => {
          onChange(
            _extends({}, parameters, {
              items: schema.properties.item,
              "ui:*items": uischema.item || {},
            })
          );
        },
        path: elementId,
        definitionData,
        definitionUi,
        hideKey: true,
        cardOpenArray: [cardOpen],
        setCardOpenArray: (newArr) => setCardOpen(newArr[0]),
        allFormInputs,
        mods,
        categoryHash: generateCategoryHash(allFormInputs),
        Card: (props) =>
          createElement(
            Card,
            _extends({}, props, {
              showObjectNameInput: false,
            })
          ),
        Section,
      })
    );
  };
}
const defaultFormInputs = _extends(
  {},
  defaultInputs,
  shortAnswerInput,
  longAnswerInput,
  numberInputs
);

defaultFormInputs.array = {
  displayName: "Array",
  matchIf: [
    {
      types: ["array"],
    },
  ],
  defaultDataSchema: {
    items: {
      type: "string",
    },
  },
  defaultUiSchema: {},
  type: "array",
  cardBody: getInnerCardComponent({
    defaultFormInputs,
  }),
  modalBody: CardArrayParameterInputs,
};
const ArrayInputs = {
  array: {
    displayName: "Array",
    matchIf: [
      {
        types: ["array"],
      },
    ],
    defaultDataSchema: {
      items: {
        type: "string",
      },
    },
    defaultUiSchema: {},
    type: "array",
    cardBody: getInnerCardComponent({
      defaultFormInputs,
    }),
    modalBody: CardArrayParameterInputs,
  },
};

const referenceInputs = {
  ref: {
    displayName: "Reference",
    matchIf: [
      {
        types: ["null"],
        $ref: true,
      },
    ],
    defaultDataSchema: {
      $ref: "",
      title: "",
      description: "",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: RefChoice,
    modalBody: CardReferenceParameterInputs,
  },
};

const DEFAULT_FORM_INPUTS = _extends(
  {},
  defaultInputs,
  referenceInputs,
  shortAnswerInput,
  longAnswerInput,
  numberInputs,
  ArrayInputs
);
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
                key: `${elementId}_${message}`,
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
          //className: classes.formHead,
          container: true,
          columns: 2,
          spacing: 10,
          justifyContent: "center",
          marginTop: 25,
          //"data-test": "form-head",
        },
        // Esta sección genera el input para cambiar el título del formulario
        createElement(
          Grid,
          { item: true, align: "center" },
          createElement(
            "h5",
            {
              "data-test": "form-name-label",
            },
            mods && mods.labels && typeof mods.labels.formNameLabel === "string"
              ? mods.labels.formNameLabel
              : "Form Name"
          ),
          createElement(Input, {
            value: schemaData.title || "",
            placeholder: "Title",
            type: "text",
            onChange: (ev) => {
              onChange(
                stringify(
                  _extends({}, schemaData, {
                    title: ev.target.value,
                  })
                ),
                uischema
              );
            },
            //className: "form-title",
          })
        ),
        // Esta sección genera el input para cambiar la descripición del formulario
        createElement(
          Grid,
          { item: true, align: "center" },
          createElement(
            "h5",
            {
              "data-test": "form-description-label",
            },
            mods &&
              mods.labels &&
              typeof mods.labels.formDescriptionLabel === "string"
              ? mods.labels.formDescriptionLabel
              : "Form Description"
          ),
          createElement(Input, {
            value: schemaData.description || "",
            placeholder: "Description",
            type: "text",
            onChange: (ev) =>
              onChange(
                stringify(
                  _extends({}, schemaData, {
                    description: ev.target.value,
                  })
                ),
                uischema
              ),
            //className: "form-description",
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
              _extends(
                {
                  ref: providedDroppable.innerRef,
                },
                providedDroppable.droppableProps
              ),
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
