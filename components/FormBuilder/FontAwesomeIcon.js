import React__default from "react";
import { FontAwesomeIcon as FontAwesomeIcon$1 } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const _excluded = ["className"];

export default function FontAwesomeIcon(_ref) {
  let { className } = _ref,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const props = Object.assign(
    {
      className: classnames([className, "fa"]),
    },
    otherProps
  );
  return /*#__PURE__*/ React__default.createElement(FontAwesomeIcon$1, props);
}
