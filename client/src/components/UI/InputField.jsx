import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

export const InputField = (props) => {
  const formik = props.formik;
  const label = props.label;
  const name = props.name;
  const placeholder = props.placeholder ? props.placeholder : "";

  const isPasswordField = props.type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => setShowPassword(() => !showPassword);

  const getFieldType = () => {
    if (isPasswordField && showPassword) return "text";
    return props.type;
  };

  return (
    <Fragment>
      <div
        className="relative pt-4 flex flex-col items-start 
         justify-center gap-1 w-full text-gray-100"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-300">
            {formik.errors[`${name}`]}
          </p>
        )}
        <label className="text-sm first-letter:uppercase font-[500]">
          {label}
        </label>
        <div className="w-full relative">
          <input
            type={getFieldType()}
            id={name}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            placeholder={placeholder}
            className="py-3 px-4 outline-none rounded-2xl border-[1px]
             border-gray-700 focus:border-[1px] focus:border-primary
             transition-all text-sm w-full focus:outline-none bg-gray-900 
             focus:shadow-[0px_0px_0px_4px_rgba(11,114,133,0.3)]
             text-gray-100"
          />
          {isPasswordField && (
            <div className="inline-block absolute right-[10px] top-[10px]">
              {!showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#f1f3f5",
                    }}
                  >
                    <PiEyeLight />
                  </IconContext.Provider>
                </span>
              )}
              {showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#f1f3f5",
                    }}
                  >
                    <PiEyeSlashLight />
                  </IconContext.Provider>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
