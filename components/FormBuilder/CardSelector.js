import  { useState , createElement , Fragment } from "react";
import Delete from "@material-ui/icons/Delete";
import List from "@material-ui/core"
import Select from "react-select";

// Importar componentes:
import getRandomId from "../FormBuilderUtils/getRandomId";

// a field that lets you choose adjacent blocks
export default function CardSelector({
  possibleChoices,
  chosenChoices,
  onChange,
  placeholder,
  path,
}) {
  const [elementId] = useState(getRandomId());
  return /*#__PURE__*/ createElement(
    Fragment,
    null,
    /*#__PURE__*/ createElement(
      List,
      null,
      chosenChoices.map((chosenChoice, index) =>
        /*#__PURE__*/ createElement(
          List,
          {
            key: `${elementId}_neighbor_${index}`,
          },
          chosenChoice,
          " ",
          /*#__PURE__*/ createElement(Delete, {
            onClick: () =>
              onChange([
                ...chosenChoices.slice(0, index),
                ...chosenChoices.slice(index + 1),
              ]),
          })
        )
      )
    ),
    /*#__PURE__*/ createElement(Select, {
      value: {
        value: "",
        label: "",
      },
      placeholder: placeholder,
      options: possibleChoices
        .filter((choice) => !chosenChoices.includes(choice))
        .map((choice) => ({
          value: choice,
          label: choice,
        })),
      onChange: (val) => {
        onChange([...chosenChoices, val.value]);
      },
      className: "card-modal-select",
    })
  );
}
