const stateData = [
    { id: 1, name: "Rajasthan", cities: ["Jaipur", "Ajmer", "Jodhpur", "Bikaner", "Kota"] },
    { id: 2, name: "Uttar Pradesh", cities: ["Mathura", "Lucknow", "Sahranpur", "Kanpur", "Gorakhpur", "Tundla", "Agra", "Bundelkhand", "Hathras"] },
    { id: 3, name: "Gujarat", cities: ["Dholera", "Ahemdabad", "Valsad", "Surat", "Vadodra"] },
    { id: 4, name: "Punjab", cities: ["Chandigarh", "Ludhiana", "Bhatinda", "Amritsar", "Patiala"] },
]

const ELECTRICIAN_DATA = [
    {
        name: "Vipul Vaishnav",
        phone: "+91 2223334445",
        city: "Jodhpur",
        state: "Rajasthan",
        availability: true
    },
    {
        name: "Tushar Vaishnav",
        phone: "+91 2224833445",
        city: "Bhatinda",
        state: "Punjab",
        availability: true
    },
    {
        name: "Sweksha Sharma",
        phone: "+91 1457834516",
        city: "Ludhiana",
        state: "Punjab",
        availability: true
    },
    {
        name: "Rahul Kumar",
        phone: "+91 2223334445",
        city: "Agra",
        state: "Uttar Pradesh",
        availability: true
    },
    {
        name: "Bablu",
        phone: "+91 2223334445",
        city: "Sahranpur",
        state: "Uttar Pradesh",
        availability: false
    },
    {
        name: "Aman",
        phone: "+91 2223334445",
        city: "Sahranpur",
        state: "Uttar Pradesh",
        availability: true
    },
    {
        name: "Kajal R",
        phone: "+91 2223334445",
        city: "Sahranpur",
        state: "Uttar Pradesh",
        availability: false
    },
    {
        name: "Nannu",
        phone: "+91 2223334445",
        city: "Sahranpur",
        state: "Uttar Pradesh",
        availability: true
    },
    {
        name: "JP Vaishnav",
        phone: "+91 2223334445",
        city: "Jodhpur",
        state: "Rajasthan",
        availability: true
    },
    {
        name: "Kuldeep",
        phone: "+91 2223334445",
        city: "Jodhpur",
        state: "Rajasthan",
        availability: false
    },
    {
        name: "Sagun Dobhal",
        phone: "+91 2223334445",
        city: "Mathura",
        state: "Uttar Pradesh",
        availability: true
    },
    {
        name: "DON pandey",
        phone: "+91 197492841",
        city: "Mathura",
        state: "Uttar Pradesh",
        availability: true
    },
]


const listContainer = document.querySelector(".e-list")

ELECTRICIAN_DATA.forEach((item) => {
    const x = document.createElement("li")
    x.innerText = `${item.name} - ${item.city} - ${item.phone} - ${item.availability ? "AVAILABLE" : "NOT AVAILABLE"}`
    listContainer.appendChild(x)
})



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

const form = document.querySelector("#details-form")

const firstName = document.querySelector("#fname")
const lastName = document.querySelector("#lname")
const state = document.querySelector("#country")
const city = document.querySelector("#cities")
const issue = document.querySelector("#subject")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        state: state.value,
        city: city.value,
        issue: issue.value
    }

    listContainer.innerHTML = ""

    ELECTRICIAN_DATA.filter(item => item.city === formData.city).forEach((item) => {
        const x = document.createElement("li")
        x.innerText = `${item.name} - ${item.city} - ${item.phone} - ${item.availability ? "AVAILABLE" : "NOT AVAILABLE"}`
        listContainer.appendChild(x)
    })
})


