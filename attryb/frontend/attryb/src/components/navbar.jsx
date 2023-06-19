import React, { useState } from "react";
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import image4 from "../images/image4.jpeg";
import image5 from "../images/image5.png";

let obj = [
    { path: "/signup", title: "signup", image: image1 },
    { path: "/login", title: "login", image: image2 },
    { path: "/addCar", title: "Add Car", image: image3 },
    { path: "/sechandcar", title: "Second Hand Car", image: image4 },
    { path: "/", title: "OEM Car", image: image5 }
]

const styfun = ({ isActive }) => {
    return isActive ?
        { textDecoration: 'none', color: "lightgreen", border: "1px solid black", background: "whitesmoke", padding: "5px", borderRadius: "5px" }
        : { textDecoration: 'none', color: "violet" }
}

const Navbar = () => {
    return (
        <div className="nav">
            {obj.map((ele, i) => {
                return (
                    <NavLink style={styfun} to={ele.path} key={i + ele.path}><img className="logos" src={ele.image} />{ele.title}</NavLink>
                )
            })}
        </div>
    )
}

export default Navbar;