import { createElement, Fragment } from "react";

import Tooltip from "@material-ui/core/Tooltip";
import Help from "@material-ui/icons/Help";
import Error from "@material-ui/icons/Error";

export default function Example({ text, type, id }) {
  return createElement(
    Fragment,
    null,
    createElement(
      Tooltip,
      { title: text },
      createElement(
        "span",
        {
          id: id,
        },
        type === "alert"
          ? createElement(Error, null)
          : createElement(Help, null)
      )
    )
  );
}
