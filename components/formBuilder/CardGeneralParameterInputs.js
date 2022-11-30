import { useState, createElement, Fragment } from "react";

import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Box} from "@material-ui/core";
import {InputLabel} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {FormControl} from '@material-ui/core';
import {Select} from '@material-ui/core';


// Importar componentes:
import GeneralParameterInputs from "./GeneralParameterInputs";
import Example from "./Tooltip";

// Importar Utils:
import {
  defaultUiProps,
  defaultDataProps,
  categoryToNameMap,
  categoryType,
  subtractArray,
  getRandomId,
} from "./utils";
import { useAutocomplete } from "@material-ui/lab";

//import Select from "react-select";

// specify the inputs required for any type of object
export default function CardGeneralParameterInputs({
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
  const objectNameLabel = fetchLabel("objectNameLabel", "Nombre del Elemento");
  const displayNameLabel = fetchLabel("displayNameLabel", "Nombre a Visualizar");
  const descriptionLabel = fetchLabel("descriptionLabel", "Descripción");
  const inputTypeLabel = fetchLabel("inputTypeLabel", "Tipo de Input");
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
  return <div/>,
  createElement(
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
                  : "El nombre a visualizar por el Admin",
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
                  onChange({
                    ...parameters,
                    name: value,
                  });
                } else {
                  setKeyState(parameters.name);
                  setKeyError(`"${value}" is already in use.`);
                  onChange({ ...parameters });
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
                : "El nombre a visualizar por el Usuario",
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
            onChange({ ...parameters, title: ev.target.value });
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
                : "Esto aparecerà a modo de ayuda en el formulario",
            id: `${elementId}-descriptioninfo`,
            type: "help",
          })
        ),
        createElement(
          FormGroup,
          null,
          createElement(Input, {
            value: descriptionState || "",
            placeholder: "Descripción",
            type: "text",
            onChange: (ev) => setDescriptionState(ev.target.value),
            onBlur: (ev) => {
              onChange({ ...parameters, description: ev.target.value });
            },
            className: "card-text",
          })
        )
      ),
      createElement(
        "div",
        {
          className: "card-entry",
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
                : "El tipo de input a ser utilizado en el formulario",
            id: `${elementId}-inputinfo`,
            type: "help",
          })
        ),
 
        <Autocomplete
      id="Tipos-de-Inputs"
      options={availableInputTypes()}
      getOptionLabel={(option) => option.label}
      style={{ width: "100%" }}
      
      onChange={ (event,val) => {
                // figure out the new 'type'
              console.log(val)
              //console.log(event)
        const newCategory = val.value;
        const newProps = {
          ...defaultUiProps(newCategory, allFormInputs),
          ...defaultDataProps(newCategory, allFormInputs),
          name: parameters.name,
          required: parameters.required,
        };
        if (newProps.$ref !== undefined && !newProps.$ref) {
          // assign an initial reference
          const firstDefinition = Object.keys(parameters.definitionData)[0];
          newProps.$ref = `#/definitions/${firstDefinition || "empty"}`;
        }
        onChange({
          ...newProps,
          title: newProps.title || parameters.title,
          default: newProps.default || "",
          type: newProps.type || categoryType(newCategory, allFormInputs),
          category: newProps.category || newCategory,
        });
      }}
      renderInput={(params) => <TextField {...params} label="Tipo de Input"  />}
    />,
    //////////////////////ORIGINAL//////////////////////
    //     createElement(Select, {
    //       value: {
    //         value: parameters.category,
    //         label: categoryMap[parameters.category],
    //       },
    //       placeholder: inputTypeLabel,
    //       options: availableInputTypes(),
    //       onChange: (val) => {
    //         // figure out the new 'type'
    //         const newCategory = val.value;
    //         const newProps = {
    //           ...defaultUiProps(newCategory, allFormInputs),
    //           ...defaultDataProps(newCategory, allFormInputs),
    //           name: parameters.name,
    //           required: parameters.required,
    //         };
    //         if (newProps.$ref !== undefined && !newProps.$ref) {
    //           // assign an initial reference
    //           const firstDefinition = Object.keys(parameters.definitionData)[0];
    //           newProps.$ref = `#/definitions/${firstDefinition || "empty"}`;
    //         }
    //         onChange({
    //           ...newProps,
    //           title: newProps.title || parameters.title,
    //           default: newProps.default || "",
    //           type: newProps.type || categoryType(newCategory, allFormInputs),
    //           category: newProps.category || newCategory,
    //         });
    //       },
    //       className: "card-select",
    //     })
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
