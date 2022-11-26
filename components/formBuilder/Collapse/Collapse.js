import { createElement } from "react";

import Typography from "@material-ui/core/Typography";
import MuiCollapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default function Collapse(props) {
  return createElement(
    "div",
    null,
    createElement(
      "span",
      null,
      createElement(
        "span",
        null,
        props.isOpen
          ? createElement(ExpandLess, {
              onClick: !props.disableToggle ? props.toggleCollapse : () => {},
            })
          : createElement(ExpandMore, {
              onClick: !props.disableToggle ? props.toggleCollapse : () => {},
            })
      ),
      createElement(
        Typography,
        { variant: "h5", display: "inline" },
        props.title
      )
    ),
    createElement(
      MuiCollapse,
      { in: props.isOpen },
      createElement(Container, null, props.children)
    )
  );
}
