import React, { useState, useEffect } from "react";

const OemCar = () => {
    const [datas, setDatas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://oembackend.onrender.com/oem/allOem', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem("token")
                }
            });
            const data = await response.json();
            console.log(data);
            setDatas(data);
        } catch (error) {
            alert("please login to continue");
            console.log('Error fetching data:', error);
        }
    };

    const handlePriceFilterChange = (event) => {
        const filter = event.target.value;
        filterData(searchQuery, filter);
    };

    const filterData = (query, priceFilter) => {
        let filtered = datas;

        if (query) {
            filtered = filtered.filter((data) =>
                data.modelName.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (priceFilter == "12L-8L") {
            setDatas(filtered.filter((data) => data.price >= 800000 && data.price <= 1200000));
        } else if (priceFilter == "8L-5L") {
            setDatas(filtered.filter((data) => data.price >= 500000 && data.price <= 800000));
        }

    };

    return (
        <div className="OemCar">
            <h2>OEM CAR PAGE</h2>
            <select className="filter" onChange={handlePriceFilterChange}>
                <option value="">All Prices</option>
                <option value="12L-8L">12L-8L</option>
                <option value="8L-5L">8L-5L</option>
            </select>
            <div className="main">
                {datas.map(data => (
                    <div className="container" key={data._id + data.modelName}>
                        <h4>Model: {data.model}</h4>
                        <h5>Year Of Model: {data.year}</h5>
                        <img src={"https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?impolicy=resize&imwidth=420"} alt={data.model} />
                        <h5>Colors</h5>
                        <div>{data.colors.map((ele) => {
                            return (
                                <button style={{ marginRight: '10px', background: 'whitesmoke' }}>{ele}</button>
                            )
                        })}</div>
                        <h5>Max Speed: {data.maxSpeed}</h5>
                        <h5>Mileage: {data.mileage}</h5>
                        <h5>Power: {data.power}</h5>
                        <h5>Price: {data.price}L</h5>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OemCar;