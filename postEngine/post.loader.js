/** @var Array
List all active posts */
var postList = [];

$(document).ready(function () {
    loadPost();
});

function loadPost() {
    var path = "../database/posts/";
    var str = "read_files:"+path;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = this.responseText;
            var obj = JSON.parse(json);
            var result = [];
            for (var i in obj) {
                result.push([i, obj[i]]);
            }
            var random = Math.ceil(Math.random() * result.length - 1);
            var picked = result[random];
            if (postList.includes(picked[1]) == false) {
                readTextFile("../database/posts/"+picked[1], function(text) {
                    var data = JSON.parse(text);
                    var postId = data.content.uniqid;
                    var post = $(`<div class="post-container" id="post-container"> <div class="post-content" id="post-content"> <div class="post-box"> <div class="post-description"> <p id="post-description" class="post-description">$DESCRIPTION</p> </div> <div class="post-frame"> <p style="color: white;" id="post-frame-content" class="post-frame-content"> $POST_FRAME_CONTENT </p> </div> </div> <div class="post-box-buttons"> <button name="like-post-button">Like</button> <button name="dislike-post-button">Dislike</button><button id="delete-button" style="border: 2px solid black; background-color: red;" onclick="deletePost('$post_id', '$filename')">Delete</button></div> <div class="post-informations"> <h6 class="post-information-written">Upload-Date: <span id="post-upload-date">$UPLOAD_DATE</span> Creator: <span id="post-creator-name">$CREATOR_NAME</span></h6> </div> </div> </div>`);
                    var content = post.html();
                    post.attr("id", uniqid());
                    modifyHtmlContent(content, postId, picked[1], (path+picked[1]), function(modified) {
                        post.html($.parseHTML(modified));
                        $("body").append(post);
                        postList.push(picked[1]);
                    });
                });
            }
        }
    };
    xmlhttp.open("GET", "../postEngine/getFiles.php?q=" + str, true);
    xmlhttp.send();
}

function uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`: ""}`;
}

function modifyHtmlContent(content, postId, filename, path, callback) {
    var str = path;
    var xmlhttp = new XMLHttpRequest();
    let modified = "";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = this.responseText;
            var obj = JSON.parse(json);
            var res = [];

            for (var i in obj)
                res.push(obj[i]);

            var creator = JSON.stringify(res[1].creator).replaceAll('"', "");
            var upload_date = JSON.stringify(res[1].upload_date).replaceAll('"', "");
            var description = JSON.stringify(res[1].description).replaceAll('"', "");
            var post_frame_content = "";
            if (JSON.stringify(res[1].content_type.type) == "Image") {
                post_frame_content = "$%Image%";
            } else {
                post_frame_content = JSON.stringify(res[1].content_type.content).replaceAll('"', "");
            }
            modified = content
            .replace(/(\$post_id)/, postId)
            .replace(/(\$filename)/, filename)
            .replace(/(\$CREATOR_NAME)/, creator)
            .replace(/(\$UPLOAD_DATE)/, upload_date)
            .replace(/(\$POST_FRAME_CONTENT)/, post_frame_content)
            .replace(/(\$DESCRIPTION)/, description);
            if (callback) callback(modified);
        }
    };
    xmlhttp.open("GET", "../postEngine/readPost.php?q=" + str, true);
    xmlhttp.send();
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPos = $(window).height() + $(window).scrollTop();
    if (((scrollHeight - 1000) >= scrollPos) / scrollHeight == 0) {
        loadPost();
    }
});

//<button name="comment-post-button">Comment</button>