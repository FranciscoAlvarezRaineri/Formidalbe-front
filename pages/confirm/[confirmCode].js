import axios from "../../axios";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";

export default function ConfirmCode(props) {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const getCode = async function (context) {
      return {
        props: { code: context.params.confirmCode },
      };
    };

    code = getCode();

    axios
      .post(`/users/confirm/${code}`)
      .then((res) => setConfirm(res.data))
      .catch((err) => console.log(err));
  }, [router.isReady]);

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
