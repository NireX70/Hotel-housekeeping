import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const Notification = lazy(() => import("../views/About"));
const GuestRegistration = lazy(() => import("../views/ui/GuestRegistration"));
const Cards = lazy(() => import("../views/ui/Cards"));
const LoginPage = lazy(() => import("../views/ui/LoginPage"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      {
        path: "/GuestRegistration",
        exact: true,
        element: <GuestRegistration />,
      },
      { path: "/notifications", exact: true, element: <Notification /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/login", exact: true, element: <LoginPage /> },
      { path: "/cards", exact: true, element: <Cards /> },
      // { path: "/grid", exact: true, element: <Grid /> },
      // { path: "/forms", exact: true, element: <Forms /> },
      // { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
