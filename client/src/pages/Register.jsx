import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [err, setError] = useState(null)
    const navigate = useNavigate()
    const handleOnchange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
             await axios.post('/auth/register', inputs)
             navigate('/login')
        } catch (error) {
            setError(error.response.data)
        }
    }
    return (
        <div className='auth'>
            <h1>Регистрация</h1>
            <form>
                <input
                    required
                    type='text'
                    placeholder='username'
                    name='username'
                    onChange={handleOnchange}
                />
                <input
                    required
                    type='email'
                    placeholder='email'
                    name='email'
                    onChange={handleOnchange}
                />
                <input
                    required
                    type='password'
                    placeholder='password'
                    name='password'
                    onChange={handleOnchange}
                />
                <button onClick={handleSubmit}>Регистрация</button>
                {err && <p>{err}</p>}
                <span>
                    У Вас есть аккаунт? <Link to='/login'>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register
