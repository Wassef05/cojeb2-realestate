import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './ResetPassword.css'

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const params = useParams();
    const onSubmit =  (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                axios.post(API_URL + 'api/reset-password/' + params.token, { password })
                .then(response =>{
                    setMessage(response.data.success)
                    
                }).catch(error =>{
                    setMessage(error.response.data.error);
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            setMessage('Enter a valid password');
            setConfirmPassword("");
        }

    }
    return (
        <section className="container row  mx-auto my-5 py-5">
            <div className=" mx-auto my-5 d-flex align-items-center col-xl-4 col-lg-6 cold-md-8 col-sm-10 col-11 shadow p-5 rounded-4">
                <form onSubmit={onSubmit} className="row mx-auto" method='POST'>
                    <h5 className='text-center fw-bold mb-5 text-warning'>Réinitialiser mot de passe</h5>
                    <div className="mb-4 ">
                        <label className="form-label fw-semibold">Mot de passe <span class="text-danger">*</span></label>
                        <input type="password" className="form-control" name='password'  onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-2 ">
                        <label className="form-label fw-semibold">Confirmer mot de passe <span class="text-danger">*</span></label>
                        <input type="password" className="form-control" name='confirmPassword'  onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    {message && <p className='alert alert-warning py-3 col-11 mx-auto text-center alert-dismissible fade show' role="alert">{message}
                        <button type="button" onClick={() => setMessage("")} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </p>}
                    <div className="mt-4">
                        <button type="submit" className="btn btn-warning col-12 fw-semibold px-4">Envoyer</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword