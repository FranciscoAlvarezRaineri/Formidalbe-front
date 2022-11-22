import * as React from "react";

import FBCheckbox from "./FBCheckbox";
import _extends from "../FormBuilderUtils/_extends";

export default function Checkbox({ parameters, onChange }) {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "card-boolean",
    },
    /*#__PURE__*/ React.createElement(FBCheckbox, {
      onChangeValue: () => {
        onChange(
          _extends({}, parameters, {
            default: parameters.default ? parameters.default !== true : true,
          })
        );
      },
      isChecked: parameters.default ? parameters.default === true : false,
      label: "Default",
    })
  );
}
