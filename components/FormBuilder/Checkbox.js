import {createElement} from "react";
import Container from "@material-ui/core/Container"
import FBCheckbox from "./FBCheckbox";
import _extends from "../FormBuilderUtils/_extends";

export default function Checkbox({ parameters, onChange }) {
  return /*#__PURE__*/ createElement(
    Container,
    {
     // className: "card-boolean",
    },
    /*#__PURE__*/ createElement(FBCheckbox, {
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
