function d(id) {
    return document.getElementById(id);
}

function doStuffAfterHTMLHasDoneItsStuff() {
    $("#reveal").click(function() {
        d("about").className = "shown"
    });
}

