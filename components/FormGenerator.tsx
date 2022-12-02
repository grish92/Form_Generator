import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FieldType, FormProps } from "types/FormGenerator";

const TEXT_REGEX = new RegExp(/^[А-ЯЁа-яё '-]+$/);
const NUMBER_REGEX = new RegExp(/^\s*-?[0-9]{10}\s*$/);
const URL_REGEX = new RegExp(/https?:\/\/.*\.\w{1,4}(.*)?/);

const schema = yup
  .object({
    text: yup.string().required("обезательное поле").matches(
      TEXT_REGEX,
      "текст должен состоять только из кириллических символов" //string?
    ),
    email: yup
      .string()
      .required("обезательное поле")
      .email("эл.почта невалидна"),
    number: yup
      .string()
      .required("обезательное поле")
      .matches(NUMBER_REGEX, "номер телефона должен содержать 10 символов"),
    url: yup
      .string()
      .required("обезательное поле")
      .matches(URL_REGEX, "URL невалиден"),
  })
  .required();

export const FormGenerator = () => {
  const [selectData, setSelectData] = useState<string>("email");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [fields, setFields] = useState<FieldType[]>([
    { type: "text", id: "text", placeholder: "Text" },
    { type: "text", id: "email", placeholder: "Email" },
    { type: "text", id: "number", placeholder: "Number" },
    { type: "text", id: "url", placeholder: "URL" },
  ]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  const handleInputChange = useCallback((e: any) => {
    setSelectData(e.target.value);
    console.log(e.target.value);
  }, []);

  const addField = (e: any) => {
    console.log(e);
    getValues("mockPLaceholder");
    setFields([
      ...fields,
      { type: "text", id: selectData, placeholder: placeholder },
    ]);
  };

  return (
    <>
      <div className="container w-full flex justify-center items-center">
        <div className="w-1/2 p-14 justify-center flex-col rounded-md mt-20 bg-slate-200 ">
          <div className="mt-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full space-x-4 h-12">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
                  onChange={handleInputChange}
                >
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="url">URL</option>
                  <option value="text">Text</option>
                </select>
                <input
                  name="mockPLaceholder"
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Input Placeholder Text"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                />

                <button
                  type="button"
                  className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                  onClick={addField}
                >
                  Add
                </button>
              </div>
              {fields &&
                fields.map((e: FieldType) => (
                  <div key={e.id}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {e.id}
                    </label>
                    <input
                      type={e.type}
                      id={e.id}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      placeholder={e.placeholder}
                      {...register(String(e.id as keyof FormProps))}
                    />
                    <sub className="mt-2 text-sm text-red-600">
                      {errors[e.id as keyof FormProps]?.message}
                    </sub>
                  </div>
                ))}

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};





