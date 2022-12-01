import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createElement, useState } from "react";

import { CardDefaultParameterInputs } from "./defaultInputs";
import FBCheckbox from "../checkbox/FBCheckbox";
import { getRandomId } from "../utils";
import FBRadioGroup from "../radio/FBRadioGroup";

function FileUploadField({ parameters, onChange }) {
  const [accept, setAccept] = useState("");
  const [maxFiles, setMaxFiles] = useState(1);
  const [photosOnly, setPhotosOnly] = useState(false);
  const [capture, setCapture] = useState("user");
  const [editImages, setEditImages] = useState(false);

  const [elementId] = useState(getRandomId());

  return createElement(
    Container,
    null,
    createElement(Typography, { variant: "h6" }, "Formatos aceptados"),
    createElement(Input, {
      type: "text",
      value: accept,
      onChange: (ev) => {
        onChange({
          ...parameters,
          "ui:options": {
            ...parameters["ui:options"],
            accept: ev.target.value,
          },
        });
        setAccept(ev.target.value);
      },
    }),
    createElement(Typography, { variant: "h6" }, "Cantidad másima de archivos"),
    createElement(Input, {
      type: "number",
      value: maxFiles,
      onChange: (ev) => {
        onChange({
          ...parameters,
          "ui:options": {
            ...parameters["ui:options"],
            maxFiles: ev.target.value,
          },
        });
        setMaxFiles(ev.target.value);
      },
    }),
    createElement(FBCheckbox, {
      onChangeValue: () => {
        setPhotosOnly(!photosOnly);
        photosOnly
          ? onChange({
              ...parameters,
              "ui:options": {
                ...parameters["ui:options"],
                photosOnly: false,
              },
            })
          : onChange({
              ...parameters,
              "ui:options": {
                ...parameters["ui:options"],
                photosOnly: true,
              },
            });
      },

      isChecked: photosOnly,
      label: "Solo imágenes",
      id: `${elementId}_isPhotosOnly`,
    }),

    createElement(Typography, { variant: "h6" }, "Captura"),
    createElement(FBRadioGroup, {
      value: capture,
      options: [
        {
          value: "user",
          label: "Usuario",
        },
        {
          value: "environment",
          label: "Ambiente",
        },
      ],
      onChange: (value) => {
        onChange({
          ...parameters,
          "ui:options": {
            ...parameters["ui:options"],
            capture: value,
          },
        });
        setCapture(value);
      },
    }),

    createElement(FBCheckbox, {
      onChangeValue: () => {
        setEditImages(!editImages);
        editImages
          ? onChange({
              ...parameters,
              "ui:options": {
                ...parameters["ui:options"],
                editImages: false,
              },
            })
          : onChange({
              ...parameters,
              "ui:options": {
                ...parameters["ui:options"],
                editImages: true,
              },
            });
      },

      isChecked: editImages,
      label: "Edición de Imagenes",
      id: `${elementId}_editImages`,
    })
  );
}

const fileInsputs = {
  fileUpload: {
    displayName: "File Upload",
    matchIf: [
      {
        types: ["string"],
        widget: "file",
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      "ui:widget": "file",
    },
    type: "string",
    cardBody: FileUploadField,
    modalBody: CardDefaultParameterInputs,
  },
};

export default fileInsputs;
