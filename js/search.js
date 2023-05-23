const resultContainer = document.querySelector("#js-results");
const formEl = document.querySelector("#js-search-form");
const searchEl = document.querySelector("#js-search");
const loadMoreButton = document.querySelector("#loadMoreButton");
let currentPage = 1;
const postsPerPage = 10;
let totalPosts = 0;

async function fetchBlogPosts(searchTerm, page) {
  try {
    const response = await fetch(`https://artsandcultureblog.flywheelsites.com/wp-json/wp/v2/posts/?per_page=${postsPerPage}&page=${page}&search=${encodeURIComponent(searchTerm)}&searchFields=title`);
    const posts = await response.json();

    totalPosts = parseInt(response.headers.get('X-WP-Total'));

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

    if (currentPage * postsPerPage >= totalPosts) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchEl.value;
  currentPage = 1;
  fetchBlogPosts(searchTerm, currentPage);
});

loadMoreButton.addEventListener("click", () => {
  const searchTerm = searchEl.value;
  currentPage++;
  fetchBlogPosts(searchTerm, currentPage);
});

fetchBlogPosts("", currentPage);
