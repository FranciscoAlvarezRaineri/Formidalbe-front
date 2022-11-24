import {createElement} from "react";

import PlaceholderInput from "./PlaceholderInput";

export default function CardReferenceParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ createElement(
    "div",
    null,
    /*#__PURE__*/ createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    })
  );
}
