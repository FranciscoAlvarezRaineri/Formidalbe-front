import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import { makeStyles } from "@material-ui/core/styles";

const flattenObj = (ob) => {
  let result = {};
  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + "." + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/${context.params.formId}`);
  const formsData = response.data.responses
    .map((response) => response.formData)
    .map((formData) => flattenObj(formData));
  let allKeys = [
    ...new Set(formsData.flatMap((formData) => Object.keys(formData))),
  ];
  allKeys.splice(allKeys.indexOf("Datos Personales.email"), 1);
  allKeys.unshift("Datos Personales.email");
  allKeys.splice(allKeys.indexOf("Datos Personales.nombre"), 1);
  allKeys.unshift("Datos Personales.nombre");
  return {
    props: { formsData, allKeys },
  };
}

const Resp = ({ formsData, allKeys }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(formsData);
    console.log(allKeys);
  });

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.head}>
          <TableRow>
            {allKeys.map((key) => (
              <TableCell>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formsData.map((formData) => {
            return (
              <TableRow>
                {allKeys.map((key) => (
                  <TableCell>
                    {typeof formData[key] === "boolean" ? (
                      formData[key] ? (
                        <CheckIcon></CheckIcon>
                      ) : (
                        <ClearIcon></ClearIcon>
                      )
                    ) : (
                      formData[key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    minWidth: 250,
    backgroundColor: "#0097d1",
  },
}));

export default Resp;
