window.onload = () => {
    redirectIfLoggedIn();
}

const redirectIfLoggedIn = async () => {
    if (localStorage.getItem("userData")) {
        alert("You are already logged in, please log out first");
        redirectUser();
    }
}

const onSignUp = async () => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    const user = { name, email, mobile, password };

    console.log(user);

    await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            console.log(response, response.json());
            alert("sign up successful");
            window.location.href="./login.html"
            // redirectUser();
        })
        .catch((err) => {
            console.error(err);
        });
}


const redirectUser = async () => {
    const userData = await JSON.parse(localStorage.getItem("userData"));
    if (userData.user.role == '1') {
        window.location.href = "./admin_dashboard.html"
    } else {
        window.location.href = './user_dashboard.html'
    }
}


const onLogin = async () => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    const user = { email, password };

    if(role==='electrician') {
        electricianSignIn(user);
        return;
    }

    await fetch(`http://localhost:5000/api/auth/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(async (response) => {
            const userData = await response.json();
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log(userData);
            alert("Login successful");
            redirectUser(userData);
        })
        .catch((err) => {
            console.error(err);
        });
}

const electricianSignIn = async (user) => {
    await fetch(`http://localhost:5000/api/auth/electrician_sign_in`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then(async (response) => {
            const userData = await response.json();
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log(userData);
            alert("Login successful");
            window.location.href = './electrician_dashboard.html';
        })
        .catch((err) => {
            console.error(err);
        });
    
}

const onIssueRegister = async () => {

    event.preventDefault();

    const fName = document.getElementById("fname").value;
    const lName = document.getElementById("lname").value;
    const stateId = document.getElementById("state").value;
    const state = stateData[stateId - 1].name;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const details = document.getElementById("details").value;

    const issue = {
        fName, lName, state, city, address, details
    }

    await fetch("http://localhost:5000/api/issue/create", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(issue)
    }).then((response) => {
        console.log(response.json());
        alert("Issue Registered Successfully");
    }).catch((err) => {
        console.log(err);
    })
}


const stateData = [
    { id: 1, name: "Rajasthan", cities: ["Jaipur", "Ajmer", "Jodhpur", "Bikaner", "Kota"] },
    { id: 2, name: "Uttar Pradesh", cities: ["Mathura", "Lucknow", "Sahranpur", "Kanpur", "Gorakhpur", "Tundla", "Agra", "Bundelkhand", "Hathras"] },
    { id: 3, name: "Gujarat", cities: ["Dholera", "Ahemdabad", "Valsad", "Surat", "Vadodra"] },
    { id: 4, name: "Punjab", cities: ["Chandigarh", "Ludhiana", "Bhatinda", "Amritsar", "Patiala"] },
]

let selectedState = 1

const classListContainer = document.querySelector(".stateList")
const cityListContainer = document.querySelector(".cityList")

const foo = stateData.map((item) => {
    const eachOption = document.createElement("option")
    eachOption.value = item.id
    eachOption.textContent = item.name
    return eachOption
})

foo.forEach((item) => {
    classListContainer.appendChild(item)
})

classListContainer.addEventListener("change", (e) => {
    const selectedCities = stateData.find(item => item.id === +e.target.value).cities
    const cities = selectedCities.map((item) => {
        const eachOption = document.createElement("option")
        eachOption.value = item
        eachOption.textContent = item
        return eachOption
    })

    cityListContainer.innerHTML = ""

    cities.forEach((item) => {
        cityListContainer.appendChild(item)
    })
})

const selectedCities = stateData.find(item => item.id === selectedState).cities
const cities = selectedCities.map((item) => {
    const eachOption = document.createElement("option")
    eachOption.value = item
    eachOption.textContent = item
    return eachOption
})

cityListContainer.innerHTML = ""

cities.forEach((item) => {
    cityListContainer.appendChild(item)
})



