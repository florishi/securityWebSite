import Button from '@mui/material/Button'

export default function () {
    return (
        <div className="services">
            <img src="/img/security_mark.png" alt="sec_mark" />
            <div className="servicecontent">
                <h3>Our Services</h3>
                <p>  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Button variant="outlined" className='st_btn'>Get Started</Button>
            </div>
        </div>
    )
}