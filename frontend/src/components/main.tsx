import Intro from "./body/Intro"
import Services from './body/services'
import Choose from './body/chose'
import AboutUs from './body/about'
import Clients from './body/clients'
import Contact from "./body/contact"
import Footer from "./Layout/footer"

export default function () {
    return (
        <div className="body">
            <Intro />
            <Services />
            <Choose />
            <AboutUs />
            <Clients />
            <Contact />
            <Footer />
        </div>
    )
}