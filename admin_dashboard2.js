let electricianArr = [];

const electriciansList = async () => {
    // console.log("upper")
    const response = await fetch("http://localhost:5000/api/electrician/list");
    const list = await response.json();

    electricianArr = list;
    console.log(electricianArr);

    document.getElementById("electrician_details").innerHTML = '';
    electricianArr.forEach((electrician, i) => displayElectrician(electrician, i))
}

const displayElectrician = (electrician, i) => {
    const electricianList = document.getElementById("electrician_details");
    pendingApplications();
    if (electrician.applicationStatus !== 'Applied') return;

    // console.log("hello", electricianList);
    electricianList.innerHTML += `
    <tr>
        <th scope="row">${i + 1}</th>
        <td>${electrician.name}</td>
        <td>${electrician.email}</td>
        <td>${electrician.mobile}</td>
        <td>${electrician.state}</td>
        <td>${electrician.city}</td>
        <td>${electrician.address}</td>
        <td scope="col"><button type="button" class="btn btn-success" onclick="updateStatusApprove(${i})">Approve</button></td>
        <td scope="col"><button type="button" class="btn btn-danger" onclick="updateStatusReject(${i})">Reject</button></td>
      </tr>
    `;


   
}

electriciansList();

const pendingApplications = () => {
    document.getElementById("pending_applications").innerHTML = '';
    electricianArr.forEach((electrician, i) => displayApplicationHistory(electrician, i));
}

const displayApplicationHistory = (electrician, i) => {
    // alert("Helo")
    if (electrician.applicationStatus === 'Applied') return;
    const private_issues_div = document.getElementById("pending_applications");
    private_issues_div.innerHTML += `
  <tr>
  <th scope="row">${i + 1}</th>
  <td>${electrician.name}</td>
  <td>${electrician.email}</td>
  <td>${electrician.mobile}</td>
  <td>${electrician.state}</td>
  <td>${electrician.city}</td>
  <td>${electrician.address}</td>
  <td>${electrician.applicationStatus}</td>
  </tr>
  `
}



const updateStatusAdmin = async (id, status) => {

    let electricianId = electricianArr[id]._id;
    await fetch(`http://localhost:5000/api/electrician/update`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ electricianId, status })
    }).then(data => {
        Swal.fire(`Request ${status}`, '', 'info')
    }).catch(err => {
        console.log(err);
    })
}


const updateStatusApprove = async (id) => {

    let electricianId = electricianArr[id]._id;
    await fetch(`http://localhost:5000/api/electrician/update`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ electricianId, status: "Approved" })
    }).then(data => {
        Swal.fire(`Request Approved`, '', 'info')
    }).catch(err => {
        console.log(err);
    })
}


const updateStatusReject = async (id) => {

    let electricianId = electricianArr[id]._id;
    await fetch(`http://localhost:5000/api/electrician/update`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ electricianId, status: "Rejected" })
    }).then(data => {
        Swal.fire(`Request Rejected`, '', 'info')
    }).catch(err => {
        console.log(err);
    })
}





document.getElementById("logout-btn").addEventListener('click', () => {
    if (localStorage.getItem("userData")) {
        localStorage.removeItem("userData");
        alert("Logged Out Successfully");
    }
    window.location.href = './login.html'
})

