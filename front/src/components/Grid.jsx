import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8800/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
    setOnEdit(null);
  };

  return (
    <table className="w-full bg-white p-5 shadow-md rounded-md max-w-5xl mx-auto my-6 break-all">
      <thead>
        <tr>
          <th className="pl-3 pt-2 text-left border-b pb-2">Nome</th>
          <th className="text-left pt-2 border-b pb-2">Email</th>
          <th className="text-left pt-2 border-b pb-2 hidden md:table-cell">Fone</th>
          <th className="border-b  pt-2 pb-2"></th>
          <th className="border-b pb-2"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, i) => (
          <tr key={i}>
            <td className="pt-3 pl-3 pb-4 w-1/3">{item.name}</td>
            <td className="pt-3 pb-4 w-1/3">{item.email}</td>
            <td className="pt-3 pb-4 w-1/5 hidden md:table-cell">{item.fone}</td>
            <td className="pt-3 pb-4 w-1/12 text-center">
              <FaEdit
                className="cursor-pointer text-blue-600 "
                onClick={() => handleEdit(item)}
              />
            </td>
            <td className="pt-3 pb-4 w-1/12 text-center">
              <FaTrash
                className="cursor-pointer text-rose-600"
                onClick={() => handleDelete(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
