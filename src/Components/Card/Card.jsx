import { NavLink } from 'react-router-dom'
import { API_URL } from '../../config/constants';
import number_formatPhp from 'number_format-php'

import './Card.css'
const Card = ({ elt }) => {
    return (
        <article className="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-10 mb-4 mx-auto card_container" >
            <div className="card border-0">
                <div className='card_img position-relative '>
                    <NavLink to={`/details/${elt.id}`}><img src={API_URL + elt.picture} alt="user_image" className="" /></NavLink>
                    <h4 className=" fw-bolder position-absolute bottom-0 text-light ms-3 mb-2" >{number_formatPhp(elt.price,2,","," ") } Dh</h4>
                    <p className='fw-bolder position-absolute top-0 py-1 px-3 rounded-5 end-0 text-light mt-2 me-2 bg-warning text-dark'>{elt.type}</p>
                </div>
                <div>
                    <div className="pt-3 px-4">
                        <span className="text-danger bg-danger bg-opacity-10 rounded-5 py-1 px-3">{elt.category.name}</span>
                        <NavLink to={`/details/${elt.id}`}><h5 className="fw-semibold mt-3 mb-4">{elt.title}</h5></NavLink>
                        <address className='text-secondary'><i class="bi bi-geo-alt-fill"></i> {elt.zip_code}, N° {elt.property_num}, {elt.district?.name}, {elt.sector?.name}, {elt.city?.name}</address>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3  border-top px-4 pt-3">
                        <p className='fontSize17'><i class="fa-solid fa-bed text-warning me-1 fs-5"></i> <span>{elt.bedroom}</span> Chambre</p>
                        <p className='fontSize17'><i class="fa-solid fa-bath text-warning me-1 fs-5"></i> <span>{elt.bathroom}</span> S.bain</p>
                        <p className='fontSize17'><i class="fa-solid fa-vector-square text-warning me-1 fs-5"></i> <span>{elt.area}</span> m²</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Card