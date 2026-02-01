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
  { index: true, Component: App },
  { path: "/", Component: Files },
  { path: "login", Component: Login },
]);
