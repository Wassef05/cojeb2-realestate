import axios from 'axios';
import { useState } from 'react'
import { API_URL } from '../../../config/constants';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const onSubmit =  (e) => {
        e.preventDefault();
        try {
             axios.post(API_URL + 'api/forgot-password', { email })
            .then(response =>{
                setMessage(response.data.success)
                
            }).catch(error =>{
                setMessage(error.response.data.error);
            })
           
        } catch (error) {
            
            console.log(error);
        }

    }
    return (
            <section className="container row  mx-auto my-5 py-5">
                <div className=" col-xl-4 col-lg-6 col-md-7 col-sm-10 col-11 mx-auto d-flex align-items-center shadow p-5 rounded-4 my-5">
                    <form onSubmit={onSubmit} className="row mx-auto ">
                        <h4 className='text-center fw-bold mb-5 text-warning'>Mot de passe oublier</h4>
                        <div className="mb-2 ">
                            <label className="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                            <input type="email" className="form-control" name='email'  onChange={e => setEmail(e.target.value)} required />
                        </div>
                    {message && <p className='alert alert-warning py-3 col-11 mx-auto text-center alert-dismissible fade show' role="alert">{message}
                        <button type="button" onClick={() => setMessage("")} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </p>}
                        <div className="mt-4">
                            <button type="submit" className="btn btn-warning col-12 fw-semibold px-4">Envoyer</button>
                        </div>
                    </form>
                </div>
            </section>

    )
}

export default ForgotPassword