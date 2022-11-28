import { useState, createElement, useEffect } from "react";

import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

// Importar componentes:
import Example from "./Tooltip";
import DependencyField from "./dependencies/DependencyField";

export default function CardModal({
  componentProps,
  onChange,
  isOpen,
  onClose,
  TypeSpecificParameters,
}) {
  // assign state values for parameters that should only change on hitting "Save"
  const [componentPropsState, setComponentProps] = useState(componentProps);
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
          createElement(Typography, { variant: "h5" }, "Additional Settings")
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
            setComponentProps({
              ...componentPropsState,
              ...newState,
            });
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
              setComponentProps({
                ...componentPropsState,
                "ui:column": ev.target.value,
              });
            },
            className: "card-modal-text",
          })
        ),
        createElement(DependencyField, {
          parameters: componentPropsState,
          onChange: (newState) => {
            setComponentProps({
              ...componentPropsState,
              ...newState,
            });
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
