import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RootState } from "redux/store";
import { DefaultLayout } from "./components/Layout";
import { auth } from "./firebaseConfig/firebase";
import { getUserInfoReducer } from "./redux/reducer/userinfo";
import { privateRoutes, publicRoutes } from "./routes";
import { getUserInfoApi } from "./service/authen.service";

function App() {
    const dispatch = useDispatch();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const userInfoState = useSelector((state: RootState) => state.userInfoState);
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            if (user?.email && !userInfoState?.email) {
                const userInfo = await getUserInfoApi({ email: user?.email });
                if (userInfo?.email) {
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
