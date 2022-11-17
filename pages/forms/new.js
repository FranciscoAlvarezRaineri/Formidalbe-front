// Similar a forms/[formID]/manage salvo que sin el botón de eliminar.
// Al crearlo se debe guardar el form en el back end.
import { useState, useEffect } from "react";
import Form from "@rjsf/material-ui";
import validator from "@rjsf/validator-ajv8";
import Editor from "@monaco-editor/react";
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { PlayCircleFilledWhiteTwoTone } from "@material-ui/icons";

export default function NewForm() {
  const [newSchema, setNewSchema] = useState("");
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  useEffect(() => {
    setUiSchema({
      "ui:order": [
        "Condiciones generales obligatorias",
        "Elementos de protección personal necesarios para la tarea",
        "Riesgos aplicados",
      ],
      "Riesgos aplicados": {
        Polvo: {
          "ui:help":
            "Armado de cerramiento, utilización de máscaras con filtros, barbijos, líneas de aire, etc.",
        },
        Ruido: {
          "ui:help":
            "Vacíos, decomiso, servicios industriales, etc. Utilización obligatoria de protectores auditivos para realizar las tareas.",
        },
        "ui:order": [
          "Uso de herramienta manual eléctrica",
          "Descarga de materiales y productos químicos",
          "Polvo",
          "Ruido",
          "Material para construcción",
          "Ubicación",
          "Medida de contención",
          "Estiba y/o punto de sujeción",
          "Fecha",
          "Equipo Rodante (autoelevador, carreta)",
        ],
        "Material para construcción": {
          "ui:help":
            "Todo aquel material necesario para la realización de una obra dentro o fuera del predio, que implique sostener un stock temporario en las instalaciones de la planta.",
        },
        "Uso de herramienta manual eléctrica": {
          "ui:help":
            "Tablero eléctrico con llave termomagnética, disyuntor diferencial y puesta a tierra protegiendo todos los tendidos, herramientas, prolongaciones y herramientas en buen estado.",
        },
        "Equipo Rodante (autoelevador, carreta)": {
          "ui:help":
            "Formación específica para el manejo del equipo, respetar procedimiento de circulación y velocidades permitidas, uso de cinturón de seguridad.",
        },
        "Descarga de materiales y productos químicos": {
          "ui:help":
            "Colocación de tacos, delimitación del área de trabajo, uso de EPP indicados en la hoja de seguridad del producto, puesta a tierra, contención frente a derrames, verificar que lava ojos y ducha de emergencia se encuentren en servicio, utilizar instructivos y procedimientos de trabajo seguro.",
        },
      },
      "Condiciones generales obligatorias": {
        "ui:order": [
          "Respetar procedimiento de circulación para contratistas",
          "Colocar vallados y sectorizar el área de trabajo",
          "Indumentaria en buenas condiciones de limpieza",
          "Indumentaria acorde a la tarea a realizar",
          "Retiro de materiales al final de la jornada",
          "Analisis de riesgo",
        ],
        "Analisis de riesgo": {
          "ui:widget": "radio",
        },
        "Indumentaria acorde a la tarea a realizar": {
          "ui:widget": "radio",
        },
        "Retiro de materiales al final de la jornada": {
          "ui:widget": "radio",
        },
        "Indumentaria en buenas condiciones de limpieza": {
          "ui:widget": "radio",
        },
        "Colocar vallados y sectorizar el área de trabajo": {
          "ui:widget": "radio",
        },
        "Respetar procedimiento de circulación para contratistas": {
          "ui:widget": "radio",
        },
      },
      "Elementos de protección personal necesarios para la tarea": {
        epps: {
          "ui:order": [
            "Casco",
            "Guantes",
            "Delantal",
            "Máscara facial",
            "Protector auditivo",
            "Arnés de seguridad",
            "Anteojos de seguridad",
            "Otros",
            "Otros detalles",
          ],
        },
      },
    });
    setSchema({
      type: "object",
      title: "Permiso de Trabajo General",
      properties: {
        "Riesgos aplicados": {
          type: "object",
          title: "Riesgos aplicables al trabajo a realizar.",
          properties: {
            Polvo: {
              type: "boolean",
              title: "Polvo",
            },
            Ruido: {
              type: "boolean",
              title: "Ruido",
            },
            "Material para construcción": {
              type: "boolean",
              title: "Material para construcción",
            },
            "Uso de herramienta manual eléctrica": {
              type: "boolean",
              title: "Uso de herramienta eléctrica",
            },
            "Equipo Rodante (autoelevador, carreta)": {
              type: "boolean",
              title: "Equipo Rodante (autoelevador, carreta)",
            },
            "Descarga de materiales y productos químicos": {
              type: "boolean",
              title: "Descarga de materiales y productos químicos",
            },
          },
          dependencies: {
            "Material para construcción": {
              oneOf: [
                {
                  "-required": [
                    "Medida de contención",
                    "Estiba y/o punto de sujeción",
                    "Fecha",
                  ],
                  properties: {
                    Ubicación: {
                      type: "object",
                      title: "",
                      properties: {
                        "materiales-necesarios": {
                          type: "string",
                          title: "Materiales necesarios",
                        },
                      },
                    },
                    "Medida de contención": {
                      type: "string",
                      title: "Medida de contención",
                    },
                    "Material para construcción": {
                      enum: [true],
                    },
                    "Estiba y/o punto de sujeción": {
                      type: "string",
                      title: "Estiba y/o punto de sujeción",
                    },
                  },
                },
                {
                  "Material para construcción": {
                    OTROS: {
                      enum: [false],
                    },
                  },
                },
              ],
            },
          },
        },
        "Condiciones generales obligatorias": {
          type: "object",
          title: "Condiciones generales obligatorias",
          "-required": [
            "Respetar procedimiento de circulación para contratistas",
            "Colocar vallados y sectorizar el área de trabajo",
            "Indumentaria en buenas condiciones de limpieza",
            "Indumentaria acorde a la tarea a realizar",
            "Retiro de materiales al final de la jornada",
          ],
          properties: {
            "Indumentaria acorde a la tarea a realizar": {
              $ref: "#/definitions/yes-no",
              title: "¿Tiene indumentaria acorde a la tarea?",
            },
            "Retiro de materiales al final de la jornada": {
              $ref: "#/definitions/yes-no",
              title: "Se retiraron los materiales al final de la jornada",
            },
            "Indumentaria en buenas condiciones de limpieza": {
              $ref: "#/definitions/yes-no",
              title: "Tiene indumentaria en buenas condiciones de limpieza",
            },
            "Colocar vallados y sectorizar el área de trabajo": {
              $ref: "#/definitions/yes-no",
              title:
                "Se colocaron los vallados y se sectorizo el área de trabajo",
            },
            "Respetar procedimiento de circulación para contratistas": {
              $ref: "#/definitions/yes-no",
              title:
                "Se ha respetado el procedimiento de circulación libre para contratistas",
            },
          },
        },
        "Elementos de protección personal necesarios para la tarea": {
          type: "object",
          title: "Elementos de protección personal necesarios para la tarea",
          "-required": [
            "Casco",
            "Anteojos de seguridad",
            "Arnés de seguridad",
            "Máscara facial",
            "Delantal",
            "Protector auditivo",
            "Guantes",
            "Otros",
          ],
          properties: {
            epps: {
              type: "array",
              items: {
                enum: [
                  "Casco",
                  "Anteojos de seguridad",
                  "Arnés de seguridad",
                  "Máscara facial",
                  "Delantal",
                  "Protector auditivo",
                  "Guantes",
                  "Calzado",
                ],
                type: "string",
              },
              title: "Seleccione los EPPS necesarios",
              uniqueItems: true,
            },
          },
        },
      },
      definitions: {
        "yes-no": {
          //type: ["string"],
          oneOf: [
            {
              const: "SI",
              title: "SI",
            },
            {
              const: "NO",
              title: "NO",
            },
          ],
        },
        "yes-no-na": {
          //type: ["string"],
          oneOf: [
            {
              const: "SI",
              title: "SI",
            },
            {
              const: "NO",
              title: "NO",
            },
            {
              const: "N/A",
              title: "N/A",
            },
          ],
        },
      },
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    item: {
      // borderRadius: "20px",
      borderStyle: "ridge",
    },
    backButton: {
      type: "button",
      margin: "10px",
    },
  }));
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item lg={6} md={12}>
        <>
          <h3>Schema:</h3>
          <Paper className={classes.item}>
            <Editor
              height="500px"
              width="600px"
              defaultLanguage="javascript"
              defaultValue={JSON.stringify(schema, null, "\n")}
              onChange={(e) => {
                console.log(e.schema);
                setSchema(JSON.parse(e));
              }}
            />
          </Paper>
          <h3>UISchema:</h3>
          <Paper className={classes.item}>
            <Editor
              height="500px"
              width="600px"
              defaultLanguage="javascript"
              defaultValue={JSON.stringify(uiSchema, null, "\n")}
              onChange={(e) => {
                console.log(e.schema);
                setUiSchema(JSON.parse(e));
              }}
            />
          </Paper>
          <Button
            className={classes.backButton}
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/forms/";
            }}
          >
            Atras
          </Button>
        </>
      </Grid>
      <Grid item lg={6} md={12}>
        <Paper className={classes.item}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={(e) => {
              //mandar al back
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
