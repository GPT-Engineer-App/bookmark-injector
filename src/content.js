chrome.storage.local.get(["bookmarks"], (result) => {
  const bookmarks = result.bookmarks || [];
  const inputElements = document.querySelectorAll("input[type='text'], textarea");

  inputElements.forEach((input) => {
    const bookmarkList = document.createElement("ul");
    bookmarkList.style.position = "absolute";
    bookmarkList.style.backgroundColor = "#fff";
    bookmarkList.style.border = "1px solid #ccc";
    bookmarkList.style.padding = "10px";
    bookmarkList.style.zIndex = "1000";

    bookmarks.forEach((bookmark) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = bookmark.url;
      link.textContent = bookmark.title;
      link.target = "_blank";
      listItem.appendChild(link);
      bookmarkList.appendChild(listItem);
    });

    input.parentElement.appendChild(bookmarkList);
  });
});