var img_name = ['1', '2', '3'];
var chs_head = ['Effective', 'Professional', 'Diverse']
var chs_content = ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text "];

export default function () {
    return (
        <div className="chose">
            <h2>Why you should choose us</h2>
            <div className="chose_box">
                {img_name.map((dt, idx) =>
                    <div className="intro_box">
                        <div className={`box_img sec${dt}`} style={{ backgroundImage: `url('/img/security${dt}.png')`, backgroundPosition: "center", backgroundAttachment:"cover", backgroundRepeat:"no-repeat", backgroundSize: "cover"}}></div>
                        {/* <img src={`/img/security${dt}.png`} alt="com_intro" /> */}
                        <h3>{chs_head[idx]}</h3>
                        <p>{chs_content[idx]}</p>
                    </div>
                )}
            </div>
        </div >
    )
}