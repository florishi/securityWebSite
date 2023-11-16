import ContactInformation from "../body/contactcomponents/contactleft"

var pagenames = ['Home', 'Our services', 'About Us', 'Clients Say', 'Contact Us']

export default function () {
    return (
        <div className="footer">
            <div className="foottop" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "40px", marginTop:"173px"}}>
                <img src="/img/security_mark2.png" alt="securitymark" />
                <div className="pagenames">{pagenames.map((dt) =>
                    <h2>{dt}</h2>
                )}</div>
                <div style={{ width: "30%" }} className="contactinformation">
                    <ContactInformation />
                </div>
            </div>
            <div className="end">
                <div className="line"></div>
                <h2>All rights @ 2023</h2>
            </div>
        </div>
    )
}