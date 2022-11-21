var React = require('react');
var reactBeautifulDnd = require('react-beautiful-dnd');
var reactstrap = require('reactstrap');
var reactJss = require('react-jss');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var classnames = require('classnames');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var Select = require('react-select');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return n;
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);
var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
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

var useStyles$c = reactJss.createUseStyles({
  checkbox: {
    '& *': {
      display: 'inline-block'
    },
    '& input': {
      marginRight: '5px'
    }
  }
});
function FBCheckbox(_ref) {
  var onChangeValue = _ref.onChangeValue,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    _ref$isChecked = _ref.isChecked,
    isChecked = _ref$isChecked === void 0 ? false : _ref$isChecked,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    _ref$use = _ref.use,
    use = _ref$use === void 0 ? 'action' : _ref$use,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id,
    _ref$dataTest = _ref.dataTest,
    dataTest = _ref$dataTest === void 0 ? '' : _ref$dataTest,
    _ref$labelClassName = _ref.labelClassName,
    labelClassName = _ref$labelClassName === void 0 ? '' : _ref$labelClassName;
  var classjss = useStyles$c();
  var classes = classnames__default["default"]('fb-checkbox', {
    'edit-checkbox': !disabled && use === 'edit',
    'action-checkbox': !disabled && use === 'action',
    'disabled-checked-checkbox': disabled && isChecked,
    'disabled-unchecked-checkbox': disabled && !isChecked
  });
  var potentialCheckboxId = id !== '' ? id : label;
  var checkboxId = potentialCheckboxId !== '' ? potentialCheckboxId : null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    "data-test": "checkbox",
    className: classes + " " + classjss.checkbox
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "checkbox",
    id: checkboxId,
    "data-test": dataTest || undefined,
    onChange: disabled ? function () {} : onChangeValue,
    value: value,
    disabled: disabled,
    checked: isChecked
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "checkbox-overlay"
  }, label && /*#__PURE__*/React__default["default"].createElement("label", {
    htmlFor: checkboxId,
    className: labelClassName || undefined
  }, label)));
}

var _excluded = ["className"];
function FontAwesomeIcon(_ref) {
  var className = _ref.className,
    otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var props = Object.assign({
    className: classnames__default["default"]([className, 'fa'])
  }, otherProps);
  return /*#__PURE__*/React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, props);
}

var useStyles$b = reactJss.createUseStyles({
  collapseElement: {
    '& .disabled': {
      '.toggle-collapse': {
        cursor: 'default'
      }
    },
    '& h4': {
      marginTop: '7px',
      padding: '13px 10px 10px 10px'
    },
    '& .toggle-collapse': {
      fontSize: '2.3rem',
      cursor: 'pointer',
      marginLeft: '33px',
      '& .fa-caret-right': {
        marginRight: '9px'
      }
    }
  }
});
function Collapse(props) {
  var classes = classnames__default["default"]("collapse-element " + (props.className || '') + " " + useStyles$b().collapseElement, {
    disabled: props.disableToggle
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classes
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "toggle-collapse"
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    onClick: !props.disableToggle ? props.toggleCollapse : function () {},
    icon: props.isOpen ? freeSolidSvgIcons.faCaretDown : freeSolidSvgIcons.faCaretRight
  })), /*#__PURE__*/React__default["default"].createElement("h4", null, props.title)), /*#__PURE__*/React__default["default"].createElement(reactstrap.Collapse, {
    isOpen: props.isOpen
  }, /*#__PURE__*/React__default["default"].createElement("div", null, props.children)));
}

function FBRadioButton(props) {
  var label = props.label,
    value = props.value,
    checked = props.checked,
    name = props.name,
    _onChange = props.onChange,
    required = props.required,
    disabled = props.disabled,
    autoFocus = props.autoFocus;
  var _useState = React.useState("radio-" + Math.floor(Math.random() * 1000000)),
    id = _useState[0];
  var classes = classnames__default["default"]('fb-radio-button', {
    disabled: disabled
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classes,
    key: value
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    id: id,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    required: required,
    disabled: disabled,
    autoFocus: autoFocus,
    onChange: function onChange() {
      return _onChange(value);
    }
  }), /*#__PURE__*/React__default["default"].createElement("label", {
    htmlFor: id
  }, label));
}

var useStyles$a = reactJss.createUseStyles({
  radio: {
    '& .fb-radio-button': {
      display: 'block',
      '& input[type="radio"]': {
        marginRight: '5px',
        marginBottom: 0,
        height: '1em',
        verticalAlign: 'middle'
      },
      '& input[type="radio"] + label': {
        marginTop: 0,
        marginBottom: 0,
        verticalAlign: 'middle'
      }
    }
  }
});
function FBRadioGroup(props) {
  var options = props.options,
    defaultValue = props.defaultValue,
    onChange = props.onChange,
    horizontal = props.horizontal,
    id = props.id,
    autoFocus = props.autoFocus,
    disabled = props.disabled;
  var name = Math.random().toString();
  var classjss = useStyles$a();
  var classes = classnames__default["default"]('fb-radio-group', {
    horizontal: horizontal
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    id: id,
    className: classes + " " + classjss.radio
  }, options.map(function (option, index) {
    return /*#__PURE__*/React__default["default"].createElement(FBRadioButton, {
      value: option.value,
      label: option.label,
      id: id,
      name: name,
      key: option.value,
      checked: option.value === defaultValue,
      autoFocus: autoFocus && index === 1,
      onChange: onChange,
      disabled: disabled
    });
  }));
}

var typeMap = {
  alert: freeSolidSvgIcons.faAsterisk,
  help: freeSolidSvgIcons.faQuestionCircle
};
var useStyles$9 = reactJss.createUseStyles({
  toolTip: {
    color: 'white',
    'background-color': 'black'
  }
});
function Example(_ref) {
  var text = _ref.text,
    type = _ref.type,
    id = _ref.id;
  var classes = useStyles$9();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      textDecoration: 'underline',
      color: 'blue'
    },
    href: "#",
    id: id
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: typeMap[type]
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
    autohide: false,
    className: classes.toolTip,
    placement: "top",
    target: id
  }, text));
}

// parse in either YAML or JSON
function parse(text) {
  if (!text) return {};
  return JSON.parse(text);
}

// stringify in either YAML or JSON
function stringify(obj) {
  if (!obj) return '{}';
  return JSON.stringify(obj);
}
function defaultDataProps(category, allFormInputs) {
  return allFormInputs[category].defaultDataSchema;
}
function defaultUiProps(category, allFormInputs) {
  return allFormInputs[category].defaultUiSchema;
}
function categoryType(category, allFormInputs) {
  return allFormInputs[category].type;
}
function getCardBody(category, allFormInputs) {
  return allFormInputs[category] && allFormInputs[category].cardBody || function () {
    return null;
  };
}
function categoryToNameMap(category, allFormInputs) {
  var categoryNameMap = {};
  Object.keys(allFormInputs).forEach(function (inputName) {
    categoryNameMap[inputName] = allFormInputs[inputName].displayName;
  });
  return categoryNameMap;
}
function updateElementNames(elementArray) {
  var elementNames = elementArray.map(function (elem) {
    return elem.name;
  });
  return elementArray.map(function (elem) {
    var newElem = elem;
    newElem.neighborNames = elementNames;
    return newElem;
  });
}
function generateCategoryHash(allFormInputs) {
  var categoryHash = {};
  Object.keys(allFormInputs).forEach(function (categoryName) {
    var formInput = allFormInputs[categoryName];
    formInput.matchIf.forEach(function (match) {
      match.types.forEach(function (type) {
        var hash = "type:" + (type === 'null' ? '' : type) + ";widget:" + (match.widget || '') + ";field:" + (match.field || '') + ";format:" + (match.format || '') + ";$ref:" + (match.$ref ? 'true' : 'false') + ";enum:" + (match["enum"] ? 'true' : 'false');
        if (categoryHash[hash]) {
          throw new Error("Duplicate hash: " + hash);
        }
        categoryHash[hash] = categoryName;
      });
    });
  });
  return categoryHash;
}

// determines a card's category based on it's properties
// mostly useful for reading a schema for the first time
function getCardCategory(cardProps, categoryHash) {
  var currentHash = "type:" + (cardProps.dataOptions.type || '') + ";widget:" + (cardProps.uiOptions['ui:widget'] || '') + ";field:" + (cardProps.uiOptions['ui:field'] || '') + ";format:" + (cardProps.dataOptions.format || '') + ";$ref:" + (cardProps.$ref !== undefined ? 'true' : 'false') + ";enum:" + (cardProps.dataOptions["enum"] ? 'true' : 'false');
  var category = categoryHash[currentHash];
  if (!category) {
    if (cardProps.$ref) return 'ref';
    // eslint-disable-next-line no-console
    console.error("No match for card': " + currentHash + " among set");
    return 'shortAnswer';
  }
  return category;
}

// check for unsupported feature in schema and uischema
var supportedPropertyParameters = new Set(['title', 'description', 'enum', 'minLength', 'maxLength', 'multipleOf', 'minimum', 'maximum', 'format', 'exclusiveMinimum', 'exclusiveMaximum', 'type', 'default', 'pattern', 'required', 'properties', 'items', 'definitions', '$ref', 'minItems', 'maxItems', 'enumNames', 'dependencies', '$id', '$schema', 'meta', 'additionalProperties']);
var supportedUiParameters = new Set(['ui:order', 'ui:widget', 'ui:autofocus', 'ui:autocomplete', 'ui:options', 'ui:field', 'ui:placeholder', 'ui:column', 'items', 'definitions']);

// recursively called function to check an object for unsupported features
function checkObjectForUnsupportedFeatures(schema, uischema, supportedWidgets, supportedFields, supportedOptions) {
  // add each unsupported feature to this array
  var unsupportedFeatures = [];

  // check for unsupported whole object features
  if (schema && typeof schema === 'object') Object.keys(schema).forEach(function (property) {
    if (!supportedPropertyParameters.has(property) && property !== 'properties') unsupportedFeatures.push("Unrecognized Object Property: " + property);
  });
  if (uischema && typeof uischema === 'object') Object.keys(uischema).forEach(function (uiProperty) {
    var propDefined = false;
    // search for the property in the schema properties and dependencies
    if (schema.properties && Object.keys(schema.properties).includes(uiProperty)) propDefined = true;
    if (schema.dependencies) {
      Object.keys(schema.dependencies).forEach(function (dependencyKey) {
        Object.keys(schema.dependencies[dependencyKey]).forEach(function (parameter) {
          if (parameter === 'oneOf') {
            schema.dependencies[dependencyKey].oneOf.forEach(function (grouping) {
              if (grouping.properties) if (Object.keys(grouping.properties).includes(uiProperty)) propDefined = true;
            });
          } else if (parameter === 'properties') {
            if (Object.keys(schema.dependencies[dependencyKey].properties).includes(uiProperty)) propDefined = true;
          }
        });
      });
    }
    if (!propDefined && !supportedUiParameters.has(uiProperty)) unsupportedFeatures.push("Unrecognized UI schema property: " + uiProperty);
  });

  // check for unsupported property parameters
  if (schema.properties) Object.entries(schema.properties).forEach(function (_ref) {
    var parameter = _ref[0],
      element = _ref[1];
    if (element && typeof element === 'object' && element.type && element.type !== 'object') {
      // make sure that the type is valid
      if (!['array', 'string', 'integer', 'number', 'boolean'].includes(element.type)) unsupportedFeatures.push("Unrecognized type: " + element.type + " in " + parameter);
      // check the properties of each property if it is a basic object
      Object.keys(element).forEach(function (key) {
        if (!supportedPropertyParameters.has(key)) unsupportedFeatures.push("Property Parameter: " + key + " in " + parameter);
      });
    } else {
      // check the properties of each property if it is a basic object
      Object.keys(element).forEach(function (key) {
        if (!supportedPropertyParameters.has(key)) unsupportedFeatures.push("Property Parameter: " + key + " in " + parameter);
      });
    }

    // check for unsupported UI components
    if (uischema && uischema[parameter] && element && (!element.type || element.type !== 'object')) {
      // check for unsupported ui properties
      Object.keys(uischema[parameter]).forEach(function (uiProp) {
        if (!supportedUiParameters.has(uiProp)) unsupportedFeatures.push("UI Property: " + uiProp + " for " + parameter);

        // check for unsupported ui widgets
        if (uiProp === 'ui:widget' && !supportedWidgets.has(uischema[parameter][uiProp])) {
          unsupportedFeatures.push("UI Widget: " + uischema[parameter][uiProp] + " for " + parameter);
        }

        // check for unsupported ui fields
        if (uiProp === 'ui:field' && !supportedFields.has(uischema[parameter][uiProp])) unsupportedFeatures.push("UI Field: " + uischema[parameter][uiProp] + " for " + parameter);

        // check unsupported ui option
        if (uiProp === 'ui:options') Object.keys(uischema[parameter]['ui:options']).forEach(function (uiOption) {
          if (!supportedOptions.has(uiOption)) unsupportedFeatures.push("UI Property: ui:options." + uiOption + " for " + parameter);
        });
      });
    }
  });
  return unsupportedFeatures;
}

// parent function that checks for unsupported features in an entire document
function checkForUnsupportedFeatures(schema, uischema, allFormInputs) {
  // add each unsupported feature to this array
  var unsupportedFeatures = [];
  var widgets = [];
  var fields = [];
  var options = [];
  Object.keys(allFormInputs).forEach(function (inputType) {
    allFormInputs[inputType].matchIf.forEach(function (match) {
      if (match.widget && !widgets.includes(match.widget)) widgets.push(match.widget || ''); // || '' is redundant but here to appease flow
      if (match.field && !fields.includes(match.field)) fields.push(match.field || ''); // || '' is redundant but here to appease flow
    });

    if (allFormInputs[inputType].possibleOptions && Array.isArray(allFormInputs[inputType].possibleOptions)) {
      options.push.apply(options, allFormInputs[inputType].possibleOptions);
    }
  });
  var supportedWidgets = new Set(widgets);
  var supportedFields = new Set(fields);
  var supportedOptions = new Set(options);

  // check for unsupported whole form features
  if (schema && typeof schema === 'object' && schema.type === 'object') {
    unsupportedFeatures.push.apply(unsupportedFeatures, checkObjectForUnsupportedFeatures(schema, uischema, supportedWidgets, supportedFields, supportedOptions));
  } else {
    unsupportedFeatures.push('jsonSchema form is not of type object');
  }
  return unsupportedFeatures;
}

// make an element out of the corresponding properties and UI properties
function generateDependencyElement(name, dataProps, uiProperties, requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails // determines whether to use an element's definition details or not.
) {
  if (useDefinitionDetails === void 0) {
    useDefinitionDetails = true;
  }
  var uiProps = _extends({}, uiProperties);
  var newElement = {};
  var elementDetails = dataProps && typeof dataProps === 'object' ? dataProps : {};

  // populate newElement with reference if applicable
  if (elementDetails.$ref !== undefined && definitionData) {
    var pathArr = typeof elementDetails.$ref === 'string' ? elementDetails.$ref.split('/') : [];
    if (pathArr[0] === '#' && pathArr[1] === 'definitions' && definitionData[pathArr[2]] && useDefinitionDetails === true) {
      elementDetails = _extends({}, elementDetails, definitionData[pathArr[2]]);
    }
    var definedUiProps = (definitionUi || {})[pathArr[2]];
    uiProps = _extends({}, definedUiProps || {}, uiProps);
  }
  newElement.name = name;
  newElement.required = requiredNames.includes(name);
  newElement.$ref = typeof elementDetails.$ref === 'string' ? elementDetails.$ref : undefined;
  if (elementDetails.type && elementDetails.type === 'object') {
    // create a section
    newElement.schema = elementDetails;
    newElement.uischema = uiProps || {};
    newElement.propType = 'section';
  } else {
    // create a card
    newElement.dataOptions = elementDetails;
    newElement.uiOptions = uiProps || {};

    // ensure that uiOptions does not have duplicate keys with dataOptions
    var reservedKeys = Object.keys(newElement.dataOptions);
    Object.keys(newElement.uiOptions).forEach(function (uiKey) {
      if (reservedKeys.includes(uiKey)) {
        newElement.uiOptions["ui:*" + uiKey] = newElement.uiOptions[uiKey];
      }
    });
    newElement.dataOptions.category = getCardCategory(newElement, categoryHash);
    newElement.propType = 'card';
  }
  return newElement;
}

// generate an array of element objects from a schema and uischema
function generateElementPropsFromSchemas(parameters) {
  var schema = parameters.schema,
    uischema = parameters.uischema,
    definitionData = parameters.definitionData,
    definitionUi = parameters.definitionUi,
    categoryHash = parameters.categoryHash;
  if (!schema.properties) return [];
  var elementDict = {};
  var requiredNames = schema.required ? schema.required : [];

  // read regular elements from properties
  Object.entries(schema.properties).forEach(function (_ref2) {
    var parameter = _ref2[0],
      element = _ref2[1];
    var newElement = {};
    var elementDetails = element && typeof element === 'object' ? element : {};

    // populate newElement with reference if applicable
    if (elementDetails.$ref !== undefined && definitionData) {
      if (elementDetails.$ref && !elementDetails.$ref.startsWith('#/definitions')) throw new Error("Invalid definition, not at '#/definitions': " + elementDetails.$ref);
      var pathArr = elementDetails.$ref !== undefined ? elementDetails.$ref.split('/') : [];
      if (pathArr[0] === '#' && pathArr[1] === 'definitions' && definitionData[pathArr[2]]) {
        elementDetails = _extends({}, definitionData[pathArr[2]], elementDetails);
      }
      var definedUiProps = (definitionUi || {})[pathArr[2]];
      uischema[parameter] = _extends({}, definedUiProps || {}, uischema[parameter]);
    }
    newElement.name = parameter;
    newElement.required = requiredNames.includes(parameter);
    newElement.$ref = elementDetails.$ref;
    newElement.dataOptions = elementDetails;
    if (elementDetails.type && elementDetails.type === 'object') {
      // create a section
      newElement.schema = elementDetails;
      newElement.uischema = uischema[parameter] || {};
      newElement.propType = 'section';
    } else {
      // create a card
      newElement.uiOptions = uischema[parameter] || {};

      // ensure that uiOptions does not have duplicate keys with dataOptions
      var reservedKeys = Object.keys(newElement.dataOptions);
      Object.keys(newElement.uiOptions).forEach(function (uiKey) {
        if (reservedKeys.includes(uiKey)) {
          newElement.uiOptions["ui:*" + uiKey] = newElement.uiOptions[uiKey];
        }
      });
      newElement.dataOptions.category = getCardCategory(newElement, categoryHash);
      newElement.propType = 'card';
    }
    elementDict[newElement.name] = newElement;
  });
  // read dependent elements from dependencies
  if (schema.dependencies) {
    var useDefinitionDetails = false;
    Object.keys(schema.dependencies).forEach(function (parent) {
      var group = schema.dependencies[parent];
      if (group.oneOf) {
        var possibilityIndex = 0;
        group.oneOf.forEach(function (possibility) {
          if (!(elementDict[parent] || {}).dependents) {
            elementDict[parent] = elementDict[parent] || {};
            elementDict[parent].dependents = [];
          }
          elementDict[parent].dependents.push({
            children: [],
            value: possibility.properties[parent]
          });
          var requiredValues = possibility.required || [];
          Object.entries(possibility.properties).forEach(function (_ref3) {
            var parameter = _ref3[0],
              element = _ref3[1];
            // create a new element if not present in main properties
            if (!elementDict[parameter] || parameter !== parent && Object.keys(elementDict[parameter]).length === 1 && elementDict[parameter].dependents) {
              var newElement = generateDependencyElement(parameter, element, uischema[parameter], requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails);
              if (elementDict[parameter] && elementDict[parameter].dependents) {
                newElement.dependents = elementDict[parameter].dependents;
              }
              newElement.required = requiredValues.includes(newElement.name);
              elementDict[newElement.name] = newElement;
            }
            if (parameter !== parent) {
              var _newElement = elementDict[parameter];
              _newElement.dependent = true;
              _newElement.parent = parent;
              elementDict[parent].dependents[possibilityIndex].children.push(parameter);
            }
          });
          possibilityIndex += 1;
        });
      } else if (group.properties) {
        var requiredValues = group.required || [];
        Object.entries(group.properties).forEach(function (_ref4) {
          var parameter = _ref4[0],
            element = _ref4[1];
          var newElement = generateDependencyElement(parameter, element, uischema[parameter], requiredNames, definitionData, definitionUi, categoryHash, useDefinitionDetails);
          newElement.required = requiredValues.includes(newElement.name);
          newElement.dependent = true;
          newElement.parent = parent;
          elementDict[newElement.name] = newElement;
          if (elementDict[parent]) {
            if (elementDict[parent].dependents) {
              elementDict[parent].dependents[0].children.push(parameter);
            } else {
              elementDict[parent].dependents = [{
                children: [parameter]
              }];
            }
          } else {
            elementDict[parent] = {};
            elementDict[parent].dependents = [{
              children: [parameter]
            }];
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('unsupported dependency type encountered');
      }
    });
  }

  // now reorder in accordance with ui:order if defined
  var cardPropList = [];
  if (uischema['ui:order']) {
    // in case there are any options not in ui:order
    var remainder = [];
    Object.keys(elementDict).forEach(function (name) {
      if (!uischema['ui:order'].includes(name)) remainder.push(elementDict[name]);
    });

    // map ui order elements into the right order
    uischema['ui:order'].forEach(function (name) {
      // if contains the wildcard *, insert remainder cards there
      if (name === '*') {
        remainder.forEach(function (remCard) {
          cardPropList.push(remCard);
        });
      } else if (elementDict[name]) {
        cardPropList.push(elementDict[name]);
      }
    });
  } else {
    Object.keys(elementDict).forEach(function (name) {
      cardPropList.push(elementDict[name]);
    });
  }
  updateElementNames(cardPropList);
  return cardPropList;
}

// determine the number of element objects from schema and uischema
function countElementsFromSchema(schemaData) {
  if (!schemaData.properties) return 0;
  var elementDict = {};
  var elementCount = 0;

  // read regular elements from properties
  Object.entries(schemaData.properties).forEach(function (_ref5) {
    var parameter = _ref5[0];
    elementDict[parameter] = {};
    elementCount += 1;
  });
  // read dependent elements from dependencies
  if (schemaData.dependencies) {
    Object.keys(schemaData.dependencies).forEach(function (parent) {
      var group = schemaData.dependencies[parent];
      if (group.oneOf) {
        var possibilityIndex = 0;
        group.oneOf.forEach(function (possibility) {
          if (!(elementDict[parent] || {}).dependents) {
            elementDict[parent] = elementDict[parent] || {};
            elementDict[parent].dependents = [];
          }
          elementDict[parent].dependents.push({
            children: [],
            value: possibility.properties[parent]
          });
          Object.entries(possibility.properties).forEach(function (_ref6) {
            var parameter = _ref6[0];
            // create a new element if not present in main properties
            if (!Object.keys(elementDict).includes(parameter)) {
              elementDict[parameter] = {};
              elementCount += 1;
            }
            if (parameter !== parent) {
              var newElement = elementDict[parameter];
              newElement.dependent = true;
              newElement.parent = parent;
              elementDict[parent].dependents[possibilityIndex].children.push(parameter);
            }
          });
          possibilityIndex += 1;
        });
      } else if (group.properties) {
        Object.entries(group.properties).forEach(function (_ref7) {
          var parameter = _ref7[0];
          elementDict[parameter] = elementDict[parameter] || {};
          elementCount += 1;
          if (elementDict[parent]) {
            if (elementDict[parent].dependents) {
              elementDict[parent].dependents[0].children.push(parameter);
            } else {
              elementDict[parent].dependents = [{
                children: [parameter]
              }];
            }
          } else {
            elementDict[parent] = {};
            elementDict[parent].dependents = [{
              children: [parameter]
            }];
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.error('unsupported dependency type encountered');
      }
    });
  }
  return elementCount;
}

// convert an element into a schema equivalent
function generateSchemaElementFromElement(element) {
  if (element.$ref !== undefined) {
    var _element$schema, _element$schema$requi;
    var title = element.schema !== undefined && element.schema.title !== undefined ? element.schema.title : element.dataOptions.title;
    var description = element.schema !== undefined && element.schema.description !== undefined ? element.schema.description : element.dataOptions.description;
    var returnElement = {
      $ref: element.$ref,
      title: title,
      description: description
    };
    var length = element == null ? void 0 : (_element$schema = element.schema) == null ? void 0 : (_element$schema$requi = _element$schema.required) == null ? void 0 : _element$schema$requi.length;
    if (length !== undefined && length > 0) {
      returnElement = _extends({}, returnElement, {
        required: element.schema.required
      });
    }
    return returnElement;
  } else if (element.propType === 'card') {
    if (element.dataOptions.category === 'section') {
      return {
        type: 'object'
      };
    } else {
      var prop = {};
      Object.keys(element.dataOptions).forEach(function (key) {
        if (!['category', 'hideKey', 'path', 'definitionData', 'definitionUi', 'allFormInputs'].includes(key) && element.dataOptions[key] !== '') prop[key] = element.dataOptions[key];
      });
      return prop;
    }
  } else if (element.propType === 'section') {
    return element.schema;
  } else {
    throw new Error('Element that is neither card, section, nor ref');
  }
}

// generate a new schema from a complete array of card objects
function generateSchemaFromElementProps(elementArr) {
  if (!elementArr) return {};
  var newSchema = {};
  var props = {};
  var dependencies = {};
  var elementDict = {};
  var dependentElements = new Set([]);
  for (var index = 0; index < elementArr.length; index += 1) {
    var element = elementArr[index];
    elementDict[element.name] = _extends({}, element);
    if (element.dependents) element.dependents.forEach(function (possibility) {
      possibility.children.forEach(function (dependentElement) {
        dependentElements.add(dependentElement);
      });
    });
  }
  Object.keys(elementDict).forEach(function (elementName) {
    var element = elementDict[elementName];
    if (element.dependents && element.dependents[0]) {
      if (element.dependents[0].value) {
        // handle value based case
        dependencies[elementName] = {
          oneOf: element.dependents.map(function (possibility) {
            var _extends2;
            var childrenComponents = {};
            var requiredValues = [];
            possibility.children.forEach(function (child) {
              if (elementDict[child]) {
                childrenComponents[child] = generateSchemaElementFromElement(elementDict[child]);
                if (elementDict[child].required) requiredValues.push(child);
              }
            });
            return {
              properties: _extends((_extends2 = {}, _extends2[elementName] = possibility.value, _extends2), childrenComponents),
              required: requiredValues
            };
          })
        };
      } else {
        // handle definition based case
        var childrenComponents = {};
        var requiredValues = [];
        element.dependents[0].children.forEach(function (child) {
          childrenComponents[child] = generateSchemaElementFromElement(elementDict[child]);
          if (elementDict[child].required) requiredValues.push(child);
        });
        dependencies[elementName] = {
          properties: childrenComponents,
          required: requiredValues
        };
      }
    }
    if (!dependentElements.has(elementName)) props[element.name] = generateSchemaElementFromElement(element);
  });
  newSchema.properties = props;
  newSchema.dependencies = dependencies;
  newSchema.required = elementArr.filter(function (_ref8) {
    var required = _ref8.required,
      dependent = _ref8.dependent;
    return required && !dependent;
  }).map(function (_ref9) {
    var name = _ref9.name;
    return name;
  });
  return newSchema;
}
function generateUiSchemaFromElementProps(elementArr, definitionUi) {
  if (!elementArr) return {};
  var uiSchema = {};
  var uiOrder = [];
  var definitions = definitionUi;
  elementArr.forEach(function (element) {
    uiOrder.push(element.name);
    if (element.$ref !== undefined) {
      // look for the reference
      var pathArr = typeof element.$ref === 'string' ? element.$ref.split('/') : [];
      if (definitions && definitions[pathArr[2]]) uiSchema[element.name] = definitions[pathArr[2]];
    }
    if (element.propType === 'card' && element.uiOptions) {
      Object.keys(element.uiOptions).forEach(function (uiOption) {
        if (!uiSchema[element.name]) uiSchema[element.name] = {};
        if (uiOption.startsWith('ui:*')) {
          uiSchema[element.name][uiOption.substring(4)] = element.uiOptions[uiOption];
        } else {
          uiSchema[element.name][uiOption] = element.uiOptions[uiOption];
        }
      });
    } else if (element.propType === 'section' && Object.keys(element.uischema).length > 0) {
      uiSchema[element.name] = element.uischema;
    }
  });
  uiSchema['ui:order'] = uiOrder;
  return uiSchema;
}
function getCardParameterInputComponentForType(category, allFormInputs) {
  return allFormInputs[category] && allFormInputs[category].modalBody || function () {
    return null;
  };
}

// takes in an array of Card Objects and updates both schemas
function updateSchemas(elementArr, parameters) {
  var schema = parameters.schema,
    uischema = parameters.uischema,
    onChange = parameters.onChange,
    definitionUi = parameters.definitionUi;
  var newSchema = Object.assign(_extends({}, schema), generateSchemaFromElementProps(elementArr));
  var newUiSchema = generateUiSchemaFromElementProps(elementArr, definitionUi);
  if (uischema.definitions) {
    newUiSchema.definitions = uischema.definitions;
  }

  // mandate that the type is an object if not already done
  newSchema.type = 'object';
  onChange(newSchema, newUiSchema);
}
var DEFAULT_INPUT_NAME = 'newInput';

// ensure that each added block has a unique name
function getIdFromElementsBlock(elements) {
  var names = elements.map(function (element) {
    return element.name;
  });
  var defaultNameLength = DEFAULT_INPUT_NAME.length;
  return names.length > 0 ? Math.max.apply(Math, names.map(function (name) {
    if (name.startsWith(DEFAULT_INPUT_NAME)) {
      var index = name.substring(defaultNameLength, name.length);
      var value = Number.parseInt(index);
      if (!isNaN(value)) {
        return value;
      }
    }
    return 0;
  })) + 1 : 1;
}

// given an initial schema, update with a new card appended
function addCardObj(parameters) {
  var schema = parameters.schema,
    uischema = parameters.uischema,
    mods = parameters.mods,
    onChange = parameters.onChange,
    definitionData = parameters.definitionData,
    definitionUi = parameters.definitionUi,
    index = parameters.index,
    categoryHash = parameters.categoryHash;
  var newElementObjArr = generateElementPropsFromSchemas({
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    categoryHash: categoryHash
  });
  var i = getIdFromElementsBlock(newElementObjArr);
  var dataOptions = getNewElementDefaultDataOptions(i, mods);
  var newElement = {
    name: "" + DEFAULT_INPUT_NAME + i,
    required: false,
    dataOptions: dataOptions,
    uiOptions: mods && mods.newElementDefaultUiSchema || {},
    propType: 'card',
    schema: {},
    uischema: {},
    neighborNames: []
  };
  if (index !== undefined && index !== null) {
    newElementObjArr.splice(index + 1, 0, newElement);
  } else {
    newElementObjArr.push(newElement);
  }
  updateSchemas(newElementObjArr, {
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    onChange: onChange
  });
}

// given an initial schema, update with a new section appended
function addSectionObj(parameters) {
  var schema = parameters.schema,
    uischema = parameters.uischema,
    onChange = parameters.onChange,
    definitionData = parameters.definitionData,
    definitionUi = parameters.definitionUi,
    index = parameters.index,
    categoryHash = parameters.categoryHash;
  var newElementObjArr = generateElementPropsFromSchemas({
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    categoryHash: categoryHash
  });
  var i = getIdFromElementsBlock(newElementObjArr);
  var newElement = {
    name: "" + DEFAULT_INPUT_NAME + i,
    required: false,
    dataOptions: {
      title: "New Input " + i,
      type: 'object',
      "default": ''
    },
    uiOptions: {},
    propType: 'section',
    schema: {
      title: "New Input " + i,
      type: 'object'
    },
    uischema: {},
    neighborNames: []
  };
  if (index !== undefined && index !== null) {
    newElementObjArr.splice(index + 1, 0, newElement);
  } else {
    newElementObjArr.push(newElement);
  }
  updateSchemas(newElementObjArr, {
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    onChange: onChange
  });
}

// generate an array of Card and Section components from a schema
function generateElementComponentsFromSchemas(parameters) {
  var schemaData = parameters.schemaData,
    uiSchemaData = parameters.uiSchemaData,
    _onChange = parameters.onChange,
    definitionData = parameters.definitionData,
    definitionUi = parameters.definitionUi,
    hideKey = parameters.hideKey,
    path = parameters.path,
    cardOpenArray = parameters.cardOpenArray,
    setCardOpenArray = parameters.setCardOpenArray,
    allFormInputs = parameters.allFormInputs,
    mods = parameters.mods,
    categoryHash = parameters.categoryHash,
    Card = parameters.Card,
    Section = parameters.Section;
  var schema = parse(stringify(schemaData));
  var uischema = parse(stringify(uiSchemaData));
  if (!schema.properties) return [];
  var elementPropArr = generateElementPropsFromSchemas({
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    categoryHash: categoryHash
  });
  var elementList = elementPropArr.map(function (elementProp, index) {
    var expanded = cardOpenArray && index < cardOpenArray.length && cardOpenArray[index] || false;
    if (elementProp.propType === 'card') {
      // choose the appropriate type specific parameters
      var TypeSpecificParameters = getCardParameterInputComponentForType(elementProp.dataOptions.category || 'string', allFormInputs);

      // add a fully defined card component to the list of components
      return /*#__PURE__*/React__namespace.createElement(Card, {
        componentProps: Object.assign({
          name: elementPropArr[index].name,
          required: elementPropArr[index].required,
          hideKey: hideKey,
          path: path + "_" + elementPropArr[index].name,
          definitionData: definitionData,
          definitionUi: definitionUi,
          neighborNames: elementPropArr[index].neighborNames,
          dependents: elementPropArr[index].dependents,
          dependent: elementPropArr[index].dependent,
          parent: elementPropArr[index].parent
        }, elementPropArr[index].uiOptions, elementPropArr[index].dataOptions),
        key: path + "_" + elementPropArr[index].name,
        TypeSpecificParameters: TypeSpecificParameters,
        onChange: function onChange(newCardObj) {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });

          // extract uiOptions and other properties
          var newDataProps = {};
          var newUiProps = {};
          Object.keys(newCardObj).forEach(function (propName) {
            if (propName.startsWith('ui:')) {
              if (propName.startsWith('ui:*')) {
                newUiProps[propName.substring(4)] = newCardObj[propName];
              } else {
                newUiProps[propName] = newCardObj[propName];
              }
            } else if (!['name', 'required', 'neighborNames', 'dependents', 'dependent', 'parent'].includes(propName)) {
              newDataProps[propName] = newCardObj[propName];
            }
          });
          if (newElementObjArr[index].propType === 'card') {
            var oldElement = newElementObjArr[index];
            newElementObjArr[index] = _extends({}, oldElement, {
              dataOptions: newDataProps,
              uiOptions: newUiProps,
              required: newCardObj.required,
              dependents: newCardObj.dependents,
              dependent: newCardObj.dependent,
              parent: newCardObj.parent,
              name: newCardObj.name,
              $ref: newCardObj.$ref,
              propType: 'card'
            });
          } else {
            throw new Error('Card editing non card element');
          }
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onDelete: function onDelete() {
          // splice out this index from the card array
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          newElementObjArr.splice(index, 1);
          setCardOpenArray([].concat(cardOpenArray.slice(0, index), cardOpenArray.slice(index + 1)));
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onMoveUp: function onMoveUp() {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          if (index === 0) return;
          var tempBlock = newElementObjArr[index - 1];
          newElementObjArr[index - 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onMoveDown: function onMoveDown() {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          if (index === elementPropArr.length - 1) return;
          var tempBlock = newElementObjArr[index + 1];
          newElementObjArr[index + 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        addElem: function addElem(choice) {
          if (choice === 'card') {
            addCardObj({
              schema: schema,
              uischema: uischema,
              mods: mods,
              onChange: _onChange,
              definitionData: definitionData || {},
              definitionUi: definitionUi || {},
              index: index,
              categoryHash: categoryHash
            });
          } else if (choice === 'section') {
            addSectionObj({
              schema: schema,
              uischema: uischema,
              onChange: _onChange,
              definitionData: definitionData || {},
              definitionUi: definitionUi || {},
              index: index,
              categoryHash: categoryHash
            });
          }
          setCardOpenArray([].concat(cardOpenArray, [false]));
        },
        cardOpen: expanded,
        setCardOpen: function setCardOpen(newState) {
          return setCardOpenArray([].concat(cardOpenArray.slice(0, index), [newState], cardOpenArray.slice(index + 1)));
        },
        allFormInputs: allFormInputs,
        mods: mods
      });
    } else if (elementProp.propType === 'section') {
      // create a section with the appropriate schemas here
      return /*#__PURE__*/React__namespace.createElement(Section, {
        schema: elementProp.schema,
        uischema: elementProp.uischema,
        onChange: function onChange(newSchema, newUiSchema, newRef) {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          var oldSection = newElementObjArr[index];
          newElementObjArr[index] = _extends({}, oldSection, {
            schema: newSchema,
            uischema: newUiSchema,
            propType: 'section'
          });
          if (newRef) newElementObjArr[index].$ref = newRef;
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onNameChange: function onNameChange(newName) {
          var oldSection = elementProp;

          // check if newName overlaps with an existing name
          if (elementPropArr.map(function (elem) {
            return elem.name;
          }).includes(newName)) return;
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            name: newName
          });
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onRequireToggle: function onRequireToggle() {
          var oldSection = elementProp;
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            required: !oldSection.required
          });
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onDependentsChange: function onDependentsChange(newDependents) {
          var oldSection = elementProp;
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            dependents: newDependents
          });
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            onChange: _onChange,
            definitionData: definitionData,
            definitionUi: definitionUi
          });
        },
        onDelete: function onDelete() {
          // splice out this index from the card array
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          newElementObjArr.splice(index, 1);
          setCardOpenArray([].concat(cardOpenArray.slice(0, index), cardOpenArray.slice(index + 1)));
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onMoveUp: function onMoveUp() {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          if (index === 0) return;
          var tempBlock = newElementObjArr[index - 1];
          newElementObjArr[index - 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        onMoveDown: function onMoveDown() {
          var newElementObjArr = generateElementPropsFromSchemas({
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            categoryHash: categoryHash
          });
          if (index === elementPropArr.length - 1) return;
          var tempBlock = newElementObjArr[index + 1];
          newElementObjArr[index + 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema: schema,
            uischema: uischema,
            definitionData: definitionData,
            definitionUi: definitionUi,
            onChange: _onChange
          });
        },
        name: elementProp.name,
        key: path + "_" + elementPropArr[index].name,
        required: elementProp.required,
        path: path + "_" + elementProp.name,
        definitionData: definitionData || {},
        definitionUi: definitionUi || {},
        hideKey: hideKey,
        reference: elementProp.$ref,
        neighborNames: elementProp.neighborNames,
        dependents: elementProp.dependents,
        dependent: elementProp.dependent,
        parent: elementProp.parent,
        addElem: function addElem(choice) {
          if (choice === 'card') {
            addCardObj({
              schema: schema,
              uischema: uischema,
              mods: mods,
              onChange: _onChange,
              definitionData: definitionData || {},
              definitionUi: definitionUi || {},
              index: index,
              categoryHash: categoryHash
            });
          } else if (choice === 'section') {
            addSectionObj({
              schema: schema,
              uischema: uischema,
              onChange: _onChange,
              definitionData: definitionData || {},
              definitionUi: definitionUi || {},
              index: index,
              categoryHash: categoryHash
            });
          }
          setCardOpenArray([].concat(cardOpenArray, [false]));
        },
        cardOpen: expanded,
        setCardOpen: function setCardOpen(newState) {
          return setCardOpenArray([].concat(cardOpenArray.slice(0, index), [newState], cardOpenArray.slice(index + 1)));
        },
        allFormInputs: allFormInputs,
        categoryHash: categoryHash,
        mods: mods
      });
    } else {
      return /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("h2", null, " Error parsing element "));
    }
  });
  return elementList;
}

// function called when drag and drop ends
function onDragEnd(result, details) {
  var schema = details.schema,
    uischema = details.uischema,
    onChange = details.onChange,
    definitionData = details.definitionData,
    definitionUi = details.definitionUi,
    categoryHash = details.categoryHash;
  var src = result.source.index;
  var dest = result.destination.index;
  var newElementObjArr = generateElementPropsFromSchemas({
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    categoryHash: categoryHash
  });
  var tempBlock = newElementObjArr[src];
  newElementObjArr[src] = newElementObjArr[dest];
  newElementObjArr[dest] = tempBlock;
  updateSchemas(newElementObjArr, {
    schema: schema,
    uischema: uischema,
    definitionData: definitionData || {},
    definitionUi: definitionUi || {},
    onChange: onChange
  });
}

// helper function to recursively update sections
function propagateElementChange(elementArr, definitionData, definitionUi, categoryHash) {
  var updatedElementArr = [];
  elementArr.forEach(function (element) {
    // update section and it's children
    if (element.propType === 'section') {
      var childrenElements = generateElementPropsFromSchemas({
        schema: element.schema,
        uischema: element.uischema,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
      });
      var updatedChildren = propagateElementChange(childrenElements, definitionData, definitionUi, categoryHash);
      var newUiSchema = Object.assign(_extends({}, element.uischema), generateSchemaFromElementProps(updatedChildren));
      var newSchema = Object.assign(_extends({}, element.schema), generateSchemaFromElementProps(updatedChildren));
      var newElement = _extends({}, element, {
        schema: newSchema,
        uischema: newUiSchema
      });
      updatedElementArr.push(newElement);
    } else {
      updatedElementArr.push(element);
    }
  });
  return updatedElementArr;
}

// propogate changes in a schema and ui schema with updated definitions but outdated body componenents
function propagateDefinitionChanges(schema, uischema, onChange, categoryHash) {
  var definitionData = schema.definitions;
  var definitionUi = uischema.definitions;
  var bodyElements = generateElementPropsFromSchemas({
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    categoryHash: categoryHash
  });
  var updatedBodyElements = propagateElementChange(bodyElements, definitionData, definitionUi, categoryHash);
  updateSchemas(updatedBodyElements, {
    schema: schema,
    uischema: uischema,
    definitionData: definitionData,
    definitionUi: definitionUi,
    onChange: onChange
  });
}

// Member-wise subtraction of array2 from array1
function subtractArray(array1, array2) {
  if (array2 === undefined || array2 === null) return array1;
  var keys = array2.reduce(function (acc, curr) {
    acc[curr] = true;
    return acc;
  }, {});
  return array1.filter(function (v) {
    return !keys[v];
  });
}
function excludeKeys(obj, keys) {
  if (!keys) return _extends({}, obj);
  var keysHash = keys.reduce(function (acc, curr) {
    acc[curr] = true;
    return acc;
  }, {});
  return Object.keys(obj).reduce(function (acc, curr) {
    var _extends3;
    return keysHash[curr] ? acc : _extends({}, acc, (_extends3 = {}, _extends3[curr] = obj[curr], _extends3));
  }, {});
}
function getNewElementDefaultDataOptions(i, mods) {
  if (mods && mods.newElementDefaultDataOptions !== undefined) {
    var title = mods.newElementDefaultDataOptions.title + " " + i;
    return _extends({}, mods.newElementDefaultDataOptions, {
      title: title
    });
  } else {
    return {
      title: "New Input " + i,
      type: 'string',
      "default": ''
    };
  }
}
function getRandomId() {
  var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  var numberOfChars = chars.length;
  var randomIdLength = 50;
  return Array.from({
    length: randomIdLength
  }).map(function () {
    return chars[Math.floor(Math.random() * numberOfChars)];
  }).join('');
}

// warning message if not all possibilities specified
function DependencyWarning(_ref) {
  var parameters = _ref.parameters;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  if (parameters["enum"] && parameters.dependents && parameters.dependents.length && parameters.dependents[0].value) {
    // get the set of defined enum values
    var definedVals = new Set([]);
    (parameters.dependents || []).forEach(function (possibility) {
      if (possibility.value && possibility.value["enum"]) possibility.value["enum"].forEach(function (val) {
        return definedVals.add(val);
      });
    });
    var undefinedVals = [];
    if (Array.isArray(parameters["enum"])) parameters["enum"].forEach(function (val) {
      if (!definedVals.has(val)) undefinedVals.push(val);
    });
    if (undefinedVals.length === 0) return null;
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("p", null, "Warning! The following values do not have associated dependency values:", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
      id: elementId + "_valuewarning",
      type: "help",
      text: "Each possible value for a value-based dependency must be defined to work properly"
    })), /*#__PURE__*/React__default["default"].createElement("ul", null, undefinedVals.map(function (val, index) {
      return /*#__PURE__*/React__default["default"].createElement("li", {
        key: index
      }, val);
    })));
  }
  return null;
}

// a field that lets you choose adjacent blocks
function CardSelector(_ref) {
  var possibleChoices = _ref.possibleChoices,
    chosenChoices = _ref.chosenChoices,
    _onChange = _ref.onChange,
    placeholder = _ref.placeholder;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("ul", null, chosenChoices.map(function (chosenChoice, index) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      key: elementId + "_neighbor_" + index
    }, chosenChoice, ' ', /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faTimes,
      onClick: function onClick() {
        return _onChange([].concat(chosenChoices.slice(0, index), chosenChoices.slice(index + 1)));
      }
    }));
  })), /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: '',
      label: ''
    },
    placeholder: placeholder,
    options: possibleChoices.filter(function (choice) {
      return !chosenChoices.includes(choice);
    }).map(function (choice) {
      return {
        value: choice,
        label: choice
      };
    }),
    onChange: function onChange(val) {
      _onChange([].concat(chosenChoices, [val.value]));
    },
    className: "card-modal-select"
  }));
}

var useStyles$8 = reactJss.createUseStyles({
  cardEnumOption: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '.5em',
    '& input': {
      width: '80%',
      marginRight: '1em',
      marginBottom: 0
    },
    '& .delete-button': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }
});

// Input field corresponding to an array of values, add and remove
function CardEnumOptions(_ref) {
  var initialValues = _ref.initialValues,
    names = _ref.names,
    showNames = _ref.showNames,
    _onChange = _ref.onChange,
    type = _ref.type;
  var classes = useStyles$8();
  var possibleValues = [];
  var _loop = function _loop(index) {
    var value = initialValues[index];
    var name = "" + value;
    if (names && index < names.length) name = names[index];
    possibleValues.push( /*#__PURE__*/React__namespace.createElement("div", {
      key: index,
      className: classes.cardEnumOption
    }, /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
      value: value === undefined || value === null ? '' : value,
      placeholder: "Possible Value",
      key: "val-" + index,
      type: type === 'string' ? 'text' : 'number',
      onChange: function onChange(ev) {
        var newVal;
        switch (type) {
          case 'string':
            newVal = ev.target.value;
            break;
          case 'number':
          case 'integer':
            newVal = parseFloat(ev.target.value);
            if (Number.isInteger(newVal)) newVal = parseInt(ev.target.value, 10);
            if (Number.isNaN(newVal)) newVal = type === 'string' ? '' : 0;
            break;
          default:
            throw new Error("Enum called with unknown type " + type);
        }
        _onChange([].concat(initialValues.slice(0, index), [newVal], initialValues.slice(index + 1)), names);
      },
      className: "card-text"
    }), /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
      value: name || '',
      placeholder: "Label",
      key: "name-" + index,
      type: "text",
      onChange: function onChange(ev) {
        if (names) _onChange(initialValues, [].concat(names.slice(0, index), [ev.target.value], names.slice(index + 1)));
      },
      className: "card-text",
      style: {
        display: showNames ? 'initial' : 'none'
      }
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "delete-button"
    }, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faTimes,
      onClick: function onClick() {
        // remove this value
        _onChange([].concat(initialValues.slice(0, index), initialValues.slice(index + 1)), names ? [].concat(names.slice(0, index), names.slice(index + 1)) : undefined);
      }
    }))));
  };
  for (var index = 0; index < initialValues.length; index += 1) {
    _loop(index);
  }
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, possibleValues, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faPlus,
    onClick: function onClick() {
      // add a new dropdown option
      _onChange([].concat(initialValues, [type === 'string' ? '' : 0]), names ? [].concat(names, ['']) : undefined);
    }
  }));
}

// handle value options for different card types
function ValueSelector(_ref) {
  var possibility = _ref.possibility,
    _onChange = _ref.onChange,
    parentEnums = _ref.parentEnums,
    parentType = _ref.parentType,
    parentName = _ref.parentName,
    parentSchema = _ref.parentSchema,
    path = _ref.path;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  if (possibility.value) {
    // enum type
    if (parentEnums) {
      var enumType = typeof parentEnums[0] === 'number' ? 'number' : 'string';
      if (enumType === 'string') return /*#__PURE__*/React__default["default"].createElement(CardSelector, {
        possibleChoices: parentEnums.map(function (val) {
          return "" + val;
        }),
        chosenChoices: possibility.value["enum"],
        onChange: function onChange(chosenChoices) {
          return _onChange(_extends({}, possibility, {
            value: {
              "enum": chosenChoices
            }
          }));
        },
        placeholder: "Allowed value",
        path: path
      });
      if (enumType === 'number') return /*#__PURE__*/React__default["default"].createElement(CardSelector, {
        possibleChoices: parentEnums.map(function (val) {
          return "" + val;
        }),
        chosenChoices: possibility.value["enum"],
        onChange: function onChange(chosenChoices) {
          return _onChange(_extends({}, possibility, {
            value: {
              "enum": chosenChoices.map(function (val) {
                return Number.parseFloat(val);
              })
            }
          }));
        },
        placeholder: "Allowed value",
        path: path
      });
    }
    // check box type
    if (parentType === 'boolean') {
      return /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
        onChangeValue: function onChangeValue() {
          if (possibility.value["enum"] && possibility.value["enum"][0]) {
            _onChange(_extends({}, possibility, {
              value: {
                "enum": [false]
              }
            }));
          } else {
            _onChange(_extends({}, possibility, {
              value: {
                "enum": [true]
              }
            }));
          }
        },
        isChecked: possibility.value["enum"] && possibility.value["enum"][0],
        label: parentName
      });
    }
    // object type
    if (parentType === 'object') {
      var enumArr = possibility.value["enum"];
      return /*#__PURE__*/React__default["default"].createElement("div", null, enumArr.map(function (combination, index) {
        return /*#__PURE__*/React__default["default"].createElement("li", {
          key: elementId + "_possibleValue" + index
        }, Object.keys(combination).map(function (key) {
          var val = combination[key];
          return /*#__PURE__*/React__default["default"].createElement("div", {
            key: key
          }, /*#__PURE__*/React__default["default"].createElement("h5", null, key, ":"), {
            string: /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
              value: val || '',
              placeholder: "String value",
              type: "string",
              onChange: function onChange(ev) {
                var _extends2;
                var newVal = ev.target.value;
                var oldCombo = possibility.value["enum"][index];
                _onChange(_extends({}, possibility, {
                  value: {
                    "enum": [].concat(enumArr.slice(0, index), [_extends({}, oldCombo, (_extends2 = {}, _extends2[key] = newVal, _extends2))], enumArr.slice(index + 1))
                  }
                }));
              },
              className: "card-modal-text"
            }),
            number: /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
              value: val || '',
              placeholder: "Number value",
              type: "number",
              onChange: function onChange(ev) {
                var _extends3;
                var newVal = Number.parseFloat(ev.target.value);
                var oldCombo = possibility.value["enum"][index];
                _onChange(_extends({}, possibility, {
                  value: {
                    "enum": [].concat(enumArr.slice(0, index), [_extends({}, oldCombo, (_extends3 = {}, _extends3[key] = newVal, _extends3))], enumArr.slice(index + 1))
                  }
                }));
              },
              className: "card-modal-number"
            }),
            array: /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
              value: JSON.stringify(val) || '',
              placeholder: "Array in JSON",
              type: "string",
              onChange: function onChange(ev) {
                var _extends4;
                var newVal = val;
                try {
                  newVal = JSON.parse(ev.target.value);
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error('invalid JSON array input');
                }
                var oldCombo = possibility.value["enum"][index];
                _onChange(_extends({}, possibility, {
                  value: {
                    "enum": [].concat(enumArr.slice(0, index), [_extends({}, oldCombo, (_extends4 = {}, _extends4[key] = newVal, _extends4))], enumArr.slice(index + 1))
                  }
                }));
              },
              className: "card-modal-text"
            }),
            object: /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
              value: JSON.stringify(val) || '',
              placeholder: "Object in JSON",
              type: "string",
              onChange: function onChange(ev) {
                var _extends5;
                var newVal = val;
                try {
                  newVal = JSON.parse(ev.target.value);
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error('invalid JSON object input');
                }
                var oldCombo = possibility.value["enum"][index];
                _onChange(_extends({}, possibility, {
                  value: {
                    "enum": [].concat(enumArr.slice(0, index), [_extends({}, oldCombo, (_extends5 = {}, _extends5[key] = newVal, _extends5))], enumArr.slice(index + 1))
                  }
                }));
              },
              className: "card-modal-text"
            })
          }[typeof val]);
        }), /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
          icon: freeSolidSvgIcons.faTimes,
          onClick: function onClick() {
            return _onChange(_extends({}, possibility, {
              value: {
                "enum": [].concat(enumArr.slice(0, index), enumArr.slice(index + 1))
              }
            }));
          }
        }));
      }), /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
        icon: freeSolidSvgIcons.faPlus,
        onClick: function onClick() {
          var newCase = {};
          var propArr = parentSchema ? parentSchema.properties : {};
          Object.keys(propArr).forEach(function (key) {
            if (propArr[key].type === 'number' || propArr[key].type === 'integer') {
              newCase[key] = 0;
            } else if (propArr[key].type === 'array' || propArr[key]["enum"]) {
              newCase[key] = [];
            } else if (propArr[key].type === 'object' || propArr[key].properties) {
              newCase[key] = {};
            } else {
              newCase[key] = '';
            }
          });
          _onChange(_extends({}, possibility, {
            value: {
              "enum": [].concat(enumArr, [newCase])
            }
          }));
        }
      }));
    }
    return /*#__PURE__*/React__default["default"].createElement(CardEnumOptions, {
      initialValues: possibility.value["enum"],
      onChange: function onChange(newEnum) {
        return _onChange(_extends({}, possibility, {
          value: {
            "enum": newEnum
          }
        }));
      },
      type: parentType || 'string',
      showNames: false
    });
  } else {
    return /*#__PURE__*/React__default["default"].createElement("h5", null, " Appear if defined ");
  }
}

// a possible dependency
function DependencyPossibility(_ref) {
  var possibility = _ref.possibility,
    neighborNames = _ref.neighborNames,
    path = _ref.path,
    _onChange = _ref.onChange,
    onDelete = _ref.onDelete,
    parentEnums = _ref.parentEnums,
    parentType = _ref.parentType,
    parentName = _ref.parentName,
    parentSchema = _ref.parentSchema;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form-dependency-condition"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Display the following:", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_bulk",
    type: "help",
    text: "Choose the other form elements that depend on this one"
  })), /*#__PURE__*/React__default["default"].createElement(CardSelector, {
    possibleChoices: neighborNames.filter(function (name) {
      return name !== parentName;
    }) || [],
    chosenChoices: possibility.children,
    onChange: function onChange(chosenChoices) {
      return _onChange(_extends({}, possibility, {
        children: [].concat(chosenChoices)
      }));
    },
    placeholder: "Choose a dependent...",
    path: path
  }), /*#__PURE__*/React__default["default"].createElement("h5", null, "If \"", parentName, "\" has ", possibility.value ? 'the value:' : 'a value.'), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: possibility.value ? 'block' : 'none'
    }
  }, /*#__PURE__*/React__default["default"].createElement(ValueSelector, {
    possibility: possibility,
    onChange: function onChange(newPossibility) {
      return _onChange(newPossibility);
    },
    parentEnums: parentEnums,
    parentType: parentType,
    parentName: parentName,
    parentSchema: parentSchema,
    path: path
  })), /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faTimes,
    onClick: function onClick() {
      return onDelete();
    }
  }));
}

var useStyles$7 = reactJss.createUseStyles({
  dependencyField: {
    '& .fa': {
      cursor: 'pointer'
    },
    '& .plus': {
      marginLeft: '1em'
    },
    '& h4': {
      marginBottom: '.5em'
    },
    '& h5': {
      fontSize: '1em'
    },
    '& .form-dependency-select': {
      fontSize: '0.75em',
      marginBottom: '1em'
    },
    '& .form-dependency-conditions': {
      textAlign: 'left',
      '& .form-dependency-condition': {
        padding: '1em',
        border: '1px solid gray',
        borderRadius: '4px',
        margin: '1em',
        '& *': {
          textAlign: 'initial'
        }
      }
    },
    '& p': {
      fontSize: '0.75em'
    },
    '& .fb-radio-button': {
      display: 'block'
    }
  }
});

// checks whether an array corresponds to oneOf dependencies
function checkIfValueBasedDependency(dependents) {
  var valueBased = true;
  if (dependents && Array.isArray(dependents) && dependents.length > 0) {
    dependents.forEach(function (possibility) {
      if (!possibility.value || !possibility.value["enum"]) {
        valueBased = false;
      }
    });
  } else {
    valueBased = false;
  }
  return valueBased;
}
function DependencyField(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  var classes = useStyles$7();
  var valueBased = checkIfValueBasedDependency(parameters.dependents || []);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form-dependency " + classes.dependencyField
  }, /*#__PURE__*/React__default["default"].createElement("h4", null, "Dependencies", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_dependent",
    type: "help",
    text: "Control whether other form elements show based on this one"
  })), !!parameters.dependents && parameters.dependents.length > 0 && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FBRadioGroup, {
    defaultValue: valueBased ? 'value' : 'definition',
    horizontal: false,
    options: [{
      value: 'definition',
      label: 'Any value dependency'
    }, {
      value: 'value',
      label: /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, "Specific value dependency", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
        id: elementId + "_valuebased",
        type: "help",
        text: "Specify whether these elements should show based on this element's value"
      }))
    }],
    onChange: function onChange(selection) {
      if (parameters.dependents) {
        var newDependents = [].concat(parameters.dependents);
        if (selection === 'definition') {
          parameters.dependents.forEach(function (possibility, index) {
            newDependents[index] = _extends({}, possibility, {
              value: undefined
            });
          });
        } else {
          parameters.dependents.forEach(function (possibility, index) {
            newDependents[index] = _extends({}, possibility, {
              value: {
                "enum": []
              }
            });
          });
        }
        _onChange(_extends({}, parameters, {
          dependents: newDependents
        }));
      }
    }
  })), /*#__PURE__*/React__default["default"].createElement(DependencyWarning, {
    parameters: parameters
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form-dependency-conditions"
  }, parameters.dependents ? parameters.dependents.map(function (possibility, index) {
    return /*#__PURE__*/React__default["default"].createElement(DependencyPossibility, {
      possibility: possibility,
      neighborNames: parameters.neighborNames || [],
      parentEnums: parameters["enum"],
      parentType: parameters.type,
      parentName: parameters.name,
      parentSchema: parameters.schema,
      path: parameters.path,
      key: elementId + "_possibility" + index,
      onChange: function onChange(newPossibility) {
        var newDependents = parameters.dependents ? [].concat(parameters.dependents) : [];
        newDependents[index] = newPossibility;
        _onChange(_extends({}, parameters, {
          dependents: newDependents
        }));
      },
      onDelete: function onDelete() {
        var newDependents = parameters.dependents ? [].concat(parameters.dependents) : [];
        _onChange(_extends({}, parameters, {
          dependents: [].concat(newDependents.slice(0, index), newDependents.slice(index + 1))
        }));
      }
    });
  }) : '', /*#__PURE__*/React__default["default"].createElement("span", {
    className: "plus",
    id: elementId + "_adddependency"
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faPlus,
    onClick: function onClick() {
      var newDependents = parameters.dependents ? [].concat(parameters.dependents) : [];
      newDependents.push({
        children: [],
        value: valueBased ? {
          "enum": []
        } : undefined
      });
      _onChange(_extends({}, parameters, {
        dependents: newDependents
      }));
    }
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_adddependency"
  }, "Add another dependency relation linking this element and other form elements")));
}

var useStyles$6 = reactJss.createUseStyles({
  cardModal: {
    '& .card-modal-header': {
      paddingTop: '.5em',
      paddingBottom: '.5em'
    },
    '& .card-modal-entries': {
      padding: '1em'
    },
    '& h4, h5, p, label, li': {
      marginTop: '.5em',
      marginBottom: '.5em'
    },
    '& h5, p, label, li': {
      fontSize: '14px'
    },
    '& h4': {
      fontSize: '16px'
    },
    '& h3': {
      fontSize: '18px',
      marginBottom: 0
    },
    '& .card-modal-entries > div > input': {
      marginBottom: '1em',
      height: '32px'
    },
    '& .fa-question-circle, & .fa-circle-question': {
      color: 'gray'
    },
    '& .card-modal-boolean': {
      '& *': {
        marginRight: '0.25em',
        height: 'auto',
        display: 'inline-block'
      }
    },
    '& .card-modal-select': {
      '& input': {
        margin: '0',
        height: '20px'
      },
      marginBottom: '1em'
    }
  }
});
function CardModal(_ref) {
  var componentProps = _ref.componentProps,
    onChange = _ref.onChange,
    isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    TypeSpecificParameters = _ref.TypeSpecificParameters;
  var classes = useStyles$6();
  // assign state values for parameters that should only change on hitting "Save"
  var _React$useState = React__namespace.useState(componentProps),
    componentPropsState = _React$useState[0],
    setComponentProps = _React$useState[1];
  React__namespace.useEffect(function () {
    setComponentProps(componentProps);
  }, [componentProps]);
  return /*#__PURE__*/React__namespace.createElement(reactstrap.Modal, {
    isOpen: isOpen,
    "data-test": "card-modal",
    className: classes.cardModal
  }, /*#__PURE__*/React__namespace.createElement(reactstrap.ModalHeader, {
    className: "card-modal-header"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    style: {
      display: componentProps.hideKey ? 'none' : 'initial'
    }
  }, /*#__PURE__*/React__namespace.createElement("h3", null, "Additional Settings"))), /*#__PURE__*/React__namespace.createElement(reactstrap.ModalBody, {
    className: "card-modal-entries"
  }, /*#__PURE__*/React__namespace.createElement(TypeSpecificParameters, {
    parameters: componentPropsState,
    onChange: function onChange(newState) {
      setComponentProps(_extends({}, componentPropsState, newState));
    }
  }), /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("h4", null, "Column Size", ' ', /*#__PURE__*/React__namespace.createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__namespace.createElement(Example, {
    id: "column_size_tooltip",
    type: "help",
    text: "Set the column size of the input"
  }))), /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
    value: componentPropsState['ui:column'] ? componentPropsState['ui:column'] : '',
    placeholder: "Column size",
    key: "ui:column",
    type: "number",
    min: 0,
    onChange: function onChange(ev) {
      setComponentProps(_extends({}, componentPropsState, {
        'ui:column': ev.target.value
      }));
    },
    className: "card-modal-text"
  })), /*#__PURE__*/React__namespace.createElement(DependencyField, {
    parameters: componentPropsState,
    onChange: function onChange(newState) {
      setComponentProps(_extends({}, componentPropsState, newState));
    }
  })), /*#__PURE__*/React__namespace.createElement(reactstrap.ModalFooter, null, /*#__PURE__*/React__namespace.createElement(reactstrap.Button, {
    onClick: function onClick() {
      onClose();
      onChange(componentPropsState);
    },
    color: "primary"
  }, "Save"), /*#__PURE__*/React__namespace.createElement(reactstrap.Button, {
    onClick: function onClick() {
      onClose();
      setComponentProps(componentProps);
    },
    color: "secondary"
  }, "Cancel")));
}

// specify the inputs required for any type of object
function GeneralParameterInputs(_ref) {
  var category = _ref.category,
    parameters = _ref.parameters,
    onChange = _ref.onChange,
    mods = _ref.mods,
    allFormInputs = _ref.allFormInputs;
  var CardBody = getCardBody(category, allFormInputs);
  return /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement(CardBody, {
    parameters: parameters,
    onChange: onChange,
    mods: mods || {}
  }));
}

// specify the inputs required for any type of object
function CardGeneralParameterInputs(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange,
    allFormInputs = _ref.allFormInputs,
    mods = _ref.mods,
    _ref$showObjectNameIn = _ref.showObjectNameInput,
    showObjectNameInput = _ref$showObjectNameIn === void 0 ? true : _ref$showObjectNameIn;
  var _React$useState = React__default["default"].useState(parameters.name),
    keyState = _React$useState[0],
    setKeyState = _React$useState[1];
  var _React$useState2 = React__default["default"].useState(null),
    keyError = _React$useState2[0],
    setKeyError = _React$useState2[1];
  var _React$useState3 = React__default["default"].useState(parameters.title),
    titleState = _React$useState3[0],
    setTitleState = _React$useState3[1];
  var _React$useState4 = React__default["default"].useState(parameters.description),
    descriptionState = _React$useState4[0],
    setDescriptionState = _React$useState4[1];
  var _React$useState5 = React__default["default"].useState(getRandomId()),
    elementId = _React$useState5[0];
  var categoryMap = categoryToNameMap(parameters.category, allFormInputs);
  var fetchLabel = function fetchLabel(labelName, defaultLabel) {
    return mods && mods.labels && typeof mods.labels[labelName] === 'string' ? mods.labels[labelName] : defaultLabel;
  };
  var objectNameLabel = fetchLabel('objectNameLabel', 'Object Name');
  var displayNameLabel = fetchLabel('displayNameLabel', 'Display Name');
  var descriptionLabel = fetchLabel('descriptionLabel', 'Description');
  var inputTypeLabel = fetchLabel('inputTypeLabel', 'Input Type');
  var availableInputTypes = function availableInputTypes() {
    var definitionsInSchema = parameters.definitionData && Object.keys(parameters.definitionData).length !== 0;

    // Hide the "Reference" option if there are no definitions in the schema
    var inputKeys = Object.keys(categoryMap).filter(function (key) {
      return key !== 'ref' || definitionsInSchema;
    });
    // Exclude hidden inputs based on mods
    if (mods) inputKeys = subtractArray(inputKeys, mods.deactivatedFormInputs);
    return inputKeys.map(function (key) {
      return {
        value: key,
        label: categoryMap[key]
      };
    }).sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-entry-row"
  }, showObjectNameInput && /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-entry"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, objectNameLabel + " ", /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardObjectName === 'string' ? mods.tooltipDescriptions.cardObjectName : 'The back-end name of the object',
    id: elementId + "_nameinfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    invalid: keyError !== null,
    value: keyState || '',
    placeholder: "Key",
    type: "text",
    onChange: function onChange(ev) {
      return setKeyState(ev.target.value);
    },
    onBlur: function onBlur(ev) {
      var value = ev.target.value;
      if (value === parameters.name || !(parameters.neighborNames && parameters.neighborNames.includes(value))) {
        setKeyError(null);
        _onChange(_extends({}, parameters, {
          name: value
        }));
      } else {
        setKeyState(parameters.name);
        setKeyError("\"" + value + "\" is already in use.");
        _onChange(_extends({}, parameters));
      }
    },
    className: "card-text"
  }), /*#__PURE__*/React__default["default"].createElement(reactstrap.FormFeedback, null, keyError))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-entry " + (parameters.$ref === undefined ? '' : 'disabled-input')
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, displayNameLabel + " ", /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDisplayName === 'string' ? mods.tooltipDescriptions.cardDisplayName : 'The user-facing name of this object',
    id: elementId + "-titleinfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: titleState || '',
    placeholder: "Title",
    type: "text",
    onChange: function onChange(ev) {
      return setTitleState(ev.target.value);
    },
    onBlur: function onBlur(ev) {
      _onChange(_extends({}, parameters, {
        title: ev.target.value
      }));
    },
    className: "card-text"
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-entry-row"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-entry " + (parameters.$ref ? 'disabled-input' : '')
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, descriptionLabel + " ", /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardDescription === 'string' ? mods.tooltipDescriptions.cardDescription : 'This will appear as help text on the form',
    id: elementId + "-descriptioninfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: descriptionState || '',
    placeholder: "Description",
    type: "text",
    onChange: function onChange(ev) {
      return setDescriptionState(ev.target.value);
    },
    onBlur: function onBlur(ev) {
      _onChange(_extends({}, parameters, {
        description: ev.target.value
      }));
    },
    className: "card-text"
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: classnames__default["default"]('card-entry', {
      'wide-card-entry': !showObjectNameInput
    })
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, inputTypeLabel + " ", /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardInputType === 'string' ? mods.tooltipDescriptions.cardInputType : 'The type of form input displayed on the form',
    id: elementId + "-inputinfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: parameters.category,
      label: categoryMap[parameters.category]
    },
    placeholder: inputTypeLabel,
    options: availableInputTypes(),
    onChange: function onChange(val) {
      // figure out the new 'type'
      var newCategory = val.value;
      var newProps = _extends({}, defaultUiProps(newCategory, allFormInputs), defaultDataProps(newCategory, allFormInputs), {
        name: parameters.name,
        required: parameters.required
      });
      if (newProps.$ref !== undefined && !newProps.$ref) {
        // assign an initial reference
        var firstDefinition = Object.keys(parameters.definitionData)[0];
        newProps.$ref = "#/definitions/" + (firstDefinition || 'empty');
      }
      _onChange(_extends({}, newProps, {
        title: newProps.title || parameters.title,
        "default": newProps["default"] || '',
        type: newProps.type || categoryType(newCategory, allFormInputs),
        category: newProps.category || newCategory
      }));
    },
    className: "card-select"
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-category-options"
  }, /*#__PURE__*/React__default["default"].createElement(GeneralParameterInputs, {
    category: parameters.category,
    parameters: parameters,
    onChange: _onChange,
    mods: mods,
    allFormInputs: allFormInputs
  })));
}

var useStyles$5 = reactJss.createUseStyles({
  addDetails: {
    '& .popover': {
      width: '300px',
      'z-index': '1051 !important',
      '& .popover-inner': {
        border: '1px solid #1d71ad',
        borderRadius: '4px',
        '& .popover-header': {
          borderBottom: '1px solid #1d71ad'
        },
        '& .action-buttons': {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '.5em'
        }
      }
    }
  }
});
function Add(_ref) {
  var addElem = _ref.addElem,
    hidden = _ref.hidden,
    tooltipDescription = _ref.tooltipDescription;
  var classes = useStyles$5();
  var _useState = React.useState(false),
    popoverOpen = _useState[0],
    setPopoverOpen = _useState[1];
  var _useState2 = React.useState('card'),
    createChoice = _useState2[0],
    setCreateChoice = _useState2[1];
  var _useState3 = React.useState(getRandomId()),
    elementId = _useState3[0];
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: hidden ? 'none' : 'initial'
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    id: elementId + "_add"
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faPlusSquare,
    onClick: function onClick() {
      return setPopoverOpen(true);
    }
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_add"
  }, tooltipDescription || 'Create new form element'), /*#__PURE__*/React__default["default"].createElement(reactstrap.Popover, {
    placement: "bottom",
    target: elementId + "_add",
    isOpen: popoverOpen,
    toggle: function toggle() {
      return setPopoverOpen(false);
    },
    className: "add-details " + classes.addDetails,
    id: elementId + "_add_popover"
  }, /*#__PURE__*/React__default["default"].createElement(reactstrap.PopoverHeader, null, "Create New"), /*#__PURE__*/React__default["default"].createElement(reactstrap.PopoverBody, null, /*#__PURE__*/React__default["default"].createElement(FBRadioGroup, {
    className: "choose-create",
    defaultValue: createChoice,
    horizontal: false,
    options: [{
      value: 'card',
      label: 'Form element'
    }, {
      value: 'section',
      label: 'Form section'
    }],
    onChange: function onChange(selection) {
      setCreateChoice(selection);
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "action-buttons"
  }, /*#__PURE__*/React__default["default"].createElement(reactstrap.Button, {
    onClick: function onClick() {
      return setPopoverOpen(false);
    },
    color: "secondary"
  }, "Cancel"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Button, {
    onClick: function onClick() {
      addElem(createChoice);
      setPopoverOpen(false);
    },
    color: "primary"
  }, "Create")))));
}

var useStyles$4 = reactJss.createUseStyles({
  cardEntries: {
    'border-bottom': '1px solid gray',
    margin: '.5em 1.5em 0 1.5em',
    '& h5': {
      color: 'black',
      'font-size': '14px',
      'font-weight': 'bold'
    },
    '& .card-entry-row': {
      display: 'flex'
    },
    '& .card-entry': {
      margin: 0,
      width: '50%',
      'text-align': 'left',
      padding: '0.5em',
      '&.wide-card-entry': {
        width: '100%'
      }
    },
    '& input': {
      border: '1px solid gray',
      'border-radius': '4px'
    },
    '& .card-category-options': {
      padding: '.5em'
    },
    '& .card-select': {
      border: '1px solid gray',
      'border-radius': '4px'
    },
    '& .card-array': {
      '& .fa-plus-square, & .fa-square-plus': {
        display: 'none'
      },
      '& .section-entries': {
        '& .fa-plus-square, & .fa-square-plus': {
          display: 'initial'
        }
      }
    },
    '& .card-enum': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'lightGray',
      textAlign: 'left',
      padding: '1em',
      '& h3': {
        fontSize: '16px',
        margin: '0 0 .5em 0'
      },
      '& label': {
        color: 'black',
        fontSize: '14px'
      },
      '& .card-enum-header': {
        marginTop: '0.5em',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        '& h5': {
          width: '50%',
          fontWeight: 'bold',
          fontSize: '14px'
        }
      },
      '& .fa': {
        cursor: 'pointer'
      }
    }
  },
  cardInteractions: {
    margin: '.5em 1.5em',
    textAlign: 'left',
    '& .fa': {
      marginRight: '1em',
      borderRadius: '4px',
      padding: '.25em',
      height: '25px',
      width: '25px'
    },
    '& .fa-arrow-up, .fa-arrow-down': {
      marginRight: '.5em'
    },
    '& .fa-trash': {
      border: '1px solid #DE5354',
      color: '#DE5354'
    },
    '& .fb-checkbox': {
      display: 'inline-block'
    },
    '& .interactions-left, & .interactions-right': {
      display: 'inline-block',
      width: '48%',
      margin: '0 auto'
    },
    '& .interactions-left': {
      textAlign: 'left'
    },
    '& .interactions-right': {
      textAlign: 'right'
    }
  }
});
function Card(_ref) {
  var componentProps = _ref.componentProps,
    _onChange = _ref.onChange,
    onDelete = _ref.onDelete,
    onMoveUp = _ref.onMoveUp,
    onMoveDown = _ref.onMoveDown,
    TypeSpecificParameters = _ref.TypeSpecificParameters,
    _addElem = _ref.addElem,
    cardOpen = _ref.cardOpen,
    setCardOpen = _ref.setCardOpen,
    allFormInputs = _ref.allFormInputs,
    mods = _ref.mods,
    _ref$showObjectNameIn = _ref.showObjectNameInput,
    showObjectNameInput = _ref$showObjectNameIn === void 0 ? true : _ref$showObjectNameIn;
  var classes = useStyles$4();
  var _React$useState = React__namespace.useState(false),
    modalOpen = _React$useState[0],
    setModalOpen = _React$useState[1];
  var _React$useState2 = React__namespace.useState(getRandomId()),
    elementId = _React$useState2[0];
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Collapse, {
    isOpen: cardOpen,
    toggleCollapse: function toggleCollapse() {
      return setCardOpen(!cardOpen);
    },
    title: /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", {
      onClick: function onClick() {
        return setCardOpen(!cardOpen);
      },
      className: "label"
    }, componentProps.title || componentProps.name, ' ', componentProps.parent ? /*#__PURE__*/React__namespace.createElement(Example, {
      text: "Depends on " + componentProps.parent,
      id: elementId + "_parentinfo",
      type: "alert"
    }) : '', componentProps.$ref !== undefined ? /*#__PURE__*/React__namespace.createElement(Example, {
      text: "Is an instance of pre-configured component " + componentProps.$ref,
      id: elementId + "_refinfo",
      type: "alert"
    }) : ''), /*#__PURE__*/React__namespace.createElement("span", {
      className: "arrows"
    }, /*#__PURE__*/React__namespace.createElement("span", {
      id: elementId + "_moveupbiginfo"
    }, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faArrowUp,
      onClick: function onClick() {
        return onMoveUp ? onMoveUp() : {};
      }
    })), /*#__PURE__*/React__namespace.createElement(reactstrap.UncontrolledTooltip, {
      placement: "top",
      target: elementId + "_moveupbiginfo"
    }, "Move form element up"), /*#__PURE__*/React__namespace.createElement("span", {
      id: elementId + "_movedownbiginfo"
    }, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faArrowDown,
      onClick: function onClick() {
        return onMoveDown ? onMoveDown() : {};
      }
    })), /*#__PURE__*/React__namespace.createElement(reactstrap.UncontrolledTooltip, {
      placement: "top",
      target: elementId + "_movedownbiginfo"
    }, "Move form element down"))),
    className: "card-container " + (componentProps.dependent ? 'card-dependent' : '') + " " + (componentProps.$ref === undefined ? '' : 'card-reference')
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: classes.cardEntries
  }, /*#__PURE__*/React__namespace.createElement(CardGeneralParameterInputs, {
    parameters: componentProps,
    onChange: _onChange,
    allFormInputs: allFormInputs,
    mods: mods,
    showObjectNameInput: showObjectNameInput
  })), /*#__PURE__*/React__namespace.createElement("div", {
    className: classes.cardInteractions
  }, /*#__PURE__*/React__namespace.createElement("span", {
    id: elementId + "_editinfo"
  }, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faPencilAlt,
    onClick: function onClick() {
      return setModalOpen(true);
    }
  })), /*#__PURE__*/React__namespace.createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_editinfo"
  }, "Additional configurations for this form element"), /*#__PURE__*/React__namespace.createElement("span", {
    id: elementId + "_trashinfo"
  }, /*#__PURE__*/React__namespace.createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faTrash,
    onClick: onDelete || function () {}
  })), /*#__PURE__*/React__namespace.createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_trashinfo"
  }, "Delete form element"), /*#__PURE__*/React__namespace.createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      return _onChange(_extends({}, componentProps, {
        required: !componentProps.required
      }));
    },
    isChecked: !!componentProps.required,
    label: "Required",
    id: elementId + "_required"
  })), /*#__PURE__*/React__namespace.createElement(CardModal, {
    componentProps: componentProps,
    isOpen: modalOpen,
    onClose: function onClose() {
      return setModalOpen(false);
    },
    onChange: function onChange(newComponentProps) {
      _onChange(newComponentProps);
    },
    TypeSpecificParameters: TypeSpecificParameters
  })), _addElem ? /*#__PURE__*/React__namespace.createElement(Add, {
    tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
    addElem: function addElem(choice) {
      return _addElem(choice);
    }
  }) : '');
}

var useStyles$3 = reactJss.createUseStyles({
  hidden: {
    display: 'none'
  }
});

// specify the inputs required for a string type object
function CardDefaultParameterInputs(_ref) {
  return /*#__PURE__*/React__namespace.createElement("div", null);
}
var getInputCardBodyComponent = function getInputCardBodyComponent(_ref2) {
  var type = _ref2.type;
  return function InputCardBodyComponent(_ref3) {
    var parameters = _ref3.parameters,
      _onChange = _ref3.onChange;
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("h5", null, "Default value"), /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
      value: parameters["default"] || '',
      placeholder: "Default",
      type: type,
      onChange: function onChange(ev) {
        return _onChange(_extends({}, parameters, {
          "default": ev.target.value
        }));
      },
      className: "card-text"
    }));
  };
};
function Checkbox(_ref4) {
  var parameters = _ref4.parameters,
    onChange = _ref4.onChange;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "card-boolean"
  }, /*#__PURE__*/React__namespace.createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      onChange(_extends({}, parameters, {
        "default": parameters["default"] ? parameters["default"] !== true : true
      }));
    },
    isChecked: parameters["default"] ? parameters["default"] === true : false,
    label: "Default"
  }));
}
function MultipleChoice(_ref5) {
  var parameters = _ref5.parameters,
    _onChange2 = _ref5.onChange;
  var classes = useStyles$3();
  var enumArray = Array.isArray(parameters["enum"]) ? parameters["enum"] : [];
  // eslint-disable-next-line no-restricted-globals
  var containsUnparsableString = enumArray.some(function (val) {
    return isNaN(val);
  });
  var containsString = containsUnparsableString || enumArray.some(function (val) {
    return typeof val === 'string';
  });
  var _React$useState = React__namespace.useState(!!enumArray.length && !containsString),
    isNumber = _React$useState[0],
    setIsNumber = _React$useState[1];
  var _React$useState2 = React__namespace.useState(getRandomId()),
    elementId = _React$useState2[0];
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "card-enum"
  }, /*#__PURE__*/React__namespace.createElement("h3", null, "Possible Values"), /*#__PURE__*/React__namespace.createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      if (Array.isArray(parameters.enumNames)) {
        // remove the enumNames
        _onChange2(_extends({}, parameters, {
          enumNames: null
        }));
      } else {
        // create enumNames as a copy of enum values
        _onChange2(_extends({}, parameters, {
          enumNames: enumArray.map(function (val) {
            return "" + val;
          })
        }));
      }
    },
    isChecked: Array.isArray(parameters.enumNames),
    label: "Display label is different from value",
    id: elementId + "_different"
  }), /*#__PURE__*/React__namespace.createElement("div", {
    className: containsUnparsableString || !enumArray.length ? classes.hidden : ''
  }, /*#__PURE__*/React__namespace.createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      if (containsString || !isNumber) {
        // attempt converting enum values into numbers
        try {
          var newEnum = enumArray.map(function (val) {
            var newNum = 0;
            if (val) newNum = parseFloat(val) || 0;
            if (Number.isNaN(newNum)) throw new Error("Could not convert " + val);
            return newNum;
          });
          setIsNumber(true);
          _onChange2(_extends({}, parameters, {
            "enum": newEnum
          }));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } else {
        // convert enum values back into strings
        var _newEnum = enumArray.map(function (val) {
          return "" + (val || 0);
        });
        setIsNumber(false);
        _onChange2(_extends({}, parameters, {
          "enum": _newEnum
        }));
      }
    },
    isChecked: isNumber,
    disabled: containsUnparsableString,
    label: "Force number",
    id: elementId + "_forceNumber"
  })), /*#__PURE__*/React__namespace.createElement(CardEnumOptions, {
    initialValues: enumArray,
    names: Array.isArray(parameters.enumNames) ? parameters.enumNames.map(function (val) {
      return "" + val;
    }) : undefined,
    showNames: Array.isArray(parameters.enumNames),
    onChange: function onChange(newEnum, newEnumNames) {
      return _onChange2(_extends({}, parameters, {
        "enum": newEnum,
        enumNames: newEnumNames
      }));
    },
    type: isNumber ? 'number' : 'string'
  }));
}
var defaultInputs = {
  dateTime: {
    displayName: 'Date-Time',
    matchIf: [{
      types: ['string'],
      format: 'date-time'
    }],
    defaultDataSchema: {
      format: 'date-time'
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: getInputCardBodyComponent({
      type: 'datetime-local'
    }),
    modalBody: CardDefaultParameterInputs
  },
  date: {
    displayName: 'Date',
    matchIf: [{
      types: ['string'],
      format: 'date'
    }],
    defaultDataSchema: {
      format: 'date'
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: getInputCardBodyComponent({
      type: 'date'
    }),
    modalBody: CardDefaultParameterInputs
  },
  time: {
    displayName: 'Time',
    matchIf: [{
      types: ['string'],
      format: 'time'
    }],
    defaultDataSchema: {
      format: 'time'
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: getInputCardBodyComponent({
      type: 'time'
    }),
    modalBody: CardDefaultParameterInputs
  },
  checkbox: {
    displayName: 'Checkbox',
    matchIf: [{
      types: ['boolean']
    }],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'boolean',
    cardBody: Checkbox,
    modalBody: CardDefaultParameterInputs
  },
  radio: {
    displayName: 'Radio',
    matchIf: [{
      types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
      widget: 'radio',
      "enum": true
    }],
    defaultDataSchema: {
      "enum": []
    },
    defaultUiSchema: {
      'ui:widget': 'radio'
    },
    type: 'string',
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs
  },
  dropdown: {
    displayName: 'Dropdown',
    matchIf: [{
      types: ['string', 'number', 'integer', 'array', 'boolean', 'null'],
      "enum": true
    }],
    defaultDataSchema: {
      "enum": []
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: MultipleChoice,
    modalBody: CardDefaultParameterInputs
  }
};

var useStyles$2 = reactJss.createUseStyles({
  sectionContainer: {
    '& .section-head': {
      display: 'flex',
      borderBottom: '1px solid gray',
      margin: '0.5em 1.5em 0 1.5em',
      '& h5': {
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      '& .section-entry': {
        width: '33%',
        textAlign: 'left',
        padding: '0.5em'
      },
      '& .section-reference': {
        width: '100%'
      }
    },
    '& .section-footer': {
      marginTop: '1em',
      textAlign: 'center',
      '& .fa': {
        cursor: 'pointer'
      }
    },
    '& .section-interactions': {
      margin: '0.5em 1.5em',
      textAlign: 'left',
      borderTop: '1px solid gray',
      paddingTop: '1em',
      '& .fa': {
        marginRight: '1em',
        borderRadius: '4px',
        padding: '0.25em',
        height: '25px',
        width: '25px'
      },
      '& .fa-pencil-alt, &.fa-pencil, & .fa-arrow-up, & .fa-arrow-down': {
        border: '1px solid #1d71ad',
        color: '#1d71ad'
      },
      '& .fa-trash': {
        border: '1px solid #de5354',
        color: '#de5354'
      },
      '& .fa-arrow-up, & .fa-arrow-down': {
        marginRight: '0.5em'
      },
      '& .fb-checkbox': {
        display: 'inline-block',
        label: {
          color: '#9aa4ab'
        }
      },
      '& .interactions-left, & .interactions-right': {
        display: 'inline-block',
        width: '48%',
        margin: '0 auto'
      },
      '& .interactions-left': {
        textAlign: 'left'
      },
      '& .interactions-right': {
        textAlign: 'right'
      }
    }
  }
});
function Section(_ref) {
  var _uischema$uiColumn;
  var name = _ref.name,
    required = _ref.required,
    schema = _ref.schema,
    uischema = _ref.uischema,
    _onChange = _ref.onChange,
    onNameChange = _ref.onNameChange,
    onRequireToggle = _ref.onRequireToggle,
    onDependentsChange = _ref.onDependentsChange,
    onDelete = _ref.onDelete,
    onMoveUp = _ref.onMoveUp,
    onMoveDown = _ref.onMoveDown,
    path = _ref.path,
    definitionData = _ref.definitionData,
    definitionUi = _ref.definitionUi,
    hideKey = _ref.hideKey,
    reference = _ref.reference,
    dependents = _ref.dependents,
    dependent = _ref.dependent,
    parent = _ref.parent,
    neighborNames = _ref.neighborNames,
    _addElem = _ref.addElem,
    cardOpen = _ref.cardOpen,
    setCardOpen = _ref.setCardOpen,
    allFormInputs = _ref.allFormInputs,
    mods = _ref.mods,
    categoryHash = _ref.categoryHash;
  var classes = useStyles$2();
  var unsupportedFeatures = checkForUnsupportedFeatures(schema || {}, uischema || {}, allFormInputs);
  var schemaData = schema || {};
  var elementNum = countElementsFromSchema(schemaData);
  var defaultCollapseStates = [].concat(Array(elementNum)).map(function () {
    return false;
  });
  var _React$useState = React__default["default"].useState(defaultCollapseStates),
    cardOpenArray = _React$useState[0],
    setCardOpenArray = _React$useState[1];
  // keep name in state to avoid losing focus
  var _React$useState2 = React__default["default"].useState(name),
    keyName = _React$useState2[0],
    setKeyName = _React$useState2[1];
  var _React$useState3 = React__default["default"].useState(null),
    keyError = _React$useState3[0],
    setKeyError = _React$useState3[1];
  // keep requirements in state to avoid rapid updates
  var _React$useState4 = React__default["default"].useState(false),
    modalOpen = _React$useState4[0],
    setModalOpen = _React$useState4[1];
  var _React$useState5 = React__default["default"].useState(getRandomId()),
    elementId = _React$useState5[0];
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Collapse, {
    isOpen: cardOpen,
    toggleCollapse: function toggleCollapse() {
      return setCardOpen(!cardOpen);
    },
    title: /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("span", {
      onClick: function onClick() {
        return setCardOpen(!cardOpen);
      },
      className: "label"
    }, schemaData.title || keyName, ' ', parent ? /*#__PURE__*/React__default["default"].createElement(Example, {
      text: "Depends on " + parent,
      id: elementId + "_parentinfo",
      type: "alert"
    }) : ''), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "arrows"
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      id: elementId + "_moveupbiginfo"
    }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faArrowUp,
      onClick: function onClick() {
        return onMoveUp ? onMoveUp() : {};
      }
    })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
      placement: "top",
      target: elementId + "_moveupbiginfo"
    }, "Move form element up"), /*#__PURE__*/React__default["default"].createElement("span", {
      id: elementId + "_movedownbiginfo"
    }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
      icon: freeSolidSvgIcons.faArrowDown,
      onClick: function onClick() {
        return onMoveDown ? onMoveDown() : {};
      }
    })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
      placement: "top",
      target: elementId + "_movedownbiginfo"
    }, "Move form element down"))),
    className: "section-container " + classes.sectionContainer + " " + (dependent ? 'section-dependent' : '') + " " + (reference ? 'section-reference' : '')
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-entries " + (reference ? 'section-reference' : '')
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-head"
  }, reference ? /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-entry section-reference"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Reference Section"), /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: reference,
      label: reference
    },
    placeholder: "Reference",
    options: Object.keys(definitionData).map(function (key) {
      return {
        value: "#/definitions/" + key,
        label: "#/definitions/" + key
      };
    }),
    onChange: function onChange(val) {
      _onChange(schema, uischema, val.value);
    },
    className: "section-select"
  })) : '', /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-entry",
    "data-test": "section-object-name"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Section Object Name", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionObjectName === 'string' ? mods.tooltipDescriptions.cardSectionObjectName : 'The key to the object that will represent this form section.',
    id: elementId + "_nameinfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    invalid: keyError !== null,
    value: keyName || '',
    placeholder: "Key",
    type: "text",
    onChange: function onChange(ev) {
      return setKeyName(ev.target.value);
    },
    onBlur: function onBlur(ev) {
      var value = ev.target.value;
      if (value === name || !(neighborNames && neighborNames.includes(value))) {
        setKeyError(null);
        onNameChange(value);
      } else {
        setKeyName(name);
        setKeyError("\"" + value + "\" is already in use.");
        onNameChange(name);
      }
    },
    className: "card-text",
    readOnly: hideKey
  }), /*#__PURE__*/React__default["default"].createElement(reactstrap.FormFeedback, null, keyError))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-entry",
    "data-test": "section-display-name"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Section Display Name", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDisplayName === 'string' ? mods.tooltipDescriptions.cardSectionDisplayName : 'The name of the form section that will be shown to users of the form.',
    id: elementId + "_titleinfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: schemaData.title || '',
    placeholder: "Title",
    type: "text",
    onChange: function onChange(ev) {
      return _onChange(_extends({}, schema, {
        title: ev.target.value
      }), uischema);
    },
    className: "card-text"
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-entry",
    "data-test": "section-description"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Section Description", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    text: mods && mods.tooltipDescriptions && mods.tooltipDescriptions && typeof mods.tooltipDescriptions.cardSectionDescription === 'string' ? mods.tooltipDescriptions.cardSectionDescription : 'A description of the section which will be visible on the form.',
    id: elementId + "_descriptioninfo",
    type: "help"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: schemaData.description || '',
    placeholder: "Description",
    type: "text",
    onChange: function onChange(ev) {
      return _onChange(_extends({}, schema, {
        description: ev.target.value
      }), uischema);
    },
    className: "card-text"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.Alert, {
    style: {
      display: unsupportedFeatures.length === 0 ? 'none' : 'block'
    },
    color: "warning"
  }, /*#__PURE__*/React__default["default"].createElement("h5", null, "Unsupported Features:"), unsupportedFeatures.map(function (message) {
    return /*#__PURE__*/React__default["default"].createElement("li", {
      key: elementId + "_" + message
    }, message);
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-body"
  }, /*#__PURE__*/React__default["default"].createElement(reactBeautifulDnd.DragDropContext, {
    onDragEnd: function onDragEnd$1(result) {
      return onDragEnd(result, {
        schema: schema,
        uischema: uischema,
        onChange: _onChange,
        definitionData: definitionData,
        definitionUi: definitionUi,
        categoryHash: categoryHash
      });
    },
    className: "section-body"
  }, /*#__PURE__*/React__default["default"].createElement(reactBeautifulDnd.Droppable, {
    droppableId: "droppable"
  }, function (providedDroppable) {
    return /*#__PURE__*/React__default["default"].createElement("div", _extends({
      ref: providedDroppable.innerRef
    }, providedDroppable.droppableProps), generateElementComponentsFromSchemas({
      schemaData: schema,
      uiSchemaData: uischema,
      onChange: _onChange,
      path: path,
      definitionData: definitionData,
      definitionUi: definitionUi,
      cardOpenArray: cardOpenArray,
      setCardOpenArray: setCardOpenArray,
      allFormInputs: allFormInputs,
      mods: mods,
      categoryHash: categoryHash,
      Card: Card,
      Section: Section
    }).map(function (element, index) {
      return /*#__PURE__*/React__default["default"].createElement(reactBeautifulDnd.Draggable, {
        key: element.key,
        draggableId: element.key,
        index: index
      }, function (providedDraggable) {
        return /*#__PURE__*/React__default["default"].createElement("div", _extends({
          ref: providedDraggable.innerRef
        }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element);
      });
    }), providedDroppable.placeholder);
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-footer"
  }, /*#__PURE__*/React__default["default"].createElement(Add, {
    tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
    addElem: function addElem(choice) {
      if (choice === 'card') {
        addCardObj({
          schema: schema,
          uischema: uischema,
          mods: mods,
          onChange: _onChange,
          definitionData: definitionData,
          definitionUi: definitionUi,
          categoryHash: categoryHash
        });
      } else if (choice === 'section') {
        addSectionObj({
          schema: schema,
          uischema: uischema,
          onChange: _onChange,
          definitionData: definitionData,
          definitionUi: definitionUi,
          categoryHash: categoryHash
        });
      }
    },
    hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0
  })), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "section-interactions"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    id: elementId + "_editinfo"
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faPencilAlt,
    onClick: function onClick() {
      return setModalOpen(true);
    }
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_editinfo"
  }, "Additional configurations for this form element"), /*#__PURE__*/React__default["default"].createElement("span", {
    id: elementId + "_trashinfo"
  }, /*#__PURE__*/React__default["default"].createElement(FontAwesomeIcon, {
    icon: freeSolidSvgIcons.faTrash,
    onClick: function onClick() {
      return onDelete ? onDelete() : {};
    }
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.UncontrolledTooltip, {
    placement: "top",
    target: elementId + "_trashinfo"
  }, "Delete form element"), /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      return onRequireToggle();
    },
    isChecked: required,
    label: "Required",
    id: elementId + "_required"
  }))), /*#__PURE__*/React__default["default"].createElement(CardModal, {
    componentProps: {
      dependents: dependents,
      neighborNames: neighborNames,
      name: keyName,
      schema: schema,
      type: 'object',
      'ui:column': (_uischema$uiColumn = uischema['ui:column']) != null ? _uischema$uiColumn : ''
    },
    isOpen: modalOpen,
    onClose: function onClose() {
      return setModalOpen(false);
    },
    onChange: function onChange(newComponentProps) {
      onDependentsChange(newComponentProps.dependents);
      _onChange(schema, _extends({}, uischema, {
        'ui:column': newComponentProps['ui:column']
      }));
    },
    TypeSpecificParameters: CardDefaultParameterInputs
  })), _addElem ? /*#__PURE__*/React__default["default"].createElement(Add, {
    tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
    addElem: function addElem(choice) {
      return _addElem(choice);
    }
  }) : '');
}

var arrows = {
  '& .arrows': {
    "float": 'right',
    '& .fa-arrow-up, & .fa-arrow-down': {
      'border-radius': '4px',
      padding: '.25em',
      margin: '0 .5em 0 0',
      border: '1px solid #1d71ad',
      color: '#1d71ad',
      height: '28px',
      width: '28px'
    }
  }
};

function PlaceholderInput(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h4", null, "Placeholder", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_placeholder",
    type: "help",
    text: "Hint to the user as to what kind of information is expected in the field"
  }))), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters['ui:placeholder'],
    placeholder: "Placeholder",
    key: "placeholder",
    type: "text",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        'ui:placeholder': ev.target.value
      }));
    },
    className: "card-modal-text"
  }));
}

var formatDictionary = {
  '': 'None',
  email: 'Email',
  hostname: 'Hostname',
  uri: 'URI',
  regex: 'Regular Expression'
};
var formatTypeDictionary = {
  email: 'email',
  url: 'uri'
};
var autoDictionary = {
  '': 'None',
  email: 'Email',
  username: 'User Name',
  password: 'Password',
  'street-address': 'Street Address',
  country: 'Country'
};

// specify the inputs required for a string type object
function CardShortAnswerParameterInputs(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("h4", null, "Minimum Length"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.minLength ? parameters.minLength : '',
    placeholder: "Minimum Length",
    key: "minLength",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        minLength: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Maximum Length"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.maxLength ? parameters.maxLength : '',
    placeholder: "Maximum Length",
    key: "maxLength",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        maxLength: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Regular Expression Pattern", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_regex",
    type: "help",
    text: "Regular expression pattern that this must satisfy"
  }))), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.pattern ? parameters.pattern : '',
    placeholder: "Regular Expression Pattern",
    key: "pattern",
    type: "text",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        pattern: ev.target.value
      }));
    },
    className: "card-modal-text"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Format", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_format",
    type: "help",
    text: "Require string input to match a certain common format"
  })), /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: parameters.format ? formatDictionary[typeof parameters.format === 'string' ? parameters.format : ''] : '',
      label: parameters.format ? formatDictionary[typeof parameters.format === 'string' ? parameters.format : ''] : 'None'
    },
    placeholder: "Format",
    key: "format",
    options: Object.keys(formatDictionary).map(function (key) {
      return {
        value: key,
        label: formatDictionary[key]
      };
    }),
    onChange: function onChange(val) {
      _onChange(_extends({}, parameters, {
        format: val.value
      }));
    },
    className: "card-modal-select"
  }), /*#__PURE__*/React__default["default"].createElement("h5", null, "Auto Complete Category", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_autocomplete",
    type: "help",
    text: "Suggest entries based on the user's browser history"
  }))), /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: parameters['ui:autocomplete'] ? autoDictionary[typeof parameters['ui:autocomplete'] === 'string' ? parameters['ui:autocomplete'] : ''] : '',
      label: parameters['ui:autocomplete'] ? autoDictionary[typeof parameters['ui:autocomplete'] === 'string' ? parameters['ui:autocomplete'] : ''] : 'None'
    },
    placeholder: "Auto Complete",
    key: "ui:autocomplete",
    options: Object.keys(autoDictionary).map(function (key) {
      return {
        value: key,
        label: autoDictionary[key]
      };
    }),
    onChange: function onChange(val) {
      _onChange(_extends({}, parameters, {
        'ui:autocomplete': val.value
      }));
    },
    className: "card-modal-select"
  }), /*#__PURE__*/React__default["default"].createElement(PlaceholderInput, {
    parameters: parameters,
    onChange: _onChange
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Column Size", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_column_size",
    type: "help",
    text: "Set the column size of the input"
  }))), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters['ui:column'] ? parameters['ui:column'] : '',
    placeholder: "Column size",
    key: "ui:column",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        'ui:column': ev.target.value
      }));
    },
    className: "card-modal-text"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-modal-boolean"
  }, /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      _onChange(_extends({}, parameters, {
        'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true
      }));
    },
    isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false,
    label: "Auto Focus"
  })));
}
function ShortAnswerField(_ref2) {
  var parameters = _ref2.parameters,
    _onChange2 = _ref2.onChange;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h5", null, "Default value"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters["default"],
    placeholder: "Default",
    type: formatTypeDictionary[parameters.format] || 'text',
    onChange: function onChange(ev) {
      return _onChange2(_extends({}, parameters, {
        "default": ev.target.value
      }));
    },
    className: "card-text"
  }));
}
function Password(_ref3) {
  var parameters = _ref3.parameters,
    _onChange3 = _ref3.onChange;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h5", null, "Default password"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters["default"],
    placeholder: "Default",
    type: "password",
    onChange: function onChange(ev) {
      return _onChange3(_extends({}, parameters, {
        "default": ev.target.value
      }));
    },
    className: "card-text"
  }));
}
var shortAnswerInput = {
  shortAnswer: {
    displayName: 'Short Answer',
    matchIf: [{
      types: ['string']
    }].concat(['email', 'hostname', 'uri', 'regex'].map(function (format) {
      return {
        types: ['string'],
        format: format
      };
    })),
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'string',
    cardBody: ShortAnswerField,
    modalBody: CardShortAnswerParameterInputs
  },
  password: {
    displayName: 'Password',
    matchIf: [{
      types: ['string'],
      widget: 'password'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'password'
    },
    type: 'string',
    cardBody: Password,
    modalBody: CardShortAnswerParameterInputs
  }
};

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("h4", null, "Minimum Length"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.minLength ? parameters.minLength : '',
    placeholder: "Minimum Length",
    key: "minLength",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        minLength: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Maximum Length"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.maxLength ? parameters.maxLength : '',
    placeholder: "Maximum Length",
    key: "maxLength",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        maxLength: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Regular Expression Pattern", ' ', /*#__PURE__*/React__default["default"].createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
  }, /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_regex",
    type: "help",
    text: "Regular expression pattern that this must satisfy"
  }))), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.pattern ? parameters.pattern : '',
    placeholder: "Regular Expression Pattern",
    key: "pattern",
    type: "text",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        pattern: ev.target.value
      }));
    },
    className: "card-modal-text"
  }), /*#__PURE__*/React__default["default"].createElement(PlaceholderInput, {
    parameters: parameters,
    onChange: _onChange
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-modal-boolean"
  }, /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
    onChangeValue: function onChangeValue() {
      _onChange(_extends({}, parameters, {
        'ui:autofocus': parameters['ui:autofocus'] ? parameters['ui:autofocus'] !== true : true
      }));
    },
    isChecked: parameters['ui:autofocus'] ? parameters['ui:autofocus'] === true : false,
    label: "Auto Focus"
  })));
}
function LongAnswer(_ref2) {
  var parameters = _ref2.parameters,
    _onChange2 = _ref2.onChange;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h5", null, "Default value"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters["default"],
    placeholder: "Default",
    type: "textarea",
    onChange: function onChange(ev) {
      return _onChange2(_extends({}, parameters, {
        "default": ev.target.value
      }));
    },
    className: "card-textarea"
  }));
}
var longAnswerInput = {
  longAnswer: {
    displayName: 'Long Answer',
    matchIf: [{
      types: ['string'],
      widget: 'textarea'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'textarea'
    },
    type: 'string',
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs
  }
};

// specify the inputs required for a number type object
function CardNumberParameterInputs(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  var _useState = React.useState(getRandomId()),
    elementId = _useState[0];
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("h4", null, "Multiple of", ' ', /*#__PURE__*/React__default["default"].createElement(Example, {
    id: elementId + "_multiple",
    type: "help",
    text: "Require number to be a multiple of this number"
  })), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.multipleOf ? parameters.multipleOf : '',
    placeholder: "ex: 2",
    key: "multipleOf",
    type: "number",
    onChange: function onChange(ev) {
      var newVal = parseFloat(ev.target.value);
      if (Number.isNaN(newVal)) newVal = null;
      _onChange(_extends({}, parameters, {
        multipleOf: newVal
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Minimum"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.minimum || parameters.exclusiveMinimum || '',
    placeholder: "ex: 3",
    key: "minimum",
    type: "number",
    onChange: function onChange(ev) {
      var newVal = parseFloat(ev.target.value);
      if (Number.isNaN(newVal)) newVal = null;
      // change either min or exclusiveMin depending on which one is active
      if (parameters.exclusiveMinimum) {
        _onChange(_extends({}, parameters, {
          exclusiveMinimum: newVal,
          minimum: null
        }));
      } else {
        _onChange(_extends({}, parameters, {
          minimum: newVal,
          exclusiveMinimum: null
        }));
      }
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-modal-boolean"
  }, /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
    key: "exclusiveMinimum",
    onChangeValue: function onChangeValue() {
      var newMin = parameters.minimum || parameters.exclusiveMinimum;
      if (parameters.exclusiveMinimum) {
        _onChange(_extends({}, parameters, {
          exclusiveMinimum: null,
          minimum: newMin
        }));
      } else {
        _onChange(_extends({}, parameters, {
          exclusiveMinimum: newMin,
          minimum: null
        }));
      }
    },
    isChecked: !!parameters.exclusiveMinimum,
    disabled: !parameters.minimum && !parameters.exclusiveMinimum,
    label: "Exclusive Minimum"
  })), /*#__PURE__*/React__default["default"].createElement("h4", null, "Maximum"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.maximum || parameters.exclusiveMaximum || '',
    placeholder: "ex: 8",
    key: "maximum",
    type: "number",
    onChange: function onChange(ev) {
      var newVal = parseFloat(ev.target.value);
      if (Number.isNaN(newVal)) newVal = null;
      // change either max or exclusiveMax depending on which one is active
      if (parameters.exclusiveMinimum) {
        _onChange(_extends({}, parameters, {
          exclusiveMaximum: newVal,
          maximum: null
        }));
      } else {
        _onChange(_extends({}, parameters, {
          maximum: newVal,
          exclusiveMaximum: null
        }));
      }
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-modal-boolean"
  }, /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
    key: "exclusiveMaximum",
    onChangeValue: function onChangeValue() {
      var newMax = parameters.maximum || parameters.exclusiveMaximum;
      if (parameters.exclusiveMaximum) {
        _onChange(_extends({}, parameters, {
          exclusiveMaximum: null,
          maximum: newMax
        }));
      } else {
        _onChange(_extends({}, parameters, {
          exclusiveMaximum: newMax,
          maximum: null
        }));
      }
    },
    isChecked: !!parameters.exclusiveMaximum,
    disabled: !parameters.maximum && !parameters.exclusiveMaximum,
    label: "Exclusive Maximum"
  })));
}
function NumberField(_ref2) {
  var parameters = _ref2.parameters,
    _onChange2 = _ref2.onChange;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h5", null, "Default number"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters["default"],
    placeholder: "Default",
    type: "number",
    onChange: function onChange(ev) {
      return _onChange2(_extends({}, parameters, {
        "default": parseFloat(ev.target.value)
      }));
    },
    className: "card-number"
  }));
}
var numberInputs = {
  integer: {
    displayName: 'Integer',
    matchIf: [{
      types: ['integer']
    }, {
      types: ['integer'],
      widget: 'number'
    }],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'integer',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs
  },
  number: {
    displayName: 'Number',
    matchIf: [{
      types: ['number']
    }],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'number',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs
  }
};

// specify the inputs required for a string type object
function CardArrayParameterInputs(_ref) {
  var parameters = _ref.parameters,
    _onChange = _ref.onChange;
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("h4", null, "Minimum Items"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.minItems || '',
    placeholder: "ex: 2",
    key: "minimum",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        minItems: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }), /*#__PURE__*/React__default["default"].createElement("h4", null, "Maximum Items"), /*#__PURE__*/React__default["default"].createElement(reactstrap.Input, {
    value: parameters.maxItems || '',
    placeholder: "ex: 2",
    key: "maximum",
    type: "number",
    onChange: function onChange(ev) {
      _onChange(_extends({}, parameters, {
        maxItems: parseInt(ev.target.value, 10)
      }));
    },
    className: "card-modal-number"
  }));
}
function getInnerCardComponent(_ref2) {
  var defaultFormInputs = _ref2.defaultFormInputs;
  return function InnerCard(_ref3) {
    var parameters = _ref3.parameters,
      _onChange2 = _ref3.onChange,
      mods = _ref3.mods;
    var _useState = React.useState(getRandomId),
      elementId = _useState[0];
    var newDataProps = {};
    var newUiProps = {};
    var allFormInputs = excludeKeys(Object.assign({}, defaultFormInputs, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);

    // parse components into data and ui relevant pieces
    Object.keys(parameters).forEach(function (propName) {
      if (propName.startsWith('ui:*')) {
        newUiProps[propName.substring(4)] = parameters[propName];
      } else if (propName.startsWith('ui:')) {
        newUiProps[propName] = parameters[propName];
      } else if (!['name', 'required'].includes(propName)) {
        newDataProps[propName] = parameters[propName];
      }
    });
    var definitionData = parameters.definitionData ? parameters.definitionData : {};
    var definitionUi = parameters.definitionUi ? parameters.definitionUi : {};
    var _React$useState = React__default["default"].useState(false),
      cardOpen = _React$useState[0],
      setCardOpen = _React$useState[1];
    if (parameters.type !== 'array') {
      return /*#__PURE__*/React__default["default"].createElement("h4", null, "Not an array ");
    }
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "card-array"
    }, /*#__PURE__*/React__default["default"].createElement(FBCheckbox, {
      onChangeValue: function onChangeValue() {
        if (newDataProps.items.type === 'object') {
          _onChange2(_extends({}, parameters, {
            items: _extends({}, newDataProps.items, {
              type: 'string'
            })
          }));
        } else {
          _onChange2(_extends({}, parameters, {
            items: _extends({}, newDataProps.items, {
              type: 'object'
            })
          }));
        }
      },
      isChecked: newDataProps.items.type === 'object',
      label: "Section",
      id: elementId + "_issection"
    }), generateElementComponentsFromSchemas({
      schemaData: {
        properties: {
          item: newDataProps.items
        }
      },
      uiSchemaData: {
        item: newUiProps.items
      },
      onChange: function onChange(schema, uischema) {
        _onChange2(_extends({}, parameters, {
          items: schema.properties.item,
          'ui:*items': uischema.item || {}
        }));
      },
      path: elementId,
      definitionData: definitionData,
      definitionUi: definitionUi,
      hideKey: true,
      cardOpenArray: [cardOpen],
      setCardOpenArray: function setCardOpenArray(newArr) {
        return setCardOpen(newArr[0]);
      },
      allFormInputs: allFormInputs,
      mods: mods,
      categoryHash: generateCategoryHash(allFormInputs),
      Card: function Card$1(props) {
        return /*#__PURE__*/React__default["default"].createElement(Card, _extends({}, props, {
          showObjectNameInput: false
        }));
      },
      Section: Section
    }));
  };
}
var defaultFormInputs = _extends({}, defaultInputs, shortAnswerInput, longAnswerInput, numberInputs);
defaultFormInputs.array = {
  displayName: 'Array',
  matchIf: [{
    types: ['array']
  }],
  defaultDataSchema: {
    items: {
      type: 'string'
    }
  },
  defaultUiSchema: {},
  type: 'array',
  cardBody: getInnerCardComponent({
    defaultFormInputs: defaultFormInputs
  }),
  modalBody: CardArrayParameterInputs
};
var ArrayInputs = {
  array: {
    displayName: 'Array',
    matchIf: [{
      types: ['array']
    }],
    defaultDataSchema: {
      items: {
        type: 'string'
      }
    },
    defaultUiSchema: {},
    type: 'array',
    cardBody: getInnerCardComponent({
      defaultFormInputs: defaultFormInputs
    }),
    modalBody: CardArrayParameterInputs
  }
};

function CardReferenceParameterInputs(_ref) {
  var parameters = _ref.parameters,
    onChange = _ref.onChange;
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(PlaceholderInput, {
    parameters: parameters,
    onChange: onChange
  }));
}
function RefChoice(_ref2) {
  var parameters = _ref2.parameters,
    _onChange = _ref2.onChange;
  var pathArr = (parameters.$ref || '').split('/');
  var currentValueLabel = pathArr.length === 3 && pathArr[0] === '#' && pathArr[1] === 'definitions' && (parameters.definitionData || {})[pathArr[2]] ? parameters.definitionData[pathArr[2]].title || parameters.$ref : parameters.$ref;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "card-select"
  }, /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
    value: {
      value: parameters.$ref,
      label: currentValueLabel
    },
    placeholder: "Reference",
    options: Object.keys(parameters.definitionData || {}).map(function (key) {
      return {
        value: "#/definitions/" + key,
        label: parameters.definitionData[key].title || "#/definitions/" + key
      };
    }),
    onChange: function onChange(val) {
      _onChange(_extends({}, parameters, {
        $ref: val.value
      }));
    },
    className: "card-select"
  }));
}
var referenceInputs = {
  ref: {
    displayName: 'Reference',
    matchIf: [{
      types: ['null'],
      $ref: true
    }],
    defaultDataSchema: {
      $ref: '',
      title: '',
      description: ''
    },
    defaultUiSchema: {},
    type: 'string',
    cardBody: RefChoice,
    modalBody: CardReferenceParameterInputs
  }
};

var DEFAULT_FORM_INPUTS = _extends({}, defaultInputs, referenceInputs, shortAnswerInput, longAnswerInput, numberInputs, ArrayInputs);

var useStyles$1 = reactJss.createUseStyles({
  formBuilder: _extends({
    'text-align': 'center',
    '& .fa': {
      cursor: 'pointer'
    },
    '& .fa-question-circle, & .fa-circle-question': {
      color: 'gray'
    },
    '& .fa-asterisk': {
      'font-size': '.9em',
      color: 'green'
    },
    '& .fa-plus-square, & .fa-square-plus': {
      color: 'green',
      'font-size': '1.5em',
      margin: '0 auto'
    }
  }, arrows, {
    '& .card-container': {
      '&:hover': {
        border: '1px solid green'
      },
      display: 'block',
      width: '70%',
      'min-width': '400px',
      margin: '2em auto',
      border: '1px solid gray',
      'border-radius': '4px',
      'background-color': 'white',
      '& h4': {
        width: '100%',
        'text-align': 'left',
        display: 'inline-block',
        color: '#138AC2',
        margin: '0.25em .5em 0 .5em',
        'font-size': '18px'
      },
      '& .d-flex': {
        'border-bottom': '1px solid gray'
      },
      '& .label': {
        "float": 'left'
      }
    },
    '& .card-container:hover': {
      border: '1px solid green'
    },
    '& .card-dependent': {
      border: '1px dashed gray'
    },
    '& .card-requirements': {
      border: '1px dashed black'
    },
    '& .section-container': {
      '&:hover': {
        border: '1px solid green'
      },
      display: 'block',
      width: '90%',
      'min-width': '400px',
      margin: '2em auto',
      border: '1px solid gray',
      'border-radius': '4px',
      'background-color': 'white',
      '& h4': {
        width: '100%',
        'text-align': 'left',
        display: 'inline-block',
        color: '#138AC2',
        margin: '0.25em .5em 0 .5em',
        'font-size': '18px'
      },
      '& .d-flex': {
        'border-bottom': '1px solid gray'
      },
      '& .label': {
        "float": 'left'
      }
    },
    '& .section-container:hover': {
      border: '1px solid green'
    },
    '& .section-dependent': {
      border: '1px dashed gray'
    },
    '& .section-requirements': {
      border: '1px dashed black'
    },
    '& .alert': {
      textAlign: 'left',
      width: '70%',
      margin: '1em auto',
      '& h5': {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0'
      },
      '& .fa': {
        fontSize: '14px'
      }
    },
    '& .disabled-unchecked-checkbox': {
      color: 'gray',
      '& div::before': {
        backgroundColor: 'lightGray'
      }
    },
    '& .disabled-input': {
      '& input': {
        backgroundColor: 'lightGray'
      },
      '& input:focus': {
        backgroundColor: 'lightGray',
        border: '1px solid gray'
      }
    }
  }),
  formHead: {
    display: 'block',
    margin: '0 auto',
    'background-color': '#EBEBEB',
    border: '1px solid #858F96',
    'border-radius': '4px',
    width: '70%',
    padding: '10px',
    '& div': {
      width: '30%',
      display: 'inline-block',
      'text-align': 'left',
      padding: '10px'
    },
    '& .form-title': {
      'text-align': 'left'
    },
    '& .form-description': {
      'text-align': 'left'
    },
    '& h5': {
      'font-size': '14px',
      'line-height': '21px',
      'font-weight': 'bold'
    }
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
    '& .fa-pencil-alt, & .fa-pencil': {
      border: '1px solid #1d71ad',
      color: '#1d71ad'
    },
    '& .modal-body': {
      maxHeight: '500px',
      overflowY: 'scroll'
    },
    '& .card-add': {
      cursor: 'pointer',
      display: 'block',
      color: '$green',
      fontSize: '1.5em'
    }
  },
  formFooter: {
    marginTop: '1em',
    textAlign: 'center',
    '& .fa': {
      cursor: 'pointer',
      color: '$green',
      fontSize: '1.5em'
    }
  }
});
function FormBuilder(_ref) {
  var schema = _ref.schema,
    uischema = _ref.uischema,
    _onChange = _ref.onChange,
    mods = _ref.mods,
    className = _ref.className;
  var classes = useStyles$1();
  var schemaData = parse(schema) || {};
  schemaData.type = 'object';
  var uiSchemaData = parse(uischema) || {};
  var allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
  var unsupportedFeatures = checkForUnsupportedFeatures(schemaData, uiSchemaData, allFormInputs);
  var elementNum = countElementsFromSchema(schemaData);
  var defaultCollapseStates = [].concat(Array(elementNum)).map(function () {
    return false;
  });
  var _React$useState = React__namespace.useState(defaultCollapseStates),
    cardOpenArray = _React$useState[0],
    setCardOpenArray = _React$useState[1];
  var categoryHash = generateCategoryHash(allFormInputs);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: classes.formBuilder + " " + (className || '')
  }, /*#__PURE__*/React__namespace.createElement(reactstrap.Alert, {
    style: {
      display: unsupportedFeatures.length === 0 ? 'none' : 'block'
    },
    color: "warning"
  }, /*#__PURE__*/React__namespace.createElement("h5", null, "Unsupported Features:"), unsupportedFeatures.map(function (message, index) {
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: index
    }, message);
  })), (!mods || mods.showFormHead !== false) && /*#__PURE__*/React__namespace.createElement("div", {
    className: classes.formHead,
    "data-test": "form-head"
  }, /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("h5", {
    "data-test": "form-name-label"
  }, mods && mods.labels && typeof mods.labels.formNameLabel === 'string' ? mods.labels.formNameLabel : 'Form Name'), /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
    value: schemaData.title || '',
    placeholder: "Title",
    type: "text",
    onChange: function onChange(ev) {
      _onChange(stringify(_extends({}, schemaData, {
        title: ev.target.value
      })), uischema);
    },
    className: "form-title"
  })), /*#__PURE__*/React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement("h5", {
    "data-test": "form-description-label"
  }, mods && mods.labels && typeof mods.labels.formDescriptionLabel === 'string' ? mods.labels.formDescriptionLabel : 'Form Description'), /*#__PURE__*/React__namespace.createElement(reactstrap.Input, {
    value: schemaData.description || '',
    placeholder: "Description",
    type: "text",
    onChange: function onChange(ev) {
      return _onChange(stringify(_extends({}, schemaData, {
        description: ev.target.value
      })), uischema);
    },
    className: "form-description"
  }))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "form-body " + classes.formBody
  }, /*#__PURE__*/React__namespace.createElement(reactBeautifulDnd.DragDropContext, {
    onDragEnd: function onDragEnd$1(result) {
      return onDragEnd(result, {
        schema: schemaData,
        uischema: uiSchemaData,
        onChange: function onChange(newSchema, newUiSchema) {
          return _onChange(stringify(newSchema), stringify(newUiSchema));
        },
        definitionData: schemaData.definitions,
        definitionUi: uiSchemaData.definitions,
        categoryHash: categoryHash
      });
    },
    className: "form-body"
  }, /*#__PURE__*/React__namespace.createElement(reactBeautifulDnd.Droppable, {
    droppableId: "droppable"
  }, function (providedDroppable) {
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: providedDroppable.innerRef
    }, providedDroppable.droppableProps), generateElementComponentsFromSchemas({
      schemaData: schemaData,
      uiSchemaData: uiSchemaData,
      onChange: function onChange(newSchema, newUiSchema) {
        return _onChange(stringify(newSchema), stringify(newUiSchema));
      },
      definitionData: schemaData.definitions,
      definitionUi: uiSchemaData.definitions,
      path: 'root',
      cardOpenArray: cardOpenArray,
      setCardOpenArray: setCardOpenArray,
      allFormInputs: allFormInputs,
      mods: mods,
      categoryHash: categoryHash,
      Card: Card,
      Section: Section
    }).map(function (element, index) {
      return /*#__PURE__*/React__namespace.createElement(reactBeautifulDnd.Draggable, {
        key: element.key,
        draggableId: element.key,
        index: index
      }, function (providedDraggable) {
        return /*#__PURE__*/React__namespace.createElement("div", _extends({
          ref: providedDraggable.innerRef
        }, providedDraggable.draggableProps, providedDraggable.dragHandleProps), element);
      });
    }), providedDroppable.placeholder);
  }))), /*#__PURE__*/React__namespace.createElement("div", {
    className: "form-footer " + classes.formFooter
  }, /*#__PURE__*/React__namespace.createElement(Add, {
    tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
    addElem: function addElem(choice) {
      if (choice === 'card') {
        addCardObj({
          schema: schemaData,
          uischema: uiSchemaData,
          mods: mods,
          onChange: function onChange(newSchema, newUiSchema) {
            return _onChange(stringify(newSchema), stringify(newUiSchema));
          },
          definitionData: schemaData.definitions,
          definitionUi: uiSchemaData.definitions,
          categoryHash: categoryHash
        });
      } else if (choice === 'section') {
        addSectionObj({
          schema: schemaData,
          uischema: uiSchemaData,
          onChange: function onChange(newSchema, newUiSchema) {
            return _onChange(stringify(newSchema), stringify(newUiSchema));
          },
          definitionData: schemaData.definitions,
          definitionUi: uiSchemaData.definitions,
          categoryHash: categoryHash
        });
      }
    },
    hidden: schemaData.properties && Object.keys(schemaData.properties).length !== 0
  })));
}

function CardGallery(_ref) {
  var definitionSchema = _ref.definitionSchema,
    definitionUiSchema = _ref.definitionUiSchema,
    _onChange = _ref.onChange,
    mods = _ref.mods,
    categoryHash = _ref.categoryHash;
  var elementNum = countElementsFromSchema({
    properties: definitionSchema
  });
  var defaultCollapseStates = [].concat(Array(elementNum)).map(function () {
    return false;
  });
  var _React$useState = React__default["default"].useState(defaultCollapseStates),
    cardOpenArray = _React$useState[0],
    setCardOpenArray = _React$useState[1];
  var allFormInputs = Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {});
  var componentArr = generateElementComponentsFromSchemas({
    schemaData: {
      properties: definitionSchema
    },
    uiSchemaData: definitionUiSchema,
    onChange: function onChange(newDefinitions, newDefinitionUis) {
      var oldUi = newDefinitionUis;
      var newUi = {};
      Object.keys(oldUi).forEach(function (definedUi) {
        if (!['definitions', 'ui:order'].includes(definedUi)) newUi[definedUi] = oldUi[definedUi];
      });
      _onChange(newDefinitions.properties, newUi);
    },
    path: 'definitions',
    definitionData: definitionSchema,
    definitionUi: definitionUiSchema,
    cardOpenArray: cardOpenArray,
    setCardOpenArray: setCardOpenArray,
    allFormInputs: allFormInputs,
    mods: mods,
    categoryHash: categoryHash,
    Card: Card,
    Section: Section
  }).map(function (element) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: typeof element.key === 'string' ? element.key : '',
      className: "form_gallery_container"
    }, element);
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form_gallery"
  }, componentArr, componentArr.length === 0 && /*#__PURE__*/React__default["default"].createElement("h5", null, "No components in \"definitions\""), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "form_footer"
  }, /*#__PURE__*/React__default["default"].createElement(Add, {
    tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
    addElem: function addElem(choice) {
      if (choice === 'card') {
        addCardObj({
          schema: {
            properties: definitionSchema
          },
          uischema: definitionUiSchema,
          mods: mods,
          onChange: function onChange(newDefinitions, newDefinitionUis) {
            var oldUi = newDefinitionUis;
            var newUi = {};
            Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
              if (!['definitions', 'ui:order'].includes(definedUiSchemaKey)) newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
            });
            _onChange(newDefinitions.properties, newUi);
          },
          definitionData: definitionSchema,
          definitionUi: definitionUiSchema,
          categoryHash: categoryHash
        });
      } else if (choice === 'section') {
        addSectionObj({
          schema: {
            properties: definitionSchema
          },
          uischema: definitionUiSchema,
          onChange: function onChange(newDefinitions, newDefinitionUis) {
            var oldUi = newDefinitionUis;
            var newUi = {};
            Object.keys(oldUi).forEach(function (definedUiSchemaKey) {
              if (!['definitions', 'ui:order'].includes(definedUiSchemaKey)) newUi[definedUiSchemaKey] = oldUi[definedUiSchemaKey];
            });
            _onChange(newDefinitions.properties, newUi);
          },
          definitionData: definitionSchema,
          definitionUi: definitionUiSchema,
          categoryHash: categoryHash
        });
      }
    },
    hidden: !!definitionSchema && Object.keys(definitionSchema).length !== 0
  })));
}

var useStyles = reactJss.createUseStyles({
  preDefinedGallery: _extends({
    display: 'flex',
    flexDirection: 'column',
    'text-align': 'center',
    '& .fa': {
      cursor: 'pointer'
    },
    '& .fa-question-circle, & .fa-circle-question': {
      color: 'gray'
    },
    '& .fa-asterisk': {
      'font-size': '.9em',
      color: 'green'
    }
  }, arrows, {
    '& .form_footer': {
      marginTop: '1em',
      textAlign: 'center',
      '& .fa': {
        cursor: 'pointer',
        color: '$green',
        fontSize: '1.5em'
      }
    },
    '& .fa-plus-square & .fa-square-plus': {
      color: 'green',
      'font-size': '1.5em',
      margin: '0 auto'
    },
    '& .card-container': {
      '&:hover': {
        border: '1px solid green'
      },
      width: '70%',
      'min-width': '400px',
      margin: '2em auto',
      border: '1px solid gray',
      'border-radius': '4px',
      'background-color': 'white',
      '& h4': {
        width: '100%',
        'text-align': 'left',
        display: 'inline-block',
        color: '#138AC2',
        margin: '0.25em .5em 0 .5em',
        'font-size': '18px'
      },
      '& .d-flex': {
        'border-bottom': '1px solid gray'
      },
      '& .label': {
        "float": 'left'
      }
    },
    '& .card-requirements': {
      border: '1px dashed black'
    },
    '& .section-container': {
      '&:hover': {
        border: '1px solid green'
      },
      display: 'block',
      width: '90%',
      'min-width': '400px',
      margin: '2em auto',
      border: '1px solid gray',
      'border-radius': '4px',
      'background-color': 'white',
      '& h4': {
        width: '100%',
        'text-align': 'left',
        display: 'inline-block',
        color: '#138AC2',
        margin: '0.25em .5em 0 .5em',
        'font-size': '18px'
      },
      '& .d-flex': {
        'border-bottom': '1px solid gray'
      },
      '& .label': {
        "float": 'left'
      }
    },
    '& .section-dependent': {
      border: '1px dashed gray'
    },
    '& .section-requirements': {
      border: '1px dashed black'
    },
    '& .fa-pencil-alt, & .fa-pencil': {
      border: '1px solid #1d71ad',
      color: '#1d71ad'
    },
    '& .modal-body': {
      maxHeight: '500px',
      overflowY: 'scroll'
    },
    '& .card-container:hover': {
      border: '1px solid green'
    },
    '& .card-dependent': {
      border: '1px dashed gray'
    },
    '& .card-add': {
      cursor: 'pointer',
      display: 'block',
      color: '$green',
      fontSize: '1.5em'
    },
    '& .section-container:hover': {
      border: '1px solid green'
    }
  })
});
function PredefinedGallery(_ref) {
  var schema = _ref.schema,
    uischema = _ref.uischema,
    _onChange = _ref.onChange,
    mods = _ref.mods;
  var classes = useStyles();
  var schemaData = React__namespace.useMemo(function () {
    return parse(schema) || {};
  }, [schema]);
  var uiSchemaData = React__namespace.useMemo(function () {
    return parse(uischema) || {};
  }, [uischema]);
  var allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, mods && mods.customFormInputs || {}), mods && mods.deactivatedFormInputs);
  var categoryHash = generateCategoryHash(allFormInputs);
  React__namespace.useEffect(function () {
    if (!uiSchemaData.definitions) {
      // eslint-disable-next-line no-console
      console.log('Parsing UI schema to assign UI for definitions');
      // need to create definitions from scratch
      var references = [];
      // recursively search for all $refs in the schemaData
      var findRefs = function findRefs(name, schemaObject) {
        if (!schemaObject) return;
        if (typeof schemaObject === 'object') Object.keys(schemaObject).forEach(function (key) {
          if (typeof key === 'string') {
            if (key === '$ref') references.push(name);
            findRefs(key, schemaObject[key]);
          }
        });
        if (Array.isArray(schemaObject)) schemaObject.forEach(function (innerObj) {
          findRefs(name, innerObj);
        });
      };
      findRefs('root', schemaData);
      uiSchemaData.definitions = {};
      var referenceSet = new Set(references);
      Object.keys(uiSchemaData).forEach(function (uiProp) {
        if (referenceSet.has(uiProp)) uiSchemaData.definitions[uiProp] = uiSchemaData[uiProp];
      });
      if (!Object.keys(uiSchemaData.definitions).length) {
        uiSchemaData.definitions = undefined;
      }
      _onChange(stringify(schemaData), stringify(uiSchemaData));
    }
  }, [uiSchemaData, schemaData, _onChange]);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: classes.preDefinedGallery
  }, /*#__PURE__*/React__namespace.createElement(CardGallery, {
    definitionSchema: schemaData.definitions || {},
    definitionUiSchema: uiSchemaData.definitions || {},
    onChange: function onChange(newDefinitions, newDefinitionsUi) {
      // propagate changes in ui definitions to all relavant parties in main schema

      propagateDefinitionChanges(_extends({}, schemaData, {
        definitions: newDefinitions
      }), _extends({}, uiSchemaData, {
        definitions: newDefinitionsUi
      }), function (newSchema, newUiSchema) {
        return _onChange(stringify(newSchema), stringify(newUiSchema));
      }, categoryHash);
    },
    mods: mods,
    categoryHash: categoryHash
  }));
}

export default FormBuilder

//exports.FormBuilder = FormBuilder;
//exports.PredefinedGallery = PredefinedGallery;
//# sourceMappingURL=index.js.map
