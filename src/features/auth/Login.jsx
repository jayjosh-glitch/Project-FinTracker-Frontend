import React from 'react'
import Navbar1 from '../../shared/components/Navbar1'
import { useState } from 'react'
import { validate } from './Validation';
import '../auth/login.css';
import { useFetchusers } from '../../shared/hooks/useFetchusers'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authcontext';


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [error, seterror] = useState({
        email: '',
        password: ''
    })

    const [msg, setmsg] = useState('')
    const [loading, setloading] = useState(false)
    const { loginUser } = useFetchusers()
    const { login } = useAuth()
    const navigate = useNavigate()

    const handlechange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        const err = validate(name, value);
        seterror(prev => ({ ...prev, [name]: err }))
    }

    const handleclick = async (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "") {
            setmsg("Please fill all the details")
            return
        }
        try {
            setloading(true)
            const loggedin = await loginUser(formData)
            console.log(loggedin)
            if (loggedin) {
                login(loggedin)
                setmsg('Login Successfull')
                navigate('/expense/expense')
            } 
        } catch (err) {
            setmsg( err.response.data.message )
        }
        finally {
            setloading(false)
        }
    }
    return (
        <>
            <Navbar1 />
            <main className='main-container'>
                <section className='login-section'>
                    <h2>Login</h2>
                    <form className='login-form' onSubmit={handleclick}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name='email' onChange={(e) => { handlechange(e) }} value={formData.email} />
                            {error?.email && <span className='error'>{error.email}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name='password' onChange={(e) => { handlechange(e) }} value={formData.password} />
                            {error?.password && <span className='error'>{error.password}</span>}
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? (
                                <span className="loader"></span>
                            ) : (
                                "Sign In →"
                            )}
                        </button>
                        {msg && <span className='error'>{msg}</span>}
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login
