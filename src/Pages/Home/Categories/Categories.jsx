import { useEffect, useState } from 'react';
import { API_URL } from "../../../config/constants";

import './Categories.css'

const Categories = () => {
	const [listCategories, setListCategories] = useState([]);
	useEffect(() => {
		fetch(API_URL + "api/list-categories")
			.then(response => response.json())
			.then(result => {
				setListCategories(result.categories);
			})
	}, [])
	return (
		<section className="home-category-section  mt-5 pb-5">
			<div className="container py-2">
				<div className="row justify-content-center">
					<h2 class="text-center mb-5 fw-semibold">Nos catégories</h2>
					{listCategories.map(category => (
						<div className="col-xl-2 col-md-4 col-sm-6 col-8 mb-3 ">
							<div className="card border-0 category-box ">
								<div className="card-body text-center">
									<img src={API_URL + category.picture} alt="category_image" className="img-fluid mb-3" />
									<h5 className="fw-semibold">{category.name}</h5>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Categories