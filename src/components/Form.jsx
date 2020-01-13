import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

export const useForm = (callback, initialState, schema) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  //con esto mostramos errores en pantalla
  const validateInput = (name, value) => {
    //datos del input
    const obj = { [name]: value }; //se crea un objeto
    const shema = { [name]: schema[name] }; //hacemos un const para relacionar variable y el schema
    const { error } = Joi.validate(obj, shema); //vemos si hay errores
    return error ? error.details[0].message : null; //si existe
  };

  //para ver si el form es valido
  const validateData = () => {
    //vemos si existe error
    const { error } = Joi.validate(values, schema, { abortEarly: false });
    //si no hay devolvemos un null
    if (!error) return null;
    //iniciamos una variable para guardar errores
    const errorMessages = {};
    //guardamos los errores
    for (let item of error.details) errorMessages[item.path[0]] = item.message;
    return errorMessages;
  };

  const onChange = e => {
    // si no copiamos el value se borra el que no estamos modificando
    setValues({ ...values, [e.target.name]: e.target.value });
    const error = { ...errors };
    //vemos si existe error en el input
    const errorMessage = validateInput(e.target.name, e.target.value);
    //si hay lo guardamos de caso contrario limpiamos si habia uno existente
    if (errorMessage) error[e.target.name] = errorMessage;
    else delete error[e.target.name];
    setErrors(error);
    console.log(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    //VEMOS SI HAY ERRORES
    const error = validateData();
    //SI NO HAY SE GUARDA UN {} VACIO
    setErrors(error || {});
    if (error) return;
    callback();
  };

  useEffect(() => {
    setValues(initialState);
  }, [initialState]);

  return {
    onChange,
    onSubmit,
    errors,
    values
  };
};

export function renderInput(
  name,
  label,
  type = "text",
  value,
  handleChange,
  errors,
  placeholder = ""
) {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className={!errors ? "form-control" : "form-control danger"}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {errors && <div className="alert">{errors}</div>}
    </div>
  );
}

export function renderSelect(
  name,
  label,
  options,
  value,
  handleChange,
  errors
) {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        className="select"
        name={name}
        onChange={handleChange}
        value={value}
      >
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && <div className="alert">{errors}</div>}
    </div>
  );
}
