import React, { Fragment } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../components/UI/InputField";
import { Button } from "../components/UI/Button";
import { authenticate } from "../store/actions/auth";
import { signIn } from "../API/auth";

export const SignIn = () => {
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (auth) => {
      dispatch(
        authenticate({
          accessToken: auth.access_token,
          user: {
            userId: auth.user_id,
            email: auth.email,
            username: auth.username,
          },
        })
      );
    },
    onError: (error) => {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Invalid email or password",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
      password: Yup.string()
        .max(255)
        .min(5)
        .max(30)
        .required("password is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        mutate(values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
        dispatch(showCardNotification({ type: "error", message: err.message }));
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      }
    },
  });

  return (
    <Fragment>
      <div
        className="min-h-screen grid place-items-center py-28
         relative bg-gray-900 text-gray-100"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-1 items-center w-[90%] sm:w-[480px]
          bg-gray-800 shadow-md p-8 rounded-2xl z-[1]"
        >
          <Link to="/" className="mb-1">
            <p>Moga Book Store</p>
          </Link>
          <p className="text-center text-primary font-semibolds">
            Log into your account
          </p>
          <InputField type="email" label="Email" name="email" formik={formik} />
          <InputField
            type="password"
            label="Password"
            name="password"
            formik={formik}
          />
          {!isLoading && (
            <Button
              label="Log in"
              type="submit"
              aria-disabled={isLoading}
              className="mt-6 font-semibold"
            />
          )}
          {isLoading && (
            <div
              className="bg-primary text-gray-100 flex items-center
              justify-center p-1 w-full rounded mt-6"
            >
              <span>Signing...</span>
            </div>
          )}
          <div className="mt-4 space-y-4">
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
