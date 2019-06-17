var members;
const statistics = {
    democrats: {
        name: "Democrats",
        number: 0,
        average: 0
    },
    republicans: {
        name: "Republicans",
        number: 0,
        average: 0
    },
    independents: {
        name: "Independents",
        number: 0,
        average: 0
    },

    totals: {
        name: "Total",
        number: 0,
        average: 0
    }
};

fetchingSenateHouse();

function fetchingSenateHouse(){
let link;
let houseLink="https://api.propublica.org/congress/v1/113/house/members.json"
let senateLink="https://api.propublica.org/congress/v1/113/senate/members.json"

if (window.location.pathname.includes('senate')){
    link = senateLink;
} else if(window.location.pathname.includes('house')){
    link= houseLink;
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
     populateObject(members);
     showDataGlance(statistics, "table-glance");
     createMemberArray(members, "missed_votes_pct");
     createMemberArray(members, "votes_with_party_pct");
     document.getElementById('loader').style.display="none";
     document.getElementById('pageContent').style.display="block";

    }).catch(function(error){
      console.log("Request failed:" + error.message);
      });
    }

    

//here we create an object called statistics, and the sections number and average are equal to 0


    function countMembers(arrayMembers, letter) {
        let numMemberParty = 0;
        for (let i = 0; i < arrayMembers.length; i++) {
            if (arrayMembers[i].party === letter) {
                numMemberParty++;
            }
        }
        return (numMemberParty);
    }
    //function called getArray, first we create an empty array that is going to be filled with the members of a party ('R','D','I') and also we create a variable numArray that collects the sum of the votes-with-party of the array previously filled
    
    function getArray(anArray, letter) {
        let newArray = [];
        for (let i = 0; i < anArray.length; i++) {
            if (members[i].party === letter) {
                newArray.push(members[i]);
            }
        }
        let numArray = 0;
        for (let j = 0; j < newArray.length; j++) {
            numArray += newArray[j].votes_with_party_pct;
        }
        let averageOfVotes = 0;
    //if the array that contains the members of party is filled (meaning that there are at least one member) we calculate the average of votes.
        if (newArray.length !== 0) {
            averageOfVotes = (numArray / newArray.length);
    
        } else {
            averageOfVotes = 0;
        }
        return (averageOfVotes);
    }


function populateObject(members){
//we then update the sections by calling the functions needed.

statistics.democrats.number = countMembers(members, "D")
statistics.republicans.number = countMembers(members, "R")
statistics.independents.number = countMembers(members, "I")

statistics.democrats.average = getArray(members, "D")
statistics.republicans.average = getArray(members, "R")
statistics.independents.average = getArray(members, "I")


statistics.totals.number = statistics.democrats.number + statistics.republicans.number + statistics.independents.number;


let totalPercent = 0;
for (let i = 0; i < members.length; i++) {
    totalPercent += members[i].votes_with_party_pct;
}
statistics.totals.average = totalPercent / members.length;

}



function showDataGlance(object, tbodyid) {
    let tbody = document.getElementById(tbodyid);
    for (let key in object) {
        let row = tbody.insertRow(-1);

        let cell1 = row.insertCell(0);
        let element1 = document.createElement("td");
        element1.innerHTML = (object[key].name);
        cell1.append(element1);

        let cell2 = row.insertCell(1);
        let element2 = document.createElement("td");
        element2.innerHTML = (object[key].number)
        cell2.append(element2);

        let cell3 = row.insertCell(2);
        let element3 = document.createElement("td");
        element3.innerHTML = (object[key].average).toFixed(2)
        cell3.append(element3);

    }
}



//function to create an array that also is sorted in descending order by a field/criteria, that after its top 10% is cut and also the bottom 10% (when the array is reverse) 

function createMemberArray(anArray, criteria) {

    anArray.sort(function (a, b) {
        return b[criteria] - a[criteria];
    })

    let topArray = anArray.slice(0, Math.round((anArray.length) * 0.1));

    for (let i = (Math.round((anArray.length) * 0.1)); i < anArray.length; i++) {
        if (topArray[(topArray.length) - 1][criteria] === anArray[i][criteria]) {
            topArray.push(anArray[i])

        } else {
            break;
        }
    }

    // if we need to cut the bottom of that array, we reverse the array and then use the slice method 
    let arrayReversed = anArray.reverse();
    let bottomArray = arrayReversed.slice(0, Math.round((anArray.length) * 0.1));

    for (let j = (Math.round((anArray.length) * 0.1)); j < anArray.length; j++) {
        if (bottomArray[(bottomArray.length) - 1][criteria] === anArray[j][criteria]) {
            bottomArray.push(anArray[j]);
        } else {
            break;
        }
    }


    if (window.location.pathname.includes("attendance") && criteria === "missed_votes_pct") {
        printTables(topArray, "least-engaged", "missed_votes", criteria)
        printTables(bottomArray, "most-engaged", "missed_votes", criteria);
    } else if (window.location.pathname.includes("party-loyalty") && criteria === "votes_with_party_pct") {
        printTables(topArray, "most-loyal", "total_votes", criteria);
        printTables(bottomArray, "least-loyal", "total_votes", criteria);
    }

}

// To fill the tables we create a function with a for loop
function printTables(membersArray, tbodyId, criteria1, criteria2) {
    let tbody = document.getElementById(tbodyId);
    for (let i = 0; i < membersArray.length; i++) {
        let row = tbody.insertRow(-1);
        let cell1 = row.insertCell(0);
        let element1 = document.createElement("td");
        let firstName = membersArray[i].first_name;
        let middleName = membersArray[i].middle_name;
        let lastName = membersArray[i].last_name;
        let urlMember = membersArray[i].url;
        if (middleName == null) {
            var fullName = `<a href="${urlMember}" target="_blank">${firstName} ${lastName}</a>`;
        } else {
            var fullName = `<a href="${urlMember}" target="_blank">${firstName} ${lastName} ${middleName}</a>`;
        }
        element1.innerHTML = fullName;
        cell1.append(element1);

        let cell2 = row.insertCell(1);
        let element2 = document.createElement("td");
        element2.innerHTML = membersArray[i][criteria1];
        cell2.append(element2);

        let cell3 = row.insertCell(2);
        let element3 = document.createElement("td");
        element3.innerHTML = membersArray[i][criteria2];
        cell3.append(element3);

    }
}

