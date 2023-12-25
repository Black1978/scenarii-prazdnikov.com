import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className='navContainer'>
                <div className='logo'>
                    <Link to='/'>Scenarii prazdnikov</Link>
                </div>
                <div className='links'>
                    <Link className='link' to='/?cat=childholid'>
                        <h6>Детские праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=newyearholid'>
                        <h6>Новый Год</h6>
                    </Link>
                    <Link className='link' to='/?cat=profholid'>
                        <h6>Профессиональные праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=sportholid'>
                        <h6>Спортивные праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=publholid'>
                        <h6>Государственные праздники</h6>
                    </Link>
                    {currentUser?.img && <img src={`http://localhost:8801/avatars/${currentUser?.img}`} alt='user' />}
                    <Link className='link' to='/avatarchange'>
                        <span>{currentUser?.username}</span>
                    </Link>

                    {currentUser ? (
                        <span onClick={() => logout()}>Logout</span>
                    ) : (
                        <Link className='link' to='/login'>
                            <span>Login</span>
                        </Link>
                    )}
                    {currentUser && (
                        <Link to='/write' className='link'>
                            <span className='write'>Писать</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
