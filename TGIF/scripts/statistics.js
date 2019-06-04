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
    var averageOfVotes = (numArray / newArray.length);

    return (averageOfVotes);
}





const statistics = {
    democrats: {
        name: "democrats",
        number: countMembers(members, "D"),
        average: getArray(members, "D")
    },
    republicans: {
        name: "republicans",
        number: countMembers(members, "R"),
        average: getArray(members, "R")
    },
    independents: {
        name: "independents",
        number: countMembers(members, "I"),
        average: getArray(members, "I")
    },
    totals: {
        name: "total",
        number: (countMembers(members, "D") + (countMembers(members, "R") + (countMembers(members, "I")))),
        average: (getArray(members, "D") + getArray(members, "R") + getArray(members, "I")) / 3
    }
};


console.log(statistics.totals.average);







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
        element3.innerHTML = (object[key].average)
        cell3.append(element3);

    }
}

showDataGlance(statistics, "table-glance");