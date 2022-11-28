import "../styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  /*React.useEffect(() => {
    // Elimina el CSS injectado desde el servidor.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);*/
  return <Component {...pageProps} />;
}

export default MyApp;
