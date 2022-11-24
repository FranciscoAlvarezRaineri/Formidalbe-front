import * as React from "react";

import _extends from "./_extends";
import { parse, stringify } from "./json";

import generateElementPropsFromSchemas from "./generateElementPropsFromSchemas";
import updateSchemas from "./updateSchemas";
import Card from "../FormBuilder/Card";
import Section from "../FormBuilder/Section";

function getCardParameterInputComponentForType(category, allFormInputs) {
  return (
    (allFormInputs[category] && allFormInputs[category].modalBody) ||
    (() => null)
  );
}

// generate an array of Card and Section components from a schema
export default function generateElementComponentsFromSchemas(parameters) {
  const {
    schemaData,
    uiSchemaData,
    onChange,
    definitionData,
    definitionUi,
    hideKey,
    path,
    cardOpenArray,
    setCardOpenArray,
    allFormInputs,
    mods,
    categoryHash,
  } = parameters;
  const schema = parse(stringify(schemaData));
  const uischema = parse(stringify(uiSchemaData));
  if (!schema.properties) return [];
  const elementPropArr = generateElementPropsFromSchemas({
    schema,
    uischema,
    definitionData,
    definitionUi,
    categoryHash,
  });
  const elementList = elementPropArr.map((elementProp, index) => {
    const expanded =
      (cardOpenArray && index < cardOpenArray.length && cardOpenArray[index]) ||
      false;
    if (elementProp.propType === "card") {
      // choose the appropriate type specific parameters
      const TypeSpecificParameters = getCardParameterInputComponentForType(
        elementProp.dataOptions.category || "string",
        allFormInputs
      );

      // add a fully defined card component to the list of components
      return React.createElement(Card, {
        componentProps: Object.assign(
          {
            name: elementPropArr[index].name,
            required: elementPropArr[index].required,
            hideKey,
            path: `${path}_${elementPropArr[index].name}`,
            definitionData,
            definitionUi,
            neighborNames: elementPropArr[index].neighborNames,
            dependents: elementPropArr[index].dependents,
            dependent: elementPropArr[index].dependent,
            parent: elementPropArr[index].parent,
          },
          elementPropArr[index].uiOptions,
          elementPropArr[index].dataOptions
        ),
        key: `${path}_${elementPropArr[index].name}`,
        TypeSpecificParameters: TypeSpecificParameters,
        onChange: (newCardObj) => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });

          // extract uiOptions and other properties
          const newDataProps = {};
          const newUiProps = {};
          Object.keys(newCardObj).forEach((propName) => {
            if (propName.startsWith("ui:")) {
              if (propName.startsWith("ui:*")) {
                newUiProps[propName.substring(4)] = newCardObj[propName];
              } else {
                newUiProps[propName] = newCardObj[propName];
              }
            } else if (
              ![
                "name",
                "required",
                "neighborNames",
                "dependents",
                "dependent",
                "parent",
              ].includes(propName)
            ) {
              newDataProps[propName] = newCardObj[propName];
            }
          });
          if (newElementObjArr[index].propType === "card") {
            const oldElement = newElementObjArr[index];
            newElementObjArr[index] = _extends({}, oldElement, {
              dataOptions: newDataProps,
              uiOptions: newUiProps,
              required: newCardObj.required,
              dependents: newCardObj.dependents,
              dependent: newCardObj.dependent,
              parent: newCardObj.parent,
              name: newCardObj.name,
              $ref: newCardObj.$ref,
              propType: "card",
            });
          } else {
            throw new Error("Card editing non card element");
          }
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onDelete: () => {
          // splice out this index from the card array
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          newElementObjArr.splice(index, 1);
          setCardOpenArray([
            ...cardOpenArray.slice(0, index),
            ...cardOpenArray.slice(index + 1),
          ]);
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onMoveUp: () => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          if (index === 0) return;
          const tempBlock = newElementObjArr[index - 1];
          newElementObjArr[index - 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onMoveDown: () => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          if (index === elementPropArr.length - 1) return;
          const tempBlock = newElementObjArr[index + 1];
          newElementObjArr[index + 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        cardOpen: expanded,
        setCardOpen: (newState) =>
          setCardOpenArray([
            ...cardOpenArray.slice(0, index),
            newState,
            ...cardOpenArray.slice(index + 1),
          ]),
        allFormInputs: allFormInputs,
        mods: mods,
      });
    } else if (elementProp.propType === "section") {
      // create a section with the appropriate schemas here
      return React.createElement(Section, {
        schema: elementProp.schema,
        uischema: elementProp.uischema,
        onChange: (newSchema, newUiSchema, newRef) => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          const oldSection = newElementObjArr[index];
          newElementObjArr[index] = _extends({}, oldSection, {
            schema: newSchema,
            uischema: newUiSchema,
            propType: "section",
          });
          if (newRef) newElementObjArr[index].$ref = newRef;
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onNameChange: (newName) => {
          const oldSection = elementProp;

          // check if newName overlaps with an existing name
          if (elementPropArr.map((elem) => elem.name).includes(newName)) return;
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            name: newName,
          });
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onRequireToggle: () => {
          const oldSection = elementProp;
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            required: !oldSection.required,
          });
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onDependentsChange: (newDependents) => {
          const oldSection = elementProp;
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          newElementObjArr[index] = _extends({}, oldSection, {
            dependents: newDependents,
          });
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            onChange,
            definitionData,
            definitionUi,
          });
        },
        onDelete: () => {
          // splice out this index from the card array
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          newElementObjArr.splice(index, 1);
          setCardOpenArray([
            ...cardOpenArray.slice(0, index),
            ...cardOpenArray.slice(index + 1),
          ]);
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onMoveUp: () => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          if (index === 0) return;
          const tempBlock = newElementObjArr[index - 1];
          newElementObjArr[index - 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        onMoveDown: () => {
          const newElementObjArr = generateElementPropsFromSchemas({
            schema,
            uischema,
            definitionData,
            definitionUi,
            categoryHash,
          });
          if (index === elementPropArr.length - 1) return;
          const tempBlock = newElementObjArr[index + 1];
          newElementObjArr[index + 1] = newElementObjArr[index];
          newElementObjArr[index] = tempBlock;
          updateSchemas(newElementObjArr, {
            schema,
            uischema,
            definitionData,
            definitionUi,
            onChange,
          });
        },
        name: elementProp.name,
        key: `${path}_${elementPropArr[index].name}`,
        required: elementProp.required,
        path: `${path}_${elementProp.name}`,
        definitionData: definitionData || {},
        definitionUi: definitionUi || {},
        hideKey: hideKey,
        reference: elementProp.$ref,
        neighborNames: elementProp.neighborNames,
        dependents: elementProp.dependents,
        dependent: elementProp.dependent,
        parent: elementProp.parent,
        cardOpen: expanded,
        setCardOpen: (newState) =>
          setCardOpenArray([
            ...cardOpenArray.slice(0, index),
            newState,
            ...cardOpenArray.slice(index + 1),
          ]),
        allFormInputs: allFormInputs,
        categoryHash: categoryHash,
        mods: mods,
      });
    } else {
      return React.createElement(
        "div",
        null,
        React.createElement("h2", null, " Error parsing element ")
      );
    }
  });
  return elementList;
}
