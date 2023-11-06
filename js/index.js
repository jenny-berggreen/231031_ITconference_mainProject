
// ------------------------- accordion -------------------------

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const accordionButton = accordion.querySelector('.accordion__button');

  function displayAccordionContent() {
    accordion.classList.toggle('accordion--expanded');
  }

  accordionButton.addEventListener('click', displayAccordionContent);
});
