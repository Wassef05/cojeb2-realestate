import { Link } from "react-router-dom"
import './Auth.css'

const Auth = () => {
    return (
        <section className="row w-100 mx-auto">
            <div className="login-wrap col-xl-4 col-md-6 col-sm-8 col-10 mx-auto">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in col-6" checked /><label for="tab-1" className="tab" >Se connecter</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up col-6" /><label for="tab-2" className="tab" >s'inscrire</label>
                    <div className="login-form">
                        <div className="sign-in-htm mt-5">
                            <div className="group">
                                <label for="user" className="label">Email</label>
                                <input id="user" type="email" className="input" name="emil" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Mot de passe</label>
                                <input id="pass" type="password" name="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <input id="check" type="checkbox" className="check" checked />
                                <label for="check"><span className="icon"></span> Gardez-moi connecté</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Se connecter" />
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <a href="#forgot" className="text-warning">Mot de passe oublié ?</a>
                            </div>
                        </div>
                        <div className="sign-up-htm mt-2">
                            <div className="group">
                                <label for="user" className="label">Nom et Prénom</label>
                                <input id="user" type="text" name="name" className="input" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Email </label>
                                <input id="pass" type="email" name="email" className="input" />
                            </div>
                            <div className="row">
                                <div className="group col-6">
                                    <label for="pass" className="label">Téléphone </label>
                                    <input id="pass" type="tel" name="phone" className="input" />
                                </div>
                                <div className="group col-6">
                                    <label for="pass" className="label">Ville </label>
                                    <input id="pass" type="text" name="city" className="input" />
                                </div>
                            </div>
                            
                            <div className="group">
                                <label for="pass" className="label">Mot de passe</label>
                                <input id="pass" type="password" name='password' className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Confirmez mot de passe</label>
                                <input id="pass" type="password" name="confirmPassword" className="input" data-type="password" />
                            </div>
                            
                            <div className="group">
                                <input type="submit" className="button" value="S'inscrire" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Auth