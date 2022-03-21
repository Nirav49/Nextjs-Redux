import "../styles/globals.css";
import { wrapper } from "../store/ConfigureStore";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore((state) => state);
  return (
    <PersistGate loading={null} persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(MyApp);
