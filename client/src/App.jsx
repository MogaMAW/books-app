import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "./store";
import { Home } from "./pages/Home";
import { AppLayout } from "./components/layout/AppLayout";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Notification } from "./components/UI/Notification";
import { authenticate } from "./store/actions/auth";
import { Header } from "./components/layout/Header";
import { OrdersPages } from "./pages/OrdersPages";

export const App = () => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.isLoggedIn;
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const closeCardHandler = () => {
    dispatch(notificationActions.hideCardNotification());
  };

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData = localStorage.getItem("auth");
      const parsedAuthData = strAuthData && JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, accessToken } = parsedAuthData;

      if (!user || !accessToken) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      dispatch(authenticate(parsedAuthData));
    };
    tryLogin();
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
    }, 4000);
  }, [dispatch]);

  return (
    <Fragment>
      <div className="text-base overflow-x-hidden bg-gray-900 min-h-[100vh]">
        <BrowserRouter>
          {!isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="px-4 sm:px-12">
                      <Header />
                      <Home />
                    </div>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="/login"
                  element={<Navigate to="/signin" replace />}
                />
                <Route
                  path="/create-account"
                  element={<Navigate to="/signup" replace />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Fragment>
          )}
          {isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route
                  path="/"
                  element={
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <AppLayout>
                      <OrdersPages />
                    </AppLayout>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Fragment>
          )}
        </BrowserRouter>
      </div>
    </Fragment>
  );
};
