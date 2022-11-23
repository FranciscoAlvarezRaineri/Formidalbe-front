import * as Mui from "@material-ui/core";
import * as Icon from "@material-ui/icons";
import * as React from "react";

import { createUseStyles } from "react-jss";

// Importar componentes:
import FBCheckbox from "./FBCheckbox";
import Collapse from "./Collapse";
import Example from "./Example";
import CardModal from "./CardModal";
import CardGeneralParameterInputs from "./CardGeneralParameterInputs";
import Add from "./Add";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";

const useStyles$4 = createUseStyles({
  cardEntries: {
    "border-bottom": "1px solid gray",
    margin: ".5em 1.5em 0 1.5em",
    "& h5": {
      color: "black",
      "font-size": "14px",
      "font-weight": "bold",
    },
    "& .card-entry-row": {
      display: "flex",
    },
    "& .card-entry": {
      margin: 0,
      width: "50%",
      "text-align": "left",
      padding: "0.5em",
      "&.wide-card-entry": {
        width: "100%",
      },
    },
    "& input": {
      border: "1px solid gray",
      "border-radius": "4px",
    },
    "& .card-category-options": {
      padding: ".5em",
    },
    "& .card-select": {
      border: "1px solid gray",
      "border-radius": "4px",
    },
    "& .card-array": {
      "& .fa-plus-square, & .fa-square-plus": {
        display: "none",
      },
      "& .section-entries": {
        "& .fa-plus-square, & .fa-square-plus": {
          display: "initial",
        },
      },
    },
    "& .card-enum": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "lightGray",
      textAlign: "left",
      padding: "1em",
      "& h3": {
        fontSize: "16px",
        margin: "0 0 .5em 0",
      },
      "& label": {
        color: "black",
        fontSize: "14px",
      },
      "& .card-enum-header": {
        marginTop: "0.5em",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        "& h5": {
          width: "50%",
          fontWeight: "bold",
          fontSize: "14px",
        },
      },
      "& .fa": {
        cursor: "pointer",
      },
    },
  },
  cardInteractions: {
    margin: ".5em 1.5em",
    textAlign: "left",
    "& .fa": {
      marginRight: "1em",
      borderRadius: "4px",
      padding: ".25em",
      height: "25px",
      width: "25px",
    },
    "& .fa-arrow-up, .fa-arrow-down": {
      marginRight: ".5em",
    },
    "& .fa-trash": {
      border: "1px solid #DE5354",
      color: "#DE5354",
    },
    "& .fb-checkbox": {
      display: "inline-block",
    },
    "& .interactions-left, & .interactions-right": {
      display: "inline-block",
      width: "48%",
      margin: "0 auto",
    },
    "& .interactions-left": {
      textAlign: "left",
    },
    "& .interactions-right": {
      textAlign: "right",
    },
  },
});

export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true,
}) {
  const classes = useStyles$4();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [elementId] = React.useState(getRandomId());
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Collapse,
      {
        isOpen: cardOpen,
        toggleCollapse: () => setCardOpen(!cardOpen),
        title: React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "span",
            {
              onClick: () => setCardOpen(!cardOpen),
            },
            componentProps.title || componentProps.name,
            " ",
            componentProps.parent
              ? React.createElement(Example, {
                  text: `Depende de ${componentProps.parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : "",
            componentProps.$ref !== undefined
              ? React.createElement(Example, {
                  text: `Es una instancia del elemento pre-configurado ${componentProps.$ref}`,
                  id: `${elementId}_refinfo`,
                  type: "alert",
                })
              : ""
          ),
          React.createElement(
            Mui.Container,
            {
              id: `${elementId}_arrows`,
            },
            React.createElement(
              Mui.Tooltip,
              {
                title: "Mover elemento hacia arriba",
                id: `Hola`,
              },
              React.createElement(Icon.ArrowUpward, {
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
            React.createElement(
              Mui.Tooltip,
              {
                title: "Mover elemento hacia abajo",
                id: `${elementId}_movedownbiginfo`,
              },
              React.createElement(Icon.ArrowDownward, {
                onClick: () => (onMoveDown ? onMoveDown() : {}),
              })
            )
          )
        ),
      },
      React.createElement(
        Mui.Container,
        null,
        React.createElement(CardGeneralParameterInputs, {
          parameters: componentProps,
          onChange: onChange,
          allFormInputs: allFormInputs,
          mods: mods,
          showObjectNameInput: showObjectNameInput,
        })
      ),
      React.createElement(
        Mui.Container,
        null,
        React.createElement(
          Mui.Tooltip,
          {
            title: "Configuraciones adicionales",
            id: `${elementId}_editinfo`,
          },
          React.createElement(Icon.Edit, {
            onClick: () => setModalOpen(true),
          })
        ),
        React.createElement(
          Mui.Tooltip,
          {
            title: "Eliminar elemento",
            id: `${elementId}_trashinfo`,
          },
          React.createElement(Icon.Delete, {
            onClick: onDelete || (() => {}),
          })
        ),
        React.createElement(FBCheckbox, {
          onChangeValue: () =>
            onChange(
              _extends({}, componentProps, {
                required: !componentProps.required,
              })
            ),
          isChecked: !!componentProps.required,
          label: "Requerido",
          id: `${elementId}_required`,
        })
      ),
      React.createElement(CardModal, {
        componentProps: componentProps,
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        onChange: (newComponentProps) => {
          onChange(newComponentProps);
        },
        TypeSpecificParameters: TypeSpecificParameters,
      })
    ),
    addElem
      ? React.createElement(Add, {
          tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
          addElem: (choice) => addElem(choice),
        })
      : ""
  );
}

/*
export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true,
}) {
  const classes = useStyles$4();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [elementId] = React.useState(getRandomId());
  return  React.createElement(
    React.Fragment,
    null,
     React.createElement(
      Collapse,
      {
        isOpen: cardOpen,
        toggleCollapse: () => setCardOpen(!cardOpen),
        title:  React.createElement(
          React.Fragment,
          null,
           React.createElement(
            "span",
            {
              onClick: () => setCardOpen(!cardOpen),
              className: "label",
            },
            componentProps.title || componentProps.name,
            " ",
            componentProps.parent
              ?  React.createElement(Example, {
                  text: `Depends on ${componentProps.parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : "",
            componentProps.$ref !== undefined
              ?  React.createElement(Example, {
                  text: `Is an instance of pre-configured component ${componentProps.$ref}`,
                  id: `${elementId}_refinfo`,
                  type: "alert",
                })
              : ""
          ),
           React.createElement(
            "span",
            {
              className: "arrows",
            },
             React.createElement(
              "span",
              {
                id: `${elementId}_moveupbiginfo`,
              },
               React.createElement(FontAwesomeIcon, {
                icon: faArrowUp,
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
             React.createElement(
              UncontrolledTooltip,
              {
                placement: "top",
                target: `${elementId}_moveupbiginfo`,
              },
              "Move form element up"
            ),
             React.createElement(
              "span",
              {
                id: `${elementId}_movedownbiginfo`,
              },
               React.createElement(FontAwesomeIcon, {
                icon: faArrowDown,
                onClick: () => (onMoveDown ? onMoveDown() : {}),
              })
            ),
             React.createElement(
              UncontrolledTooltip,
              {
                placement: "top",
                target: `${elementId}_movedownbiginfo`,
              },
              "Move form element down"
            )
          )
        ),
        className: `card-container ${
          componentProps.dependent ? "card-dependent" : ""
        } ${componentProps.$ref === undefined ? "" : "card-reference"}`,
      },
       React.createElement(
        "div",
        {
          className: classes.cardEntries,
        },
         React.createElement(CardGeneralParameterInputs, {
          parameters: componentProps,
          onChange: onChange,
          allFormInputs: allFormInputs,
          mods: mods,
          showObjectNameInput: showObjectNameInput,
        })
      ),
       React.createElement(
        "div",
        {
          className: classes.cardInteractions,
        },
         React.createElement(
          "span",
          {
            id: `${elementId}_editinfo`,
          },
           React.createElement(FontAwesomeIcon, {
            icon: faPencilAlt,
            onClick: () => setModalOpen(true),
          })
        ),
         React.createElement(
          UncontrolledTooltip,
          {
            placement: "top",
            target: `${elementId}_editinfo`,
          },
          "Additional configurations for this form element"
        ),
         React.createElement(
          "span",
          {
            id: `${elementId}_trashinfo`,
          },
           React.createElement(FontAwesomeIcon, {
            icon: faTrash,
            onClick: onDelete || (() => {}),
          })
        ),
         React.createElement(
          UncontrolledTooltip,
          {
            placement: "top",
            target: `${elementId}_trashinfo`,
          },
          "Delete form element"
        ),
        React.createElement(FBCheckbox, {
          onChangeValue: () =>
            onChange(
              _extends({}, componentProps, {
                required: !componentProps.required,
              })
            ),
          isChecked: !!componentProps.required,
          label: "Required",
          id: `${elementId}_required`,
        })
      ),
       React.createElement(CardModal, {
        componentProps: componentProps,
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        onChange: (newComponentProps) => {
          onChange(newComponentProps);
        },
        TypeSpecificParameters: TypeSpecificParameters,
      })
    ),
    addElem
      ? React.createElement(Add, {
          tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
          addElem: (choice) => addElem(choice),
        })
      : ""
  );
}
*/
