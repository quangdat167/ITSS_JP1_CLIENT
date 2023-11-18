import React from "react";

import HeaderOnly from "components/Layout/HeaderOnly";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import { DefaultLayout } from "components/Layout";
import RouteConfig from "./Route";

interface RouterConfig {
    path: string;
    component: React.ComponentType;
    layout: React.ComponentType;
}

// public routes
const publicRoutes: RouterConfig[] = [
    { path: RouteConfig.SIGN_UP, component: SignUp, layout: HeaderOnly },
    { path: RouteConfig.SIGN_IN, component: SignIn, layout: HeaderOnly },
];

const privateRoutes: RouterConfig[] = [
    { path: RouteConfig.HOME, component: Home, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
