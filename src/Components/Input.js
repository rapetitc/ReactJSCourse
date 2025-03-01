import { useState } from "react";

const Input = ({
  type,
  className,
  label,
  id,
  placeholder,
  pattern,
  options,
  required,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  if (type == "select")
    return (
      <div
        className={
          `relative w-full h-[50px] px-2 py-1 border rounded border-gray-300` +
          (className ? " " + className : "")
        }
      >
        <label
          htmlFor={id}
          className={`absolute duration-300 ${
            isFocused ? "text-xs text-gray-600" : "top-3"
          }`}
        >
          {label}
        </label>
        <select
          className={`w-full h-full outline-none ${
            isFocused ? "pt-4" : "pt-0"
          }`}
          id={id}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required ?? false}
        >
          <option defaultChecked className="hidden"></option>
          {options.map((opt, i) => {
            return <option key={i}>{opt}</option>;
          })}
        </select>
      </div>
    );

  if (type == "textarea")
    return (
      <div
        className={
          `relative w-full px-2 py-1 border rounded border-gray-300` +
          (className ? " " + className : "")
        }
      >
        <label
          htmlFor={id}
          className={`absolute duration-300 ${
            isFocused ? "text-xs text-gray-600" : "top-3"
          }`}
        >
          {label}
        </label>
        <textarea
          className={`w-full h-full outline-none duration-300 ${
            isFocused ? "pt-4" : "pt-0"
          }`}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          pattern={pattern ?? ""}
          placeholder={isFocused ? placeholder : ""}
          required={required ?? false}
        ></textarea>
      </div>
    );

  return (
    <div
      className={
        `relative w-full h-[50px] px-2 py-1 border rounded border-gray-300` +
        (className ? " " + className : "")
      }
    >
      <label
        htmlFor={id}
        className={`absolute duration-300 ${
          isFocused ? "text-xs text-gray-600" : "top-3"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        className={`w-full h-full outline-none duration-100 ${
          isFocused ? "pt-4" : "pt-0"
        }`}
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        pattern={pattern ?? ""}
        placeholder={isFocused ? placeholder : ""}
        required={required ?? false}
      />
    </div>
  );
};

export default Input;
