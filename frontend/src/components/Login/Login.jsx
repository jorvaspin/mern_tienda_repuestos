import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import styles from '../../styles/styles'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios
          .post(
            `/user/login-user`,
            {
              email,
              password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            setLoading(false);
            toast.success("Haz iniciado sesión correctamente");
            navigate("/");
            window.location.reload(true); 
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Iniciar sesión
            </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <div className="mt-1">
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                autoComplete="email" 
                                required 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="current-password"
                                id="current-password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {
                                showPassword ? (
                                    <AiOutlineEye 
                                className="absolute right-2 top-2 text-gray-400 cursor-pointer" 
                                size={25}
                                onClick={() => setShowPassword(false)}
                            />
                                ) : (
                                    <AiOutlineEyeInvisible 
                                className="absolute right-2 top-2 text-gray-400 cursor-pointer" 
                                size={25}
                                onClick={() => setShowPassword(true)}
                            />
                                )
                            }
                        </div>
                    </div>
                    <div className={`${styles.noramlFlex} justify-between`}>
                        <div className={`${styles.noramlFlex}`}>
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            {
                                loading ? (
                                    <FaSpinner 
                                        className="text-gray-400 cursor-pointer" 
                                        size={25}
                                    />
                                ) : ('Iniciar Sesión')
                            }
                        </button>
                    </div>
                    <div className={`${styles.noramlFlex} w-full`}>
                        <div className="text-sm">
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                ¿No tienes una cuenta? Regístrate
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login