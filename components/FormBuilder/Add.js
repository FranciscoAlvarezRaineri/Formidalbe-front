import { createElement, useState } from "react";

import Container from "@material-ui/core/Container";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconAdd from "@material-ui/icons/Add";

import getRandomId from "../FormBuilderUtils/getRandomId";

// Esta función controla el boton para agregar un nuevo elemento:
export default function Add({ addElem }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [elementId] = useState(getRandomId());
  const [anchorEl, setAnchorEl] = useState({});

  return createElement(
    Container,
    null,
    createElement(
      Tooltip,
      {
        title: "Crear sección o elemento nuevo",
        id: `${elementId}_add`,
      },
      createElement(IconAdd, {
        onClick: (event) => {
          setAnchorEl(event.currentTarget);
          setPopoverOpen(true);
        },
      })
    ),
    createElement(
      Popover,
      {
        anchorEl: anchorEl,
        open: popoverOpen,
        toggle: () => setPopoverOpen(false),
        id: `${elementId}_add_popover`,
      },
      createElement(
        Typography,
        { variant: "h5", align: "center" },
        "Crear Nuevo"
      ),
      createElement(
        Container,
        null,
        createElement(
          Button,
          {
            onClick: () => {
              addElem("card");
              setPopoverOpen(false);
            },
            color: "primary",
          },
          "Elemento"
        ),
        createElement(
          Button,
          {
            onClick: () => {
              addElem("section");
              setPopoverOpen(false);
            },
            color: "primary",
          },
          "Sección"
        ),
        createElement(
          Button,
          {
            onClick: () => setPopoverOpen(false),
            color: "secondary",
          },
          "Cancelar"
        )
      )
    )
  );
}
