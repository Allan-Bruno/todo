const input = document.getElementById("input");
const errorMsg = document.getElementById("errorMsg");
const list = document.getElementById("toDos");

function makeNewList(content) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span class="focus:outline-slate-300 p-1" id ="content">${content}</span>
  <span id="buttons">
  <button id="removeBtn" class="bg-red-700 p-1 rounded">Remove</button>
  <button id="editBtn" class="bg-sky-700 p-1 rounded">Edit</button>
  </span>
  `;
  list.appendChild(listItem);
}

document.getElementById("createBtn").addEventListener("click", () => {
  const content = input.value.trim();
  errorMsg.classList.remove("grid");
  errorMsg.classList.add("hidden");

  if (content.length <= 0) {
    errorMsg.classList.remove("hidden");
    errorMsg.classList.add("grid");
    return;
  }

  makeNewList(content);

  input.value = "";
});

document.getElementById("toDos").addEventListener("click", (e) => {
  e = event.target;
  const eId = e.id;
  const parentElement = e.parentNode;
  if (eId === "removeBtn") {
    parentElement.parentElement.remove();
  }

  if (eId === "editBtn") {
    let contentSpan = parentElement.parentElement.querySelector("#content");
    let buttonsDiv = parentElement.parentElement.querySelector("#buttons");
    contentSpan.contentEditable = true;
    contentSpan.focus();

    const range = document.createRange();
    range.selectNodeContents(contentSpan);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    buttonsDiv.innerHTML = `
    <button id="doneBtn" class="p-1 outline-dotted rounded">Done</button>
    `;
  }
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
