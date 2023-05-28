import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { RxAvatar } from "react-icons/rx";
import styles from '../../styles/styles'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        setLoading(true);
        // Validar que el password sea igual al confirm password
        if (password !== confirmPassword) {
            setLoading(false);
            return toast.error("Las contraseñas no coinciden");
        }

        // Validar que el password tenga al menos 6 caracteres
        if (password.length < 6) {
            setLoading(false);
            return toast.error("La contraseña debe tener al menos 6 caracteres");
        }

        const formData = new FormData();
        formData.append("file", avatar);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        axios.post(`${server}/user/register-user`, formData , config).then((res) => {
            console.log(res);
            setLoading(false);
            setAvatar(null);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            
            toast.success("Usuario registrado correctamente");
            navigate("/login");
        }).catch((err) => {
            setLoading(false);
            console.log(err);
            toast.error(err.response.data.message);
        });

    };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Crear una cuenta
            </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Nombre Completo
                        </label>
                        <div className="mt-1">
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                autoComplete="name" 
                                required 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                        </div>
                    </div>
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
                                name="password"
                                id="password"
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
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="current-password"
                                id="current-password"
                                autoComplete="current-password"
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {
                                showConfirmPassword ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                        size={25}
                                        onClick={() => setShowConfirmPassword(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                        size={25}
                                        onClick={() => setShowConfirmPassword(true)}
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="avatar"
                            className="block text-sm font-medium text-gray-700"
                        ></label>
                        <div className="mt-2 flex items-center">
                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                            {avatar ? (
                                <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                className="h-full w-full object-cover rounded-full"
                                />
                            ) : (
                                <RxAvatar className="h-8 w-8" />
                            )}
                            </span>
                            <label
                            htmlFor="file-input"
                            className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                            <span>Sube tu avatar</span>
                            <input
                                type="file"
                                name="avatar"
                                id="file-input"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileInputChange}
                                className="sr-only"
                            />
                            </label>
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
                                ) : ('Registrarse')
                            }
                        </button>
                    </div>
                    <div className={`${styles.noramlFlex} w-full`}>
                        <h4>Ya tienes una cuenta?</h4>
                        <Link to="/login" className="text-blue-600 pl-2">
                            Inicia Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register