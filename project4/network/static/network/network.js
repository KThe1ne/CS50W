document.addEventListener("DOMContentLoaded",function () {

    document.querySelector("#post-submit").onclick = () => {

        const postContent = document.querySelector(".newPost").value;
        
        fetch("/save-post", {
            method: 'POST',
            body: JSON.stringify({content: postContent,
                type: "new"}),
        })
    
    }

    document.querySelector("#allPosts-page").onclick = () => showPosts('allPosts');
    document.querySelector("#followingPosts-page").onclick = () => showPosts('followingPosts');
    document.querySelector("#userprofile-page").onclick = () => showProfilePage();

    showPosts('allPosts');

})

function showProfilePage(){

    document.querySelector(".user-page").style.display = 'none';
    document.querySelector(".profile-container").style.display = 'block';

}


function showPosts(postsType){

    const allPostsContainer = document.querySelector("#allPosts > *");

    document.querySelector('#allPosts').innerHTML = '';
    document.querySelector('#followingPosts').innerHTML = '';
    
    if (postsType === 'allPosts'){

        fetch('/all-posts')
        .then(response => response.json())
        .then(sentData => {



            const posts = sentData.allPosts;

            let pages = pagination(posts.length);

            for (let i=1; i<pages+1; i++){

                const postPage = document.createElement('div');

                postPage.id = "page" + i;
                postPage.className = "page"

                document.querySelector("#allPosts").append(postPage); 

            }

            return sentData;

        })
        .then(sentData => {
          

            const posts = sentData.allPosts;

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
                        <h5>${posts[i]["creator"][0]}</h5>
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
                    console.log("clicked");
                    likePost(container, posts[i]["id"]);
                    
                    console.log(container.querySelector("#like-counter").innerHTML, `${posts[i]["likes"].length}`)
                }

                if (sentData.user.id !== posts[i]["creator"][1]){
                    container.querySelector(".edit").style.display = 'none';
                } 

            })
        })
        .then(() => {
            postPage();
            document.querySelector("#allPosts").style.display = 'block';
            document.querySelector("#followingPosts").style.display = 'none';
            document.querySelector(".profile-container").style.display = 'none';

            document.querySelectorAll("#editBtn").forEach(editBtn => {
                editBtn.onclick = () => {
                    postContainer =  editBtn.parentElement.parentElement;
                    editPost(postContainer);
                }
            })


        })



    }

    if (postsType === 'followingPosts'){
        
        fetch("/user/follow")   
        .then(response => response.json()) 
        .then(sentData => {

            const posts = sentData.followingPosts;

            let pages = pagination(posts.length);

            for (let i=1; i<pages+1; i++){

                const postPage = document.createElement('div');

                postPage.id = "page" + i;
                postPage.className = "page"

                document.querySelector("#followingPosts").append(postPage); 

            }

            return sentData;
        
        })
        .then(sentData => {

            const posts = sentData.followingPosts;

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
                    <div class="post-details">
                        <h5>${posts[i]["creator"][0]}</h5>
                        <p>${posts[i]["timestamp"]}</p>
                    </div>
                    <p class="post-content">${posts[i]["content"]}</p>
    
                    <div class="likes">
                        <div id="like-counter">
                            <img src="#">
                            <p>${posts[i]["likes"].length}</p>
                            <button id="likeBtn">Like</button>
                        </div>
                    </div>
                `;
                container.dataset.postId = `${posts[i]["id"]}`;
            })
        })
        .then(() => {
            postPage();
            document.querySelector("#allPosts").style.display = 'none';
            document.querySelector("#followingPosts").style.display = 'block';
            document.querySelector(".profile-container").style.display = 'none';
        })

    }

    document.querySelector(".user-page").style.display = 'block';
}


function pagination(length){
    
    let pages = Math.round(length % 10 > 0 ? (length/10)+1 : length/10);
    return(pages)

}

function postPage(){

    let pagesSelector = document.querySelectorAll('.page');

            if (pagesSelector.length > 1){
                console.log(pagesSelector.length)
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
                document.querySelector('.pagination-bar').style.display ='none'
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

    console.log(document.querySelector(".saveEditBtn"))

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