import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout } from "./components/Layout";
import { privateRoutes, publicRoutes } from "./routes";
import { auth } from "./firebaseConfig/firebase";
import { useDispatch } from "react-redux";
import RouteConfig from "./routes/Route";
import { getUserInfoApi } from "./service/authenService";
import { getUserInfoReducer } from "./redux/reducer/userinfo";

function App() {
    const dispatch = useDispatch();
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            if (user?.email) {
                const userInfo = await getUserInfoApi({ email: user?.email });
                if (userInfo.email) {
                    dispatch(getUserInfoReducer(userInfo));
                } else {
                    alert("Khong co data trong db");
                }
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout: React.ComponentType | typeof Fragment = DefaultLayout;
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {isSignedIn ? (
                        privateRoutes.map((route, index) => {
                            let Layout: React.ComponentType | typeof Fragment = DefaultLayout;
                            if (route.layout === null) {
                                Layout = Fragment;
                            } else if (route.layout) {
                                Layout = route.layout;
                            }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })
                    ) : (
                        <></>
                        // Redirect to sign-in if not signed in
                        // <Route path="*" element={<Navigate to={RouteConfig.SIGN_IN} />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
