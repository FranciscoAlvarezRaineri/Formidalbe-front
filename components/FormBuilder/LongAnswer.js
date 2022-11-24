import { createElement, Fragment } from "react";
import Typography from "@material-ui/core/Typography";

import Input from "@material-ui/core/Input";
import makeStyles from "@material-ui/core/styles/makeStyles";

import _extends from "../FormBuilderUtils/_extends";

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

export default function LongAnswer({ parameters, onChange }) {
  const classses = useStyles();
  return createElement(
    Fragment,
    null,
    createElement(Typography, { variant: "h5" }, "Default value"),
    createElement(Input, {
      className: `${classses.root}`,
      value: parameters.default,
      placeholder: "Default",
      type: "text",
      color: "secondary",
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
