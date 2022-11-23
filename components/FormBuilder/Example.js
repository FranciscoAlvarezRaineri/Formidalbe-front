import React__default from "react";

import { Tooltip } from '@material-ui/core';
import FontAwesomeIcon from "./FontAwesomeIcon";
import { UncontrolledTooltip } from "reactstrap";
import { createUseStyles } from "react-jss";
import {
  faAsterisk,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const typeMap = {
  alert: faAsterisk,
  help: faQuestionCircle,
};
const useStyles$9 = createUseStyles({
  toolTip: {
    color: "white",
    "background-color": "black",
  },
});
export default function Example({ text, type, id }) {
  const classes = useStyles$9();
  return /*#__PURE__*/ React__default.createElement(
    React__default.Fragment,
    null,
    /*#__PURE__*/ React__default.createElement(
      "span",
      {
        style: {
          textDecoration: "underline",
          color: "blue",
        },
        href: "#",
        id: id,
      },
      /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
        icon: typeMap[type],
      })
    ),
    /*#__PURE__*/ React__default.createElement(
      UncontrolledTooltip,
      {
        autohide: false,
        className: classes.toolTip,
        placement: "top",
        target: id,
      },
      text
    )
  );
}
