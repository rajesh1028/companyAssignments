import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import OemCar from "../page/oemCar";
import AddCar from "../page/addCar";
import SecondHandCar from "../page/secHandCar";
import Signup from "../page/signup";
import Login from "../page/login";


const Main = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/sechandcar" element={<SecondHandCar />} />
            <Route path="/" element={<OemCar />} />
        </Routes>
    )
}

export default Main;