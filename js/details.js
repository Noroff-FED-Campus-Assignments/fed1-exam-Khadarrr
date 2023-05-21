const postId = getPostIdFromURL();
   

    const postTitleEl = document.querySelector("#post-title");
    const postContentEl = document.querySelector("#post-content");


    
    async function fetchPostDetails() {
      try {
        const response = await fetch(`https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/posts/${postId}`);
        const post = await response.json();

        postTitleEl.textContent = post.title.rendered;
        postContentEl.innerHTML = post.content.rendered;
       
      } catch (error) {
        console.log(error);
      }
    }

    function getPostIdFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("id");
    }

    fetchPostDetails();