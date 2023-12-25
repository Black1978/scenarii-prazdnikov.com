import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'
import axios from 'axios'

const AvatarChange = () => {
    const [avatar, setAvatar] = useState(null)
    const [errorMsg, setErrorMsg] = useState(false)
    const [msg, setMsg] = useState(false)

    const { currentUser } = useContext(AuthContext)

    const uploadAvatar = async () => {
        try {
            setErrorMsg(false)
            const formData = new FormData()
            formData.append('avatar', avatar)
            const res = await axios.post('/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return res
        } catch (error) {
            setErrorMsg(error.response.data)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const avatarPicUrl = await uploadAvatar()
        if (!avatarPicUrl) return
        console.log(avatarPicUrl)
        try {
            const response = await axios.put('/update/avatar', { img: avatarPicUrl.data })
            setMsg(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='auth'>
            <h1>Изменить аватар</h1>
            <img
                src={`${process.env.REACT_APP_STATIC_URL}avatars/${currentUser?.img}`}
                alt='avatar'
                className='avatar'
            />
            <form>
                <input
                    type='file'
                    id='avatar'
                    accept='image/*'
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
                <label htmlFor='avatar' className='file'>
                    Загрузить изображение
                </label>
                {msg && <p className='errmsg'>{'Аватар обновлен!'}</p>}
                <button onClick={handleSubmit}>Изменить аватар</button>
                {<p className='errmsg'>{errorMsg.message}</p>}
                <p>
                    <Link className='link' to='/'>
                        Главная страница
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default AvatarChange
