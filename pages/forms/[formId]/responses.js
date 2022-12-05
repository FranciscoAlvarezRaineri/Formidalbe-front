import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import {
  Button,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import Response from "../../../components/response";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

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
  const keys = Object.keys(formsData[0]);
  return {
    props: { formsData },
  };
}

const Resp = ({ formsData }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(formsData);
  });
  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.head}>
          <TableRow>
            {Object.keys(formsData[0]).map((key) => (
              <TableCell>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formsData.map((formData) => {
            return (
              <TableRow>
                {Object.keys(formsData[0]).map((key) => (
                  <TableCell>
                    {typeof formData[key] === "boolean"
                      ? formData[key]
                        ? "true"
                        : "false"
                      : formData[key]}
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
