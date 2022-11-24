import  { useState , createElement} from "react";
import {Radio,InputLabel, Container} from "@material-ui/core";
import { createUseStyles } from "react-jss";
import classnames from "classnames";

function FBRadioButton(props) {
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
  return /*#__PURE__*/ createElement(
    "div",
    {
      className: classes,
      key: value,
    },
    /*#__PURE__*/ createElement(Radio, { //pasar a material 
      id: id,
      type: "radio",
      name: name,
      value: value,
      checked: checked,
      required: required,
      disabled: disabled,
      autoFocus: autoFocus,
      onChange: () => onChange(value),
    }),
    /*#__PURE__*/ createElement(
      InputLabel,
      {
        htmlFor: id,
      },
      label
    )
  );
}

// const useStyles$a = createUseStyles({
//   radio: {
//     "& .fb-radio-button": {
//       display: "block",
//       '& input[type="radio"]': {
//         marginRight: "5px",
//         marginBottom: 0,
//         height: "1em",
//         verticalAlign: "middle",
//       },
//       '& input[type="radio"] + label': {
//         marginTop: 0,
//         marginBottom: 0,
//         verticalAlign: "middle",
//       },
//     },
//   },
// });

export default function FBRadioGroup(props) {
  const {
    options,
    defaultValue,
    onChange,
    horizontal,
    id,
    autoFocus,
    disabled,
  } = props;
  const name = Math.random().toString();
  const classjss = useStyles$a();
  const classes = classnames("fb-radio-group", {
    horizontal,
  });
  return /*#__PURE__*/ createElement(
    Container,
    {
      id: id,
      className: `${classes} ${classjss.radio}`,
    },
    options.map((option, index) =>
      /*#__PURE__*/ createElement(FBRadioButton, {
        value: option.value,
        label: option.label,
        id: id,
        name: name,
        key: option.value,
        checked: option.value === defaultValue,
        autoFocus: autoFocus && index === 1,
        onChange: onChange,
        disabled: disabled,
      })
    )
  );
}
