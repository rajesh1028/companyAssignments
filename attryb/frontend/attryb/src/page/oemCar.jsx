import React, { useState, useEffect } from "react";

const OemCar = () => {
    const [dataList, setDataList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState('');

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
            setDataList(data);
        } catch (error) {
            alert("please login to continue");
            console.log('Error fetching data:', error);
        }
    };

    const handlePriceFilterChange = (event) => {
        const filter = event.target.value;
        setPriceFilter(filter);
        filterData(searchQuery, filter);
    };

    const filterData = (query, priceFilter) => {
        let filtered = dataList;

        if (query) {
            filtered = filtered.filter((data) =>
                data.modelName.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (priceFilter) {
            switch (priceFilter) {
                case '10L-8L':
                    setDataList(filtered.filter((data) => data.price >= 800000 && data.price <= 1000000));
                    break;
                case '8L-5L':
                    setDataList(filtered.filter((data) => data.price >= 500000 && data.price <= 800000));
                    break;
                // Add more filters on price if required
                default:
                    break;
            }
        }

        // setDataList(filtered);
    };

    return (
        <div className="OemCar">
            <h2>OEM CAR PAGE</h2>
            <select value={priceFilter} onChange={handlePriceFilterChange}>
                <option value="">All Prices</option>
                <option value="10L-8L">10L-8L</option>
                <option value="8L-5L">8L-5L</option>
            </select>
            <div className="main-box">
                {dataList.map(data => (
                    <div className="data-box" key={data._id + data.modelName}>
                        <h4>Model Name: {data.model}</h4>
                        <p>Year Of Model: {data.year}</p>
                        <img src={"https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/9850/1681887437871/front-left-side-47.jpg?impolicy=resize&imwidth=420"} alt={data.model} />
                        <h5>Colors</h5>
                        <ol>{data.colors.map((ele) => {
                            return (
                                <li>{ele}</li>
                            )
                        })}</ol>
                        <p>Price: {data.price}L</p>
                        <p>Mileage: {data.mileage}</p>
                        <p>Power: {data.power}</p>
                        <p>Max Speed: {data.maxSpeed}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OemCar;