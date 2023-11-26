import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           const response = await login(inputs)
           console.log(response)
           navigate('/')
        } catch (err) {
            setError(err.response.data)
        }
    }
    return (
        <div className='auth'>
            <h1>Вход в аккаунт</h1>
            <form>
                <input type='text' placeholder='username' name='username' onChange={handleChange} />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Войти</button>
                {error && <p className='errmsg'>{error}</p>}
                <span>
                    У Вас нет аккаунта?{' '}
                    <Link className='link' to='/register'>
                        Зарегистрироваться
                    </Link>
                </span>
                <p>
                    <Link className='link' to='/'>Главная страница</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
