const coursePrintButtons = [...document.querySelectorAll("[data-print-section]")];

function clearPrintSection() {
  document.body.removeAttribute("data-print-section");
}

coursePrintButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.dataset.printSection = button.dataset.printSection;
    window.print();
  });
});

addEventListener("afterprint", clearPrintSection);
