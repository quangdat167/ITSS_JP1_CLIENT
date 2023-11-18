import React from 'react';

import HeaderOnly from 'components/Layout/HeaderOnly';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}

// public routes
const publicRoutes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/sign-up', component: SignUp, layout: HeaderOnly },
    { path: '/sign-in', component: SignIn, layout: HeaderOnly },
];

const privateRoutes: RouteConfig[] = [];

export { publicRoutes, privateRoutes };
