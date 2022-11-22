import * as Mui from "@material-ui/core";
import * as Icons from "@material-ui/icons";

import * as React from "react";
import React__default, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Input } from "reactstrap";
import { createUseStyles } from "react-jss";

// Importar componentes:
import FBCheckbox from "./FormBuilder/FBCheckbox";
import Example from "./FormBuilder/Example";
import RefChoice from "./FormBuilder/RefChoice";
import CardReferenceParameterInputs from "./FormBuilder/CardReferenceParameterInputs";
import CardArrayParameterInputs from "./FormBuilder/CardArrayParameterInput";
import CardShortAnswerParameterInputs from "./FormBuilder/CardShortAnswerParameterInputs";
import PlaceholderInput from "./FormBuilder/PlaceholderInput";
import Add from "./FormBuilder/Add";
import Card from "./FormBuilder/Card";
import Section from "./FormBuilder/Section";
import Checkbox from "./FormBuilder/Checkbox";
import ShortAnswerField from "./FormBuilder/ShortAnswerField";
import MultipleChoice from "./FormBuilder/MultipleChoice";
import Password from "./FormBuilder/Password";
import LongAnswer from "./FormBuilder/LongAnswer";
import NumberField from "./FormBuilder/NumberField";

// Importar Utils:
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

// specify the inputs required for a string type object
function CardDefaultParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ React.createElement("div", null);
}
const getInputCardBodyComponent = ({ type }) =>
  function InputCardBodyComponent({ parameters, onChange }) {
    return /*#__PURE__*/ React.createElement(
      React.Fragment,
      null,
      /*#__PURE__*/ React.createElement("h5", null, "Default value"),
      /*#__PURE__*/ React.createElement(Input, {
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

const arrows = {
  "& .arrows": {
    float: "right",
    "& .fa-arrow-up, & .fa-arrow-down": {
      "border-radius": "4px",
      padding: ".25em",
      margin: "0 .5em 0 0",
      border: "1px solid #1d71ad",
      color: "#1d71ad",
      height: "28px",
      width: "28px",
    },
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

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    /*#__PURE__*/ React__default.createElement("h4", null, "Minimum Length"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.minLength ? parameters.minLength : "",
      placeholder: "Minimum Length",
      key: "minLength",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            minLength: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement("h4", null, "Maximum Length"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.maxLength ? parameters.maxLength : "",
      placeholder: "Maximum Length",
      key: "maxLength",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            maxLength: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Regular Expression Pattern",
      " ",
      /*#__PURE__*/ React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
        },
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_regex`,
          type: "help",
          text: "Regular expression pattern that this must satisfy",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.pattern ? parameters.pattern : "",
      placeholder: "Regular Expression Pattern",
      key: "pattern",
      type: "text",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            pattern: ev.target.value,
          })
        );
      },
      className: "card-modal-text",
    }),
    /*#__PURE__*/ React__default.createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-modal-boolean",
      },
      /*#__PURE__*/ React__default.createElement(FBCheckbox, {
        onChangeValue: () => {
          onChange(
            _extends({}, parameters, {
              "ui:autofocus": parameters["ui:autofocus"]
                ? parameters["ui:autofocus"] !== true
                : true,
            })
          );
        },
        isChecked: parameters["ui:autofocus"]
          ? parameters["ui:autofocus"] === true
          : false,
        label: "Auto Focus",
      })
    )
  );
}

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

// specify the inputs required for a number type object
function CardNumberParameterInputs({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Multiple of",
      " ",
      /*#__PURE__*/ React__default.createElement(Example, {
        id: `${elementId}_multiple`,
        type: "help",
        text: "Require number to be a multiple of this number",
      })
    ),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.multipleOf ? parameters.multipleOf : "",
      placeholder: "ex: 2",
      key: "multipleOf",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        onChange(
          _extends({}, parameters, {
            multipleOf: newVal,
          })
        );
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement("h4", null, "Minimum"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.minimum || parameters.exclusiveMinimum || "",
      placeholder: "ex: 3",
      key: "minimum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either min or exclusiveMin depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange(
            _extends({}, parameters, {
              exclusiveMinimum: newVal,
              minimum: null,
            })
          );
        } else {
          onChange(
            _extends({}, parameters, {
              minimum: newVal,
              exclusiveMinimum: null,
            })
          );
        }
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-modal-boolean",
      },
      /*#__PURE__*/ React__default.createElement(FBCheckbox, {
        key: "exclusiveMinimum",
        onChangeValue: () => {
          const newMin = parameters.minimum || parameters.exclusiveMinimum;
          if (parameters.exclusiveMinimum) {
            onChange(
              _extends({}, parameters, {
                exclusiveMinimum: null,
                minimum: newMin,
              })
            );
          } else {
            onChange(
              _extends({}, parameters, {
                exclusiveMinimum: newMin,
                minimum: null,
              })
            );
          }
        },
        isChecked: !!parameters.exclusiveMinimum,
        disabled: !parameters.minimum && !parameters.exclusiveMinimum,
        label: "Exclusive Minimum",
      })
    ),
    /*#__PURE__*/ React__default.createElement("h4", null, "Maximum"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.maximum || parameters.exclusiveMaximum || "",
      placeholder: "ex: 8",
      key: "maximum",
      type: "number",
      onChange: (ev) => {
        let newVal = parseFloat(ev.target.value);
        if (Number.isNaN(newVal)) newVal = null;
        // change either max or exclusiveMax depending on which one is active
        if (parameters.exclusiveMinimum) {
          onChange(
            _extends({}, parameters, {
              exclusiveMaximum: newVal,
              maximum: null,
            })
          );
        } else {
          onChange(
            _extends({}, parameters, {
              maximum: newVal,
              exclusiveMaximum: null,
            })
          );
        }
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-modal-boolean",
      },
      /*#__PURE__*/ React__default.createElement(FBCheckbox, {
        key: "exclusiveMaximum",
        onChangeValue: () => {
          const newMax = parameters.maximum || parameters.exclusiveMaximum;
          if (parameters.exclusiveMaximum) {
            onChange(
              _extends({}, parameters, {
                exclusiveMaximum: null,
                maximum: newMax,
              })
            );
          } else {
            onChange(
              _extends({}, parameters, {
                exclusiveMaximum: newMax,
                maximum: null,
              })
            );
          }
        },
        isChecked: !!parameters.exclusiveMaximum,
        disabled: !parameters.maximum && !parameters.exclusiveMaximum,
        label: "Exclusive Maximum",
      })
    )
  );
}

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
    const [cardOpen, setCardOpen] = React__default.useState(false);
    if (parameters.type !== "array") {
      return /*#__PURE__*/ React__default.createElement(
        "h4",
        null,
        "Not an array "
      );
    }
    return /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "card-array",
      },
      /*#__PURE__*/ React__default.createElement(FBCheckbox, {
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
          /*#__PURE__*/ React__default.createElement(
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

const useStyles$1 = createUseStyles({
  formBuilder: _extends(
    {
      "text-align": "center",
      "& .fa": {
        cursor: "pointer",
      },
      "& .fa-question-circle, & .fa-circle-question": {
        color: "gray",
      },
      "& .fa-asterisk": {
        "font-size": ".9em",
        color: "green",
      },
      "& .fa-plus-square, & .fa-square-plus": {
        color: "green",
        "font-size": "1.5em",
        margin: "0 auto",
      },
    },
    arrows,
    {
      "& .card-container": {
        "&:hover": {
          border: "1px solid green",
        },
        display: "block",
        width: "70%",
        "min-width": "400px",
        margin: "2em auto",
        border: "1px solid gray",
        "border-radius": "4px",
        "background-color": "white",
        "& h4": {
          width: "100%",
          "text-align": "left",
          display: "inline-block",
          color: "#138AC2",
          margin: "0.25em .5em 0 .5em",
          "font-size": "18px",
        },
        "& .d-flex": {
          "border-bottom": "1px solid gray",
        },
        "& .label": {
          float: "left",
        },
      },
      "& .card-container:hover": {
        border: "1px solid green",
      },
      "& .card-dependent": {
        border: "1px dashed gray",
      },
      "& .card-requirements": {
        border: "1px dashed black",
      },
      "& .section-container": {
        "&:hover": {
          border: "1px solid green",
        },
        display: "block",
        width: "90%",
        "min-width": "400px",
        margin: "2em auto",
        border: "1px solid gray",
        "border-radius": "4px",
        "background-color": "white",
        "& h4": {
          width: "100%",
          "text-align": "left",
          display: "inline-block",
          color: "#138AC2",
          margin: "0.25em .5em 0 .5em",
          "font-size": "18px",
        },
        "& .d-flex": {
          "border-bottom": "1px solid gray",
        },
        "& .label": {
          float: "left",
        },
      },
      "& .section-container:hover": {
        border: "1px solid green",
      },
      "& .section-dependent": {
        border: "1px dashed gray",
      },
      "& .section-requirements": {
        border: "1px dashed black",
      },
      "& .alert": {
        textAlign: "left",
        width: "70%",
        margin: "1em auto",
        "& h5": {
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          margin: "0",
        },
        "& .fa": {
          fontSize: "14px",
        },
      },
      "& .disabled-unchecked-checkbox": {
        color: "gray",
        "& div::before": {
          backgroundColor: "lightGray",
        },
      },
      "& .disabled-input": {
        "& input": {
          backgroundColor: "lightGray",
        },
        "& input:focus": {
          backgroundColor: "lightGray",
          border: "1px solid gray",
        },
      },
    }
  ),
  formHead: {
    display: "block",
    margin: "0 auto",
    "background-color": "#EBEBEB",
    border: "1px solid #858F96",
    "border-radius": "4px",
    width: "70%",
    padding: "10px",
    "& div": {
      width: "30%",
      display: "inline-block",
      "text-align": "left",
      padding: "10px",
    },
    "& .form-title": {
      "text-align": "left",
    },
    "& .form-description": {
      "text-align": "left",
    },
    "& h5": {
      "font-size": "14px",
      "line-height": "21px",
      "font-weight": "bold",
    },
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    "& .fa-pencil-alt, & .fa-pencil": {
      border: "1px solid #1d71ad",
      color: "#1d71ad",
    },
    "& .modal-body": {
      maxHeight: "500px",
      overflowY: "scroll",
    },
    "& .card-add": {
      cursor: "pointer",
      display: "block",
      color: "$green",
      fontSize: "1.5em",
    },
  },
  formFooter: {
    marginTop: "1em",
    textAlign: "center",
    "& .fa": {
      cursor: "pointer",
      color: "$green",
      fontSize: "1.5em",
    },
  },
});

export default function FormBuilder({ schema, uischema, onChange, mods }) {
  const classes = useStyles$1();
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
  const [cardOpenArray, setCardOpenArray] = React.useState(
    defaultCollapseStates
  );
  const categoryHash = generateCategoryHash(allFormInputs);
  // Esta sección genera las alertas:
  return /*#__PURE__*/ React.createElement(
    Mui.Container,
    /*{
      className: `${classes.formBuilder} ${className || ""}`,
    },*/
    /*#__PURE__*/ React.createElement(
      Mui.Alert,
      {
        style: {
          display: unsupportedFeatures.length === 0 ? "none" : "block",
        },
        color: "warning",
      },
      /*#__PURE__*/ React.createElement("h5", null, "Unsupported Features:"),
      unsupportedFeatures.map((message, index) =>
        /*#__PURE__*/ React.createElement(
          "li",
          {
            key: index,
          },
          message
        )
      )
    ),
    // Esta sección genera el Header, con el título y la descripción:
    (!mods || mods.showFormHead !== false) &&
      /*#__PURE__*/ React.createElement(
        Mui.Grid,
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
        /*#__PURE__*/ React.createElement(
          Mui.Grid,
          { item: true, align: "center" },
          /*#__PURE__*/ React.createElement(
            "h5",
            {
              "data-test": "form-name-label",
            },
            mods && mods.labels && typeof mods.labels.formNameLabel === "string"
              ? mods.labels.formNameLabel
              : "Form Name"
          ),
          /*#__PURE__*/ React.createElement(Mui.Input, {
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
        /*#__PURE__*/ React.createElement(
          Mui.Grid,
          { item: true, align: "center" },
          /*#__PURE__*/ React.createElement(
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
          /*#__PURE__*/ React.createElement(Mui.Input, {
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
    /*#__PURE__*/ React.createElement(
      Mui.Container,
      {
        //className: `form-body ${classes.formBody}`,
      },
      // "DragDropContext" es un componenete del módulo "beautiful-dnd" y habilita las acciones de drag and drop.
      /*#__PURE__*/ React.createElement(
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
          // className: "form-body",
        },
        // "Droppable" es un componenete del módulo "beautiful-dnd" que habilita un área donde un elemento puede dropearse.
        /*#__PURE__*/ React.createElement(
          Droppable,
          {
            droppableId: "droppable",
          },
          // Cada Dropabble va a tener dentro un input del form
          (providedDroppable) =>
            /*#__PURE__*/ React.createElement(
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
                Card,
                Section,
              }).map((element, index) =>
                // Mapea el array y crea un elemento con cada uno.
                // "Draggable" es un elemento arrastrable del módulo "beautiful-dnd".
                /*#__PURE__*/ React.createElement(
                  Draggable,
                  {
                    key: element.key,
                    draggableId: element.key,
                    index: index,
                  },
                  (providedDraggable) =>
                    /*#__PURE__*/ React.createElement(
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
    // Esta sección genera el footer (que en este momento esta vacío):
    /*#__PURE__*/ React.createElement(
      Mui.Container,
      {
        //className: `form-footer ${classes.formFooter}`,
      },
      /*#__PURE__*/ React.createElement(Add, {
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
