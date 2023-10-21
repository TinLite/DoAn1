const deletePrompt = document.getElementById("delete-prompt")
const promptName = document.getElementById("delete-prompt-name")
const deleteForm = document.getElementById("delete-form")
function promptDelete(url, name) {
    promptName.textContent = name;
    deleteForm.action = url
    deletePrompt.classList.remove("hidden");
}