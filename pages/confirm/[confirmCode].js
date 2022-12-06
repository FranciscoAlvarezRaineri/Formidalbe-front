import axios from "../../axios";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export async function getServerSideProps(context) {
  return {
    props: { code: context.params.confirmCode },
  };
}

export default function ConfirmCode(props) {
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    axios
      .post(`/users/confirm/${props.code}`)
      .then((res) => setConfirm(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {confirm ? (
        <>
          <Typography>Gracias por unirse a Formidable!</Typography>
          <Typography>
            Por favor, inicie sesión para empezar a crear formularios:
          </Typography>
          <Link href="/login" variant="body2">
            Iniciar Sesion
          </Link>
        </>
      ) : (
        <>
          Ocurrió un error. Por favor, revise el enlace de confimación y vuelva
          a intentar más tarde
        </>
      )}
    </>
  );
}
