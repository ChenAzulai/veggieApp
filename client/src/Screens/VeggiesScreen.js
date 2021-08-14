import React from "react";
import {Link} from "react-router-dom";
import TopBar from "../component/TopBar"

const VeggieScreen = ({url, veggies, userName}) => {
    return (
        <div style={{paddingBottom: "60px"}}>
            <h1>Veggies list</h1>
            <TopBar userName={userName}/>
            <div className="veg-list">
                <ul className="ul-veg">
                    {veggies.map(
                        (value,idx) =>
                            <Link key={value} to={url + "/vegDetails/" + value} className="veg-link">
                                <li key={idx} className="li-veg" >{value}</li>
                            </Link>
                    )}
                </ul>
            </div>
        </div>
    )
};
export default VeggieScreen;