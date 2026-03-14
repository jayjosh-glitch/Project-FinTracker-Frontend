import { useState } from "react";
import { getloginUser, addusers } from "../../services/Userservice";

export const useFetchusers = () => {

  // const [user, setuser] = useState([])
  const [glerror, setglerror] = useState('')

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //             const data = await getusers();
  //             setusers(data)
  //         }
  //         catch (err) {
  //             setglerror(err.message)
  //         }
  //     }
  //     fetchUsers();
  // }, [])

  const loginUser = async (formData) => {
    console.log(formData)
    try {
      setglerror("");
      const data = await getloginUser(formData.email, formData.password);
      console.log(data)
      return data;
    } catch (err) {
      setglerror(err.message);
    } finally {
      setglerror(false);
    }
  }

  const createUser = async (formData) => {
    setglerror(null)
    try {
      const response = await addusers(formData)
      return response
    } catch (err) {
      setglerror(err.response?.data?.message || err.message)
      throw err
    }
  }

  return { loginUser, glerror, createUser }
}
