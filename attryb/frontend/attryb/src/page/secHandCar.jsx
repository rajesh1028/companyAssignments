import React, { useState, useEffect } from "react";

const SecondHandCar = () => {
    const [dataList, setDataList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [kms, setKms] = useState("");
    const [scratches, setScartches] = useState("");
    const [paint, setPaint] = useState("");
    const [accidents, setAccidents] = useState("");
    const [previousBuyers, setPrevBuyers] = useState("");
    const [registerPlace, setRegister] = useState("");
    const [editId, setEditId] = useState("");
    const [filterColor, setFilterColor] = useState('');

    useEffect(() => {
        fetchData();
    }, [isEditing, filterColor]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://oembackend.onrender.com/car/allCars', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setDataList(data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    //delete function
    const handleDelete = async (id, ele) => {
        try {
            let res = await fetch(`https://oembackend.onrender.com/car/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token")
                }
            });

            if (res.ok) {
                let data = await res.json()
                alert(data.msg)
                if (data.msg === "Data deleted successfully") {
                    let deletedData = [...dataList]
                    let finditem = deletedData.findIndex(i => i._id === id)
                    deletedData.splice(finditem, 1)
                    setDataList(deletedData);
                }
            }
        } catch (error) {
            alert(error);
            console.log('Error deleting data:', error);
        }
    };

    //edit function
    const handleEdit = async (id, ele) => {
        setIsEditing(true);
        setEditId(id)
        setTitle(ele.title);
        setImage(ele.image);
        setKms(ele.kms);
        setScartches(ele.scratches);
        setPaint(ele.paint);
        setAccidents(ele.accidents);
        setPrevBuyers(ele.previousBuyers);
        setRegister(ele.registerPlace);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let res = await fetch(`https://oembackend.onrender.com/car/update/${editId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({
                    image,
                    title,
                    kms,
                    scratches,
                    paint,
                    accidents,
                    previousBuyers,
                    registerPlace
                }),
            });

            if (res.ok) {
                let data = await res.json()
                alert(data.msg)
            }

        } catch (error) {
            console.log('Error deleting data:', error);
        }
        setIsEditing(false);
    };

    //filter function
    const handleColorFilterChange = (event) => {
        const selectedColor = event.target.value;
        setFilterColor(selectedColor);
    };

    return (
        <div className="SecHandCar">
            <h2>SECOND-HAND CAR PAGE</h2>
            <select className="filter" value={filterColor} onChange={handleColorFilterChange}>
                <option value="">All Colors</option>
                <option value="red">Red</option>
                <option value="blue">blue</option>
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>

            <div className="main">
                {dataList.filter((data) => !filterColor || data.color === filterColor)
                    .map(data => (
                        <div className="container" key={data._id + data.title}>
                            <h4>Brand: {data.title}</h4>
                            <img src={data.image} alt={data.title} />
                            <ul>{data.description.map((ele) => {
                                return (
                                    <li>{ele}</li>
                                )
                            })}</ul>
                            <p>Kilometres: {data.kms}Km</p>
                            <p>scartchs: {data.scratches}</p>
                            <p>color: {data.paint}</p>
                            <p>Number of Accidents: {data.accidents}</p>
                            <p>Number of Prvious Buyers: {data.previousBuyers}</p>
                            <p> registration Place: {data.registerPlace}</p>
                            <button className="edit" onClick={() => handleEdit(data._id, data)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(data._id, data)}>Delete</button>
                        </div>
                    ))}
            </div>
            {isEditing && (
                <div className="editBox" style={{ display: 'block' }}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label><br />
                            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                        </div>
                        <div>
                            <label>Add Image Link:</label><br />
                            <input type="url" value={image} onChange={(event) => setImage(event.target.value)} />
                        </div>
                        <div>
                            <label>Distence in KM:</label><br />
                            <input type="text" value={kms} onChange={(event) => setKms(event.target.value)} />
                        </div>
                        <div>
                            <label>scartchs:</label><br />
                            <input type="text" value={scratches} onChange={(event) => setScartches(event.target.value)} />
                        </div>
                        <div>
                            <label>Color:</label><br />
                            <input type="text" value={paint} onChange={(event) => setPaint(event.target.value)} />
                        </div>
                        <div>
                            <label>Number Of Accident:</label><br />
                            <input type="number" value={accidents} onChange={(event) => setAccidents(event.target.value)} />
                        </div>
                        <div>
                            <label>Number Of Previous Buyers:</label><br />
                            <input type="number" value={previousBuyers} onChange={(event) => setPrevBuyers(event.target.value)} />
                        </div>
                        <div>
                            <label>Registration Place:</label><br />
                            <input type="text" value={registerPlace} onChange={(event) => setRegister(event.target.value)} />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}

            {!isEditing && (
                <div style={{ display: 'none' }}>
                </div>
            )}
        </div>
    )
}

export default SecondHandCar;