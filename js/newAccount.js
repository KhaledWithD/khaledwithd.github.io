function showPassword() {
    const x = document.getElementById("password-inpt");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function canRegister(email, username, password) {
    $.getJSON("../database/accounts.json", function(content) {
        if (content[username] != null) {
            $(".error-displayer-form").css("opacity", "1");
            $("#error-displayer").html("Choose a nother Username");
        } else {
            if (username.length < 3) {
                $(".error-displayer-form").css("opacity", "1");
                $("#error-displayer").html("Username too short");
                return;
            } else {
                var eachReturn = false;
                $.each(content, function(key, val) {
                    if (val.email == email) {
                        $(".error-displayer-form").css("opacity", "1");
                        $("#error-displayer").html("This email is already registered");
                        eachReturn = false; // STOPEN BEI RETURN
                    } else {
                        eachReturn = true;
                    }
                });
                if (eachReturn == true) {
                    var valReturn = false;
                    const validateEmail = (email) => {
                        return email.match(
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );
                    };
                    const validate = () => {
                        if (validateEmail(email)) {
                            $(".error-displayer-form").css("opacity", "1");
                            $("#error-displayer").html("Is valid");
                            valReturn = true;
                            return true;
                        } else {
                            $(".error-displayer-form").css("opacity", "1");
                            $("#error-displayer").html("Email is not valid");
                            valReturn = false;
                            return false;
                        }
                        valReturn = false;
                        return false;
                    };
                    validate();
                    if (valReturn == true) {
                        let str = email+":"+username+":"+password;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                $("#error-displayer").html(this.responseText);
                            }
                        };
                        xmlhttp.open("GET", "do.register.php?q=" + str, true);
                        xmlhttp.send();
                    }
                }
            }
        }
    });
}

$("#submit-register").on("click", function(event) {
    const email = document.getElementById("email-input").value;
    const username = document.getElementById("name-input").value;
    const password = document.getElementById("password-inpt").value;
    if (email.length == 0) {
        $(".error-displayer-form").css("opacity", "1");
        $("#error-displayer").html("Empty Email");
        return;
    }
    if (username.length == 0) {
        $(".error-displayer-form").css("opacity", "1");
        $("#error-displayer").html("Empty Username");
        return;
    }
    if (password.length == 0) {
        $(".error-displayer-form").css("opacity", "1");
        $("#error-displayer").html("Empty Password");
        return;
    }
    $(".error-displayer-form").css("opacity", "0");
    canRegister(email, username, password);
});