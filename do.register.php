<?php

$q = $_REQUEST["q"];

if ($q !== "") {
    $explode = explode(":",$q);
    $array = json_decode(json_encode(json_decode(file_get_contents("database/accounts.json"))), true);
    $array[$explode[1]] = ["password" => $explode[2], "email" => $explode[0], "creationDate" => date("l jS \of F Y")];
    $jsonData = json_encode($array);
    file_put_contents("database/accounts.json", $jsonData);
    echo "You can now login!";
}