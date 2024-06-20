import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fone: ""
  });

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      setFormData({
        name: onEdit.name,
        email: onEdit.email,
        fone: onEdit.fone
      });
    } else {
      setFormData({
        name: "",
        email: "",
        fone: ""
      });
    }
  }, [onEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.fone) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const response = await axios.put(`http://localhost:8800/${onEdit.id}`, {
          name: formData.name,
          email: formData.email,
          fone: formData.fone,
        });
        toast.success(response.data);
      } else {
        const response = await axios.post("http://localhost:8800", {
          name: formData.name,
          email: formData.email,
          fone: formData.fone,
        });
        toast.success(response.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    }

    setFormData({
      name: "",
      email: "",
      fone: ""
    });

    setOnEdit(null);
    getUsers();
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-2 p-5 bg-white shadow-md rounded-md"
    >
      <div className="flex flex-col">
        <label className="mb-1">Nome</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-30 p-2 border border-purple-500 rounded-md h-10"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1">E-mail</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-30 p-2 border border-purple-500 rounded-md h-10"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1">Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          name="fone"
          value={formData.fone}
          onChange={handleChange}
          className="w-30 p-2 border border-purple-500 rounded-md h-10"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-purple-600 text-white rounded-md h-10"
      >
        SALVAR
      </button>
    </form>
  );
};

export default Form;
