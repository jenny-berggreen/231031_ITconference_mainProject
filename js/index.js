
const navBar = document.querySelector('nav');

window.addEventListener('scroll', function() {
	if (window.scrollY > 1) {
		displayNavColor();
	} else {
		hideNavColor();
	}
});

function displayNavColor() {
	navBar.style.backgroundColor = 'var(--color-primary)';
}

function hideNavColor() {
  navBar.style.backgroundColor = 'transparent';
}

// ------------------------- accordion -------------------------

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const accordionButton = accordion.querySelector('.accordion__button');

  function displayAccordionContent() {
    accordion.classList.toggle('accordion--expanded');
  }

  accordionButton.addEventListener('click', displayAccordionContent);
});
