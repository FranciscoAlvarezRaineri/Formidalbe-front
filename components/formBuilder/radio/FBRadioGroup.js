import { createElement } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FBRadioButton from "./FBRadioButton";

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
  return createElement(
    RadioGroup,
    {
      id: id,
      className: "fb-radio-group",
      defaultValue: defaultValue,
    },
    options.map((option, index) =>
      createElement(FBRadioButton, {
        value: option.value,
        label: option.label,
        id: id,
        name: name,
        key: option.value,
        autoFocus: autoFocus && index === 1,
        onChange: onChange,
        disabled: disabled,
      })
    )
  );
}
