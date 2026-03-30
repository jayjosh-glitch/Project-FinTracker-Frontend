import { useState } from 'react'
import Navbar1 from '../../shared/components/Navbar1'
import { validate } from '../auth/Validation';
import '../auth/register.css';
import { useFetchusers } from '../../shared/hooks/useFetchusers'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext';

const Register = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    country: ""
  })

  const [error, seterror] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    country: ""
  })

  const [msg, setmsg] = useState('')
  const [loading, setloading] = useState(false)
  const { createUser } = useFetchusers()
  const navigate = useNavigate()
  const { register } = useAuth()

  const handlechange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    const err = validate(name, value, formData);
    seterror(prev => ({ ...prev, [name]: err }))
  }

  const handleclick = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (formData.firstname === "" || formData.lastname === "" || formData.confirmpassword === "" || formData.email === "" || formData.password === "" || formData.country === "") {
      setmsg("Please fill all the details")
      return
    }
    try {
      setloading(true)
      const response = await createUser(formData)
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        setmsg('')
        register(response.data)
        setmsg('registered successfuly')
        navigate('/dashboard/dashboard')
      }
    } catch (err) {
      // console.log("i am in error block")
      if (error.response?.data?.message?.includes("database has reached monthly usage")) {
        setmsg("Service is unavilable, please try again later")
      } else {
        setmsg(err.response.data.message)
      }
    }
    finally {
      setloading(false)
    }
  }

  return (
    <>
      <Navbar1 />
      <main className='main-container'>
        <section className='register-section'>
          <h2>Register</h2>
          <form className='register-form' onSubmit={handleclick}>
            <div>
              <label htmlFor="firstname">First Name:</label>
              <input type="text" id="firstname" name='firstname' onChange={(e) => { handlechange(e) }} value={formData.firstname} />
              {error && <span className='error'>{error.firstname}</span>}
            </div>

            <div>
              <label htmlFor="lastname">Last Name:</label>
              <input type="text" id="lastname" name='lastname' onChange={(e) => { handlechange(e) }} value={formData.lastname} />
              {error && <span className='error'>{error.lastname}</span>}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name='email' onChange={(e) => { handlechange(e) }} value={formData.email} />
              {error && <span className='error'>{error.email}</span>}
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name='password' onChange={(e) => { handlechange(e) }} value={formData.password} />
              {error && <span className='error'>{error.password}</span>}
            </div>

            <div>
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <input type="password" id="confirmpassword" name='confirmpassword' onChange={(e) => { handlechange(e) }} value={formData.confirmpassword} />
              {error && <span className='error'>{error.confirmpassword}</span>}
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <input type="text" id="country" name='country' onChange={(e) => { handlechange(e) }} value={formData.country} />
              {error && <span className='error'>{error.country}</span>}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="loader"></span>
              ) : (
                "Sign Up →"
              )}
            </button>
            {msg && <span className='error'>{msg}</span>}
          </form>
        </section>
      </main>
    </>
  )
}

export default Register