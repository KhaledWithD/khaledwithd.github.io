<?php

$q = $_REQUEST["q"];

if($q !== "") {
    $meta = explode(":", $q);
    if($meta[0] == "read_files") {
        $scandir = array_diff(scandir($meta[1]), [".",".."]);
        print_r(json_encode($scandir));
    }
}