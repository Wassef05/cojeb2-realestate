import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './Login.css'
import axios from 'axios';
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const emailRef = useRef();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        if (validator.isEmail(e.target.value)) {
            emailRef.current.style.color = "black";
            emailRef.current.style.border = "1px solid #dee2e6";
        } else {
            emailRef.current.style.color = "red";
            emailRef.current.style.border = "1px solid red";
        }
    }
    const clickLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        if (validator.isEmail(email)) {
            try {
                let res = await axios.post(API_URL + "api/login", formData)
                console.log(res);
                setUser({ ...res.data.user, token: res.data.token });
                localStorage.setItem('user', JSON.stringify({ ...res.data.user, token: res.data.token }));
                navigate('/dashboard')
            } catch (err) {
                console.log(err.response.data);

                setMessage('Utilisateur introuvable');
            }
        } else {
            setMessage('Email incorrect');

        }
    }
    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <section className="container row  mx-auto my-5 py-5">
            <div className="mx-auto my-5 d-flex align-items-center col-xl-4 col-lg-6 cold-md-8 col-sm-10 col-11 shadow p-5 rounded-4">
                <form onSubmit={clickLogin} className="row g-3 col-11 mx-auto ">
                    <h3 className='text-center fw-bolder mb-4 text-warning'>Connectez-vous</h3>
                    <div className="mb-2 ">
                        <label className="form-label fw-semibold">Email</label>
                        <input type="email" ref={emailRef} className="form-control" name='email' value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className="">
                        <label className="form-label fw-semibold">Mot de passe</label>
                        <input type="password" className="form-control" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {message && <p className='alert alert-danger py-3 text-center alert-dismissible fade show' role="alert">{message}
                        <button type="button" onClick={()=> setMessage("")} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </p>}
                    <div className="mt-4 d-flex align-items-center justify-content-between">
                        <NavLink to={'/inscription'} className="text-warning fw-semibold">S'inscire ?</NavLink>
                        <NavLink to={'/mot-de-passe-oublier'} className="text-warning fw-semibold">Mot de passe oublier ?</NavLink>
                    </div>
                    <div className="mt-4">
                        <button disabled={!validator.isEmail(email)} type="submit" className="btn btn-warning  col-12 fw-semibold px-4" >Se Connecter</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login