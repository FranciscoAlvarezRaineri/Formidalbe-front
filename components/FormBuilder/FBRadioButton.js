import React__default, { useState } from "react";
import * as Mui from "@material-ui/core";
import classnames from "classnames";
import _extends from "../FormBuilderUtils/_extends";
export default function FBRadioButton(props) {
  const {
    label,
    value,
    checked,
    name,
    onChange,
    required,
    disabled,
    autoFocus,
  } = props;
  const [id] = useState(`radio-${Math.floor(Math.random() * 1000000)}`);
  const classes = classnames("fb-radio-button", {
    disabled,
  });
  return /*#__PURE__*/ React__default.createElement(
    "div",
    // {
    //   className: classes,
    //   key: value,
    // },
    /*#__PURE__*/ React__default.createElement(Mui.Radio, { 
      id: id,
      name: name,
      value: value,
      checked: checked,
      required: required,
      disabled: disabled,
      autoFocus: autoFocus,
      onChange: () => onChange(value),
    }),
    /*#__PURE__*/ React__default.createElement(
      "label",
      {
        htmlFor: id,
      },
      label
    )
  );
}
