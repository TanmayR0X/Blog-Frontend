// Accessing container div
const container = document.querySelector(".container");
// Accessing errorText paragraph
const errorText = document.querySelector(".error-text")
// Creating an array to store posts
let Posts = [];

// Fetching posts with IIFE FetchPosts()
(async function FetchPosts() {
  try {
    container.innerHTML = `
        <div class="loading-container">
          <h2 style="font-size:30px ;">Loading posts</h2>
          <div class="loader"></div>
        </div>
      `;
    const response =  await fetch("https://dummyjson.com/posts")
    const data = await response.json();
    data.posts.map((item) => {
      Posts.push(item)
    });
    RenderUI();
  } catch (error) {
    console.error(error);
  }
})();
// Function to Render Posts
function RenderUI() {
  if (Posts.length !== 0) {
    container.classList.add("layout");
    const postsHTML = Posts.map((item) => {
      const tagHtml = item.tags.map((tag) => `<span>${tag}</span>`).join("");
      return `<div class="post">
    <h1>${item.title}</h1>
    <p>${item.body}</p>
    <div class="tags">${tagHtml}</div>
    <a href="post.html?id=${item.id}" class="read-more"">Read More</a>
    </div>`;
    }).join("");
    container.innerHTML = postsHTML;
  }
  else {
    errorText.innerHTML = "No Posts Available"
  }
}
