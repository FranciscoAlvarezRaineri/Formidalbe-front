import { createElement } from "react";

import PlaceholderInput from "../inputs/PlaceholderInput";
//import Select from "react-select";
import Container from "@material-ui/core/Container";
import { Select } from "@material-ui/core";

export function CardReferenceParameterInputs({ parameters, onChange }) {
  return createElement(
    "div",
    null,
    createElement(PlaceholderInput, {
      parameters: parameters,
      onChange: onChange,
    })
  );
}

function RefChoice({ parameters, onChange }) {
  const pathArr = (parameters.$ref || "").split("/");
  const currentValueLabel =
    pathArr.length === 3 &&
    pathArr[0] === "#" &&
    pathArr[1] === "definitions" &&
    (parameters.definitionData || {})[pathArr[2]]
      ? parameters.definitionData[pathArr[2]].title || parameters.$ref
      : parameters.$ref;
  return createElement(
    Container,
    {
      className: "card-select",
    },
    <Select
    labelId="Reference"
    options={Object.keys(parameters.definitionData || {}).map((key) => ({
      value: `#/definitions/${key}`,
      label: parameters.definitionData[key].title || `#/definitions/${key}`,
    }))}
    getOptionLabel={(option) => option.label}
    style={{ width: "100%" }}
    
    onChange={(val) => {
      onChange(
        _extends({}, parameters, {
          $ref: val.value,
        })
      );
    }}
    
  />,
    /////////////////ORIGINAL ////////////////////////////
    // createElement(Select, {
    //   value: {
    //     value: parameters.$ref,
    //     label: currentValueLabel,
    //   },
    //   placeholder: "Reference",
    //   options: Object.keys(parameters.definitionData || {}).map((key) => ({
    //     value: `#/definitions/${key}`,
    //     label: parameters.definitionData[key].title || `#/definitions/${key}`,
    //   })),
    //   onChange: (val) => {
    //     onChange(
    //       _extends({}, parameters, {
    //         $ref: val.value,
    //       })
    //     );
    //   },
    //   className: "card-select",
    // })
  );
}

const referenceInputs = {
  ref: {
    displayName: "Reference",
    matchIf: [
      {
        types: ["null"],
        $ref: true,
      },
    ],
    defaultDataSchema: {
      $ref: "",
      title: "",
      description: "",
    },
    defaultUiSchema: {},
    type: "string",
    cardBody: RefChoice,
    modalBody: CardReferenceParameterInputs,
  },
};

export default referenceInputs;
