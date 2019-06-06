var members = data.results[0].members;



function countMembers(arrayMembers, letter) {
    var numMemberParty = 0;
    for (var i = 0; i < arrayMembers.length; i++) {
        if (arrayMembers[i].party === letter) {
            numMemberParty++;
        }
    }
    return (numMemberParty);
}


function getArray(anArray, letter) {
    var newArray = [];
    for (var i = 0; i < anArray.length; i++) {
        if (members[i].party === letter) {
            newArray.push(members[i]);
        }
    }
    var numArray = 0;
    for (var j = 0; j < newArray.length; j++) {
        numArray += newArray[j].votes_with_party_pct;
    }
    var averageOfVotes = 0;

    if (newArray.length !== 0) {
        averageOfVotes = (numArray / newArray.length);

    } else {
        averageOfVotes = 0;
    }
    return (averageOfVotes);
}


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

statistics.democrats.number = countMembers(members, "D")
statistics.republicans.number = countMembers(members, "R")
statistics.independents.number = countMembers(members, "I")

statistics.democrats.average = getArray(members, "D")
statistics.republicans.average = getArray(members, "R")
statistics.independents.average = getArray(members, "I")



statistics.totals.number = statistics.democrats.number + statistics.republicans.number + statistics.independents.number;

//Is that calculation right?  


statistics.totals.average = ((statistics.democrats.average) + (statistics.republicans.average) + (statistics.independents.average)) / 3;



function showDataGlance(object, tbodyid) {
    let tbody = document.getElementById(tbodyid);
    for (var key in object) {
        var row = tbody.insertRow(-1);

        var cell1 = row.insertCell(0);
        var element1 = document.createElement("td");
        element1.innerHTML = (object[key].name);
        cell1.append(element1);

        var cell2 = row.insertCell(1);
        var element2 = document.createElement("td");
        element2.innerHTML = (object[key].number)
        cell2.append(element2);

        var cell3 = row.insertCell(2);
        var element3 = document.createElement("td");
        element3.innerHTML = (object[key].average).toFixed(2)
        cell3.append(element3);

    }
}

showDataGlance(statistics, "table-glance");


//function to create an array that also is sorted in descending order by a field/criteria, that after its top 10% is cut and also the bottom 10% (when the array is reverse) 

function createMemberArray(anArray, criteria) {

    anArray.sort(function (a, b) {
        return b[criteria] - a[criteria];
    })

    var topArray = anArray.slice(0, Math.round((anArray.length) * 0.1));

    for (var i = (Math.round((anArray.length) * 0.1)); i < anArray.length; i++) {
        if (topArray[(topArray.length) - 1][criteria] === anArray[i][criteria]) {
            topArray.push(anArray[i])

        } else {
            break;
        }
    }

    // if we need to cut the bottom of that array, we reverse the array and then use the slice method 
    var arrayReversed = anArray.reverse();
    var bottomArray = arrayReversed.slice(0, Math.round((anArray.length) * 0.1));

    for (var i = (Math.round((anArray.length) * 0.1)); i < anArray.length; i++) {
        if (bottomArray[(bottomArray.length) - 1][criteria] === anArray[i][criteria]) {
            bottomArray.push(anArray[i]);
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
    var tbody = document.getElementById(tbodyId);
    for (var i = 0; i < membersArray.length; i++) {
        var row = tbody.insertRow(-1);
        var cell1 = row.insertCell(0);
        var element1 = document.createElement("td");
        var firstName = membersArray[i].first_name;
        var middleName = membersArray[i].middle_name;
        var lastName = membersArray[i].last_name;
        var urlMember = membersArray[i].url;
        if (middleName == null) {
            var fullName = `<a href="${urlMember}" target="_blank">${firstName} ${lastName}</a>`;
        } else {
            var fullName = `<a href="${urlMember}" target="_blank">${firstName} ${lastName} ${middleName}</a>`;
        }
        element1.innerHTML = fullName;
        cell1.append(element1);

        var cell2 = row.insertCell(1);
        var element2 = document.createElement("td");
        element2.innerHTML = membersArray[i][criteria1];
        cell2.append(element2);

        var cell3 = row.insertCell(2);
        var element3 = document.createElement("td");
        element3.innerHTML = membersArray[i][criteria2];
        cell3.append(element3);

    }
}



createMemberArray(members, "missed_votes_pct");




createMemberArray(members, "votes_with_party_pct");
//createMemberArray(members, "missed_votes_pct")