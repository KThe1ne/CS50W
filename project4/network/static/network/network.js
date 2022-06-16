document.addEventListener("DOMContentLoaded",function () {

    //showPosts('allPosts');
    //showPosts('followingPosts');

    document.querySelectorAll(".posts-page").forEach(element => {
        addEventListener("click", function() {
            if (element.innerHTML === "All Posts"){
                console.log(element.innerHTML)
                showPosts('allPosts');
            }
            if (element.innerHTML === "Following"){
                console.log(element.innerHTML)
                showPosts('followingPosts');
            }
            
        })
    });

    showPosts('allPosts');

})

function showPosts(postsType){

    const allPostsContainer = document.querySelector("#allPosts > *");
    
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
                        <div id="like-counter">
                            <img src="#">
                            <p>${posts[i]["likes"].length}</p>
                            <button id="likeBtn">Like</button>
                        </div>
                    </div>
                `;

                

                if (sentData.user.id !== posts[i]["creator"][1]){
                    container.querySelector(".edit").style.display = 'none';
                } 

            })

            console.log(allPostsContainer)
            document.querySelector("#allPosts").style.display = 'block';
            document.querySelector("#followingPosts").style.display = 'none';
            document.querySelector(".profile-container").style.display = 'none';
        })

    }

    if (postsType === 'followingPosts'){
        
        fetch("/user/follow")   
        .then(response => response.json()) 
        .then(sentData => {

            const posts = sentData.followingPosts;
            for (let i=0; i<posts.length; i++){
                const postContainer = document.createElement('div');
                postContainer.className = "post " + (i+1);
                document.querySelector("#followingPosts").append(postContainer);
                pagination(posts.length)
            }

            const postSelector = document.querySelectorAll("#followingPosts > .post");
            console.log(postSelector)

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
            })
        })

        document.querySelector("#allPosts").style.display = 'none';
        document.querySelector("#followingPosts").style.display = 'block';
        document.querySelector(".profile-container").style.display = 'none';
        
    }

    
}


function pagination(length){
    
    let pages = Math.round(length % 10 > 0 ? (length/10)+1 : length/10);
    return(pages)

}