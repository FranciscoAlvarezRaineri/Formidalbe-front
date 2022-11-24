import {createElement} from "react";
import _extends from "../FormBuilderUtils/_extends";
import { Input , Typography} from "@material-ui/core";

// specify the inputs required for a string type object
export default function CardArrayParameterInputs({ parameters, onChange }) {
  return /*#__PURE__*/ createElement(
    "div",
    null,
    /*#__PURE__*/ createElement(
      Typography,{variant:"h6"}
      , null, "Minimum Items"),
    /*#__PURE__*/ createElement(Input, {
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
    /*#__PURE__*/ createElement(Typography,{variant:"h6"}
      , null, "Maximum Items"),
    /*#__PURE__*/ createElement(Input, {
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