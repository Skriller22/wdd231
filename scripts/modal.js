const modal = document.querySelector("#course-modal");
const closeModal = modal.querySelector(".close-button");

closeModal.addEventListener("click", () => {
  modal.close();
});

// Clicking the backdrop (the dialog element itself, outside its content) closes it.
modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.close();
  }
});
