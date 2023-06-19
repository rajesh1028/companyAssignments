import React, { useState, useEffect } from "react";

const description = [
    "Automatic Transmission",
    "Fuel diesel",
    "Test drive Available"
]

const AddCar = () => {
    const [userID, setUserid] = useState(localStorage.getItem("userId"));
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [kms, setKilometer] = useState("");
    const [scratches, setScartch] = useState("");
    const [paint, setColor] = useState("");
    const [accidents, setNoAcc] = useState("");
    const [previousBuyers, setBuyetCount] = useState("");
    const [registerPlace, setRegist] = useState("");
    const [error, setError] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleImageChange = (e) => {
        setImage(e.target.value)
    }

    const handleDistenceChange = (e) => {
        setKilometer(e.target.value)
    }

    const handleScartchsChange = (e) => {
        setScartch(e.target.value)
    }

    const handleColorChange = (e) => {
        setColor(e.target.value)
    }

    const handleAccChange = (e) => {
        setNoAcc(e.target.value)
    }

    const handleBuyChange = (e) => {
        setBuyetCount(e.target.value)
    }

    const handleRegistrationChange = (e) => {
        setRegist(e.target.value)
    }

    const dataSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (image && title && kms && scratches && paint && accidents && previousBuyers && registerPlace) {
            try {
                const res = await fetch(`https://oembackend.onrender.com/car/addCar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        userID,
                        image,
                        title,
                        description,
                        kms,
                        scratches,
                        paint,
                        accidents,
                        previousBuyers,
                        registerPlace
                    }),
                });

                if (res.ok) {
                    alert('Car data has been created successful');
                    setTitle("");
                    setImage("");
                    setKilometer("");
                    setScartch("");
                    setColor("");
                    setNoAcc("");
                    setBuyetCount("");
                    setRegist("");
                } else {
                    alert('Invalid credentials, Please Login')
                }
            } catch (error) {
                setError(error.message);
            }
        } else {
            window.alert('Please fill in all the details');
        }

    }

    return (
        <div className="AddCar">
            <h2>ADD CAR PAGE</h2>
            {error && <p>{error}</p>}
            <form onSubmit={dataSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Add Image Link:</label><br />
                    <input type="url" value={image} onChange={handleImageChange} />
                </div>
                <div>
                    <label>Kilometer Driven:</label><br />
                    <input type="text" value={kms} onChange={handleDistenceChange} />
                </div>
                <div>
                    <label>Scratches:</label><br />
                    <input type="text" value={scratches} onChange={handleScartchsChange} />
                </div>
                <div>
                    <label>Paint:</label><br />
                    <input type="text" value={paint} onChange={handleColorChange} />
                </div>
                <div>
                    <label>Number Of Accident:</label><br />
                    <input type="number" value={accidents} onChange={handleAccChange} />
                </div>
                <div>
                    <label>Number Of Previous Buyers:</label><br />
                    <input type="number" value={previousBuyers} onChange={handleBuyChange} />
                </div>
                <div>
                    <label>Registration Place:</label><br />
                    <input type="text" value={registerPlace} onChange={handleRegistrationChange} />
                </div>
                <button className="sub" type="submit">SUMBIT</button>
            </form>
        </div>
    )
}

export default AddCar;