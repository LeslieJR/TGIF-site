var members = data.results[0].members;
//the table is already created in the HTML file also the thead and the tboy, that last with the id="senate-data"


function fillUpTable(arrayMembers) {
  var tbody = document.getElementById("data");
  tbody.innerHTML = '';
  for (var i = 0; i < arrayMembers.length; i++) {
    //creates a table row
    var tr = document.createElement("tr");

    var firstName = arrayMembers[i].first_name;
    var middleName = arrayMembers[i].middle_name;
    var lastName = arrayMembers[i].last_name;

    var politicParty = arrayMembers[i].party;
    var state = arrayMembers[i].state;
    var seniority = arrayMembers[i].seniority;
    var votesPercentage = arrayMembers[i].votes_with_party_pct;
    var urlMember = arrayMembers[i].url;

    //creates cells inside a row (tr.append(td))
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");


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

fillUpTable(members);


//here we add the eventListener to the checkboxes, so when it is clicked, a function is called (in this case, the function is called "createArrayParty")
document.querySelector('#defaultInline1').addEventListener('click', function () {
  createArrayParty(members)
});
document.querySelector('#defaultInline2').addEventListener('click', function () {
  createArrayParty(members)
});
document.querySelector('#defaultInline3').addEventListener('click', function () {
  createArrayParty(members)
});


//here we create the function createArrayParty that first get the values of the checkboxes that are checked and then put them into an empty array. Then if the array created has a lenght different to 0 it goes to a different loop to compare the values of the array and the value of the members party.
function createArrayParty(members) {
  var inputs = document.getElementsByTagName("input");

  var arrChecked = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox" && inputs[i].checked) {
      arrChecked.push(inputs[i].defaultValue)
    }
  }
  if (arrChecked.length !== 0) {
    for (var k = 0; k < members.length; k++) {
      for (var j = 0; j < arrChecked.length; j++) {
        if (members[k].party === arrChecked[j]) {
          partyArrayChecked.push(members[k]);
        }
      }
    }
    fillUpTable(partyArrayChecked);
  } else {
    fillUpTable(members);
  }
}


function arrayStates(array) {
  var arrayState = []
  for (var i = 0; i < array.length; i++) {
    arrayState.push(array[i].state)
  }

  var set = new Set(arrayState);
  var arrayOnlyStates = Array.from(set);
  arrayOnlyStates.sort()

  console.log(arrayOnlyStates);

  var droplist = document.getElementById('sel1');

  for (state in arrayOnlyStates) {
    droplist.add(new Option(arrayOnlyStates[state]));
  };
}
arrayStates(members)
// function filterBystate(anArray, state) {
//   var membersState = anArray.filter(
//     function (anArray) {
//       return anArray.state === state;
//     }
//   )
//   console.log(membersState);
// }