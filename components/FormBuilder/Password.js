import React, { createElement } from "react";


import Input from "@material-ui/core/Input";
import Typography from '@material-ui/core/Typography'

import _extends from "../FormBuilderUtils/_extends";

export default function Password({ parameters, onChange }) {
  return /*#__PURE__*/ createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ createElement(Typography,{variant:"h5"}, null, "Default password"),
    /*#__PURE__*/ createElement(Input, {
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
