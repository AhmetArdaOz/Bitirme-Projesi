import { useState, useEffect, useRef } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListedItem from "../listitem/ListedItem"
import "./listed.css"




export default function Listed() {

  const [isMoved, setIsMoved]= useState(false);
  const [slideNumber, setSlideNumber]= useState(0);



  const listRef = useRef()


  const handleClick = (direction) =>{
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x-50
    if(direction === "left" && slideNumber>0){
      setSlideNumber(slideNumber - 1)
      listRef.current.style.transform = `translateX(${230 + distance}px)`
    }
    if(direction === "right" && slideNumber <4){
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
  }

  return (
    <div className="list">
      <span className="listTitle">continue to watch</span>
      <div className="wrapper">
        <ArrowBackIos 
        className="sliderArrow left" 
        onClick={()=>handleClick("left")}
        style={{display: !isMoved && "none"}}
        />
        <div className="container" ref={listRef}>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
          <ListedItem/>
        </div>
        <ArrowForwardIosIcon className="sliderArrow right" onClick={()=>handleClick("right")}/>
      </div>
    </div>
  )
}
