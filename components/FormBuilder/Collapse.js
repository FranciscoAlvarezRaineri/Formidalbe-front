import * as Mui from "@material-ui/core";
import * as Icon from "@material-ui/icons";

import React__default from "react";

import { createUseStyles } from "react-jss";
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
  return React__default.createElement(
    "div",
    null,
    React__default.createElement(
      "span",
      null,
      React__default.createElement(
        "span",
        null,
        props.isOpen
          ? React__default.createElement(Icon.ExpandLess, {
              onClick: !props.disableToggle ? props.toggleCollapse : () => {},
            })
          : React__default.createElement(Icon.ExpandMore, {
              onClick: !props.disableToggle ? props.toggleCollapse : () => {},
            })
      ),
      React__default.createElement(
        Mui.Typography,
        { variant: "h5", display: "inline" },
        props.title
      )
    ),
    React__default.createElement(
      Mui.Collapse,
      { in: props.isOpen },
      React__default.createElement(Mui.Container, null, props.children)
    )
  );
}

/*export default function Collapse(props) {
  const classes = classnames(
    `collapse-element ${props.className || ""} ${
      useStyles$b().collapseElement
    }`,
    {
      disabled: props.disableToggle,
    }
  );
  return React__default.createElement(
    "div",
    null,
    React__default.createElement(
      "div",
      {
        className: "d-flex",
      },
      React__default.createElement(
        "span",
        {
          className: "toggle-collapse",
        },
        React__default.createElement(FontAwesomeIcon, {
          onClick: !props.disableToggle ? props.toggleCollapse : () => {},
          icon: props.isOpen ? faCaretDown : faCaretRight,
        })
      ),
      React__default.createElement("h4", null, props.title)
    ),
    React__default.createElement(
      Collapse$1,
      {
        isOpen: props.isOpen,
      },
      React__default.createElement("div", null, props.children)
    )
  );
}*/
