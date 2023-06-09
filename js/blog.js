const blogContainer = document.querySelector("#blogg-post");
const swiperContainer = document.querySelector(".swiper-container");

async function fetchBlogPost() {
  try {
    const response = await fetch("https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/posts/?per_page=12");
    const posts = await response.json();

    const postPromises = posts.map(async (post) => {
      if (post.featured_media) {
        const mediaResponse = await fetch(`https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/media/${post.featured_media}`);
        const media = await mediaResponse.json();
        return { ...post, featuredMediaUrl: media.source_url };
      } else {
        return post;
      }
    });

    const postsWithMedia = await Promise.all(postPromises);

    const swiperSlides = postsWithMedia.map((post) => {
      const imageUrl = post.featuredMediaUrl || '';

      return `
        <div class="swiper-slide">
          <div class="post-image" style="background-image: url(${imageUrl})"></div>
          <div class="post-content">
            <h2>${post.title.rendered}</h2>
            
            <a href="details.html?id=${post.id}&imageUrl=${encodeURIComponent(imageUrl)}">Read more</a>
          </div>
        </div>
      `;
    });

    blogContainer.innerHTML = swiperSlides.join("");

    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: {
        delay: 1500,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 35,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

fetchBlogPost();


const spotlightPosts = document.querySelector('.spotlight-posts');

fetch("https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/posts?per_page=2")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch spotlight posts.");
    }
    return response.json();
  })
  .then(posts => {
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('spotlight-post');

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title.rendered;

      const mediaElement = document.createElement('div');
      mediaElement.classList.add('spotlight-media');

      if (post.featured_media) {
        fetch(`https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/media/${post.featured_media}`)
          .then(mediaResponse => {
            if (!mediaResponse.ok) {
              throw new Error("Failed to fetch media.");
            }
            return mediaResponse.json();
          })
          .then(media => {
            const imageUrl = media.source_url;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            mediaElement.appendChild(imageElement);
          })
          .catch(error => {
            console.log('Error fetching media:', error);
          });
      }

      const readMoreLink = `details.html?id=${post.id}`;
      const readMoreButton = document.createElement('a');
      readMoreButton.href = readMoreLink;
      readMoreButton.textContent = 'Read more';
      readMoreButton.classList.add('read-more-button');

      postElement.appendChild(titleElement);
      postElement.appendChild(mediaElement);
      postElement.appendChild(readMoreButton);

      spotlightPosts.appendChild(postElement);
    });
  })
  .catch(error => {
    console.log('Error fetching spotlight posts:', error);
  });


