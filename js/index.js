
const navBar = document.querySelector('nav');

window.addEventListener('scroll', function() {
	if (window.scrollY > 1) {
		displayNavColor();
	} else {
		hideNavColor();
	}
});

const displayNavColor = () => {
	navBar.style.backgroundColor = 'var(--color-primary)';
};

const hideNavColor = () => {
  navBar.style.backgroundColor = 'transparent';
};

// ------------------------- accordion -------------------------

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const accordionButton = accordion.querySelector('.accordion__button');

  const displayAccordionContent = () => {
    accordion.classList.toggle('accordion--expanded');
  };

  accordionButton.addEventListener('click', displayAccordionContent);
});

// ------------------------- slideshow -------------------------

const slideshow = document.querySelector('.slideshow');
const slides = slideshow.querySelectorAll('.slideshow__slide');
const controls = slideshow.querySelectorAll('.slideshow__control-button');
const dots = slideshow.querySelectorAll('.slideshow__dot');

let index = 0;
const totalSlides = slides.length;
const lastIndex = slides.length - 1;

const goToPreviousSlide = () => {
	if (index === 0) {
		index = lastIndex;
	} else {
		index = index - 1;
	}

	// update classes
	slides.forEach(slide => {
		slide.classList.remove('slideshow__slide--visible');
	});

	dots.forEach(dot => {
		dot.classList.remove('slideshow__dot--active');
	});

	slides[index].classList.add('slideshow__slide--visible');
	dots[index].classList.add('slideshow__dot--active');
};

const goToNextSlide = () => {
	// increase index
	if (index < lastIndex) {
		index = index + 1;
	} else {
		index = 0;
	}

	// update classes
	slides.forEach(slide => {
		slide.classList.remove('slideshow__slide--visible');
	});

	dots.forEach(dot => {
		dot.classList.remove('slideshow__dot--active');
	});

	slides[index].classList.add('slideshow__slide--visible');
	dots[index].classList.add('slideshow__dot--active');
};

const changeSlide = (event) => {
	const button = event.currentTarget;

	if (button.dataset.direction === 'previous') {
		goToPreviousSlide();
	}

	if (button.dataset.direction === 'next') {
		goToNextSlide();
	}
}

controls.forEach(button => {
	button.addEventListener('click', changeSlide);
})