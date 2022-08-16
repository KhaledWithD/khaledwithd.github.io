function deletePost(id, filename) {
    var opusername = Array("ADMIN", "ADMIN1");
    var username = localStorage.getItem("username");
    var c = confirm("Do you wanna delete this post?");
    if (c == true) {
        var str = username + ":" + id + ":" + filename;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "001") {
                    alert("ERROR [001]");
                    return;
                }
                alert(this.responseText);
                location.reload(true);
            }
        };
        xmlhttp.open("GET", "../postEngine/deletePost.php?q=" + str, true);
        xmlhttp.send();
    }
}

function likePost(id) {
    
}