import { useState, createElement, Fragment } from "react";

import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Importar componentes:
import Example from "../Tooltip";
import { getRandomId } from "../utils";

export default function PlaceholderInput({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ createElement(
    Fragment,
    null,
    /*#__PURE__*/ createElement(
      Typography,
      { variant: "h4" },
      null,
      "Placeholder",
      " ",
      /*#__PURE__*/ createElement(
        Link,
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        /*#__PURE__*/ createElement(Example, {
          id: `${elementId}_placeholder`,
          type: "help",
          text: "Hint to the user as to what kind of information is expected in the field",
        })
      )
    ),
    /*#__PURE__*/ createElement(Input, {
      value: parameters["ui:placeholder"],
      placeholder: "Placeholder",
      key: "placeholder",
      type: "text",
      onChange: (ev) => {
        onChange({
          ...parameters,
          "ui:placeholder": ev.target.value,
        });
      },
      className: "card-modal-text",
    })
  );
}
