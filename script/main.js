function d(id) {
    return document.getElementById(id);
}

$("#reveal").click = function() {
    d("about").className = "shown"
}