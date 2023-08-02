let issuesArr = [];

const publicIssues = async () => {
  await fetch("http://localhost:5000/api/issue/public_issue").then(async (res) => {
    const response = await res.json();
    // console.log(response);
    issuesArr = response;
    document.getElementById("public_issue").innerHTML = '';
    issuesArr.forEach((issue,i) => {
      // console.log(issue)
      displayPublicIssue(issue,i);
      displayPrivateIssues(issue,i);
      issueHistory(issue,i);
    });
  }).catch(err => {
    console.log(err);
  })
}

const displayPublicIssue = (issue,i) => {
  if(issue.isPrivate) return;
  if(issue.status!=='Pending') return;
  const publicIssueDiv = document.getElementById("public_issue");
  publicIssueDiv.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="https://nwabuilders.files.wordpress.com/2015/03/da888-electricity.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${issue.details}</h5>
      <p class="card-text"></p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><b>Name:</b> ${issue.fName} ${issue.lName}</li>
      <li class="list-group-item"><b>State:</b> ${issue.state}<br>  <b>City:</b> ${issue.city}</li>
      <li class="list-group-item"><b>Complete Address:</b> ${issue.address}</li>
    </ul>
    <div class="card-body">
    <td scope="col"><button type="button" class="btn btn-primary" onclick="updateStatusAdmin(${i})">Update Status</button></td>
    </div>
  </div>
    `
}


// const displayPrivateIssue = (issue) => {
//   if(!issue.isPrivate) return;
//   const publicIssueDiv = document.getElementById("public_issue");
//   publicIssueDiv.innerHTML += `
//     <div class="card" style="width: 18rem;">
//     <img src="https://nwabuilders.files.wordpress.com/2015/03/da888-electricity.jpg" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${issue.details}</h5>
//       <p class="card-text"></p>
//     </div>
//     <ul class="list-group list-group-flush">
//       <li class="list-group-item"><b>Name:</b> ${issue.fName} ${issue.lName}</li>
//       <li class="list-group-item"><b>State:</b> ${issue.state}<br>  <b>City:</b> ${issue.city}</li>
//       <li class="list-group-item"><b>Complete Address:</b> ${issue.address}</li>
//     </ul>
//     <div class="card-body">
//     <input class="btn btn-primary" type="button" value="Update Status">
//     </div>
//   </div>
//     `
// }



let electricianArr = [];

const electriciansList = async () => {

  // console.log("upper")

  const response = await fetch("http://localhost:5000/api/electrician/list");
  const list = await response.json();

  electricianArr = [...list];
  console.log(electricianArr);

  document.getElementById("electrician_details").innerHTML = '';
  list.forEach((electrician, i) => displayElectrician(electrician, i))
}

const displayElectrician = (electrician, i) => {
  const electricianList = document.getElementById("electrician_details");
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
        <td scope="col"><button type="button" class="btn btn-success">Accept</button></td>
        <td scope="col"><button type="button" class="btn btn-danger">Reject</button></td>
      </tr>
    `;
}

electriciansList();

// let privateIssuesArr = [];

// const privateIssues = async () => {
//   // await fetch(`http://localhost:5000/api/issue/private_issue_admin/`).then(async (res) => {
//   //   const response = await res.json();
//   //   privateIssuesArr = response;
//   //   console.log(privateIssuesArr);
//   //   document.getElementById("private_issues").innerHTML = '';
//   //   response.forEach((issue, i) => displayPrivateIssues(issue, i));
//   // }).catch(err => {
//   //   console.log(err);
//   // })
//   issuesArr.forEach((issue,i)=>displayPrivateIssues(issue,i))
// }

const displayPrivateIssues = (issue, i) => {
  // if(!issue.isPrivate) return;
  console.log(issue);
  if(issue.status!=='Pending') return;
  const private_issues_div = document.getElementById("private_issues");
  private_issues_div.innerHTML += `
  <tr>
  <th scope="row">${i+1}</th>
  <td>${issue.fName}</td>
  <td>${issue.contactNo}</td>
  <td>${issue.title}</td>
  <td>${issue.details}</td>
  <td>${issue.address}</td>
  <td>${issue.status}</td>
  <td scope="col"><button type="button" class="btn btn-primary" onclick="updateStatusAdmin(${i})">Update Status</button></td>
  </tr>
  `
}

const issueHistory = () => {
  document.getElementById("issues_history").innerHTML = '';
  issuesArr.forEach((issue,i)=>displayIssuesHistory(issue,i));
}

const displayIssuesHistory = (issue, i) => {
  if(issue.status==='Pending') return;
  const private_issues_div = document.getElementById("issues_history");
  private_issues_div.innerHTML += `
  <tr>
  <th scope="row">${i + 1}</th>
  <td>${issue.fName}</td>
  <td>${issue.contactNo}</td>
  <td>${issue.title}</td>
  <td>${issue.details}</td>
  <td>${issue.address}</td>
  <td>${issue.status}</td>
  </tr>
  `
}



const updateStatusAdmin = (id) => {

  let issueId = issuesArr[id]._id;

  console.log(id, issueId);


  Swal.fire({
    title: 'Please select the action',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Assign to Electrician',
    denyButtonText: `Reject Request`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      assignElectrician(issueId);
    } else if (result.isDenied) {
      updateIssueStatus(issueId, "Rejected");
    }
  })
}


const assignElectrician = async (issueId) => {
  console.log("Assigning")


  const electriciansInput = {}

  for(let i=0; i<electricianArr.length; i++) {
    electriciansInput[i] = electricianArr[i].name;
  }

  console.log(electriciansInput);

  const { value: selectedElectrician} = await Swal.fire({
    title: 'Select Electrician',
    input: 'select',
    inputOptions: {
      'Electricians': electriciansInput
    },
    inputPlaceholder: 'Select Electrician',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
          resolve()
      })
    }
  })

  updateIssueStatus(issueId, "Assigned To Electrician", electricianArr[selectedElectrician]._id);
  
}

const updateIssueStatus = async (issueId, status, electricianId) => {
  await fetch("http://localhost:5000/api/issue/update_status", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ issueId, status, electricianId })
  }).then(data => {
    Swal.fire(`Request ${status}`, '', 'info')
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

publicIssues();
privateIssues();