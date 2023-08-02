

window.onload = () => {
    if (!localStorage.getItem("userData")) {
        alert("Please login first");
        window.location.href = './login.html'
    }
    issues();
}


 

// const electriciansList = async () => {


//     // console.log("upper")

//     const response = await fetch("http://localhost:5000/api/electrician/list");
//     const list = await response.json();

//     console.log(list);

//     document.getElementById("electrician_details").innerHTML = '';
//     list.forEach(electrician => displayElectrician(electrician))
// }

// const displayElectrician = (electrician) => {
//     const electricianList = document.getElementById("electrician_details");
//     console.log("hello", electricianList);
//     electricianList.innerHTML += `
//     <tr>
//         <th scope="row">1</th>
//         <td>${electrician.name}</td>
//         <td>${electrician.email}</td>
//         <td>${electrician.mobile}</td>
//         <td>${electrician.state}</td>
//         <td>${electrician.city}</td>
//         <td>${electrician.address}</td>
//       </tr>
//     `;
// }

// // electriciansList();

// document.getElementById("logout-btn").addEventListener('click', () => {
//     if (localStorage.getItem("userData")) {
//         localStorage.removeItem("userData");
//         alert("Logged Out Successfully");
//     }
//     window.location.href = './login.html'
// })

// document.getElementById("private-issue-submit").addEventListener('click', async () => {
//     const userData = await JSON.parse(localStorage.getItem("userData"));

//     event.preventDefault();

//     const title = document.getElementById("title").value;
//     const address = document.getElementById("address").value;
//     const details = document.getElementById("details").value;

//     const issue = {
//         fName: userData.user.name, title, address, details, contactNo: userData.user.mobile, user: userData.user._id, isPrivate: true
//     }

//     await fetch("http://localhost:5000/api/issue/create", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(issue)
//     }).then((response) => {
//         console.log(response.json());
//         alert("Issue Registered Successfully");
//         window.location.href='./user_dashboard.html';
//     }).catch((err) => {
//         console.log(err);
//     })

// })

let assignedIssuesArr = [];

const issues = async () => {

    const userJSON = localStorage.getItem("userData");
    const user = await JSON.parse(userJSON);
    const userId = user.user._id;
    document.getElementById("my-dashboard").innerHTML = `Welcome ${user.user.name}!!`

    await fetch(`http://localhost:5000/api/issue/assigned_issues/${userId}`).then(async (res) => {
        const response = await res.json();
        // console.log(response);
        assignedIssuesArr = response;
        console.log(assignedIssuesArr);
        console.log(response);
        displayAllAssignedIssues();
        displayAllResolvedIssues();
    }).catch(err => {
        // alert("Server error");
        console.log(err);
    })
}

const displayAllAssignedIssues = () => {
    document.getElementById("assigned_issues_table").innerHTML = '';
    // if(!assignedIssuesArr) return;
    assignedIssuesArr.forEach((issue, i) => displayAssignedIssues(issue, i));
}

const displayAssignedIssues = (issue, i) => {

    if(issue.status==='Resolved' || issue.status==='Rejected') return;

    const electricianList = document.getElementById("assigned_issues_table");
    // console.log("hello", electricianList);
    electricianList.innerHTML += `
    <tr>
        <th scope="row">1</th>
        <td>${issue.title}</td>
        <td>${issue.details}</td>
        <td>${issue.address}</td>
        <td>${issue.fName}</td>
        <td>${issue.contactNo}</td>
        <td>${issue.status}</td>
        <td scope="col"><button type="button" class="btn btn-success" onclick="updateIssueStatus(${i})">Mark as Resolved</button></td>
      </tr>
    `;
}

const updateIssueStatus = async (index) => {

    const userJSON = localStorage.getItem("userData");
    const user = await JSON.parse(userJSON);
    const userId = user.user._id;

    const issueId = assignedIssuesArr[index]._id;

    console.log(issueId);
    await fetch("http://localhost:5000/api/issue/update_status", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ issueId, status: "Resolved", electricianId: userId })
    }).then(data => {
        Swal.fire(`Request Resolved`, '', 'info');
        // assignedIssuesArr.splice(id, 1);
        // displayAllAssignedIssues();
    }).catch(err => {
        console.log(err);
    })
}


const displayAllResolvedIssues = () => {
    document.getElementById("resolved_issues_table").innerHTML = '';
    // if(!assignedIssuesArr) return;
    assignedIssuesArr.forEach((issue, i) => displayResolvedIssues(issue, i));
}

const displayResolvedIssues = (issue, i) => {

    // alert("hello")

    if(!(issue.status==='Resolved' || issue.status==='Rejected')) return;

    const electricianList = document.getElementById("resolved_issues_table");
    // console.log("hello", electricianList);
    electricianList.innerHTML += `
    <tr>
        <th scope="row">1</th>
        <td>${issue.title}</td>
        <td>${issue.details}</td>
        <td>${issue.address}</td>
        <td>${issue.fName}</td>
        <td>${issue.contactNo}</td>
        <td>${issue.status}</td>
    </tr>
    `;
}




document.getElementById("logout-btn").addEventListener('click', () => {
    if (localStorage.getItem("userData")) {
        localStorage.removeItem("userData");
        alert("Logged Out Successfully");
    }
    window.location.href = './login.html'
})

