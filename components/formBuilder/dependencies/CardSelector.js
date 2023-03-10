import { useState, createElement, Fragment } from "react";
import Delete from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
//import Select from "react-select";
import { MenuItem, Select } from "@material-ui/core";

// Importar componentes:
import { getRandomId } from "../utils";

// a field that lets you choose adjacent blocks
export default function CardSelector({
  possibleChoices,
  chosenChoices,
  onChange,
  placeholder,
  path,
}) {
  const [elementId] = useState(getRandomId());
  return createElement(
    Fragment,
    null,
    createElement(
      List,
      null,
      chosenChoices.map((chosenChoice, index) =>
        createElement(
          List,
          {
            key: `${elementId}_neighbor_${index}`,
          },
          chosenChoice,
          " ",
          createElement(Delete, {
            onClick: () =>
              onChange([
                ...chosenChoices.slice(0, index),
                ...chosenChoices.slice(index + 1),
              ]),
          })
        )
      )
    ),
    <Select
    value={{
            value: "",
            label: "",
          }}
    id={placeholder}
    style={{ width: "100%" }}
    onChange={(val) => {
            onChange([...chosenChoices, val.value]);
          }}
  >
{possibleChoices
       .filter((choice) => !chosenChoices.includes(choice))
       .map((choice, i ) => (
        <MenuItem key={i} value={choice}>{choice}
         </MenuItem>
       ))}
  </Select>

  ///////////////ORIGINAL ////////////
  //   createElement(Select, {
  //     value: {
  //       value: "",
  //       label: "",
  //     },
  //     placeholder: placeholder,
  //     options: possibleChoices
  //       .filter((choice) => !chosenChoices.includes(choice))
  //       .map((choice) => ({
  //         value: choice,
  //         label: choice,
  //       })),
  //     onChange: (val) => {
  //       onChange([...chosenChoices, val.value]);
  //     },
  //     className: "card-modal-select",
  //   })
   );
}
