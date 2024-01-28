import { Link} from "react-router-dom"
import './Footer.css'
const Footer = () => {
	return (
		<footer>
			<section className="container">
				<div className="row mt-5">
					<div className="col-md-6 col-lg-3 mb-4 mb-md-0 ">
						<Link to="/" ><img src="/assets/images/logo-light.png" alt="logo" width="200px" /></Link>
						<p className="mt-4">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
						<div>
							<h6 className='text-warning fw-semibold fontSize18'>Retrouvez-nous sur : </h6>
							<Link to='/'><i class="bi bi-facebook text-secondary fs-4 me-3"></i></Link>
							<Link to='/'><i class="bi bi-instagram text-secondary fs-4 me-3"></i></Link>
							<Link to='/'><i class="bi bi-linkedin text-secondary fs-4"></i></Link>
						</div>
					</div>
					<div className="col-md-6 col-lg-3 mb-4 mb-md-0">
						<h4 className="text-warning mb-4 fw-semibold">Nos Categories</h4>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Appartement</Link></p>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Maison</Link></p>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Villa</Link></p>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Commerciale</Link></p>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Bureau</Link></p>
					</div>
					<div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0">
						<h4 className="text-warning mb-4 fw-semibold">Liens directs</h4>
						<p><Link to='/' className="py-1 fontSize17 d-block text">Accueil</Link></p>
						<p><Link to='/annonces' className="py-1 fontSize17 d-block text">Annonces</Link></p>
						<p><Link to='/contact' className="py-1 fontSize17 d-block text">Contact</Link></p>
						<p><Link to='/dashboard' className="py-1 fontSize17 d-block text">Mon Compte</Link></p>
					</div>
					<div className="col-md-6 col-lg-3 mb-4 mb-md-0">
						<h4 className="text-warning fw-semibold">Vous avez des questions ?</h4>
						<div className="my-4">
							<address className="fontSize17 lh-lg"><i class="bi bi-geo-alt-fill text-secondary fontSize17 me-2"></i><span className="text">18 Hay Al Firdouss Avenue My Ali Chrif, Témara 20000</span></address>
							<p className="fontSize17"><i class="bi bi-telephone-fill text-secondary fontSize17 me-2"></i><span className="text">+212 625 856 345</span></p>
							<p className="fontSize17"><i class="bi bi-envelope-fill text-secondary fontSize17 me-2"></i><span className="text">immopro@gmail.com</span></p>
							
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-12 text-center">
						<p classNameName="mt-4">Copyright &copy; 2023 IMMOPRO. All rights reserved Designd By <Link to='https://adil-ui.github.io/Portfolio/' target='_blank'  className="text-warning">KingAdil</Link> </p>
					</div>
				</div>
			</section>
		</footer>
	)
}

export default Footer