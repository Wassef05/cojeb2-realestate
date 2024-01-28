import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './Register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("picture", picture);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        console.log(role);
        try {
            const res = await axios.post(API_URL + "api/register", formData);
            console.log(res.data);
            navigate('/connexion');
        } catch (err) {
            setMessage('Email existe dèja');
            console.log(err.response);
        }
    };

    return (
        <section class="container row  mx-auto mt-5 py-5">
            <div className='row mx-auto mt-2 col-xl-5 col-lg-7 cold-md-8 col-sm-10 col-12 shadow px-4 pt-4 py-4 rounded-4'>
            {/* <h5 className='text-center fw-bold mb-4 pb-2 text-warning'>Inscrivez-vous</h5> */}
            <div className='text-center mb-4 pb-3'>
                <img src="/assets/images/logo.png" alt="" width='120px' />
            </div>

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                    </li>
                        <button class="nav-link myLink fs-5  active" onClick={()=>{
                            setRole('user')
                            console.log(role);
                        }} id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"  aria-selected="true">Particulier</button>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link myLink fs-5" onClick={()=>setRole('pro')} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Professionnel</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <form className='row mx-auto mb-2 mt-4' onSubmit={handleSubmit} encType="multipart/form-data">
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Nom et Prénom <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name='name' onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Téléphone <span class="text-danger">*</span></label>
                                <input type="tel" class="form-control" name='phone' onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="formFile" class="form-label fw-semibold">Photo</label>
                                <input class="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                            </div>
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Addresse <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name='address' onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div class=" col-md-6 mb-2">
                                <label class="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" name='email' onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div class="col-md-6 mb-2">
                                <label class="form-label fw-semibold">Mot de passe <span class="text-danger">*</span></label>
                                <input type="password" class="form-control" name='password' onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {message && <div className="message text-warning"><p>{message}</p></div>}
                            <div class="col-md-12 mb-2 mt-3 ">
                                <button type="submit" class="btn btn-warning fw-semibold col-12 px-4">Envoyer</button>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        <form className='row mx-auto mb-2 mt-4' onSubmit={handleSubmit} encType="multipart/form-data">
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Nom et Prénom <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name='name' onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Téléphone <span class="text-danger">*</span></label>
                                <input type="tel" class="form-control" name='phone' onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div class="col-md-12 mb-2">
                                <label for="formFile" class="form-label fw-semibold">Photo</label>
                                <input class="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                            </div>
                            <div class=" col-md-12 mb-2 ">
                                <label class="form-label fw-semibold">Addresse <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name='address' onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div class=" col-md-6 mb-2">
                                <label class="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" name='email' onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div class="col-md-6 mb-2">
                                <label class="form-label fw-semibold">Mot de passe <span class="text-danger">*</span></label>
                                <input type="password" class="form-control" name='password' onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {message && <div className="message text-warning"><p>{message}</p></div>}
                            <div class="col-md-12 mb-2 mt-3 ">
                                <button type="submit" class="btn btn-warning fw-semibold col-12 px-4">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>

        </section>
    )
}

export default Register