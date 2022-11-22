import React__default from "react";

import { Input } from "reactstrap";

import _extends from "../FormBuilderUtils/_extends";

export default function Password({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement("h5", null, "Default password"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      type: "password",
      onChange: (ev) =>
        onChange(
          _extends({}, parameters, {
            default: ev.target.value,
          })
        ),
      className: "card-text",
    })
  );
}
