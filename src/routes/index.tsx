import React from "react";

import HeaderOnly from "components/Layout/HeaderOnly";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import { DefaultLayout } from "components/Layout";
import RouteConfig from "./Route";
import { DashboardPage } from "pages/Dashboard";
import { MyTaskPage } from "pages/My-Task";
import { WorkspacePage } from "pages/Workspace";
import CalendarPage from "pages/Calendar";

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
    { path: RouteConfig.CALENDAR, component: CalendarPage, layout: DefaultLayout },
    { path: RouteConfig.DASHBOARD, component: DashboardPage, layout: DefaultLayout },
    { path: RouteConfig.MY_TASK, component: MyTaskPage, layout: DefaultLayout },
    { path: RouteConfig.WORKSPACE, component: WorkspacePage, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
