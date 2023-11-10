
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

const slideshow = document.querySelector('.slideshow-container');
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

// ------------------------- radio button -------------------------

const radiobuttons = document.querySelectorAll('.radiobutton__button');

function toggleRadiobuttonChosenClass(event) {
	// Remove "chosen" class from all radio buttons
	radiobuttons.forEach(button => {
	  button.classList.remove('radiobutton__button--chosen');
	});
  
	// Add "chosen" class to the clicked radio button
	const clickedButton = event.currentTarget;
	clickedButton.classList.add('radiobutton__button--chosen');
	clickedButton.classList.remove('radiobutton__button--hover'); // don´t display hover effect right after click
}

function addRadiobuttonHoverClass(event) {
	const hoveredButton = event.currentTarget;
	if (!hoveredButton.classList.contains('radiobutton__button--chosen')) { // hovering over non chosen button
	  hoveredButton.classList.add('radiobutton__button--hover');			// display darker border color
	}
  }
  
  function removeRadiobuttonHoverClass(event) {
	const hoveredButton = event.currentTarget;
	hoveredButton.classList.remove('radiobutton__button--hover'); // display normal border color when mouse leaves button
  }

// Attach click event listener to each radio button
radiobuttons.forEach(button => {
	button.addEventListener('click', toggleRadiobuttonChosenClass);
	button.addEventListener('mouseover', addRadiobuttonHoverClass);
	button.addEventListener('mouseleave', removeRadiobuttonHoverClass);
});

// ------------------------- conference pass -------------------------

const conferencePasses = document.querySelectorAll('.conference-pass');

function handleClickOnConferencePass(event) {
	// Remove "chosen" and "inactive" classes from all conference passes
	conferencePasses.forEach(pass => {
	  pass.classList.remove('conference-pass--chosen', 'conference-pass--inactive');
	});
  
	// Add "chosen" class to the clicked conference pass
	const clickedPass = event.currentTarget;
	clickedPass.classList.add('conference-pass--chosen');
	clickedPass.classList.remove('conference-pass--hover'); // don´t display hover effect right after click

	// Add "inactive" class to the non-clicked passes
	conferencePasses.forEach(pass => {
		if (pass !== clickedPass) {
		  pass.classList.add('conference-pass--inactive');
		}
	  });
}

function addConferencePassHoverClass(event) {
	const hoveredPass = event.currentTarget;
	if (!hoveredPass.classList.contains('conference-pass--chosen')) { // hovering over non chosen pass
	  hoveredPass.classList.add('conference-pass--hover');			// display box shadow
	}
  }
  
  function removeConferencePassHoverClass(event) {
	const hoveredPass = event.currentTarget;
	hoveredPass.classList.remove('conference-pass--hover'); // display default pass style when mouse leaves button
  }

// Attach click event listener to each conference pass
conferencePasses.forEach(pass => {
	pass.addEventListener('click', handleClickOnConferencePass);
	pass.addEventListener('mouseover', addConferencePassHoverClass);
	pass.addEventListener('mouseleave', removeConferencePassHoverClass);
});
