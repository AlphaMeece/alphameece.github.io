let sets = [
    ...baseSets
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
    nextQuestion();
}

function populate() {
    for(let set of sets) {
        for(let q of set.terms) {
            unknown.push(q);
            totals.push(q);
        }
    }
    unknownSpan.innerHTML = `Unkown: ${unknown.length}`;
    practicedSpan.innerHTML = `Practiced: ${practiced.length}`;
    knownSpan.innerHTML = `Known: ${known.length}`;
    correctSpan.innerHTML = `${correct}/${total} (${total == 0 ? 0:(Math.floor(correct/total*1000)/10)}%)`
}

function answer(ans, button) {
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
    if((chance < 70 && unknown.length > 0) || (practiced.length == 0 && known.length == 0)) {
        newQ = `0|${Math.floor(Math.random()*(unknown.length))}`
    } else if((chance < 90 || unknown.length == 0 || known.length == 0) && practiced.length > 0) {
        newQ = `1|${Math.floor(Math.random()*(practiced.length))}`
    } else if(known.length > 0) {
        newQ = `2|${Math.floor(Math.random()*(known.length))}`
    }

    loadQuestion(newQ);
}

function loadQuestion(q) {
    question = q;
    let answers = totals.map(x => x[1]);
    let [curQuestion, answer] = parseQuestion(q);
    answers.splice(answers.indexOf(answer), 1);

    let unmappedAnswers = [answer];
    let trueAnswers = [];
    for(let i = 0; i < 3; i++) {
        let choice = Math.floor(Math.random()*(answers.length));
        unmappedAnswers.push(answers[choice]);
        answers.splice(choice, 1);
    }

    for(let i = 0; i < 4; i++) {
        let choice = Math.floor(Math.random()*(unmappedAnswers.length));
        trueAnswers.push(unmappedAnswers[choice]);
        unmappedAnswers.splice(choice, 1);
    }

    document.getElementById("question").innerHTML = curQuestion;
    document.getElementById("ans1").innerHTML = trueAnswers[0];
    document.getElementById("ans2").innerHTML = trueAnswers[1];
    document.getElementById("ans3").innerHTML = trueAnswers[2];
    document.getElementById("ans0").innerHTML = trueAnswers[3];
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