{
    console.log("hello");
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (response) {
                    console.log(response);
                    let newPost = displayPosts(response.data.post, response.data.user);
                    $('#postList').prepend(newPost);
                }
            });
        })
        
    }

    createPost();

    let displayPosts = function(post, user){
        return $(`
            <li>
            <p>
                <span>${post.content}</span><br>
                <span>${post._id}</span>
                <small>${user.name}</small>
                    <a href=/posts/destroy/${post._id}><button>Delete Post</button></a>
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content">
                        <input type="hidden" name="post" value=${post.id}>
                        <input type="submit" value="add a comment">
                    </form>
            </p>
        </li>
        `)
    }
}

