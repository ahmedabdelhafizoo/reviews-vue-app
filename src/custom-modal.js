// custom modal
let Modal = (function () {
  function hideModal(modal) {
    modal.classList.add("d-none");
    document.body.classList.remove("overflow-hidden");
  }

  function showModal(modal) {
    modal.classList.remove("d-none");
    document.body.classList.add("overflow-hidden");
    modal.scrollTo(0, 0);
    if (!modal.classList.contains("static-modal")) {
      modal.addEventListener("click", hideModal.bind(null, modal));
    }
    modal
      .querySelector(".modal__container")
      .addEventListener("click", handelModalContentClick);

    let closeIcon = modal.querySelector(".modal__close-btn");
    closeIcon && closeIcon.addEventListener("click", handelModalCloseIcon);
  }

  function handelModalContentClick(e) {
    e.stopPropagation();
  }

  function handelModalCloseIcon(e) {
    e.preventDefault();
    this.closest(".modal").classList.toggle("d-none");
    document.body.classList.toggle("overflow-hidden");
  }

  document.addEventListener("click", (e) => {
    let targetElement = e.target.closest("[data-modal]");
    if (targetElement) {
      e.preventDefault();
      let targetModal = document.getElementById(targetElement.dataset.target);
      showModal(targetModal);
    }
  });

  return {
    showModal,
    hideModal,
  };
})();

export default Modal;
