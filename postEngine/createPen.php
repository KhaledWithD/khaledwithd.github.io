<?php

global $engine_version;
$engine_version = "0.1";
$q = $_REQUEST['q'];

if ($q !== "") {
    $split = explode(":", $q);
    $username = $split[0];
    $content = $split[1];
    $description = $split[2];
    $postId = uniqid();
    $filename = $username."-".$postId;

    $file_content = ["post-engine-version" => $engine_version,
        "content" => [
            "creator" => $username,
            "upload_date" => date("d.m.Y"),
            "uniqid" => $postId,
            "description" => $description,
            "content_type" => [
                "type" => "Text",
                "content" => $content
                
                ]
            
            ],
            "media" => [
                "likes" => 0,
                "dislikes" => 0,
                "shared" => 0,
                "comments" => 0
                ],
            "comments" => [
                
            ]];
    file_put_contents("../database/posts/".$filename.".json", json_encode($file_content));
    echo "OK";
}