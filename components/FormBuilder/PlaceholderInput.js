import React__default, { useState } from "react";

import Input from "@material-ui/core/Input";

// Importar componentes:
import Example from "./Example";
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

export default function PlaceholderInput({ parameters, onChange }) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement(
      "h4",
      null,
      "Placeholder",
      " ",
      /*#__PURE__*/ React__default.createElement(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        /*#__PURE__*/ React__default.createElement(Example, {
          id: `${elementId}_placeholder`,
          type: "help",
          text: "Hint to the user as to what kind of information is expected in the field",
        })
      )
    ),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters["ui:placeholder"],
      placeholder: "Placeholder",
      key: "placeholder",
      type: "text",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            "ui:placeholder": ev.target.value,
          })
        );
      },
      className: "card-modal-text",
    })
  );
}
