const track = document.querySelector('.carousel_track');                    // get our carousel track object from home-page.html
const slides = Array.from(track.children);                                  // get our slide objects
const dotNav = document.querySelector('.carousel_nav');              // get our bottom trackers
const dots = Array.from(dotNav.children);                          // get our tracker objects array

// get our buttons
const prevButton = document.querySelector('.carousel_button--left');
const nextButton = document.querySelector('.carousel_button--right');

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to one another, starting all the way at the right
for (let i = 0; i < slides.length; i++) {
    // for each slide, add the combined width of all the slides next to it plus the 1.1 to make a bit of space between them
    slides[i].style.left = slideWidth * i + 'px';
}

// shift to the left or right and update the current slide subclass
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}

const updateArrows = (targetIndex) => {
    if (targetIndex === 0) {
        prevButton.style.visibility = 'hidden';
        nextButton.style.visibility = 'visible';
    } else if (targetIndex === slides.length-1) {
        prevButton.style.visibility = 'visible';
        nextButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
        nextButton.style.visibility = 'visible';
    }
}

// when you click to the left arrow, shirf to the previous slide
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');             // find the slide with the current slide subclass
    const prevSlide = currentSlide.previousElementSibling;                  // find the slide before it
    moveToSlide(track, currentSlide, prevSlide);4

    // find the tracker with the current-tracker subclass, and the one before it. Swap the classes to update
    // which slide we are on
    const currentDot = dotNav.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;
    updateDots(currentDot, prevDot);

    const targetIndex = slides.findIndex(slide => slide === prevSlide);
    updateArrows(targetIndex);
})

// when you click the right arrow, shift to the next slide
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');             // find the slide with the current slide subclass
    const nextSlide = currentSlide.nextElementSibling;                      // find the slide after it
    moveToSlide(track, currentSlide, nextSlide);

    // find the tracker with the current-tracker subclass, and the one after it. Swap the classes to update
    // which slide we are on
    const currentDot = dotNav.querySelector('.current-dot');      
    const nextDot = currentDot.nextElementSibling;
    updateDots(currentDot, nextDot);

    const targetIndex = slides.findIndex(slide => slide === nextSlide);
    updateArrows(targetIndex);
})

// move to the dot that is clicked on
dotNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return;                                         // if our click doesn't land on a button, just return (end function)

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotNav.querySelector('.current-dot');

    const targetIndex = dots.findIndex(dot => dot === targetDot);    // find the index of the dot we are moving to
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    updateArrows(targetIndex);
})