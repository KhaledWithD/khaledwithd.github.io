function canLogin(input, password) {
    $.getJSON("../database/accounts.json", function(content) {
        if (content[input] == null) {
            $(".error-displayer-form").css("opacity", "1");
            $("#error-displayer").html("Password or Name dont match");
        } else {
            $.getJSON("../database/accounts.json", function(content) {
                if (content[input].password !== password) {
                    $(".error-displayer-form").css("opacity", "1");
                    $("#error-displayer").html("Password or Name dont match");
                } else {
                    $(".error-displayer-form").css("opacity", "1");
                    $("#error-displayer").html("You are now logged in!");
                    localStorage.setItem("username", input);
                    window.location.replace("homepage/homepage.html");
                }
            });
        }
    });
}

$("#submit-login").on("click", function(event) {
    const inputText = document.getElementById("name-input").value;
    const password = document.getElementById("password-inpt").value;
    if (inputText.length == 0) {
        $(".error-displayer-form").css("opacity", "1");
        $("#error-displayer").html("Empty Name or Email");
        return;
    }
    if (password.length == 0) {
        $(".error-displayer-form").css("opacity", "1");
        $("#error-displayer").html("Empty Password");
        return;
    }

    canLogin(inputText, password);

});

function showPassword() {
    const x = document.getElementById("password-inpt");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}