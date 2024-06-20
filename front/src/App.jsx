import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';
import Grid from './components/Grid.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      console.log(res.data);  // Log the response data
      // Check if res.data is an array
      if (Array.isArray(res.data)) {
        setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
      } else {
        toast.error("Data received is not an array");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800">
      <div className="w-full max-w-5xl mt-5 flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-white">USUÁRIOS</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </div>
      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
}

export default App;
