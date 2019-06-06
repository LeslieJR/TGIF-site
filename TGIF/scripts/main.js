var members = data.results[0].members;
//the table is already created in the HTML file also the thead and the tboy, that last with the id="senate-data"
var tbody = document.getElementById("data");

function fillUpTable(arrayMembers) {
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