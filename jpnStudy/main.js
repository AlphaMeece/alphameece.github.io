let sets = [
    
]

let question = "0|0"

let correct = 0;
let attempts = 0;
let total = 0;
let totals = [];
let unknown = [];
let unknownSpan = document.getElementById("unknown");
let practiced = [];
let practicedSpan = document.getElementById("practiced");
let known = [];
let knownSpan = document.getElementById("known");
let correctSpan = document.getElementById("correct");

function load() {
    populate();
    if(unknown.length > 0) nextQuestion();
}

function loadSavedSets() {

}

function createGroup() {

}

function populate() {
    unknown = [];
    practiced = [];
    known = [];
    totals = [];
    correct = 0;
    total = 0;
    attempts = 0;
    for(let set of sets) {
        for(let q of set.terms) {
            unknown.push(q);
            totals.push(q);
        }
    }
    document.getElementById("question").innerHTML = "Please select a set in the top left";
    document.getElementById("ans1").innerHTML = "";
    document.getElementById("ans2").innerHTML = "";
    document.getElementById("ans3").innerHTML = "";
    document.getElementById("ans0").innerHTML = "";
    document.getElementById("marks").innerHTML = "";
    document.getElementById("check").innerHTML = "";
    unknownSpan.innerHTML = `Unkown: ${unknown.length}`;
    practicedSpan.innerHTML = `Practiced: ${practiced.length}`;
    knownSpan.innerHTML = `Known: ${known.length}`;
    correctSpan.innerHTML = `${correct}/${total} (${total == 0 ? 0:(Math.floor(correct/total*1000)/10)}%)`
}

function changeSets(element, setChange, wholeSet = false) {
    if(!wholeSet) {
        let groupName = element.parentElement.parentElement.children[1].children[0].innerHTML;
        let linkedBox = element.parentElement.parentElement.children[0].children[0];
        if(checkSets(setChange, groupName) != -1) {
            sets.splice(checkSets(setChange, groupName), 1);
            element.classList.remove("toggled");
            if(linkedBox.checked) linkedBox.checked = false;
        } else {
            sets.push(baseSets[getSet(setChange, groupName)]);
            element.classList.add("toggled");
            let shouldToggle = true;
            for(let button of element.parentElement.children) {
                if(!button.classList.contains("toggled")) {
                    shouldToggle = false;
                    break;
                }
            }
            if(shouldToggle) linkedBox.checked = true;
        }
    } else {
        let groupName = element.parentElement.nextElementSibling.children[0].innerHTML;
        for(let button of setChange.children) {
            if((element.checked && checkSets(button.innerHTML, groupName) == -1) || (!element.checked && checkSets(button.innerHTML, groupName) != -1)) button.click();
        }
    }

    load();
    if(totals.length <= 3 && totals.length != 0) document.getElementById("ans3").style.display = "none"
    else if(document.getElementById("ans3").style.display == "none") document.getElementById("ans3").style.display = "inline"

    if(totals.length == 2) document.getElementById("ans2").style.display = "none"
    else if(document.getElementById("ans2").style.display == "none") document.getElementById("ans2").style.display = "inline"

    let tempSets = [];
    for(let set of sets) {
        if(tempSets.indexOf(set["set"]) == -1) tempSets.push(set["set"])
    }
    document.getElementById("title").innerHTML = tempSets.length == 1 ? tempSets[0]:(tempSets.length == 0 ? "No Selected Sets":"Multiple Sets")
}

function getSet(setName, groupName) {
    let index = -1;
    let count = 0;

    for(let set of baseSets) {
        if(set.title == setName && set["set"] == groupName) {
            index = count;
            break;
        }
        count++;
    }

    return index;
}

function checkSets(setName, groupName) {
    let index = -1;
    let count = 0;

    for(let set of sets) {
        if(set.title == setName && set["set"] == groupName) {
            index = count;
            break;
        }
        count++;
    }

    return index;
}

function answer(ans, button) {
    if(ans == "" || ans == undefined || button.style.backgroundColor == "red") return;
    let q = parseQuestion(question);
    let rightAnswer = false;
    if(ans.toLowerCase() == q[1].toLowerCase()) {
        let uIndex = unknown.indexOf(q);
        let pIndex = practiced.indexOf(q);
        if(uIndex != -1) {
            if(attempts == 0) {
                unknown.splice(uIndex, 1);
                practiced.push(q);
                unknownSpan.innerHTML = `Unkown: ${unknown.length}`;
                practicedSpan.innerHTML = `Practiced: ${practiced.length}`;
            }
            rightAnswer = true;
        } else if(pIndex != -1) {
            if(attempts == 0) {
                practiced.splice(pIndex, 1);
                known.push(q);
                practicedSpan.innerHTML = `Practiced: ${practiced.length}`;
                knownSpan.innerHTML = `Known: ${known.length}`;
            }
            rightAnswer = true;
        } else {
            rightAnswer = true;
        }
    } else {
        button.style.backgroundColor = "red";
        document.getElementById("marks").innerHTML += "&times;";
    }

    if(rightAnswer) {
        correct++;
        total++;
        document.getElementById("check").innerHTML += "&check;";
        button.style.backgroundColor = "green";
        correctSpan.innerHTML = `${correct}/${total} (${Math.floor(correct/total*1000)/10}%)`
        setTimeout(nextQuestion, 1000);
        return;
    }
    attempts++;
    if(attempts == 2) {
        total++;
        if(document.getElementById("ans1").innerHTML.toLowerCase() == q[1].toLowerCase()) document.getElementById("ans1").style.backgroundColor = "green";
        if(document.getElementById("ans2").innerHTML.toLowerCase() == q[1].toLowerCase()) document.getElementById("ans2").style.backgroundColor = "green";
        if(document.getElementById("ans3").innerHTML.toLowerCase() == q[1].toLowerCase()) document.getElementById("ans3").style.backgroundColor = "green";
        if(document.getElementById("ans0").innerHTML.toLowerCase() == q[1].toLowerCase()) document.getElementById("ans0").style.backgroundColor = "green";
        correctSpan.innerHTML = `${correct}/${total} (${Math.floor(correct/total*1000)/10}%)`
        let kIndex = known.indexOf(q);
        if(kIndex != -1) {
            known.splice(kIndex,1);
            practiced.push(q);
            practicedSpan.innerHTML = `Practiced: ${practiced.length}`;
            knownSpan.innerHTML = `Known: ${known.length}`;
        }
        setTimeout(nextQuestion, 2500);
        return;
    }
}

function nextQuestion() {
    attempts = 0;
    document.getElementById("ans1").style.backgroundColor = "white";
    document.getElementById("ans2").style.backgroundColor = "white";
    document.getElementById("ans3").style.backgroundColor = "white";
    document.getElementById("ans0").style.backgroundColor = "white";
    document.getElementById("marks").innerHTML = "";
    document.getElementById("check").innerHTML = "";
    let chance = Math.floor(Math.random()*101);
    let newQ;
    if((chance < 80 && unknown.length > 0) || (practiced.length == 0 && known.length == 0)) {
        newQ = `0|${Math.floor(Math.random()*(unknown.length))}`
    } else if((chance < 95 || unknown.length == 0 || known.length == 0) && practiced.length > 0) {
        newQ = `1|${Math.floor(Math.random()*(practiced.length))}`
    } else if(known.length > 0) {
        newQ = `2|${Math.floor(Math.random()*(known.length))}`
    }

    loadQuestion(newQ);
}

function loadQuestion(q) {
    question = q;
    let answers = [...new Set(totals.map(x => x[1]))];
    let [curQuestion, answer] = parseQuestion(q);
    let chosen = totals.length > 3 ? 3:(totals.length > 2 ? 2:1);
    let totalChosen = totals.length > 3 ? 4:(totals.length > 2 ? 3:2);
    answers.splice(answers.indexOf(answer), 1);

    let unmappedAnswers = [answer];
    let trueAnswers = [];
    for(let i = 0; i < chosen; i++) {
        let choice = Math.floor(Math.random()*(answers.length));
        unmappedAnswers.push(answers[choice]);
        answers.splice(choice, 1);
    }

    for(let i = 0; i < totalChosen; i++) {
        let choice = Math.floor(Math.random()*(unmappedAnswers.length));
        trueAnswers.push(unmappedAnswers[choice]);
        unmappedAnswers.splice(choice, 1);
    }

    document.getElementById("question").innerHTML = curQuestion;
    document.getElementById("ans0").innerHTML = trueAnswers[0];
    document.getElementById("ans1").innerHTML = trueAnswers[1];
    if(totals.length > 2) document.getElementById("ans2").innerHTML = trueAnswers[2];
    if(totals.length > 3) document.getElementById("ans3").innerHTML = trueAnswers[3];
}

function parseQuestion(input) {
    [s, q] = input.split("|");
    return s == 0 ? unknown[q] : (s == 1 ? practiced[q] : known[q])
}

function openSets() {
    document.getElementById("studySets").style.width = "250px";
}

function closeSets() {
    document.getElementById("studySets").style.width = "0";
}

function help() {
    document.getElementById("help").style.display = "block";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("help")) {
        document.getElementById("help").style.display = "none"
    }
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentElement.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}