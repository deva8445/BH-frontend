import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import InputField from "../inputFiled";
import { useForm } from "../../hooks/formHook";
import { useService } from "../../hooks/serviceHook";
import { BOOK } from "../../services/api.services";

export interface IAddBookForm {
  handleUpdate: () => void;
}

export const AddBookForm: FC<IAddBookForm> = ({ handleUpdate }) => {
  const { values, handleChange, handleSubmit } = useForm({
    title: "",
    author: "",
    publishYear: null,
    price: null,
    description: "",
    url: "",
    quantity: null,
  });

  const [response, setResponse] = useState();

  const { fetchData: addBook }: any = useService(
    async () =>
      await BOOK.addBook(values).then((data) => setResponse(data.data))
  );

  const handleAdd = async () => {
    await addBook();
    handleUpdate();
  };

  return (
    <div className="w-full flex justify-center items-center font-montserrat">
      <form
        id="My-form"
        className="w-[93%] h-full flex flex-col gap-5 mt-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-row justify-center items-center">
          <div className="flex justify-center pl-[4rem] w-full  ">
            <InputField
              label={"Book Title"}
              inputName={"title"}
              value={values?.title}
              type={"text"}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex justify-center pl-[4rem] w-full ">
            <InputField
              label={"Author Name"}
              inputName={"author"}
              value={values?.author}
              type={"select"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center pl-[4rem] w-full ">
            <InputField
              label={"Description"}
              inputName={"description"}
              value={values?.description}
              type={"text"}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="flex justify-center pl-[4rem] w-full  ">
            <InputField
              label={"Price"}
              inputName={"price"}
              value={values?.price}
              type={"number"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center pl-[4rem] w-full ">
            <InputField
              label={"Publish Year"}
              inputName={"publishYear"}
              value={values?.publishYear}
              type={"number"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between w-full pl-[4rem]  ">
            <InputField
              label={"Quantity"}
              inputName={"quantity"}
              value={values?.quantity}
              type={"number"}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <div className="flex justify-center pl-[4rem] w-full ">
            <InputField
              label={"Book URL"}
              inputName={"url"}
              value={values?.url}
              type={"text"}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className=" w-full mt-5">
          <div className=" flex flex-row  justify-center gap-7 items-center">
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
