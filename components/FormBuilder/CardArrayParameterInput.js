import React__default from "react";

import { Input } from "reactstrap";

// specify the inputs required for a string type object
export default function CardArrayParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    /*#__PURE__*/ React__default.createElement("h4", null, "Minimum Items"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.minItems || "",
      placeholder: "ex: 2",
      key: "minimum",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            minItems: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    }),
    /*#__PURE__*/ React__default.createElement("h4", null, "Maximum Items"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.maxItems || "",
      placeholder: "ex: 2",
      key: "maximum",
      type: "number",
      onChange: (ev) => {
        onChange(
          _extends({}, parameters, {
            maxItems: parseInt(ev.target.value, 10),
          })
        );
      },
      className: "card-modal-number",
    })
  );
}
