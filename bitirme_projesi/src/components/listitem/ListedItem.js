import "./listedItem.css"

export default function ListedItem() {
  return (
    <div className="listItem">
      <img src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg">
      </img>
      <div className="itemInfoTop">
        <span>1hr 14 minutes</span>
        <span className="limit">+16</span>
        <span>1999</span>
        <div className="desc">Proident excepteur quis do occaecat est reprehenderit 
        consequat et in fugiat. Eiusmod nostrud eu magna cupidatat dolore quis nostrud. 
       </div>
       <div className="genre">Action</div>
      </div>
    </div>
  )
}
