import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../../../Components/Pagination/Pagination";
import { API_URL } from "../../../config/constants";
import number_formatPhp from 'number_format-php'



const MyProperties = () => {
    const [annonces, setAnnonces] = useState([]);
    const [search, setSearch] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [dataLenght, setDataLenght] = useState(0);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(API_URL + "api/my-properties/" + user.id + "/1", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setAnnonces(result.properties);
                setAnnonces(result.properties);
                setDataLenght(result.propertiesLenght)
                console.log(result.propertiesLenght)
            })
    }, [])
    const deleteProperty = (id) => {
        axios.delete(API_URL + 'api/delete-property/' + id, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(() => {
                setAnnonces(annonces.filter(f=>f.id !== id ))
            });
    }
    const submit = (e) => {
        e.preventDefault();

        axios.post(API_URL + "api/search/" + user.id + "/1", { search, searchValue }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setAnnonces(response.data.properties)
                setDataLenght(response.data.propertiesLenght)
            })

            .catch(error =>
                console.log(error)
            )
    }
    return (
        <section className="col-md-8 col-10 mx-md-0 mx-auto bg-white p-4 pb-0 rounded-2 shadow-sm height_100 position-relative" >
            <form onSubmit={submit}>
                <div class="input-group mx-auto">
                    <select class="form-select" onChange={(e) => {
                        setSearch(e.target.value)
                        setSearchValue("")
                        }}>
                         <option value="all" selected>Tout</option>
                         <option value="id">Id</option>
                        <option value="title">Titre</option>
                        <option value="city">Ville</option>
                        <option value="category">Catégorie</option>
                    </select>
                    <input type="text" class="form-control w-50" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button class="btn btn-outline-secondary" type="submit" >Chercher</button>
                </div>

            </form>

            <div class="table-responsive   mx-auto  mytable rounded-3  mt-4">
                <table class="table bg-white table-hover  rounded-3  m-0">
                    <thead>
                        <tr>
                            <th scope="col" className='text-warning'>#</th>
                            <th scope="col" className='text-warning'>Photo</th>
                            <th scope="col" className='text-warning'>Titre</th>
                            <th scope="col" className='text-warning'>Prix</th>
                            <th scope="col" className='text-warning'>Categorie</th>
                            <th scope="col" className='text-warning'>Type</th>
                            <th scope="col" className='text-warning'>Ville</th>
                            <th scope="col" className='text-warning'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {annonces.length > 0 ?
                            annonces.map(annonce => (

                                <tr>
                                    <th scope="row" className="align-middle">{annonce.id}</th>
                                    <td>
                                        <img src={API_URL + annonce.picture} className="img-fluid rounded-circle" alt="property_picture" width='50px' style={{ height: '50px' }} />
                                    </td>
                                    <td className="align-middle">{annonce.title}</td>
                                    <td className="align-middle">{annonce?.type ==='À LOUER' ? number_formatPhp(annonce?.price,2,","," ") + ' Dh /Mois' : number_formatPhp(annonce?.price,2,","," ")+'Dh'}</td>
                                    <td className="align-middle">{annonce.category.name}</td>
                                    <td className="align-middle">{annonce.type}</td>
                                    <td className="align-middle">{annonce.city?.name}</td>
                                    <td className="align-middle">
                                        <NavLink to={`/dashboard/modifier-mon-annonce/${annonce.id}`} className="btn btn-success me-1"><i class="bi bi-pencil-square"></i></NavLink>

                                        <button onClick={() => deleteProperty(annonce.id)} className="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                                    </td>
                                </tr>

                            ))
                            :
                            <tr>
                                <td colSpan='8' className="text-center py-5">Aucune résultat n'a été trouvé</td>
                            </tr>
                        }
                    </tbody>
                </table>
                {dataLenght > 5 &&
                    <Pagination
                        setElements={setAnnonces}
                        elementName="properties"
                        url={"api/my-properties/" + user.id + "/"}
                        allElementsUrl={"api/my-properties/" + user.id + "/"}
                    />
                }
            </div>
        </section >
    )
}

export default MyProperties