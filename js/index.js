
// ------------------------- nav bar -------------------------

const navBar = document.querySelector('nav');

const displayNavColor = () => {
	navBar.style.backgroundColor = 'var(--color-primary)';
};

const hideNavColor = () => {
  navBar.style.backgroundColor = 'transparent';
};

window.addEventListener('scroll', function() {
	// add background color to nav bar when you scroll down
	if (window.scrollY > 1) {
		displayNavColor();
	} else {
		hideNavColor();
	}
});

// ------------------------- hamburger menu -------------------------

const hamburgerIcon = document.querySelector('.hamburger-icon');
const openedHamburgerMenu = document.querySelector('.opened-hamburger-menu');
const closeMenuIcon = document.querySelector('.close-icon');

const displayOpenedHamburgerMenu = () => {
	openedHamburgerMenu.classList.add('opened-hamburger-menu--visible');
}

const closeOpenedHamburgerMenu = () => {
	openedHamburgerMenu.classList.remove('opened-hamburger-menu--visible');
}

// open hamburger menu when you click on hamburger icon
hamburgerIcon.addEventListener('click', displayOpenedHamburgerMenu);

// close hamburger menu when you click on close icon
closeMenuIcon.addEventListener('click', closeOpenedHamburgerMenu);

// ------------------------- scrolling -------------------------

document.addEventListener('DOMContentLoaded', function () {
    // function to scroll to a specific section
    function scrollToSection(sectionId) {
		openedHamburgerMenu.classList.remove('opened-hamburger-menu--visible'); // always close hamburger menu after click on links and before the page scrolls to correct section
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // navigation links
	const aboutNavElements = document.querySelectorAll('.nav__about');
	const speakersNavElements = document.querySelectorAll('.nav__speakers');

	aboutNavElements.forEach((aboutElement) => {
		aboutElement.addEventListener('click', function () {
			scrollToSection('about-section');
		});
	});

	speakersNavElements.forEach((speakersElement) => {
		speakersElement.addEventListener('click', function () {
			scrollToSection('speakers-section');
		});
	});

	// register buttons
	const navRegisterButtons = document.querySelectorAll('.nav__register-button');
	const joinUsRegisterButton = document.querySelector('.join-us-section .register-button');

	navRegisterButtons.forEach((registerButton) => {
		registerButton.addEventListener('click', function () {
			scrollToSection('register-section');
		});
	});

	joinUsRegisterButton.addEventListener('click', function () {
		scrollToSection('register-section');
	});
});

// scroll-to-top-button
const scrollToTopButton = document.querySelector('.scroll-button');

window.addEventListener('scroll', function() {
	// display button if the vertical scroll position is greater than 300 pixels
	if (window.scrollY > 300) {
		displayButton();
	} else {
		hideButton();
	}
});

const displayButton = () => {
scrollToTopButton.classList.add('display-block');
}

const hideButton = () => {
scrollToTopButton.classList.remove('display-block');
}

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	})
}

scrollToTopButton.addEventListener('click', scrollToTop);


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
const slidesContainer = slideshow.querySelector('.slideshow__slides');
let slides = slideshow.querySelectorAll('.slideshow__slide'); // initial slides
let filteredSlides = []; // empty array for filtered slides
const filterButtons = document.querySelectorAll('.filter-button');
const clearFilters = document.querySelector('#filter-button__clear');
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

  updateSlideVisibility();
};

const goToNextSlide = () => {
  if (index < lastIndex) {
    index = index + 1;
  } else {
    index = 0;
  }

  updateSlideVisibility();
};

const updateSlideVisibility = () => {
  slides.forEach(slide => {
    slide.classList.remove('slideshow__slide--visible');
  });

  filteredSlides.forEach(slide => {
    slide.classList.remove('slideshow__slide--visible');
  });

  if (filteredSlides.length > 0) { // if there are filtered slides, show them
    filteredSlides[index].classList.add('slideshow__slide--visible');
  } else { // if there are no filtered slides, show the initial ones
    slides[index].classList.add('slideshow__slide--visible');
  }
};

const updateCounter = () => {
  counter.textContent = `${index + 1} of ${totalSlides}`;
};

const changeSlide = (event) => {
  const button = event.currentTarget;

  if (button.dataset.direction === 'previous') {
    goToPreviousSlide();
  }

  if (button.dataset.direction === 'next') {
    goToNextSlide();
  }

  updateCounter();
};

controls.forEach(button => {
  button.addEventListener('click', changeSlide);
});

filterButtons.forEach(filterButton => {
  const filterSlides = (event) => {

	// hide all intitial slides
	slides.forEach(slide => {
		slide.classList.remove('slideshow__slide--visible');
	  });

    const currentButton = event.currentTarget;
    const currentButtonFilterBy = currentButton.dataset.filterBy;

	// filter slides based on year
    filteredSlides = [...slides].filter(slide => {
      if (currentButtonFilterBy === '*') {
        return true; // if clear button is clicked, do not filter
      } else {
        return slide.dataset.year === currentButtonFilterBy;
      }
    });

    slidesContainer.innerHTML = ''; // empty slides container

	// append filtered slides to container
    filteredSlides.forEach(slide => {
      slidesContainer.appendChild(slide);
    });

    if (filteredSlides.length > 0) {
      index = 0; // reset index
      totalSlides = filteredSlides.length;
      lastIndex = totalSlides - 1;
      filteredSlides[index].classList.add('slideshow__slide--visible'); // show first filtered slide
      counter.textContent = `${index + 1} of ${totalSlides}`; // update counter text
    } else {
      // if no filtered slides, show the original slides
      slides.forEach(slide => {
        slidesContainer.appendChild(slide);
      });

      totalSlides = slides.length;
      lastIndex = totalSlides - 1;
      slides[index].classList.add('slideshow__slide--visible');
      counter.textContent = `${index + 1} of ${totalSlides}`;
    }

    filterButtons.forEach(button => {
      button.classList.remove('filter-button--chosen');
    });

    if (currentButtonFilterBy !== '*') {
      currentButton.classList.add('filter-button--chosen');
    }
  };

  const addFilterButtonHoverClass = () => {
    filterButton.classList.add('filter-button--hover');
  };

  const removeFilterButtonHoverClass = () => {
    filterButton.classList.remove('filter-button--hover');
  };

  filterButton.addEventListener('click', filterSlides);
  filterButton.addEventListener('mouseover', addFilterButtonHoverClass);
  filterButton.addEventListener('mouseleave', removeFilterButtonHoverClass);
});

updateCounter();


// ------------------------- radio button -------------------------

const radiobuttons = document.querySelectorAll('.radiobutton__button');

const toggleRadiobuttonChosenClass = (event) => {
	// remove "chosen" class from all radio buttons
	radiobuttons.forEach(button => {
	  button.classList.remove('radiobutton__button--chosen');
	});
  
	// add "chosen" class to the clicked radio button
	const clickedButton = event.currentTarget;
	clickedButton.classList.add('radiobutton__button--chosen');
	clickedButton.classList.remove('radiobutton__button--hover'); // don´t display hover effect right after click
}

const addRadiobuttonHoverClass = (event) => {
	const hoveredButton = event.currentTarget;
	if (!hoveredButton.classList.contains('radiobutton__button--chosen')) { // hovering over non chosen button
	  hoveredButton.classList.add('radiobutton__button--hover');			// display darker border color
	}
  }
  
  const removeRadiobuttonHoverClass = (event) => {
	const hoveredButton = event.currentTarget;
	hoveredButton.classList.remove('radiobutton__button--hover'); // display normal border color when mouse leaves button
  }

// attach click event listener to each radio button
radiobuttons.forEach(button => {
	button.addEventListener('click', toggleRadiobuttonChosenClass);
	button.addEventListener('mouseover', addRadiobuttonHoverClass);
	button.addEventListener('mouseleave', removeRadiobuttonHoverClass);
});

// ------------------------- conference pass -------------------------

const conferencePasses = document.querySelectorAll('.conference-pass');

const handleClickOnConferencePass = (event) => {
	// remove "chosen" and "inactive" classes from all conference passes
	conferencePasses.forEach(pass => {
	  pass.classList.remove('conference-pass--chosen', 'conference-pass--inactive');
	});
  
	// add "chosen" class to the clicked conference pass
	const clickedPass = event.currentTarget;
	clickedPass.classList.add('conference-pass--chosen');
	clickedPass.classList.remove('conference-pass--hover'); // don´t display hover effect right after click

	// add "inactive" class to the non-clicked passes
	conferencePasses.forEach(pass => {
		if (pass !== clickedPass) {
		  pass.classList.add('conference-pass--inactive');
		}
	  });
}

const addConferencePassHoverClass = (event) => {
	const hoveredPass = event.currentTarget;
	if (!hoveredPass.classList.contains('conference-pass--chosen')) { // hovering over non chosen pass
	  hoveredPass.classList.add('conference-pass--hover');			// display box shadow
	}
  }
  
  const removeConferencePassHoverClass = (event) => {
	const hoveredPass = event.currentTarget;
	hoveredPass.classList.remove('conference-pass--hover'); // display default pass style when mouse leaves button
  }

// attach click event listener to each conference pass
conferencePasses.forEach(pass => {
	pass.addEventListener('click', handleClickOnConferencePass);
	pass.addEventListener('mouseover', addConferencePassHoverClass);
	pass.addEventListener('mouseleave', removeConferencePassHoverClass);
});

// ------------------------- register form -------------------------

const registerSection = document.querySelector('.register-section');
const registerButton = registerSection.querySelector('.register-button');
const form = registerSection.querySelector('form');
const inputFields = form.querySelectorAll('.form__input-text');
const radioButtons = form.querySelectorAll('.radiobutton__button');
const toast = document.querySelector('.toast');

const register = () => {
	let isEmpty = false;

	// check if inputs are empty
	inputFields.forEach(input => {
		if (input.value === "") {
			isEmpty = true;
		}
	});

	if (isEmpty) {
		// display toast for 5 seconds
		toast.style.display = 'flex';
		toast.style.backgroundColor = 'red';
		toast.innerHTML = "Fill out the whole form and choose a conference pass";
		setTimeout(() => {
			toast.style.display = 'none';
		}, 5000);
	} else {

		// clear form inputs
		form.reset();

		// set radio buttons to default
		radioButtons.forEach(radioButton => {
			radioButton.classList.remove('radiobutton__button--chosen');
		});
		radioButtons[0].classList.add('radiobutton__button--chosen');

		// set conference passes to default
		conferencePasses.forEach(conferencePass => {
			conferencePass.classList.remove('conference-pass--chosen');
			conferencePass.classList.remove('conference-pass--inactive');
		});

		// display toast for 5 seconds
		toast.style.display = 'flex';
		toast.style.backgroundColor = 'rgb(0, 146, 104)';
		toast.innerHTML = "You are registered to the ITconference 2023!";
		setTimeout(() => {
			toast.style.display = 'none';
		}, 5000);
	}
}

registerButton.addEventListener('click', register);
