import { createBrowserRouter } from "react-router";
import {
  // Sidebar,
  // FileInfo,
  // Logout,
  // Footer,
  // Header,
  // UploadInfo,
  // Upload,
  Login,
  Files,
} from "./components";
import App from "./App";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        index: true,
        // : "files",
        Component: Files,
      },
    ],
  },
]);
