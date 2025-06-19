import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/home";
import { Detail } from "./pages/detail/detail";
import { Notfound } from "./pages/notfound/notfound";

// Importar Layout se tiver (se não tiver, pode remover)
import { Layout } from "./components/layout/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id", // ** importante: usar ":id" para parâmetro **
        element: <Detail />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export { router };
