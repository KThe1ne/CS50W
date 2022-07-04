document.addEventListener("DOMContentLoaded",function () {

    document.querySelector("#post-submit").onclick = () => {

        const postContent = document.querySelector(".newPost").value;
        
        fetch("/save-post", {
            method: 'POST',
            body: JSON.stringify({content: postContent,
                type: "new"}),
        })
    
    }

    document.querySelector("#allPosts-page").onclick = () => showPosts('all');
    document.querySelector("#followingPosts-page").onclick = () => showPosts('followers');
    
    showPosts('all');

})


function showProfilePage(username){

    document.querySelector(".profile-container").style.display = 'block';

    fetch("profile/" + username, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(result => {

        document.querySelector(".followBtn").style.display = "block";

        if (result.currUser.id == result.profile.id){
            console.log(result.currUser.username, result.profile.username)
            document.querySelector(".followBtn").style.display = "none";
        }

        document.querySelector(".profile-username").innerHTML = result.profile.username;
        document.querySelector("#profile-following").innerHTML = "Following: " + result.profile.userFollows.length;
        document.querySelector("#profile-followers").innerHTML = "Followers: " + result.profile.userFollowers.length;

        userFollowsProfile(result.profile, result.currUser)

        return result

    })
    .then((result) => {

        profile = result.profile;
        currUser = result.currUser;

        document.querySelector(".followBtn").onclick = () => {
            fetch("/toggle-follow", {
                method: 'PUT',
                body: JSON.stringify({
                    profile: profile
                })
            })
            .then(response => response.json())
            .then(result => {

                profile = result.profile;
                currUser = result.currUser;

                userFollowsProfile(profile, currUser);

                document.querySelector("#profile-following").innerHTML = "Following: " + profile.userFollows.length;
                document.querySelector("#profile-followers").innerHTML = "Followers: " + profile.userFollowers.length;
            })
        }
    })

    showPosts(username);

}

function userFollowsProfile(profile, currUser){
   
    if (currUser.userFollows.includes(profile.id)){
        document.querySelector(".followBtn").innerHTML = "Unfollow";
    }
    else{
        document.querySelector(".followBtn").innerHTML = "Follow";
    }

}

function showPosts(postsType){

    document.querySelector('#allPosts').innerHTML = '';
    document.querySelector('#followingPosts').innerHTML = '';

    fetch('/posts/' + postsType)
    .then(response => response.json())
    .then(sentData => {

        const posts = sentData.posts;

        let pages = numberOfPages(posts.length);

        paginate(pages)

        return sentData;

    })
    .then(sentData => {
        
        const posts = sentData.posts;

        fillPostContent(posts, sentData.user);
    
    })
    .then(() => {
        postPage();
        document.querySelector("#allPosts").style.display = 'block';

        if (postsType === "all" || postsType === "followers") {
            document.querySelector(".profile-container").style.display = 'none';
        }

        document.querySelectorAll("#editBtn").forEach(editBtn => {
            editBtn.onclick = () => {
                postContainer =  editBtn.parentElement.parentElement;
                editPost(postContainer);
            }
        })

        document.querySelector(".user-page").style.display = 'block';
    
        document.querySelectorAll("#userprofile-link").forEach(userProfileLink => {
            userProfileLink.onclick = () => {
                username = userProfileLink.innerHTML;
                console.log("TEST");
                showProfilePage(username)
            }
        })

    })

}

function numberOfPages(number_of_posts){
    
    return(Math.round(number_of_posts % 10 > 0 ? (number_of_posts/10)+1 : number_of_posts/10))

}

function paginate(number_of_pages){

    for (let i=1; i<number_of_pages+1; i++){

        const postPage = document.createElement('div');

        postPage.id = "page" + i;
        postPage.className = "page"

        document.querySelector("#allPosts").append(postPage); 

    }

}

function postPage(){

    let pagesSelector = document.querySelectorAll('.page');

    if (pagesSelector.length > 1){

        const pages = [];
        let pageNum = 1;

        pagesSelector.forEach((page,i) => {

            pages.push(i+1);

        })
        
        paginationBtnVisibility(pageNum, pages.length);

        displayPostPage(pageNum);

        document.querySelector(".nextBtn").onclick = () => {

            pageNum += 1;
            displayPostPage(pageNum);
            paginationBtnVisibility(pageNum, pages.length);

        }

        document.querySelector(".previousBtn").onclick = () => {

            pageNum -= 1;
            displayPostPage(pageNum);
            paginationBtnVisibility(pageNum, pages.length);

        }

    }
    else{

        document.querySelector('.pagination-bar').style.display ='none';

    }

}

function displayPostPage(page_num){

    document.querySelector(`#page${page_num}`).style.display = 'block';
    document.querySelectorAll(`.page:not(#page${page_num})`).forEach(page => {
        page.style.display = 'none';
    })

}

function paginationBtnVisibility(page_num, number_of_pages){

    if (page_num > 1){
        document.querySelector(".previousBtn").disabled = false;
    }
    else{
        document.querySelector(".previousBtn").disabled = true;
    }
    
    if (page_num === number_of_pages){
        document.querySelector(".nextBtn").disabled = true;
    }
    else{
        document.querySelector(".nextBtn").disabled = false;
    }

}

function fillPostContent(posts, user){

    let pageNum = 0;

    for (let i=0; i<posts.length; i++){

        if (i % 10 === 0){
            pageNum += 1;
        }

        const postContainer = document.createElement('div');
        postContainer.id= `post${i+1}`;
        postContainer.className = "post";

        document.querySelector(`#page${pageNum}`).append(postContainer);

    }
    
    const postSelector = document.querySelectorAll(`.page > .post`);

    postSelector.forEach((container,i) => {

        container.innerHTML = `
            <div class="edit">
                <button id="editBtn">Edit</button>
            </div>
            <div class="post-details">
                <a href="#" id="userprofile-link">${posts[i]["creator"][0]}</a>
                <p>${posts[i]["timestamp"]}</p>
            </div>
            <p class="post-content">${posts[i]["content"]}</p>

            <div class="likes">
                <div id="like-container">
                    <img src="#">
                    <p id="like-counter">${posts[i]["likes"].length}</p>
                    <button id="likeBtn">Like</button>
                </div>
            </div>
        `;

        container.dataset.postId = `${posts[i]["id"]}`;

        container.querySelector("#likeBtn").onclick = () => {
            
            likePost(container, posts[i]["id"]);

        }

        if (user.id !== posts[i]["creator"][1]){

            container.querySelector(".edit").style.display = 'none';

        } 

    })

}

function editPost(post){

    const postContent = post.querySelector('.post-content');
    
    const postText = postContent.innerHTML;

    form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
        <textarea class="edit-content" cols="80">
            ${postText}
        </textarea>
        <button class="saveEditBtn">Save Post</button>
    `
    postContent.replaceWith(form);

    document.querySelector(".saveEditBtn").onclick = () => {
        fetch("/save-post",{
            method: 'POST',
            body: JSON.stringify({
                content: document.querySelector(".edit-content").value, 
                type: "edit",
                postId: post.dataset.postId
            })
        })
    }

}

function likePost(container, postId){

    fetch("/like-post/"+postId,{
        method: 'PUT',
        body: JSON.stringify({
            likeBtn: "clicked"
        })
    })
    .then(response => response.json())
    .then(post => {
        container.querySelector("#like-counter").innerHTML = `${post["likes"].length}`;
    })

}

