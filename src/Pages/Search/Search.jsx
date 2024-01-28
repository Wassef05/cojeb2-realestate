import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Cardd from "../../Components/Cardd/Cardd"
import { API_URL } from "../../config/constants"

import $ from 'jquery'

import './Search.css'
import Paginationn from "../../Components/Paginationn/Paginationn"
import axios from "axios"
import PaginationFilter from "../../Components/PaginationFilter/PaginationFilter"

const Search = () => {

    const [data, setData] = useState([]);
    const [result, setResult] = useState(0);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");
    const [sector, setSector] = useState("");
    const [type, setType] = useState('');
    const [livingRoom, setLivingRoom] = useState("");
    const [bedroom, setBedroom] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [floor, setFloor] = useState("");
    const [areaMin, setAreaMin] = useState("");
    const [areaMax, setAreaMax] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [formData, setFormData] = useState();
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        fetch(API_URL + 'api/properties/1')
            .then(response => response.json())
            .then(result => {
                setData(result.properties);
                setResult(result.nbrProperties);
            })
    }, [])
    useEffect(() => {
        fetch(API_URL + 'api/list-categories')
            .then(response => response.json())
            .then(result => {
                setCategories(result.categories);
            })
    }, [])
    useEffect(() => {
        fetch(API_URL + 'api/list-cities')
            .then(response => response.json())
            .then(result => {
                setCities(result.cities);
            })
    }, [])

    const filter = async (e) => {
        e.preventDefault();
        setFiltered(true);
        const formData = new FormData();
        formData.append('city', city);
        formData.append('sector', sector);
        formData.append('category', category);
        formData.append('type', type);
        formData.append('livingRoom', livingRoom);
        formData.append('bedroom', bedroom);
        formData.append('bathroom', bathroom);
        formData.append('floor', floor);
        formData.append('areaMin', areaMin);
        formData.append('areaMax', areaMax);
        formData.append('priceMin', priceMin);
        formData.append('priceMax', priceMax);
        setFormData(formData);
        try {
            const response = await axios.post(API_URL + 'api/filter-properties', formData)
            setData(response.data.properties)
            window.scroll(0, 0);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }

    }

    const filterByDate = () => {

        fetch(API_URL + 'api/properties/1')
            .then(response => response.json())
            .then(result => {
                setData(result.properties);
            })
        $('.dateActive').addClass('active')
        $('.ascActive').removeClass('active')
        $('.descActive').removeClass('active')

    }
    const orderByAsc = () => {
        const copyData = [...data];
        copyData.sort((a, b) => (a.price < b.price ? 1 : -1));
        setData(copyData);
        $('.dateActive').removeClass('active')
        $('.ascActive').addClass('active')
        $('.descActive').removeClass('active')
    }
    const orderByDesc = () => {
        const copyData = [...data];
        copyData.sort((a, b) => (a.price > b.price ? 1 : -1));
        setData(copyData);
        $('.dateActive').removeClass('active')
        $('.ascActive').removeClass('active')
        $('.descActive').addClass('active')
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <section className="search py-4">
            <div className="container col-xl-12  col-10  bg-white rounded-3 py-1 shadow-sm   mx-auto">
                <div className="py-3 d-flex flex-md-row flex-column  justify-content-end align-items-center">
                    {/* <div className="fw-semibold"><span>{result}</span> Résultats</div> */}
                    <div>
                        <span className="me-3 fw-semibold">Trier par:</span>
                        <Link onClick={filterByDate} className="me-2 text-warning border-bottom border-warning dateActive active">Plus récent</Link>
                        <Link onClick={orderByAsc} className="me-2 text-warning border-bottom border-warning ascActive">Prix croissant</Link>
                        <Link onClick={orderByDesc} className="text-warning border-bottom border-warning descActive">Prix décroissant</Link>

                    </div>

                </div>
            </div>
            <div className="row pb-5 pt-4 container mx-auto g-0">
                <aside className='col-xl-4 col-10 ps-0 pe-xl-5 mx-auto aside'>

                    <form onSubmit={filter} className="shadow-sm  bg-white rounded-3 pb-4 mx-auto">
                        <div className="bg-warning w-100 rounded-top-3 px-3 py-2 mb-3 d-flex justify-content-between align-items-center">
                            <h4 className="mt-1 fw-semibold">Filtre </h4>
                            <h3><i class="bi bi-funnel"></i></h3>
                        </div>
                        <div className="form_search row px-3 w-100 mx-auto">
                        <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <select id="type" name='type' className="form-select" onChange={(e) => setType(e.target.value)}>
                                    <option selected disabled>Type</option>
                                    <option value='À VENDRE'>À VENDRE</option>
                                    <option value='À LOUER'>À LOUER</option>
                                </select>
                            </div>
                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <select class="form-select" id="ville" onChange={(e) => setCity(e.target.value)}>
                                    <option selected disabled>Ville</option>
                                    {cities.map(city => (
                                        <option value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <input type="text" onChange={(e) => setSector(e.target.value)} className="form-control" name='floor' id="floor" placeholder="Secteur" />
                            </div>

                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <select id="category" name='category' className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                    <option selected disabled>Categorie</option>
                                    {categories.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            

                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <input type="number" onChange={(e) => setLivingRoom(e.target.value)} className="form-control" name='liv_room' placeholder="Nombre de salon" id="liv_room" />
                            </div>
                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <input type="number" onChange={(e) => setBedroom(e.target.value)} className="form-control" name='bedroom' id="bedroom" placeholder="Nombre de chambre" />
                            </div>
                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <input type="number" onChange={(e) => setBathroom(e.target.value)} className="form-control" name='bathroom' id="bathroom" placeholder="Nombre de salle de bain" />
                            </div>
                            <div className="col-xl-12 col-lg-4 col-md-6 col-sm-12 col-12">
                                <input type="number" onChange={(e) => setFloor(e.target.value)} className="form-control" name='floor' id="floor" placeholder="Nombre d'etage" />
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-6 col-6">
                                <input type="number" onChange={(e) => setAreaMin(e.target.value)} className="form-control" name='area' id="area" placeholder="Surface min" />
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-6 col-6">
                                <input type="number" onChange={(e) => setAreaMax(e.target.value)} className="form-control" name='area' id="area" placeholder="Surface max" />
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-6 col-6">
                                <input type="number" onChange={(e) => setPriceMin(e.target.value)} className="form-control" name='price' placeholder="Prix min" id="price" />
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-6 col-6">
                                <input type="number" onChange={(e) => setPriceMax(e.target.value)} className="form-control" name='price' placeholder="Prix max" id="price" />
                            </div>
                        </div>
                        {/* <div className="row g-3 ps-xl-4 mx-auto">
                            <div className="form-check col-xl-6 col-lg-4 col-6  ">
                                <input className="form-check-input" type="checkbox" value="ascenseur" id="Ascenseur" />
                                <label className="form-check-label" for="Ascenseur">Ascenseur</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="balcon" id="Balcon" />
                                <label className="form-check-label" for="Balcon">Balcon</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="terrasse" id="Terrasse" />
                                <label className="form-check-label" for="Terrasse">Terasse</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="meuble" id="Meuble" />
                                <label className="form-check-label" for="Meuble">Meuble</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="securité" id="Securité" />
                                <label className="form-check-label" for="Securité">Securité</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="parking" id="Parking" />
                                <label className="form-check-label" for="Parking">Parking</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="chauffage" id="Chauffage" />
                                <label className="form-check-label" for="Chauffage">Chauffage</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="climatisation" id="Climatisation" />
                                <label className="form-check-label" for="Climatisation">Climatisation</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="consierge" id="Consierge" />
                                <label className="form-check-label" for="Consierge">Consierge</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="piscine" id="Piscine" />
                                <label className="form-check-label" for="Piscine">Piscine</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="balcon" id="Balcon" />
                                <label className="form-check-label" for="Balcon">Balcon</label>
                            </div>
                            <div className="form-check col-xl-6 col-lg-4 col-6 ">
                                <input className="form-check-input" type="checkbox" value="vidéo Surveillance" id="Vidéo Surveillance" />
                                <label className="form-check-label" for="Vidéo Surveillance">Vidéo Surveillance</label>
                            </div>
                        </div> */}
                        <div className="mt-4 px-3">
                            <button className="btn btn-warning col-12 fw-semibold" style={{ height: '50px' }}>Chercher</button>

                        </div>
                    </form>
                </aside>
                <div className='col-xl-8 col-10 mx-auto mt-xl-0 mt-lg-5 mt-5'>
                    <div class="col-12">
                        {data?.map(elt => <Cardd elt={elt} key={elt.id} />)}
                    </div>
                    {filtered && data.length > 5 && <PaginationFilter
                        setElements={setData}
                        elementName="properties"
                        url={"api/filter-properties-per-page/"}
                        allElementsUrl={"api/filter-properties"}
                        formData={formData} />}
                    {!filtered &&
                        <Paginationn
                            setElements={setData}
                            elementName="properties"
                            url={"api/properties/"}
                            allElementsUrl={"api/properties"}
                        />}
                </div>
            </div>
        </section>

    )
}

export default Search