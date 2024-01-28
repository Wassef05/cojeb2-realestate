import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Card from "../../../Components/Card/Card"
import { API_URL } from "../../../config/constants"


const LatestProtperties = () => {
    const [properties, setProperties] = useState([]);
    useEffect(() =>{
        fetch(API_URL + 'api/home-properties')
        .then(response =>response.json())
        .then(result=>{
            setProperties(result.properties);
        })
    },[])
    return (
        <section class="home-featured-property my-5 pb-5">
            <div class="container ">
                <h2 class="text-center fw-semibold">Les dernières propriétés</h2>
                <p class="text-center  fs-4 mt-3">Cherchez vos propriétés pour une vie heureuse.</p>
                <div class="mt-5">
                    <div class="product-item" style={{ position: 'relative' }}>
                        <div class="row">
                            {properties.map(elt => <Card elt={elt} key={elt.id} />)}
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <Link to='/annonces' className="btn btn-warning shadow py-3 px-4 fw-semibold fontSize18">Voir plus </Link>
                </div>
            </div>
        </section>
    )
}

export default LatestProtperties