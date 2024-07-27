import React, { useState } from "react";

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? Number(value) : value;
    setValues({ ...values, [name]: newValue });
  };

  const handleSubmit =
    (callback: any) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback();
    };

  return {
    values,
    handleChange,
    handleSubmit,
    setValues,
  };
};
