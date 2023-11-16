import StarIcon from '@mui/icons-material/Star'
var block_name = ["small", "big", "small"];
var status = "none"
var block_img = [1, 2, 3]
var stars = [1, 2, 3, 4, 5]
export default function () {
    return (
        <div className="client">
            <h2>What clients say</h2>
            <div className="img_block">{
                block_img.map((dt, idx) =>
                    <div className={block_name[idx]}>
                        <img src={`/img/${dt}.png`} alt={`face${dt}`} />
                        <div className='stars'>{
                            stars.map(dt => <StarIcon style={{ color: 'yellow', width: "" }} />)}
                        </div>
                        <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                )
            }
            </div>
        </div>
    )
}