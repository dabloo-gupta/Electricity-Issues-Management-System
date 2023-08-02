window.onload = () => {
    if (!localStorage.getItem("userData")) {
        alert("Please login first");
        window.location.href = './login.html'
    }
}


const electriciansList = async () => {


    // console.log("upper")

    const response = await fetch("http://localhost:5000/api/electrician/list");
    const list = await response.json();

    console.log(list);

    document.getElementById("electrician_details").innerHTML = '';
    list.forEach(electrician => displayElectrician(electrician))
}

const displayElectrician = (electrician) => {
    const electricianList = document.getElementById("electrician_details");
    console.log("hello", electricianList);
    electricianList.innerHTML += `
    <tr>
        <th scope="row">1</th>
        <td>${electrician.name}</td>
        <td>${electrician.email}</td>
        <td>${electrician.mobile}</td>
        <td>${electrician.state}</td>
        <td>${electrician.city}</td>
        <td>${electrician.address}</td>
      </tr>
    `;
}

electriciansList();

document.getElementById("logout-btn").addEventListener('click', () => {
    if (localStorage.getItem("userData")) {
        localStorage.removeItem("userData");
        alert("Logged Out Successfully");
    }
    window.location.href = './login.html'
})

document.getElementById("private-issue-submit").addEventListener('click', async () => {
    const userData = await JSON.parse(localStorage.getItem("userData"));

    event.preventDefault();

    const title = document.getElementById("title").value;
    const address = document.getElementById("address").value;
    const details = document.getElementById("details").value;

    const issue = {
        fName: userData.user.name, title, address, details, contactNo: userData.user.mobile, user: userData.user._id, isPrivate: true
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
        window.location.href='./user_dashboard.html';
    }).catch((err) => {
        console.log(err);
    })

})

let privateIssuesArr = [];

const myIssues = async() => {

    const userData = await JSON.parse(localStorage.getItem("userData"));
    const userId = userData.user._id;

    console.log(userData);

    await fetch(`http://localhost:5000/api/issue/private_issue_user/${userId}`).then(async (res) => {
        const response = await res.json();
        console.log(response);
        privateIssuesArr = response;
        document.getElementById("private_issues").innerHTML = '';
        response.forEach((issue,i) => displayPrivateIssues(issue, i));
    }).catch(err =>{
        console.log(err);
    })
}

const displayPrivateIssues = (issue, i) => {
    const private_issues_div = document.getElementById("private_issues");
    private_issues_div.innerHTML += `
    <tr>
    <th scope="row">1</th>
    <td>${issue.title}</td>
    <td>${issue.details}</td>
    <td>${issue.address}</td>
    <td>${issue.status}</td>
    <td scope="col"><button type="button" class="btn btn-danger" onclick="deleteIssue(${i})">Cancel</button></td>
  </tr>
    ` 
}

const deleteIssue = async (id) => {
    
    const issueId = privateIssuesArr[id]._id;

    await fetch(`http://localhost:5000/api/issue/delete/${issueId}`, {
        method:"DELETE"
    }).then(data => {
        alert("Issue Deleted Successfully");
    }).catch(err => {
        alert("Server error");
    })
}

myIssues();