import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import validator from 'validator';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';

const cities = [
    {
        name: 'Agadir',
        districts: ['Al Houda', 'Al Inbiâat', 'Dakhla', 'Founti', 'Les Amicales', 'Salam'],
    },
    {
        name: 'Al Hoceima',
        districts: ['Badr', 'Bni Boufrah', 'El Massira', 'Ihchach', 'Isly', 'Sidi Bouhcine'],
    },
    {
        name: 'Azrou',
        districts: ['El Houda', 'Lahbabi', 'Méchouar', 'Tifaouine', 'Tizi Nisly'],
    },
    {
        name: 'Casablanca',
        districts: ['Aïn Sebaâ', 'Al Fida', 'Anfa', "Ben M'Sik", 'Hay Hassani', 'Maârif'],
    },
    {
        name: 'Fès',
        districts: ['Agdal', 'Hay Labladi', 'Jnane Sbile', 'Moulay Rachid', 'Saïss', 'Zouagha'],
    },
    {
        name: 'Kenitra',
        districts: ['Al Amal', 'Al Irfane', 'El Bassatine', 'Ibn Sina', 'Maâmora', 'Sidi Taibi'],
    },
    {
        name: 'Marrakech',
        districts: ['Al Makhfia', 'El Harti', 'Guéliz', 'Massira', 'Médina', 'Sidi Youssef Ben Ali'],
    },
    {
        name: 'Oujda',
        districts: ['Al Farah', 'Al Qods', 'Dar Sebti', 'El Hanchane', 'Izdihar', 'Lamkansa'],
    },
    {
        name: 'Rabat',
        districts: ['Agdal', 'Hassan', 'Hay Riad', "L'Océan", 'Souissi', 'Yacoub Al Mansour'],
    },
    {
        name: 'Tanger',
        districts: ['Al Amal', 'Beni Makada', 'Iberia', 'Médina', 'Moujahidine', 'Malabata'],
    },
];
const types = ['À VENDRE', 'À LOUER']
const EditMyProperty = () => {
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [pictures, setPictures] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [propertyNum, setPropertyNum] = useState('');
    const [price, setPrice] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [livingRoom, setLivingRoom] = useState('');
    const [floor, setFloor] = useState('');
    const [area, setArea] = useState('');
    const [buildingDate, setBuildingDate] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [propertyPictures, setPropertyPictures] = useState([]);
    const [message, setMessage] = useState('');

    const params = useParams();

    const [listCategories, setListCategories] = useState([]);
    useEffect(() => {
        fetch(API_URL + "api/list-categories")
            .then(response => response.json())
            .then(result => {
                setListCategories(result.categories);
            })
    }, [])

    useEffect(() => {
        fetch(API_URL + 'api/details/' + params.id)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setPropertyPictures(result.PropertyPictures);
                setPicture(result.property[0].picture)
                setTitle(result.property[0].title)
                setCategory(result.property[0].category.name)
                setCategoryId(result.property[0].category.id);
                setType(result.property[0].type)
                setPrice(result.property[0].price)
                setDescription(result.property[0].description)
                setPropertyNum(result.property[0].property_num)
                setBedroom(result.property[0].bedroom)
                setBathroom(result.property[0].bathroom)
                setLivingRoom(result.property[0].living_room)
                setFloor(result.property[0].floor)
                setArea(result.property[0].area)
                setBuildingDate(result.property[0].building_date)
                setZipCode(result.property[0].zip_code)
                setLongitude(result.property[0].longitude)
                setLatitude(result.property[0].latitude)
                setSelectedCity(result.property[0].city.name)
                setSelectedDistrict(result.property[0].sector.name)
                setDistrictName(result.property[0].district.name)

            })
    }, []);
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("picture", picture);
        pictures.forEach((file, index) => {
            formData.append(`picture_${index + 1}`, file);
        });
        formData.append("number_pictures", pictures.length);
        formData.append("pictures", pictures);
        formData.append("price", price);
        formData.append("categoryId", categoryId);
        formData.append("type", type);
        formData.append("propertyNum", propertyNum);
        formData.append("bedroom", bedroom);
        formData.append("bathroom", bathroom);
        formData.append("livingRoom", livingRoom);
        formData.append("floor", floor);
        formData.append("area", area);
        formData.append("buildingDate", buildingDate);
        formData.append("zipCode", zipCode);
        formData.append("longitude", longitude);
        formData.append("latitude", latitude);
        formData.append("cityName", selectedCity);
        formData.append("sectorName", selectedDistrict);
        formData.append("districtName", districtName);

        try {
            const res = await axios.post(API_URL + 'api/edit-property/' + params.id, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setMessage(res.data.success);
        } catch (error) {
            setMessage(error.message);
            console.log(error.response);
        }
    }
    const handlePriceChange = (e) => {
        if (e.target.value === "" || validator.isInt(e.target.value, { min: 0 })) {
            setPrice(e.target.value);
            return;
        }
    }
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        console.log(event.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };
    const handlePicturesChange = event => {
        setPictures(Array.from(event.target.files))
    }
    const deletePicture = (id) => {
        axios.delete(API_URL + 'api/delete-picture/' + id, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(() => {
                setPropertyPictures(propertyPictures.filter(f=>f.id !== id ))
            });
    }
    return (
        <div className=" col-md-8 col-10 mx-md-0 mx-auto bg-white  pt-4 rounded-2 shadow-sm height_100" >
            <form className="" onSubmit={submit}>
                <div className='row g-4   px-4 pt-2 pb-5'>
                    <h5 className='fw-bold'>Modifier L'annonce</h5>
                    <div className="col-md-12">
                        <label for="title" className="form-label fw-semibold">Titre <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="title" name='title' value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} />
                    </div>
                    <div >
                        <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                        <textarea name="description" className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea >
                    </div>
                    <div className="col-md-12 ">
                        <label for="formFile" className="form-label fw-semibold">Image Principale <span className="text-danger">*</span></label>
                        <input className="form-control" type="file" id="formFile" name='picture' onChange={(e) => setPicture(e.target.files[0])} />
                        <img src={API_URL + picture} alt="" width='100px' className='mt-1' />
                    </div>
                    <div className="col-md-12 ">
                        <label for="formFile" className="form-label fw-semibold">Gallery d'images <span className="text-danger">*</span></label>
                        <input className="form-control" type="file" id="formFile" onChange={(e) => handlePicturesChange(e)} multiple />
                        {propertyPictures.map(elt => (
                            <div className='d-inline me-1'>
                                <img src={API_URL + elt.picture} alt="" width='100px' className='mt-1 me-1' />
                                <button onClick={() => deletePicture(elt.id)} className="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                            </div>

                        ))}
                    </div>
                    <div className="col-md-4">
                        <label for="category" className="form-label fw-semibold">Categorie <span className="text-danger">*</span></label>
                        <select id="category" name='category' className="form-select" onChange={(e) => setCategoryId(e.target.value)} >
                            <option selected value={categoryId}>{category}</option>
                            {listCategories.map(categorie => categorie.name !== category &&
                                <option value={categorie.id}>{categorie.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label for="type" className="form-label fw-semibold">Type <span className="text-danger">*</span></label>
                        <select id="type" name='type' className="form-select" onChange={(e) => setType(e.target.value)} >
                            <option selected value={type}>{type}</option>
                            {types.map(elt => elt !== type &&
                                <option value={elt}>{elt}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label for="price" className="form-label fw-semibold">Prix <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='price' id="price" value={price} onChange={handlePriceChange} />
                    </div>
                    <div className="col-md-4">
                        <label for="liv_room" className="form-label fw-semibold">Salon <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='living_room' id="liv_room" value={livingRoom} onChange={(e) => setLivingRoom(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="bedroom" className="form-label fw-semibold">Chambre <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='bedroom' id="bedroom" value={bedroom} onChange={(e) => setBedroom(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="bathroom" className="form-label fw-semibold">Salle de bain <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='bathroom' id="bathroom" value={bathroom} onChange={(e) => setBathroom(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="floor" className="form-label fw-semibold">Etage <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='floor' id="floor" value={floor} onChange={(e) => setFloor(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="area" className="form-label fw-semibold">Surface <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='area' id="area" value={area} onChange={(e) => setArea(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="building_date" className="form-label fw-semibold">Date de construction</label>
                        <input type="date" className="form-control" name='building_date' id="building_date" Value={buildingDate} onChange={(e) => setBuildingDate(e.target.value)} />
                    </div>
                </div>
                <div className='row g-4   px-4 pt-2 pb-5'>
                    <h5 className='fw-bold mb-2'>Emplacement du logement</h5>
                    <div className="col-md-4">
                        <label for="city" className="form-label fw-semibold">Ville <span className="text-danger">*</span></label>
                        <select id='city' className='form-select' onChange={handleCityChange}>
                            <option value={selectedCity}>{selectedCity}</option>
                            {cities.map(city => city.name !== selectedCity &&
                                <option key={city.name} value={city.name}>{city.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label for="sector" className="form-label fw-semibold">Secteur <span className="text-danger">*</span></label>
                        {selectedCity ?
                            <select id="sector" className="form-select" onChange={handleDistrictChange}>
                                <option value={selectedDistrict}>{selectedDistrict}</option>
                                {cities.find(city => city.name === selectedCity)?.districts.map(district => district !== selectedDistrict &&
                                    <option key={district} value={district}>{district}</option>
                                )}
                            </select>
                            :
                            <select id="sector" className="form-select" >
                                <option value="">Sélectionnez un secteur</option>
                            </select>
                        }
                    </div>
                    <div className="col-md-4">
                        <label for="quarter" className="form-label fw-semibold">Quartier <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name='quarter' id="quarter" value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="zip_code" className="form-label fw-semibold">Code postale <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='zip_code' id="zip_code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="propertNum" className="form-label fw-semibold">Numéro du proporiété <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name='propertyNum' id="propertyNum" value={propertyNum} onChange={(e) => setPropertyNum(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="longitude" className="form-label fw-semibold">Longitude <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name='longitude' id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label for="latitude " className="form-label fw-semibold">Latitude  <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name='latitude ' id="latitude " value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </div>
                    {message && <p className='alert alert-warning py-3 text-center alert-dismissible fade show' role="alert">{message}
                        <button type="button" class="btn-close" onClick={() => setMessage("")} data-bs-dismiss="alert" aria-label="Close"></button>
                    </p>}
                    <div class="col-12  mt-4 text-end" >
                        <button type="submit" class="btn btn-warning fw-semibold px-4 shadow-sm  fs-5">Modifier l'annonce</button>
                    </div>
                </div>


            </form>
        </div>


    )
}

export default EditMyProperty