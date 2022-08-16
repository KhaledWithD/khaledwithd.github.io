<?php

$q = $_REQUEST['q'];

if($q !== "") {
    $read = file_get_contents($q);
    echo $read;
}