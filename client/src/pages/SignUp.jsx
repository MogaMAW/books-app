import React, { Fragment, useState } from "react";
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
import { signUp } from "../API/auth";

export const SignUp = () => {
  const dispatch = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (auth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "Account created successfully",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("username is required"),
      email: Yup.string().max(255).required("email is required"),
      password: Yup.string()
        .min(5)
        .max(30)
        .required("password must have at least 5 characters"),
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

  const [confirmPassword, setConfirmPassword] = useState("");

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(() => event.target.value);
  };

  const passwordsMatch =
    confirmPassword && confirmPassword !== formik.values.password;

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
          <p className="text-center text-sm font-semibold text-primary">
            Create Your Account
          </p>
          <InputField
            type="text"
            label="Username"
            name="username"
            formik={formik}
          />
          <InputField type="email" label="Email" name="email" formik={formik} />
          <InputField
            type="password"
            label="Password"
            name="password"
            formik={formik}
          />
          <div className="inline-block relative w-full">
            {passwordsMatch && (
              <span className="text-sm text-red-500 absolute top-0 left-0">
                Passwords don't much!
              </span>
            )}
            <InputField
              type="password"
              label="Confirm password"
              name="confirmPassword"
              formik={formik}
              onChange={(event) => confirmPasswordChangeHandler(event)}
            />
          </div>
          {!isLoading && (
            <Button
              label="Sign up"
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
              <span>creating...</span>
            </div>
          )}
          <div className="mt-4">
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
