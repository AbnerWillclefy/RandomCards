import ReactDOM from "react-dom/client";

import Provider from "./providers";
import AppRoutes from "./routes";

import "./styles/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider>
    <AppRoutes />
  </Provider>
);
