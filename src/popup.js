document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const titleInput = document.createElement("input");
  titleInput.placeholder = "Bookmark Title";
  app.appendChild(titleInput);

  const urlInput = document.createElement("input");
  urlInput.placeholder = "Bookmark URL";
  app.appendChild(urlInput);

  const addButton = document.createElement("button");
  addButton.textContent = "Add Bookmark";
  app.appendChild(addButton);

  const bookmarkList = document.createElement("ul");
  app.appendChild(bookmarkList);

  chrome.storage.local.get(["bookmarks"], (result) => {
    const bookmarks = result.bookmarks || [];
    bookmarks.forEach((bookmark) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${bookmark.title} - ${bookmark.url}`;
      bookmarkList.appendChild(listItem);
    });
  });

  addButton.addEventListener("click", () => {
    const title = titleInput.value;
    const url = urlInput.value;

    if (title && url) {
      chrome.storage.local.get(["bookmarks"], (result) => {
        const bookmarks = result.bookmarks || [];
        bookmarks.push({ title, url });
        chrome.storage.local.set({ bookmarks }, () => {
          const listItem = document.createElement("li");
          listItem.textContent = `${title} - ${url}`;
          bookmarkList.appendChild(listItem);
          titleInput.value = "";
          urlInput.value = "";
        });
      });
    }
  });
});