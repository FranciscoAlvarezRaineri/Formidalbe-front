import React__default from "react";

// import { Input } from "reactstrap";
import { Input } from '@material-ui/core'

import _extends from "../FormBuilderUtils/_extends";

const formatTypeDictionary = {
  email: "email",
  url: "uri",
};

export default function ShortAnswerField({ parameters, onChange }) {
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement("h5", null, "Default value"),
    /*#__PURE__*/ React__default.createElement(Input, {
      value: parameters.default,
      placeholder: "Default",
      color: "secondary",
      type: "text",
      type: formatTypeDictionary[parameters.format] || "text",
      onChange: (ev) =>
        onChange(
          _extends({}, parameters, {
            default: ev.target.value,
          })
        ),
      // className: "card-text",
    })
  );
}
