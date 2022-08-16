<?php

$q = $_REQUEST["q"];

if ($q !== "") {
    $split = explode(":", $q);
    $username = $split[0];
    $postId = $split[1];
    $fileName = $split[2];
    $opUsernames = ["ADMIN", "ADMIN1"];
    if(in_array($username, $opUsernames)) {
        unlink("../database/posts/".$fileName);
        echo "Post (Id: {$postId}) deleted";
    } else {
        $content = json_decode(file_get_contents("../database/posts/".$fileName));
        if($content->{"content"}->{"creator"} == $username) {
            unlink("../database/posts/".$fileName);
            echo "Post (Id: {$postId}) deleted";
        } else {
            echo "001";
        }
    }
}