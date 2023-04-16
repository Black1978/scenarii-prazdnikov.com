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
                    <Link className='link' to='/?cat=science'>
                        <h6>Детские праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=technology'>
                        <h6>Новый Год</h6>
                    </Link>
                    <Link className='link' to='/?cat=cinema'>
                        <h6>Профессиональные праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=design'>
                        <h6>Спортивные праздники</h6>
                    </Link>
                    <Link className='link' to='/?cat=food'>
                        <h6>Государственные праздники</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={() => logout()}>Logout</span>
                    ) : (
                        <Link className='link' to='/login'>
                            <span>Login</span>
                        </Link>
                    )}
                    {currentUser && (
                        <span className='write'>
                            <Link to='/write' className='link'>
                                Писать
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
