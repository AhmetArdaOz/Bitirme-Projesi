import React from 'react'
import "../navbar/navbar.css"
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='container'>
            <div className='left'>
                <img src='https://upload.wikimedia.org/wikipedia/en/6/6c/Spider-Man_%282002_film%29_poster.jpg'></img>
                <span>Homepage</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New & Popular</span>
                <span>My List</span>
            </div>
            <div className='right'>
                <SearchIcon></SearchIcon>
                <span></span>
            </div>
        </div>
    </div>
  )
}

export default Navbar
