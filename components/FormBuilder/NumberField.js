import React__default from "react";

import { Input } from "reactstrap";

import _extends from "../FormBuilderUtils/_extends";

export default function NumberField({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement("h5", null, "Default number"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      type: "number",
      onChange: (ev) =>
        onChange(
          _extends({}, parameters, {
            default: parseFloat(ev.target.value),
          })
        ),
      className: "card-number",
    })
  );
}
