import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth-context';
import './NavBar.css'

const NavBar = () => {
    const { user } = useContext(AuthContext);


    return (
        <nav className="navbar fixed-top navbar-expand-lg  bg-transparent " >
            <div className="container " >
                <NavLink to="/" className="navbar-brand fw-bolder  " ><img src="/assets/images/logo.png" alt="logo" width="90px" /></NavLink>
                <button className="navbar-toggler bg-light " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto" >

                        <li className='nav-item me-2 mt-0 mb-1 mt-lg-3' >
                            <NavLink className=" fontSize18 nav-link navLink text-dark  fw-semibold" to='accueil' >Accueil</NavLink>
                        </li>
                        <li className='nav-item me-2 mt-0 mb-1 mt-lg-3' >
                            <NavLink className=" fontSize18 nav-link navLink text-dark  fw-semibold" to='annonces' >Annonces</NavLink>
                        </li>
                        <li className='nav-item me-2 mt-0 mb-1 mt-lg-3' >
                            <NavLink className=" fontSize18 nav-link navLink text-dark  fw-semibold" to='contact' >Contact</NavLink>
                        </li>
                        {user ?
                            <li className='nav-item me-2 mt-0 mb-1 mt-lg-3' >
                                <NavLink className=" fontSize18 nav-link navLink text-dark  fw-semibold" to='connexion' >Mon compte</NavLink>
                            </li> 
                            :
                            <li className='nav-item me-2 mt-0 mb-1 mt-lg-3' >
                                <NavLink className=" fontSize18 nav-link navLink text-dark  fw-semibold" to='connexion' >Se connecter</NavLink>
                            </li>
                        }

                        <li className='nav-item mt-2 mt-lg-3'>
                            <NavLink className="btn btn-warning fw-semibold    rounded-2 fontSize17 shadow-sm px-3 btn_anim" to='/publier-annonce'><i class="bi bi-camera-fill me-1 align-midlle fontSize17"></i> Publier une annonce</NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default NavBar