import Contactleft from "./contactcomponents/contactleft"
import Contactright from "./contactcomponents/contactright"

export default function () {
    return (
        <div className="contact">
            <div>
                <h1 style={{paddingLeft: '20px'}}>Contact Us</h1>
                <Contactleft />
            </div>
            <Contactright />
        </div>
    )
}