document.addEventListener("DOMContentLoaded",function () {

    document.querySelectorAll(".posts-page").forEach(element => {
        addEventListener("click", function() {
            if (element.innerHTML === "All Posts"){
                console.log(element.innerHTML)
                showPosts('allPosts')
            }
            if (element.innerHTML === "Following"){
                console.log(element.innerHTML)
                showPosts('followingPosts')
            }
            
        })
    });

    showPosts('allPosts')
})

function showPosts(postsType){

    const allPostsContainer = document.querySelector("#allPosts > *");

    if (postsType === 'allPosts'){
        fetch('/all-posts')
        .then(response => response.json())
        .then(sentData => {
            const posts = sentData.allPosts;
            console.log(posts)
            for (let i=0; i<posts.length; i++){
                const postContainer = document.createElement('div');
                postContainer.className = "post " + i;
                document.querySelector("#allPosts").append(postContainer);
            }

            const postSelector = document.querySelectorAll(".post");
            console.log(postSelector)

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
                `
            })

            console.log(allPostsContainer)
            document.querySelector("#allPosts").style.display = 'block';
            document.querySelector("#followingPosts").style.display = 'none';
            document.querySelector(".profile-container").style.display = 'none';

        })

    }
}