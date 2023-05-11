const blogContainer = document.querySelector("#blogg-post");
const swiperContainer = document.querySelector(".swiper-container");

async function fetchBlogPost() {
  try {
    const response = await fetch("http://arts-culture.local//wp-json/wp/v2/posts/");
    const posts = await response.json();

    const postPromises = posts.map(async (post) => {
      if (post.featured_media) {
        const mediaResponse = await fetch(`http://arts-culture.local//wp-json/wp/v2/media/${post.featured_media}`);
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
            <p>${post.excerpt.rendered}</p>
            <a href="${post.link}">Read more</a>
          </div>
        </div>
      `;
    });

    blogContainer.innerHTML = swiperSlides.join("");

    new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 20, 
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
          slidesPerView: 2, 
         spaceBetween: 75,
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

fetchBlogPost();

