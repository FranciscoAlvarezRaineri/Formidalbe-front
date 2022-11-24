import React, { createElement } from "react";

// import { Input } from "reactstrap";
// import * as Mui from "@material-ui/core";
import  Input  from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 38,
    padding: '0 30px',
  },
});

import _extends from "../FormBuilderUtils/_extends";

export default function NumberField({ parameters, onChange }) {


  const classses = useStyles();


  return /*#__PURE__*/ createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ createElement(Typography,{variant:"h5"}, null, "Default number"),
    /*#__PURE__*/ createElement(Input, {
      value: parameters.default,
      className:`${classses.root}`,
      // id:"standard-secondary",
      required: true,
      color: "primary",
      // label:"Standard secondary",
      // placeholder: "Default",
      type: "number",
      // fullWidth: false,
      onChange: (ev) =>
        onChange(
          _extends({}, parameters, {
            default: parseFloat(ev.target.value),
          })
        ),
      // className: "card-number",
    })
  );
}
