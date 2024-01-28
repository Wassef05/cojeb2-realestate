import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import validator from 'validator';
import { API_URL } from '../../config/constants';
import AuthContext from '../../context/auth-context';
import './AddProperty.css'

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
    {
        name: 'Meknes',
        districts: ['Médina', 'Hamria', 'Bassatine', 'Hay Salam', 'Zitoune']
    },
    {
        name: 'Tétouan',
        districts: ['El Hana', 'Hassania', 'El Mandar Al Jadid', 'Souani']
    },
    {
        name: 'Beni Mellal',
        districts: ['Ville Nouvelle', 'Hay Salam', 'Oulad Yaich', 'Ain Asserdoun']
    },

    {
        name: 'El Jadida',
        districts: ['Cité Portugaise', 'Hay Salam', 'Sidi Bouzid', 'Moulay Abdallah']
    },
    {
        name: 'Essaouira',
        districts: ['Médina', 'Hay Salam', 'Tassila', 'Ahl Agadir']
    },
    {
        name: 'Tiznit',
        districts: ['Hay Tiznit', 'Aït Baha', 'Ifri', 'Aït Amira']
    },
    {
        name: 'Dakhla',
        districts: ['Hay Essalam', 'Al Moussallah', 'El Inbiâat', 'Al Wifaq']
    },
    {
        name: 'Laâyoune',
        districts: ['Hay Essalam', 'Hay El Wifak', 'Marsa', 'Dchiera']
    },
    {
        name: 'Taroudant',
        districts: ['Hay El Wahda', 'Assaka', 'El Mouahidine', 'Médina']
    },
    {
        name: 'Nador',
        districts: ['Ville Nouvelle', 'Al Kods', 'Médina', 'Béni Ansar']
    },

];
const AddProperty = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [pictures, setPictures] = useState([]);
    const [categoryId, setCategoryId] = useState('');
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
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext);
    const [listCategories, setListCategories] = useState([]);

    useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
    }, [user])
    useEffect(() => {
        fetch(API_URL + "api/list-categories")
            .then(response => response.json())
            .then(result => {
                setListCategories(result.categories);
            })
    }, [])
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("picture", picture);
        formData.append("userId", userId);
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
            const res = await axios.post(API_URL + 'api/add-property', formData);
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
    useEffect(() => {
        window.scroll(0, 0);
    }, [])


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
    return (
        <section className='my-5 py-4'>
            <div className="add_property my-3 py-5 ">
                <div className='text-center shadow-lg mt-4'>
                    <h2 className='text-white fw-bolder fs-1'>Publier une annonce</h2>
                </div>
            </div>
            <div className='col-md-6 col-10  mx-auto'>
                <h3 className='fw-bolder text-center my-5'>Remplissez le formulaire</h3>
                <form className="" onSubmit={submit}>
                    <div className='row g-4 shadow-sm border rounded-4 px-4 pt-2 pb-5'>
                        <h5 className='fw-bold mb-4'>Details du logement</h5>
                        <div className="col-md-12">
                            <label for="title" className="form-label fw-semibold">Titre <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="title" name='title' value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} required />
                        </div>
                        <div >
                            <label className="form-label fw-semibold">Description <span className="text-danger">*</span></label>
                            <textarea name="description" className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea >
                        </div>
                        <div className="col-md-12 ">
                            <label for="formFile" className="form-label fw-semibold">Image Principale <span className="text-danger">*</span></label>
                            <input className="form-control" type="file" id="formFile" name='picture' onChange={(e) => setPicture(e.target.files[0])} />
                        </div>
                        <div className="col-md-12 ">
                            <label for="formFile" className="form-label fw-semibold">Gallery d'images <span className="text-danger">*</span></label>
                            <input className="form-control" type="file" id="formFile" onChange={(e) => handlePicturesChange(e)} multiple />
                        </div>
                        <div className="col-md-4">
                            <label for="category" className="form-label fw-semibold">Categorie <span className="text-danger">*</span></label>
                            <select id="category" name='category' className="form-select" onChange={(e) => setCategoryId(e.target.value)} required>
                                <option selected disabled>---</option>
                                {listCategories.map(categorie => (
                                    <option value={categorie.id}>{categorie.name}</option>

                                ))}

                            </select>
                        </div>
                        <div className="col-md-4">
                            <label for="type" className="form-label fw-semibold">Type <span className="text-danger">*</span></label>
                            <select id="type" name='type' className="form-select" onChange={(e) => setType(e.target.value)} required>
                                <option selected disabled>---</option>
                                <option value='À VENDRE'>À VENDRE</option>
                                <option value='À LOUER'>À LOUER</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label for="price" className="form-label fw-semibold">Prix <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='price' id="price" value={price} onChange={handlePriceChange} required />
                        </div>
                        <div className="col-md-4">
                            <label for="liv_room" className="form-label fw-semibold">Salon <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='living_room' id="liv_room" value={livingRoom} onChange={(e) => setLivingRoom(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="bedroom" className="form-label fw-semibold">Chambre <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='bedroom' id="bedroom" value={bedroom} onChange={(e) => setBedroom(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="bathroom" className="form-label fw-semibold">Salle de bain <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='bathroom' id="bathroom" value={bathroom} onChange={(e) => setBathroom(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="floor" className="form-label fw-semibold">Etage <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='floor' id="floor" value={floor} onChange={(e) => setFloor(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="area" className="form-label fw-semibold">Surface <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='area' id="area" value={area} onChange={(e) => setArea(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="building_date" className="form-label fw-semibold">Date de construction</label>
                            <input type="date" className="form-control" name='building_date' id="building_date" Value={buildingDate} onChange={(e) => setBuildingDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='row g-4 shadow-sm border rounded-4 px-4 pt-2 pb-5 mt-4'>
                        <h5 className='fw-bold mb-4'>Emplacement du logement</h5>
                        <div className="col-md-4">
                            <label for="city" className="form-label fw-semibold">Ville <span className="text-danger">*</span></label>
                            <select id='city' className='form-select' onChange={handleCityChange}>
                                <option value="">Sélectionnez une ville</option>
                                {cities.map(city => (
                                    <option key={city.name} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label for="sector" className="form-label fw-semibold">Secteur <span className="text-danger">*</span></label>
                            {selectedCity ?
                                <select id="sector" className="form-select" onChange={handleDistrictChange}>
                                    <option value="">Sélectionnez un secteur</option>
                                    {cities.find(city => city.name === selectedCity).districts.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                                :
                                <select id="sector" className="form-select" >
                                    <option value="">Sélectionnez un secteur</option>
                                </select>
                            }
                        </div>
                        <div className="col-md-4">
                            <label for="quarter" className="form-label fw-semibold">Quartier <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name='quarter' id="quarter" value={districtName} onChange={(e) => setDistrictName(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="zip_code" className="form-label fw-semibold">Code postale <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='zip_code' id="zip_code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="propertNum" className="form-label fw-semibold">Numéro du proporiété <span className="text-danger">*</span></label>
                            <input type="number" className="form-control" name='propertyNum' id="propertyNum" value={propertyNum} onChange={(e) => setPropertyNum(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="longitude" className="form-label fw-semibold">Longitude <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name='longitude' id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                        </div>
                        <div className="col-md-4">
                            <label for="latitude " className="form-label fw-semibold">Latitude  <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name='latitude ' id="latitude " value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                        </div>
                        {message && <p className='alert alert-warning py-3 text-center alert-dismissible fade show' role="alert">{message}
                            <button type="button" class="btn-close" onClick={()=> setMessage("")} data-bs-dismiss="alert" aria-label="Close"></button>
                        </p>}
                        <div class="col-12 text-center mt-5">
                            <button type="submit" class="btn btn-warning fw-semibold px-4 shadow-sm col-12 fs-5 py-2">Publier l'annonce</button>
                        </div>
                    </div>
                    {/* <div className='row g-4 shadow-sm border rounded-4 px-4 pt-2 pb-4 mt-4'>
                        <h5 className='fw-bold mb-4'>Caractéristiques du logement</h5>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="ascenseur" id="Ascenseur" />
                            <label className="form-check-label" for="Ascenseur">Ascenseur</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="balcon" id="Balcon" />
                            <label className="form-check-label" for="Balcon">Balcon</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="terrasse" id="Terrasse" />
                            <label className="form-check-label" for="Terrasse">Terasse</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="meuble" id="Meuble" />
                            <label className="form-check-label" for="Meuble">Meuble</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="securité" id="Securité" />
                            <label className="form-check-label" for="Securité">Securité</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="parking" id="Parking" />
                            <label className="form-check-label" for="Parking">Parking</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="chauffage" id="Chauffage" />
                            <label className="form-check-label" for="Chauffage">Chauffage</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="climatisation" id="Climatisation" />
                            <label className="form-check-label" for="Climatisation">Climatisation</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="consierge" id="Consierge" />
                            <label className="form-check-label" for="Consierge">Consierge</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="piscine" id="Piscine" />
                            <label className="form-check-label" for="Piscine">Piscine</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="balcon" id="Balcon" />
                            <label className="form-check-label" for="Balcon">Balcon</label>
                        </div>
                        <div className="form-check col-md-3">
                            <input className="form-check-input" type="checkbox" value="vidéo Surveillance" id="Vidéo Surveillance" />
                            <label className="form-check-label" for="Vidéo Surveillance">Vidéo Surveillance</label>

                        </div>
                        
                    </div> */}

                </form>
            </div>
        </section>
    )
}

export default AddProperty