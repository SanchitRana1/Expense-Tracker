import { useState } from "react";

import "./App.css";
import Orb from "./components/Orb";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/Home";
import LoginPage from "./screens/LoginPage";
import { Provider, useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((store) => store?.user?.token));
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: !isAuth ? <LoginPage /> : <Navigate to={"/home"} />,
    },
    {
      path: "/home",
      element: isAuth ? <Home /> : <Navigate to={"/"} />,
    },
  ]);

  return (
    <div className="bg-[#000000] w-full h-full">
      <Orb />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
