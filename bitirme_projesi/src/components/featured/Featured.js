import "./featured.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export default function Featured() {
  return (
    <div className="featured">
        <img src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p186109_b_v8_aa.jpg">
        </img>
        <div className="info">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Avatar_The_Last_Airbender_logo.svg/220px-Avatar_The_Last_Airbender_logo.svg.png">
            </img>
            <span className="desc">
                Cupidatat adipisicing laboris amet ex aliqua qui mollit pariatur dolore. Eu voluptate magna ullamco magna.
            </span>
            <div className="buttons">
                <button className="play">
                    <PlayArrowIcon></PlayArrowIcon>
                    <span>Play Trailer</span>
                </button>
                <button className="more">
                    <InfoOutlinedIcon></InfoOutlinedIcon>
                    <span>Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}
