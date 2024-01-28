import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/constants';
const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [phone, setPhone] = useState("");
    const [notification, setNotification] = useState('');
    const contact = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL + 'api/contact', { name, email, subject, phone, message })
            setNotification(res.data.success)
        } catch (error) {
            setNotification(error.data.error)
        }
    };
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <section className="mt-4 mb-5 py-5">
            <div className="add_property my-3 py-5 ">
                <div className='text-center shadow-lg mt-4'>
                    <h2 className='text-white fw-bolder fs-1'>Contactez-nous</h2>
                </div>
            </div>
            <div className='container row mx-auto g-0'>
                <div className="row my-4 mx-auto g-0 ">
                    <div className="col-lg-4  col-md-7 col-10 text-center mx-md-0 mx-auto mb-4 pe-4">
                        <div className="shadow p-4 h-100 rounded-2 card_contact ">
                            <div className="rounded-circle mx-auto shadow-sm mb-1 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-geo-alt-fill fs-3  text-warning "></i>
                            </div>
                            <div>
                                <h5 className='fw-semibold'>Addresse</h5>
                                <address>18 Hay Al Firdouss , Témara 20000</address>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-7 col-10 text-center mx-md-0 mx-auto  mb-4 pe-4">
                        <div className="shadow  p-4 h-100 rounded-2 card_contact ">
                            <div className="rounded-circle mx-auto shadow-sm mb-1 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-telephone-fill fs-3  text-warning "></i>
                            </div>
                            <div >
                                <h5 className='fw-semibold'>Téléphone</h5>
                                <p>+212 625 856 345</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-7 col-10 text-center mx-md-0 mx-auto mb-4 pe-4">
                        <div className="shadow p-4 h-100 rounded-2 card_contact ">
                            <div className=" rounded-circle mx-auto shadow-sm mb-1 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-envelope-fill fs-3  text-warning "></i>
                            </div>
                            <div>
                                <h5 className='fw-semibold'>Email </h5>
                                <Link to="mailto:email@example.com">immopro@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-10 mx-auto  my-3  pe-4">
                    <form onSubmit={contact} className="row px-4 py-5 rounded-4 shadow-sm border col-12 mx-auto">
                        <div className='col-md-6 mb-2'>
                            <label className="form-label fw-semibold">Nom et Prénom <span class="text-danger">*</span></label>
                            <input type="text" className="form-control" name='email' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='col-md-6 mb-2'>
                            <label className="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                            <input type="email" className="form-control" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='col-md-6 mb-2'>
                            <label className="form-label fw-semibold">Objet <span class="text-danger">*</span></label>
                            <input type="text" className="form-control" name='object' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        </div>
                        <div className='col-md-6 mb-2'>
                            <label className="form-label fw-semibold">Téléphone </label>
                            <input type="tel" className="form-control" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div >
                            <label class="form-label fw-semibold">Message <span class="text-danger">*</span></label>
                            <textarea name="message" class="form-control" rows="4" onChange={(e) => setMessage(e.target.value)} required>{message}</textarea >
                        </div>
                        {notification && <p className='alert alert-success mt-1 py-3 text-center alert-dismissible fade show' role="alert">{notification}
                            <button type="button" onClick={() => setNotification("")} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </p>}
                        <div className="mt-4">
                            <button type="submit" className="btn btn-warning col-12 fw-semibold ">Envoyer</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 col-10 pe-4 my-3 mx-auto">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.987764131213!2d-6.837296785047434!3d34.0185250269542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d4ee9e69ded%3A0x148138a74b343466!2s3w%20Academy!5e0!3m2!1sfr!2sma!4v1677440084818!5m2!1sfr!2sma"
                        className='w-100 h-100 rounded-4 shadow-sm border mx-auto' allowfullscreen="" title='map' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    )
}

export default Contact