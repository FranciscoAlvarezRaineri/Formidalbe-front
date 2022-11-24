import React, { createElement } from "react";

import Select from "react-select";
import Container from '@material-ui/core/Container'
// import Select from '@material-ui/core/Select'

import _extends from "../FormBuilderUtils/_extends";

export default function RefChoice({ parameters, onChange }) {
  const pathArr = (parameters.$ref || "").split("/");
  const currentValueLabel =
    pathArr.length === 3 &&
    pathArr[0] === "#" &&
    pathArr[1] === "definitions" &&
    (parameters.definitionData || {})[pathArr[2]]
      ? parameters.definitionData[pathArr[2]].title || parameters.$ref
      : parameters.$ref;
  return /*#__PURE__*/ createElement(
    Container,
    {
      className: "card-select",
    },
    /*#__PURE__*/ createElement(Select, {
      value: {
        value: parameters.$ref,
        label: currentValueLabel, 
      },
      placeholder: "Reference",
      options: Object.keys(parameters.definitionData || {}).map((key) => ({
        value: `#/definitions/${key}`,
        label: parameters.definitionData[key].title || `#/definitions/${key}`,
      })),
      onChange: (val) => {
        onChange(
          _extends({}, parameters, {
            $ref: val.value,
          })
        );
      },
      className: "card-select",
    })
  );
}
