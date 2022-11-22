import * as Mui from "@material-ui/core";
import React__default, { useState } from "react";

import {
  UncontrolledTooltip,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { createUseStyles } from "react-jss";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

// Importar componentes:
import FontAwesomeIcon from "./FontAwesomeIcon";
import FBRadioGroup from "./FBRadioGroup";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";

const useStyles$5 = createUseStyles({
  addDetails: {
    "& .popover": {
      width: "300px",
      "z-index": "1051 !important",
      "& .popover-inner": {
        border: "1px solid #1d71ad",
        borderRadius: "4px",
        "& .popover-header": {
          borderBottom: "1px solid #1d71ad",
        },
        "& .action-buttons": {
          display: "flex",
          justifyContent: "space-between",
          marginTop: ".5em",
        },
      },
    },
  },
});

// Esta función controla el boton para agregar un nuevo elemento:
export default function Add({ addElem, hidden, tooltipDescription }) {
  const classes = useStyles$5();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [createChoice, setCreateChoice] = useState("card");
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    Mui.Container,
    {
      /*style: {
          display: hidden ? "none" : "initial",
        },*/
    },
    /*#__PURE__*/ React__default.createElement(
      "span",
      {
        id: `${elementId}_add`,
      },
      /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
        icon: faPlusSquare,
        onClick: () => setPopoverOpen(true),
      })
    ),
    /*#__PURE__*/ React__default.createElement(
      UncontrolledTooltip,
      {
        placement: "top",
        target: `${elementId}_add`,
      },
      tooltipDescription || "Create new form element"
    ),
    /*#__PURE__*/ React__default.createElement(
      Popover,
      {
        placement: "bottom",
        target: `${elementId}_add`,
        isOpen: popoverOpen,
        toggle: () => setPopoverOpen(false),
        className: `add-details ${classes.addDetails}`,
        id: `${elementId}_add_popover`,
      },
      /*#__PURE__*/ React__default.createElement(
        PopoverHeader,
        null,
        "Create New"
      ),
      /*#__PURE__*/ React__default.createElement(
        PopoverBody,
        null,
        /*#__PURE__*/ React__default.createElement(FBRadioGroup, {
          className: "choose-create",
          defaultValue: createChoice,
          horizontal: false,
          options: [
            {
              value: "card",
              label: "Form element",
            },
            {
              value: "section",
              label: "Form section",
            },
          ],
          onChange: (selection) => {
            setCreateChoice(selection);
          },
        }),
        /*#__PURE__*/ React__default.createElement(
          "div",
          {
            className: "action-buttons",
          },
          /*#__PURE__*/ React__default.createElement(
            Button,
            {
              onClick: () => setPopoverOpen(false),
              color: "secondary",
            },
            "Cancel"
          ),
          /*#__PURE__*/ React__default.createElement(
            Button,
            {
              onClick: () => {
                addElem(createChoice);
                setPopoverOpen(false);
              },
              color: "primary",
            },
            "Create"
          )
        )
      )
    )
  );
}
