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
import Dialog from "@material-ui/core/Dialog";


export async function getServerSideProps(context) {
  const response = await axios.get(`/forms/${context.params.formId}`);
  const form = response.data;
  return {
    props: { form },
  };
}

const Resp = ({ form }) => {
  const classes = useStyles();

  const [respo, setRespo] = useState([]);
  const [selectedPopUp, setSelectedPopUp] = useState("");

  useEffect(() => {
    axios
      .get(`/responses/forms/${form._id}`)
      .then((res) => {
        console.log("respo", res.data);
        setRespo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePopUp = (index) => {
    if (selectedPopUp === index) {
      setSelectedPopUp("");
    } else {
      setSelectedPopUp(index);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.head}>
          <TableRow>
            {
              <>
                <TableCell key="_id" align="left">
                  Autor
                </TableCell>
                <TableCell key="createdAt" align="right">
                  Fecha de Creación
                </TableCell>
              </>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <List id={respo._id}>
            {respo.map((response, j) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={response._id}>
                <ListItem key={response._id}>
                  <Button onClick={() => handlePopUp(j)}>
                    {response.formData["Datos Personales"]?.nombre ||
                      response._id}
                  </Button>
                  <TableCell key={`createdAt_${respo._id}`} align="right">
                    {response.createdAt?.split("T")[0]}
                  </TableCell>
                  <Dialog open={j === selectedPopUp}>
                    <Response _id={response._id}></Response>
                    <Button onClick={() => handlePopUp("")}>Salir</Button>
                  </Dialog>
                </ListItem>
                </TableRow>
              );
            })}
          </List>
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