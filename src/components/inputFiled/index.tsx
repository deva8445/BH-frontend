import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useReducer,
    useState,
  } from "react";
  // CLSX
  import clsx from "clsx";
  // Multi Select Dropdown
  import { MultiSelect } from "react-multi-select-component";
  import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
  import { Tooltip } from "@mui/material";
import { InputAction, InputFieldProps, InputState } from "./interface";
  
  const inputReducer = (state: InputState, action: InputAction) => {
    switch (action.type) {
      case "UPDATE_TYPE":
        return {
          ...state,
          currentType: action.payload,
        };
      default:
        return state;
    }
  };
  
  const InputField = ({
    label,
    inputName,
    type,
    customStyle,
    onChange,
    onClick,
    value,
    multiSelectOptions,
    selectedOptions,
    setSelectedOptions,
    disabled,
    required,
    readOnly,
    isBorder,
    maxLength,
    minLength,
    min,
    max,
    handleChangeBoolean,
    pattern,
    title,
    onKeyDown,
    placeholder,
    disableStyle,
    hideLabel,
  }: InputFieldProps) => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  
    const [{ currentType }, dispatch]: [InputState, Dispatch<InputAction>] =
      useReducer(inputReducer, { currentType: type });
    const disabledStyle = "!cursor-not-allowed !bg-gray-200";
    const commonstyle = `w-[100%] h-[2.3rem] border border-gray-300 border-1 rounded-md px-2 ${
      disabled && !disableStyle ? disabledStyle : "bg-white"
    }`;
    const select = [
      "w-full h-full border-none focus:outline-none font-montserrat bg-white",
      {
        [disabledStyle]: disabled && !disableStyle,
        ["!cursor-default"]: disableStyle,
      },
    ];
    const selectStyle = clsx([
      customStyle ?? [commonstyle, { ["border-none !w-[100%]"]: isBorder }],
    ]);
    const multiSelectStyle = clsx([customStyle ?? "w-[88%] rounded-md"]);
    const booleanSelectStyle = clsx([
      customStyle ?? [
        commonstyle,
        { ["border-none"]: isBorder },
        {
          [disabledStyle]: disabled && !disableStyle,
          ["!cursor-default"]: disableStyle,
        },
      ],
    ]);
    const commonSelect = clsx(["cursor-pointer", select]);
    const dateStyle = clsx([select, { ["cursor-pointer"]: type === "date" }]);
    const lastStyle = `flex flex-row font-montserrat ${booleanSelectStyle}`;
  
    useEffect(() => {
      dispatch({ type: "UPDATE_TYPE", payload: type });
    }, []);
  
    return (
      <div className="w-full flex flex-col items-start justify-center gap-2">
        {label && !hideLabel && (
          <Tooltip
            title={
              inputName === "dateofjoining" && disabled
                ? "Enter Date of Birth First"
                : ""
            }
          >
            <label
              htmlFor={inputName}
              className="font-montserrat w-full font-bold text-[1rem] h-[20px]"
            >
              {label}
              {required && <span className="text-red-500"> *</span>}
            </label>
          </Tooltip>
        )}
  
        {type === "multiSelect" && multiSelectOptions ? (
          <MultiSelect
            className={multiSelectStyle}
            options={multiSelectOptions}
            value={selectedOptions ? selectedOptions : []}
            onChange={setSelectedOptions}
            labelledBy="Please Select"
          />
        ) : type === "select" && multiSelectOptions ? (
          <div className={selectStyle}>
            <select
              className={commonSelect}
              name={inputName}
              onChange={onChange}
              disabled={disabled}
              required={required}
            >
              <option
                key={"#placeHolder"}
                value={!value ? "true" : "false"}
                disabled
              >
                Please Select
              </option>
              {multiSelectOptions.map((option) => (
                <option
                  key={option?.value}
                  value={option?.value}
                  // selected={option?.value === value ? true : false}
                >
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        ) : type === "booleanSelect" ? (
          <div className={booleanSelectStyle}>
            <select
              className={commonSelect}
              name={inputName}
              onChange={(event) =>
                handleChangeBoolean(event.target.name, event.target.value)
              }
              disabled={disabled}
              value={value ? "true" : "false"}
            >
              <option value={"true"}>Yes</option>
              <option value={"false"}>No</option>
            </select>
          </div>
        ) : (
          <div className={lastStyle}>
            <input
              className={dateStyle}
              placeholder={`${label ? label : placeholder}`}
              name={inputName}
              type={currentType}
              onChange={onChange}
              onClick={onClick}
              value={
                currentType === "number" ? parseInt(value, 10).toString() : value
              }
              min={min}
              max={max}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              maxLength={maxLength}
              minLength={minLength}
              pattern={pattern}
              title={title}
              onKeyDown={onKeyDown}
            />
            {type == "password" ? (
              <span
                className="w-6 h-full text-gray-400 flex items-center"
                onClick={() => {
                  if (passwordVisibility) {
                    dispatch({ type: "UPDATE_TYPE", payload: "text" });
                  } else {
                    dispatch({ type: "UPDATE_TYPE", payload: "password" });
                  }
                  setPasswordVisibility(!passwordVisibility);
                }}
              >
                {passwordVisibility ? <RiEyeLine /> : <RiEyeOffLine />}
              </span>
            ) : null}
          </div>
        )}
      </div>
    );
  };
  
  export default InputField;
  