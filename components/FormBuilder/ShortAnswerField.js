import React, { createElement } from "react";

// import { Input } from "reactstrap";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import _extends from "../FormBuilderUtils/_extends";

const formatTypeDictionary = {
  email: "email",
  url: "uri",
};

const useStyles = makeStyles({
  root: {
    background: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 38,
    padding: "0 30px",
  },
});

export default function ShortAnswerField({ parameters, onChange }) {
  const classses = useStyles();

  return /*#__PURE__*/ createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ createElement(
      Typography,
      { variant: "h5" },
      null,
      "Default value"
    ),
    /*#__PURE__*/ createElement(Input, {
      className: `${classses.root}`,
      value: parameters.default,
      placeholder: "Default",
      color: "primary",
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
