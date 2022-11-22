import React__default from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";

import { Collapse as Collapse$1 } from "reactstrap";
import { createUseStyles } from "react-jss";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

const useStyles$b = createUseStyles({
  collapseElement: {
    "& .disabled": {
      ".toggle-collapse": {
        cursor: "default",
      },
    },
    "& h4": {
      marginTop: "7px",
      padding: "13px 10px 10px 10px",
    },
    "& .toggle-collapse": {
      fontSize: "2.3rem",
      cursor: "pointer",
      marginLeft: "33px",
      "& .fa-caret-right": {
        marginRight: "9px",
      },
    },
  },
});

export default function Collapse(props) {
  const classes = classnames(
    `collapse-element ${props.className || ""} ${
      useStyles$b().collapseElement
    }`,
    {
      disabled: props.disableToggle,
    }
  );
  return /*#__PURE__*/ React__default.createElement(
    "div",
    {
      className: classes,
    },
    /*#__PURE__*/ React__default.createElement(
      "div",
      {
        className: "d-flex",
      },
      /*#__PURE__*/ React__default.createElement(
        "span",
        {
          className: "toggle-collapse",
        },
        /*#__PURE__*/ React__default.createElement(FontAwesomeIcon, {
          onClick: !props.disableToggle ? props.toggleCollapse : () => {},
          icon: props.isOpen ? faCaretDown : faCaretRight,
        })
      ),
      /*#__PURE__*/ React__default.createElement("h4", null, props.title)
    ),
    /*#__PURE__*/ React__default.createElement(
      Collapse$1,
      {
        isOpen: props.isOpen,
      },
      /*#__PURE__*/ React__default.createElement("div", null, props.children)
    )
  );
}
