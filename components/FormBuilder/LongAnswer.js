import React__default from "react";

import { Input } from "reactstrap";

import _extends from "../FormBuilderUtils/_extends";

export default function LongAnswer({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement("h5", null, "Default value"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      type: "textarea",
      onChange: (ev) =>
        onChange(
          _extends({}, parameters, {
            default: ev.target.value,
          })
        ),
      className: "card-textarea",
    })
  );
}
