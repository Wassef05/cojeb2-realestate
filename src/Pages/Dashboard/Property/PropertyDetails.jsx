import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../config/constants';

const PropertyDetails = ({ id }) => {
    const [annonce, setAnnonce] = useState(null)
    const [propertyPictures, setPropertyPictures] = useState([])
    useEffect(() => {
        fetch(API_URL + 'api/details/' + id)
            .then(response => response.json())
            .then(result => {
                console.log("Property", result.property);
                setAnnonce(result.property[0]);
                setPropertyPictures(result.PropertyPictures);
            })
    }, [id])
    return (
        <div class="modal fade" id={`details-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5 fw-semibold" id="exampleModalLabel">Details annonce</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form className="" >
                            <div className='row g-4   px-4 pt-2 pb-5'>
                                <div className="col-md-12">
                                    <label for="title" className="form-label fw-semibold">Titre <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="title" name='title' value={annonce?.title} />
                                </div>
                                <div >
                                    <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                                    <textarea name="description" className="form-control" rows="4" value={annonce?.description}  ></textarea >
                                </div>
                                <div className="col-md-12 ">
                                    <label for="formFile" className="form-label fw-semibold">Image Principale <span className="text-danger">*</span></label>
                                    <div>
                                        <img src={API_URL + annonce?.picture} alt="" width='100px' className='mt-1' />
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <label for="formFile" className="form-label fw-semibold">Gallery d'images <span className="text-danger">*</span></label>
                                    <div>
                                        {propertyPictures.map(elt => (
                                            <img src={API_URL + elt.picture} alt="" width='100px' className='mt-1 me-1' />

                                        ))}
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <label for="category" className="form-label fw-semibold">Categorie <span className="text-danger">*</span></label>
                                    <input className="form-control" value={annonce?.category?.name} />
                                </div>
                                <div className="col-md-4">
                                    <label for="type" className="form-label fw-semibold">Type <span className="text-danger">*</span></label>
                                    <input className="form-control" value={annonce?.type} />

                                </div>
                                <div className="col-md-4">
                                    <label for="price" className="form-label fw-semibold">Prix <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='price' id="price" value={annonce?.price} />
                                </div>
                                <div className="col-md-4">
                                    <label for="liv_room" className="form-label fw-semibold">Salon <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='living_room' id="liv_room" value={annonce?.living_room} />
                                </div>
                                <div className="col-md-4">
                                    <label for="bedroom" className="form-label fw-semibold">Chambre <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='bedroom' id="bedroom" value={annonce?.bedroom} />
                                </div>
                                <div className="col-md-4">
                                    <label for="bathroom" className="form-label fw-semibold">Salle de bain <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='bathroom' id="bathroom" value={annonce?.bathroom} />
                                </div>
                                <div className="col-md-4">
                                    <label for="floor" className="form-label fw-semibold">Etage <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='floor' id="floor" value={annonce?.floor} />
                                </div>
                                <div className="col-md-4">
                                    <label for="area" className="form-label fw-semibold">Surface <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='area' id="area" value={annonce?.area} />
                                </div>
                                <div className="col-md-4">
                                    <label for="building_date" className="form-label fw-semibold">Date de construction</label>
                                    <input type="date" className="form-control" name='building_date' id="building_date" Value={annonce?.building_date} />
                                </div>
                            </div>
                            <div className='row g-4   px-4 pt-2 pb-5'>
                                <div className="col-md-4">
                                    <label for="city" className="form-label fw-semibold">Ville <span className="text-danger">*</span></label>
                                    <input type='text' value={annonce?.city?.name} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label for="sector" className="form-label fw-semibold">Secteur <span className="text-danger">*</span></label>
                                    <input type='text' value={annonce?.sector?.name} className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <label for="quarter" className="form-label fw-semibold">Quartier <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name='quarter' id="quarter" value={annonce?.district?.name} />
                                </div>
                                <div className="col-md-4">
                                    <label for="zip_code" className="form-label fw-semibold">Code postale <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='zip_code' id="zip_code" value={annonce?.zip_code} />
                                </div>
                                <div className="col-md-4">
                                    <label for="propertNum" className="form-label fw-semibold">Numéro du proporiété <span className="text-danger">*</span></label>
                                    <input type="number" className="form-control" name='propertyNum' id="propertyNum" value={annonce?.property_num} />
                                </div>
                                <div className="col-md-4">
                                    <label for="longitude" className="form-label fw-semibold">Longitude <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name='longitude' id="longitude" value={annonce?.longitude} />
                                </div>
                                <div className="col-md-4">
                                    <label for="latitude " className="form-label fw-semibold">Latitude  <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name='latitude ' id="latitude " value={annonce?.latitude} />
                                </div>

                            </div>


                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyDetails