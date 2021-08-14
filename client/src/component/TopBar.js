import {Link} from "react-router-dom";
import React from "react";

const TopBar = (props) => {
    return (
        <div className="topbar-container">
       <span className='topbar-all-veg'>
           <Link to={"/" + props.userName + "/veggies"} className="topbar-link">All fruits</Link>
               </span>
            <span className="topbar-fav">
                     <Link to={"/" + props.userName + "/veggies/fav"} className="topbar-link">Favorites</Link>
                 </span>
        </div>
    )
};
export default TopBar
