
toggleButton();
var members;


fetchingSenateHouse();

function fetchingSenateHouse(){
let link;

if (window.location.pathname.includes('senate')){
    link = "https://api.propublica.org/congress/v1/113/house/members.json";
} else if(window.location.pathname.includes('house')){
    link= "https://api.propublica.org/congress/v1/113/senate/members.json";
}

fetch(link, 
{method:"GET",
headers:
{'X-API-Key':'wyfRhSLA71qOzm5StT9fMZ4nJE1GxARXIa4gKmSj'}
}).then(function(response) {
    if (response.ok){
      return response.json();
    }
    throw new Error(response.status);
  }).then(function (json){
     members=json.results[0].members;
     fillUpTable(members);
     createArrayStates(members);
     init();
     document.getElementById('loader').style.display="none";
     document.getElementById('pageContent').style.display="block";
    }).catch(function(error){
      console.log("Request failed:" + error.message);
      });
  
    }


function fillUpTable(arrayMembers) {
  let tbody = document.getElementById("data");
  tbody.innerHTML = '';
  if(arrayMembers.length !==0){
  for (let i = 0; i < arrayMembers.length; i++) {
    //creates a table row
    let tr = document.createElement("tr");

    let firstName = arrayMembers[i].first_name;
    let middleName = arrayMembers[i].middle_name;
    let lastName = arrayMembers[i].last_name;

    let politicParty = arrayMembers[i].party;
    let state = arrayMembers[i].state;
    let seniority = arrayMembers[i].seniority;
    let votesPercentage = arrayMembers[i].votes_with_party_pct;
    let urlMember = arrayMembers[i].url;

    //creates cells inside a row (tr.append(td))
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");


    if (middleName == null) {
      var fullName = `<a href="${urlMember}" target="_blank">${lastName} ${firstName}</a>`;
    } else {
      var fullName = `<a href="${urlMember}" target="_blank">${lastName} ${firstName} ${middleName}</a>`;
    }
    td1.innerHTML = fullName;


    td2.innerHTML = politicParty;
    td3.innerHTML = state;
    td4.innerHTML = seniority;
    td5.innerHTML = votesPercentage;
    tr.append(td1, td2, td3, td4, td5);

    tbody.append(tr);
  }
}
  else{
    let tBody = document.getElementById("data");
    tBody.innerHTML = '';
    //creates a table row
    let trow = document.createElement("tr");
    let tdata = document.createElement("td");
    tdata.colSpan = '5';
    tdata.innerHTML = 'No match found';
    tdata.style.textAlign = "center";
    trow.append(tdata);
    tBody.append(trow);
  }
}

//we create a function called createArrayStates to print the options in the droplist (Select)
function createArrayStates(array) {
  let arrayState = []
  for (let i = 0; i < array.length; i++) {
    arrayState.push(array[i].state)
  }

  // after that we declare a new var in this case a set with the states (doing this we avoid repetitions) 
  let set = new Set(arrayState);
  let arrayOnlyStates = Array.from(set);

  //and then we sort that array alphabetically.
  arrayOnlyStates.sort()

  //we need to add the first option ('All' to display all the data):
  arrayOnlyStates.unshift('All');

  //we create a variable called droplist and it is going to be the selected element by id
  let droplist = document.getElementById('sel1');

  // here we use the .forEach to add new Options to the Select that has the state's name and also a value with the name of the state
  arrayOnlyStates.forEach(function (element, key) {
    droplist[key] = new Option(element, element);
  });
}


function init() {
  //here we add the eventListener to the checkboxes, so when it is clicked, a function is called (in this case, the function is called "filterByParty")
  document.querySelector('#defaultInline1').addEventListener('click', function () {
    filterByParty(members)
  });
  document.querySelector('#defaultInline2').addEventListener('click', function () {
    filterByParty(members)
  });
  document.querySelector('#defaultInline3').addEventListener('click', function () {
    filterByParty(members)
  });
  //adding an eventlistener to the parent element (in this case the Select)
  document.querySelector('#sel1').addEventListener('change', function () {
    filterByParty(members)
  })
}


//here we create the function filterByParty 
function filterByParty(members) {
  let inputs = document.getElementsByTagName("input");
  let arrChecked = [];
  let partyArrayChecked = [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox" && inputs[i].checked) {
      arrChecked.push(inputs[i].defaultValue)
    }
  }
  if (arrChecked.length !== 0) {
    for (let k = 0; k < members.length; k++) {
      for (let j = 0; j < arrChecked.length; j++) {
        if (members[k].party === arrChecked[j]) {
          console.log(arrChecked[j])
          partyArrayChecked.push(members[k]);
        }
      }
    }
    filterByState(partyArrayChecked);
  } else {
    filterByState(members);
  }
}

//here we create the function filterByState
function filterByState(members) {
  let droplist = document.getElementById('sel1');
  if (droplist.value === 'All' && members.length !==0) {
    fillUpTable(members);
  } else {
    let stateChecked = [];
    for (let k = 0; k < members.length; k++) {
      
      if (members[k].state === droplist.value) {
        stateChecked.push(members[k]);
      }
    }
      fillUpTable(stateChecked);
  }
}


function toggleButton(){
  const button = document.querySelector('.toggle-button');
  const hiddenItems = document.querySelectorAll('.text-hidden');
  let isHidden = true;
  button.addEventListener('click', function () {
      button.textContent = isHidden
          ? 'Show Less'
          : 'Show more';

      isHidden = !isHidden;
      hiddenItems.forEach(item => item.classList.toggle('hidden'));
  });
}