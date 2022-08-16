function publish() {
    var content = document.getElementById("textarea-content").value;
    var description = document.getElementById("description-input").value;
    if (content.length == 0) {
        $("#console-line").html("Please write an content!");
    } else {
        var str = localStorage.getItem("username")+":"+content+":"+description;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };
        xmlhttp.open("GET", "../postEngine/createPen.php?q=" + str, true);
        xmlhttp.send();
    }
}