import { useState, createElement, Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Container from "@material-ui/core/Container";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

// Importar componentes:
import Collapse from "./Collapse";
import Example from "./Example";
import Add from "./Add";
import FBCheckbox from "./FBCheckbox";
import CardModal from "./CardModal";
import CardGeneralParameterInputs from "./CardGeneralParameterInputs";

// Importar Utils:
import getRandomId from "../FormBuilderUtils/getRandomId";
import _extends from "../FormBuilderUtils/_extends";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [elementId] = useState(getRandomId());
  return createElement(
    Fragment,
    null,
    createElement(
      Collapse,
      {
        isOpen: !cardOpen,
        toggleCollapse: () => setCardOpen(!cardOpen),
        title: createElement(
          Fragment,
          null,
          createElement(
            Typography,
            {
              variant: "h5",
              display: "inline",
              onClick: () => setCardOpen(!cardOpen),
            },
            componentProps.title || componentProps.name,
            " ",
            componentProps.parent
              ? createElement(Example, {
                  text: `Depende de ${componentProps.parent}`,
                  id: `${elementId}_parentinfo`,
                  type: "alert",
                })
              : "",
            componentProps.$ref !== undefined
              ? createElement(Example, {
                  text: `Es una instancia del elemento pre-configurado ${componentProps.$ref}`,
                  id: `${elementId}_refinfo`,
                  type: "alert",
                })
              : ""
          ),
          createElement(
            "span",
            {
              display: "inline",
              id: `${elementId}_arrows`,
            },
            createElement(
              Tooltip,
              {
                title: "Mover elemento hacia arriba",
                id: `Hola`,
              },
              createElement(ArrowUpward, {
                onClick: () => (onMoveUp ? onMoveUp() : {}),
              })
            ),
            createElement(
              Tooltip,
              {
                title: "Mover elemento hacia abajo",
                id: `${elementId}_movedownbiginfo`,
              },
              createElement(ArrowDownward, {
                onClick: () => (onMoveDown ? onMoveDown() : {}),
              })
            )
          )
        ),
      },
      createElement(
        Container,
        null,
        createElement(CardGeneralParameterInputs, {
          parameters: componentProps,
          onChange: onChange,
          allFormInputs: allFormInputs,
          mods: mods,
          showObjectNameInput: showObjectNameInput,
        })
      ),
      createElement(
        Container,
        null,
        createElement(
          Tooltip,
          {
            title: "Configuraciones adicionales",
            id: `${elementId}_editinfo`,
          },
          createElement(Edit, {
            onClick: () => setModalOpen(true),
          })
        ),
        createElement(
          Tooltip,
          {
            title: "Eliminar elemento",
            id: `${elementId}_trashinfo`,
          },
          createElement(Delete, {
            onClick: onDelete || (() => {}),
          })
        ),
        createElement(FBCheckbox, {
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
      createElement(CardModal, {
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
      ? createElement(Add, {
          tooltipDescription: ((mods || {}).tooltipDescriptions || {}).add,
          addElem: (choice) => addElem(choice),
        })
      : ""
  );
}
