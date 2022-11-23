import React__default from "react";

import PlaceholderInput from "./PlaceholderInput";

export default function CardReferenceParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    "div",
    null,
    /*#__PURE__*/ React__default.createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    })
  );
}
