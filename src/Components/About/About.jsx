import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
    return (
        <section className="my-5 pb-5 about">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-xl-6 col-md-8 col-sm-10 col-10 mx-xl-0 mx-auto mt-4">
                        <div className="position-relative w-75">
                            <div className="shadow">
                                <img src="/assets/images/ab-top.png" alt="about" className="img-fluid shadow" />
                            </div>
                            <div className="position-absolute w-50 img_abso shadow">
                                <img src="/assets/images/ab-top2.png" alt="about" className="img-fluid shadow" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-8 col-sm-10 col-10 mx-xl-0 mx-auto text-xl-start text-center mt-4">
                        <h2 className='fw-semibold'>Découvrez notre agence</h2>
                        <div className="my-3">  <p className="lh-lg"> IMMOPRO reçoit une clientèle variée, locale ou provenant d’autres départements, pour des projets aussi différents que l’achat en résidence principale, la location annuelle, la gestion immobilière d’un patrimoine immobilier, l’investissement immobilier (défiscalisé ou non) et la vente d’un bien immobilier. Située à&nbsp;<a href="http://www.frimmobilier.fr/immobilier/tout/immo-le-port-marly-78/" rel="noopener noreferrer" target="_blank">Port Marly</a>, notre agence immobilière développe ses activités immobilières dans les départements des Yvelines et des Hauts de Seine, notamment sur le secteur immobilier de l’ouest parisien.</p>  </div>
                        <div>
                            <h6 className='fw-semibold fontSize18'>Retrouvez-nous sur : </h6>
                            <Link to='/'><i class="bi bi-facebook text-warning fs-3 me-3"></i></Link>
                            <Link to='/'><i class="bi bi-instagram text-warning fs-3 me-3"></i></Link>
                            <Link to='/'><i class="bi bi-linkedin text-warning fs-3"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About