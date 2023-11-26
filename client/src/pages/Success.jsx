import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <div className='auth'>
            <h1>Регистрация прошла успешно!</h1>
            <button className='successLink successLinkButton'>
                <Link className='link' to='/login'>
                    Логин
                </Link>
            </button>
        </div>
    )
}

export default Success
