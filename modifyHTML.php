<?php

$q = $_REQUEST["q"];

if ($q !== "") {
    $html = '<div class="post-container" id="post-container">
        <div class="post-content" id="post-content">
            <!-- post-content -->
            <div class="post-box">
                <div class="post-frame"></div>
            </div>
            <div class="post-box-buttons">
                <button name="like-post-button">Like</button>
                <button name="dislike-post-button">Dislike</button>
                <button name="description-post-button">Description</button>
                <button name="comment-post-button">Comment</button>
                <button name="share-post-button">Share</button>
            </div>
            <div class="post-informations">
                <h6 class="post-information-written">Upload-Date: <span id="post-upload-date">$UPLOAD_DATE</span> Creator: <span id="post-creator-name">$CREATOR_NAME</span></h6>
            </div>
        </div>
    </div>';
    $regex = '<span (id="post-upload-date")>([\s\S]*?)<\/span>';
    preg_match_all($html, $regex, $matches);
    file_put_contents("response.txt", json_encode($matches));
}