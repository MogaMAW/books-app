import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppLayout } from "./components/layout/AppLayout";

export const App = () => {
  return (
    <Fragment>
      <div className="text-base overflow-x-hidden bg-gray-800">
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Home />
                  </AppLayout>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};
