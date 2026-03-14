
import { createContext, useContext, useState } from 'react';

export const Auth = createContext();

export const Authcontext = ({ children }) => {

    const [isloggedin, setisloggedin] = useState(() => {
        return localStorage.getItem('isloggedin') === 'true'
    })

    const [currentuser, setcurerntuser] = useState(() => {
        const saveduser = localStorage.getItem('currentuser');
        return saveduser ? JSON.parse(saveduser) : null;
    })

    const login = (user) => {
        if (user) {
            setisloggedin(true)
            setcurerntuser(user)
            console.log(user)
            localStorage.setItem('token', user.token)
            localStorage.setItem('isloggedin', 'true')
            console.log(localStorage.getItem(('isloggedin')))
            localStorage.setItem('currentuser', JSON.stringify(user))
        } else if (!user || user === null) {
            localStorage.setItem('isloggedin', 'false')
        }
    }

    const logout = () => {
        setisloggedin(false)
        setcurerntuser(null)
        localStorage.removeItem('isloggedin')
        localStorage.removeItem('currentuser')
    }

    const register = (user) => {
        if (user) {
            setisloggedin(true)
            setcurerntuser(user)
            console.log(user)
            localStorage.setItem('token', user.token)
            localStorage.setItem('isloggedin', 'true')
            console.log(localStorage.getItem(('isloggedin')))
            localStorage.setItem('currentuser', JSON.stringify(user))
        } else if (!user || user === null) {
            localStorage.setItem('isloggedin', 'false')
        }
    }
    return (
        <Auth.Provider value={{ isloggedin, currentuser, login, logout, register }}>
            {children}
        </Auth.Provider>
    );
};

export const useAuth = () => {

    // if (!context) {
    //     throw new Error("useAuth must be used inside Authcontext Provider")
    // }
    return useContext(Auth)
}
