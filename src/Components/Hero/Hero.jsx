import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter'
import { API_URL } from '../../config/constants';

import './Hero.css'


const Hero = () => {
    const [listCategories, setListCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [categorie, setcategorie] = useState('');
    const [type, setType] = useState('');

    const [text] = useTypewriter({
        words: ['Appartement', 'Maison', 'Villa', 'Commerciale', 'Bureau'],
        loop: 0,
        typeSpeed: 120,
        deleteSpeed: 120,
        delaySpeed: 1500,
    })
    useEffect(() => {
        fetch(API_URL + "api/list-categories")
            .then(response => response.json())
            .then(result => {
                setListCategories(result.categories);
            })
    }, [])
    useEffect(() => {
        fetch(API_URL + 'api/list-cities')
            .then(response => response.json())
            .then(result => {
                setCities(result.cities);
            })
    }, [])
    return (

        <section className='hero_section'>
            <div className='hero-back'></div>
            <section className='hero col-11'>
                <div className='hero-desc text-center text-light '>
                    <h1 className='mb-4 fontSize60 fw-semibold'> Recherchez votre prochaine <span className='text-warning'>{text}</span>  </h1>
                    <h2 className='col-lg-6  col-12  lh-base mx-auto fw-semibold'>Trouvez les nouveaux biens et les biens vedettes situés dans votre pays.</h2>
                </div>
                <div class="row justify-content-center mt-md-5 mt-sm-0 ">
                    <div class="col-xl-10 col-lg-11 col-md-12 col-sm-8 col-10 bg-light p-4 rounded-2 shadow">
                        <div class="row ">
                            <div class="col-md-3 col-sm-12 mx-auto">
                                <div class="form-floating ">
                                    <select class="form-select" id="ville" onChange={(e) => setCity(e.target.value)} style={{ height: '60px' }}>
                                        <option selected>Ouvrez menu de sélection</option>
                                        {cities.map(city => (
                                            <option value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                    <label for="ville">Villes</label>

                                </div>
                            </div>

                            <div class=" col-md-3 col-sm-12 mx-auto">
                                <div class="form-floating">
                                    <select class="form-select" id="property" onChange={(e) => setcategorie(e.target.value)} style={{ height: '60px' }}>
                                        <option selected>Ouvrez menu de sélection</option>
                                        {listCategories.map(category => (
                                            <option value={category.name} >{category.name}</option>
                                        ))}
                                    </select>
                                    <label for="property">Categories</label>
                                </div>
                            </div>

                            <div class=" col-md-3 col-sm-12 mx-auto">
                                <div class="form-floating">
                                    <select class="form-select " id="price" onChange={(e) => setType(e.target.value)} style={{ height: '60px' }} >
                                        <option selected>Ouvrez menu de sélection</option>
                                        <option value='À VENDRE'>À VENDRE</option>
                                        <option value='À LOUER'>À LOUER</option>
                                    </select>
                                    <label for="price ">Types</label>
                                </div>
                            </div>

                            <div class="col-xl-1 col-lg-3 col-md-3 col-sm-10  mx-auto"  >
                                <div class="form-group none d-flex align-items-end">
                                    <Link to={`annonces/${city}?${categorie}?${type}`} class="btn btn-warning px-4 fs-4 mx-auto" style={{ height: '60px' }}><i class="bi bi-search  align-middle"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </section>


    )
}

export default Hero