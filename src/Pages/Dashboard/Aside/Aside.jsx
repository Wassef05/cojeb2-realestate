import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './Aside.css'

const Aside = () => {
    const [userName, setUserName] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [userRole, setUserRole] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserPicture(user.picture);
            setUserRole(user.role);
        }
    }, [user])
    const logout = () => {
        axios.post(API_URL + 'api/revoke-tokens/', { id: user.id }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(response => {
                localStorage.removeItem("user");
                setUserName("");
                setUserPicture("");
                setUser(null);
                navigate('/connexion')
            }).catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <section className="dashboard ">
            <div className="row container mx-auto py-4 g-0 d-flex justify-content-between">
                <aside className="col-lg-3 col-md-4 col-10 mx-md-0 mx-auto mb-5 ">
                    <div className="py-1 rounded-3 shadow-sm bg-white">
                        <div className="text-center my-4">
                            <img src={API_URL + userPicture} className="img-fluid avater rounded-circle mb-3" alt="" width='80px ' />
                            <h4 className='fw-semibold'>{userName}</h4>
                        </div>
                        {userRole === 'admin' ?
                            <div className='pb-3 '>
                                <div className='dash_menu' >
                                    <Link to="/dashboard" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 fa fa-tachometer-alt text-warning"></i>Dashboard</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/profile" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 fa fa-user-tie text-warning"></i>Profile</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/utilisateurs" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 bi bi-people-fill text-warning"></i>Utilisateurs</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/categories" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 bi bi-tags-fill text-warning"></i>Categories</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/annonces" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 bi bi-houses-fill text-warning"></i>Annonces</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/mes-annonces" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 bi bi-house-check-fill text-warning"></i>Mes annonces</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link onClick={logout} className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 fa-solid fa-right-from-bracket text-warning"></i>Déconnexion</Link>
                                </div>
                            </div>
                            :
                            <div className='pb-3 '>
                                <div className='dash_menu' >
                                    <Link to="/dashboard" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 fa fa-user-tie text-warning"></i>Profile</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link to="/dashboard/mes-annonces" className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 bi bi-house-check-fill text-warning"></i>Mes annonces</Link>
                                </div>
                                <div className='dash_menu' >
                                    <Link onClick={logout} className='d-block  ms-4 dash_item'><i className="mx-3 fs-5 fa-solid fa-right-from-bracket text-warning"></i>Déconnexion</Link>
                                </div>
                            </div>
                        }
                    </div>
                </aside>
                <Outlet />
            </div>
        </section>

    )
}

export default Aside