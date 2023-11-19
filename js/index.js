
// ------------------------- nav bar -------------------------

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

// ------------------------- scrolling -------------------------

document.addEventListener('DOMContentLoaded', function () {
    // function to scroll to a specific section
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // navigation links
    document.querySelector('.nav__element:nth-child(1)').addEventListener('click', function () {
        scrollToSection('about-section');
    });

    document.querySelector('.nav__element:nth-child(2)').addEventListener('click', function () {
        scrollToSection('speakers-section');
    });

	// register buttons
    document.querySelector('.nav__element.register-button').addEventListener('click', function () {
        scrollToSection('register-section');
    }); 
	
    document.querySelector('.join-us-section .register-button').addEventListener('click', function () {
        scrollToSection('register-section');
    });
});


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
const slideshowSlides = slideshow.querySelector('.slideshow__slides');
const originalSlides = slideshow.querySelectorAll('.slideshow__slide'); // initial slides
let slides = [...originalSlides]; // shallow copy for manipulation
const filterButtons = document.querySelectorAll('.filter-button');
const controls = slideshow.querySelectorAll('.slideshow__control-button');
const counter = slideshow.querySelector('.slideshow__counter');

let index = 0;
let totalSlides = slides.length;
let lastIndex = totalSlides - 1;

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

  slides[index].classList.add('slideshow__slide--visible');
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

  slides[index].classList.add('slideshow__slide--visible');
};

const updateCounter = () => {
  counter.textContent = `${index + 1} of ${totalSlides}`;
}

const changeSlide = (event) => {
  const button = event.currentTarget;

  if (button.dataset.direction === 'previous') {
    goToPreviousSlide();
  }

  if (button.dataset.direction === 'next') {
    goToNextSlide();
  }

  updateCounter();
}

controls.forEach(button => {
  button.addEventListener('click', changeSlide);
});

filterButtons.forEach(filterButton => {
  const filterSlides = (event) => {
    const currentButton = event.currentTarget;
    const currentButtonFilterBy = currentButton.dataset.filterBy;

	// remove 'filter-button--chosen' from all buttons
    filterButtons.forEach(button => {
		button.classList.remove('filter-button--chosen');
	  });
  
	// add 'filter-button--chosen' to the clicked button
	if (currentButtonFilterBy !== '*') {
		currentButton.classList.add('filter-button--chosen');
	}

    const filteredSlides = Array.from(originalSlides).filter(slide => {
		if (currentButtonFilterBy === '*') {
			filterButtons.forEach(button => {
				button.classList.remove('filter-button--chosen');
			});
			
			return true;
		} else {
			return slide.dataset.year === currentButtonFilterBy;
		}
	  });
	  

    slideshowSlides.innerHTML = ''; // empty slideshow container

    filteredSlides.forEach(slide => {
      slideshowSlides.appendChild(slide); // append only the filtered slides to slideshow container
    });
    console.log(filteredSlides);
    console.log(originalSlides);

    if (filteredSlides.length > 0) {
      index = 0; // reset index to the first visible slide
      totalSlides = filteredSlides.length; // update totalSlides
      lastIndex = totalSlides - 1; // update lastIndex
      updateCounter();
      filteredSlides[0].classList.add('slideshow__slide--visible'); // make first slide visible
    }
  };

  const addFilterButtonHoverClass = () => {
	filterButton.classList.add('filter-button--hover');
  }

  const removeFilterButtonHoverClass = () => {
	filterButton.classList.remove('filter-button--hover');
  }

  filterButton.addEventListener('click', filterSlides);
  filterButton.addEventListener('mouseover', addFilterButtonHoverClass);
  filterButton.addEventListener('mouseleave', removeFilterButtonHoverClass);
});

updateCounter();



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
