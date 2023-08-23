const track = document.querySelector('.carousel_track');    // get our carousel track object from home-page.html
const slides = Array.from(track.children);
const trackers = document.querySelector('.carousel_trackers');
const tracker_arr = Array.from(trackers.children);
const prevButton = document.querySelector('.carousel_button--left');
const nextButton = document.querySelector('.carousel_button--right');
const dotTrackers = document.querySelector('.carousel_trackers');
const dots = Array.from(dotTrackers.children);

console.log(tracker_arr);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slides next to one another, starting all the way at the right
for (let i = 0; i < slides.length; i++) {
    // for each slide, add the combined width of all the slides next to it plus the 1.1 to make a bit of space between them
    slides[i].style.left = slideWidth * i + 'px';
}

// click left

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    const currentTracker = trackers.querySelector('.current-tracker');
    const targetTracker = currentTracker.previousElementSibling;
    currentTracker.classList.remove('current-tracker');
    targetTracker.classList.add('current-tracker');

    moveToSlide(track, currentSlide, prevSlide);
    console.log("Shifted carousel to the left");
})


// click right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentTracker = trackers.querySelector('.current-tracker');
    const targetTracker = currentTracker.nextElementSibling;
    currentTracker.classList.remove('current-tracker');
    targetTracker.classList.add('current-tracker');

    moveToSlide(track, currentSlide, nextSlide);
    console.log("Shifted carousel to the right");
})


// click carousel trackers to move