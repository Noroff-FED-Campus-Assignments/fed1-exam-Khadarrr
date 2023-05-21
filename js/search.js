const resultContainer = document.querySelector("#js-results");
const formEl = document.querySelector("#js-search-form");
const searchEl = document.querySelector("#js-search");

async function fetchBlogPosts(searchTerm) {
  try {
    const response = await fetch(`https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/posts/?per_page=12&search=${searchTerm}`);
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

    const resultsHTML = postsWithMedia.map((post) => {
      const imageUrl = post.featuredMediaUrl || '';

      const detailsPageLink = `details.html?id=${post.id}&imageUrl=${encodeURIComponent(imageUrl)}`;

      return `
        <div class="result-item">
          <div class="result-image">
            <img src="${imageUrl}" alt="Post Image">
          </div>
          <div class="result-content">
            <h2>${post.title.rendered}</h2>
            <p>${post.excerpt.rendered}</p>
            <a href="${detailsPageLink}">Read more</a>
          </div>
        </div>
      `;
    });

    resultContainer.innerHTML = resultsHTML.join("");
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchEl.value;
  fetchBlogPosts(searchTerm);
});

fetchBlogPosts("");
