import { getloginUser, addusers } from "../../services/Userservice";

export const useFetchusers = () => {

  // const [user, setuser] = useState([])
  
  const loginUser = async (formData) => {
    console.log(formData)
      const res = await getloginUser(formData.email, formData.password);
      console.log(res)
      return res;
  }
 
  const createUser = async (formData) => {
    const response = await addusers(formData)
    return response
  }

  return { loginUser, createUser }
}
