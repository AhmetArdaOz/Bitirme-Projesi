import { useState } from "react";
import "./listedItem.css"
import AddIcon from '@mui/icons-material/Add';
export default function ListedItem({index}) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer = "https://www.youtube.com/embed/cen0rBKLuYE?si=p4V5tlZD9vJ3Kce4"
  return (
    <div className="listItem" 
    style={{left: isHovered && index * 225 - 50 + index * 2.5}}
    onMouseEnter={()=>setIsHovered(true)}
     onMouseLeave={()=>setIsHovered(false)}>
      <img src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg">
      </img>


      {isHovered && (
        <>
      <video src={trailer} autoPlay={true} loop></video>
      <div className="itemInfo">
        <div className="icons">
          <AddIcon></AddIcon>
        </div>
        <div className="itemInfoTop">
          <span>1hour 14 minutes</span>
          <span>1999</span>
        </div>
        <div className="desc">Ad sint veniam incididunt ut.
        Ad sint veniam incididunt ut.
        Ad sint veniam incididunt ut.
        Ad sint veniam incididunt ut.
        Ad sint veniam incididunt ut.
        Ad sint veniam incididunt ut.
        </div>
        <div className="genre">Action</div>
    
        </div></>
      )}
    </div>
  )
}
