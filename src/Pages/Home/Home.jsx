import { useEffect } from 'react'
import About from '../../Components/About/About'
import Hero from '../../Components/Hero/Hero'
import Categories from './Categories/Categories'
import './Home.css'
import LatestProtperties from './LatestProperties/LatestProtperties'

const Home = () => {
	useEffect(() => {
        window.scroll(0, 0);
    }, [])
  return (
	  <section>
		<Hero />
		<Categories/>
		<LatestProtperties/>
		<About />
	  </section>
  )
}

export default Home