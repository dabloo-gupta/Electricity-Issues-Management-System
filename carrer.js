const registerElectrician = async () => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const stateId = document.getElementById("state").value;
    const state = stateData[stateId - 1].name;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const experience = document.getElementById("experience").value;

    const electrician = {
        name, email, password, mobile, state, city, address, experience
    }

    console.log(electrician);

    await fetch("http://localhost:5000/api/electrician/create", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(electrician)
    }).then((response) => {
        console.log(response.json());
        Swal.fire(`Application Registered Successfully`, '', 'Success')
    }).catch((err) => {
        console.log(err);
    })
}
