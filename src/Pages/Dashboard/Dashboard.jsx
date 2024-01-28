
import { useEffect, useState } from 'react';
import { API_URL } from '../../config/constants';
import './Dashboard.css'
import PropertyDetails from './Property/PropertyDetails';
const Dashboard = () => {
    const [properties, setProperties] = useState([])
    const [nbrUsers, setNbrUsers] = useState(0)
    const [nbrProperty, setNbrProperty] = useState(0)
    const [nbrCategory, setnbrCategory] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(API_URL + "api/last-properties", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setProperties(result.properties);
                setNbrUsers(result.nbrUser);
                setNbrProperty(result.nbrProperty);
                setnbrCategory(result.nbrCategory);
            })
    }, [])
    return (
        <section className="col-md-8 col-11 height_100 g-0 mx-lg-0 mx-auto " >
            <div className="row gx-3 ">
                <div class="col-xxl-4 col-md-6 col-10 mb-5 mx-lg-0 mx-auto dash_card">
                    <div className='shadow-sm bg-white border-start  border-5 d-flex align-items-center border-danger row px-4 py-3 rounded-4 mx-lg-0 mx-md-auto'>
                        <div className='col-6'>
                            <p className='fw-semibold fs-4'>{nbrUsers}</p>
                            {nbrUsers > 1 ? <p className='fw-semibold fs-5'>Utilisateurs</p> :
                                <p className='fw-semibold fs-5'>Utilisateur</p>
                            }
                        </div>
                        <div className='col-6 text-end'>
                            <i class="bi bi-people-fill fontSize60 text-danger"></i>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-md-6 col-10 mb-5 mx-lg-0 mx-auto dash_card">
                    <div className='shadow-sm bg-white border-start border-5 d-flex align-items-center border-warning row px-4 py-3 rounded-4 mx-lg-0 mx-md-auto'>
                        <div className='col-6'>
                            <p className='fw-semibold fs-4'>{nbrProperty}</p>
                            {nbrProperty > 1 ? <p className='fw-semibold fs-5'>Annonces</p> :
                                <p className='fw-semibold fs-5'>Annonce</p>
                            }

                        </div>
                        <div className='col-6 text-end'>
                            <i class="bi bi-houses-fill fontSize60 text-warning"></i>
                        </div>
                    </div>
                </div>
                <div class="col-xxl-4 col-md-6 col-10 mb-5 mx-lg-0 mx-auto dash_card">
                    <div className='shadow-sm bg-white border-start border-5 d-flex align-items-center border-success row px-4 py-3 rounded-4 mx-lg-0 mx-md-auto'>
                        <div className='col-6'>
                            <p className='fw-semibold fs-4'>{nbrCategory}</p>
                            {nbrCategory > 1 ? <p className='fw-semibold fs-5'>Categories</p> :
                                <p className='fw-semibold fs-5'>categorie</p>
                            }
                        </div>
                        <div className='col-6 text-end'>
                            <i class="bi bi-tags-fill fontSize60 text-success"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <h5 className='fw-semibold '>Les derniers annonces</h5>
                <div class="table-responsive mx-auto my-table rounded-3 border shadow-sm  mt-4">
                    <table class="table bg-white table-hover  rounded-3  m-0">
                        <thead>
                            <tr>
                                <th scope="col" className='text-warning'>#</th>
                                <th scope="col" className='text-warning'>Photo</th>
                                <th scope="col" className='text-warning'>Titre</th>
                                <th scope="col" className='text-warning'>Prix</th>
                                <th scope="col" className='text-warning'>Propriétaire</th>
                                <th scope="col" className='text-warning'>Categorie</th>
                                <th scope="col" className='text-warning'>Type</th>
                                <th scope="col" className='text-warning'>Action</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {properties.map(annonce => (
                                <>
                                    <tr>
                                        <th scope="row" className="align-middle">{annonce.id}</th>
                                        <td className="align-middle">
                                            <img src={API_URL + annonce.picture} className="img-fluid rounded-circle" alt="property_picture" width='42px' style={{ height: '42px' }} />
                                        </td>
                                        <td className="align-middle">{annonce.title}</td>
                                        <td className="align-middle">{annonce.price} Dh</td>
                                        <td className="align-middle">{annonce.user.name}</td>
                                        <td className="align-middle">{annonce.category?.name}</td>
                                        <td className="align-middle">{annonce.type}</td>
                                        <td className="align-middle">
                                            <button className="btn btn-success me-1"><i class="bi bi-eye-fill" data-bs-toggle="modal" data-bs-target={`#details-${annonce.id}`}></i></button>
                                        </td>
                                    </tr>
                                    <PropertyDetails id={annonce.id} />
                                </>


                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    )
}

export default Dashboard