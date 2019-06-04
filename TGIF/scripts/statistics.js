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
        name: "Democrats",
        number: countMembers(members, "D"),
        average: (getArray(members, "D")).toFixed(2)
    },
    republicans: {
        name: "Republicans",
        number: countMembers(members, "R"),
        average: (getArray(members, "R")).toFixed(2)
    },
    independents: {
        name: "Independents",
        number: countMembers(members, "I"),
        average: (getArray(members, "I")).toFixed(2)
    },

    totals: {
        name: "Total",
        number: 0,
        average: 0
    }
};

statistics.totals.number = statistics.democrats.number + statistics.republicans.number + statistics.independents.number;
statistics.totals.average = ((Number(statistics.democrats.average) + Number(statistics.independents.average) + Number(statistics.republicans.average)) / 3).toFixed(2);


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