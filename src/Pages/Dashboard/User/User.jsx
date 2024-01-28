import axios from "axios";
import { useEffect, useState } from "react"
import Pagination from "../../../Components/Pagination/Pagination";
import { API_URL } from "../../../config/constants"
const User = () => {
    const [users, setUsers] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(API_URL + "api/list-users/1", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setUsers(result.users);
            })
    }, [])
    const deleteUser = (id) => {
        axios.delete(API_URL + 'api/delete-user/' + id, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(() => {
                setUsers(users.filter(f=>f.id !== id ))
            });
    }
    
    return (
        <section className="col-md-8 col-10 mx-md-0 mx-auto height_100 rounded-3 shadow-sm p-4  bg-white g-0 " >
            <h5 className="fw-semibold mb-4">Liste des utilisateurs</h5>
            <div class="table-responsive col-12  mx-auto  mytable rounded-3  mt-3">
                <table class="table bg-white table-hover  rounded-3  m-0">
                    <thead>
                        <tr>
                            <th scope="col" className='text-warning'>#</th>
                            <th scope="col" className='text-warning'>Photo</th>
                            <th scope="col" className='text-warning'>Nom et Prénom</th>
                            <th scope="col" className='text-warning'>Email</th>
                            <th scope="col" className='text-warning'>Addresse</th>
                            <th scope="col" className='text-warning'>Téléphone</th>
                            <th scope="col" className='text-warning'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {users.map(user => (
                            <tr>
                                <th scope="row" className="pt-3">{user.id}</th>
                                <td><img src={API_URL + user.picture} className="img-fluid rounded-circle" alt="categorie_picture" width='48px ' /></td>
                                <td className="pt-3">{user.name}</td>
                                <td className="pt-3">{user.email}</td>
                                <td className="pt-3">{user.address}</td>
                                <td className="pt-3">{user.phone}</td>
                                <td className="align-middle">
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                                </td>
                                
                            </tr>
                        ))}

                    </tbody>
                </table>
                <Pagination
                    setElements={setUsers}
                    elementName="users"
                    url={"api/list-users/"}
                    allElementsUrl={"api/list-users"}
                />
            </div>
        </section>
    )
}

export default User