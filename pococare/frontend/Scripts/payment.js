let form = document.getElementById("form");
const url = "https://pocobackend.onrender.com"

let submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        name: form.name.value,
        email: form.email.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        zipcode: form.zipcode.value,
        name_on_card: form.name_on_card.value,
        card_number: form.card_number.value,
        expiry_month: form.expiry_month.value,
        expiry_year: form.expiry_year.value,
        cvv: form.cvv.value,
    }
    let flag = true;
    // for (let key in obj) {
    //     if (!obj[key]) {
    //         flag = false;
    //         break;
    //     }
    // }
    if (!flag) {
        alert("Fill all the details");
    } else {
        patchTimeSlot();
    }
})

async function patchTimeSlot() {
    let uniqueId = localStorage.getItem("profId");
    let slot = JSON.parse(localStorage.getItem("clicked-slot"));
    let obj = {
        uniqueId,
        date: +slot.date,
        slot: slot.time
    }
    console.log(obj);
    try {
        let result = await fetch(`${url}/doctor/updateSlot`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        console.log(result);
        if (result.ok) {
            await sendEmail();
            alert("Your appointment is successfully confirmed by sending you a mail");
            window.location.href = "feedbackForm.html";
        } else {
            alert("Error in payment");
        }
    } catch (error) {
        console.log(error);
    }
}

async function sendEmail() {
    const email = localStorage.getItem("email");
    console.log(email)
    try {
        let result = await fetch(`${url}/email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        console.log(result);
        alert(result);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}