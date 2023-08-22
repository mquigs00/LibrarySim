const track = document.querySelector('.carousel_track');    // get our carousel track object from home-page.html
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel_button--left');
const nextButton = document.querySelector('.carousel_button--right');
const dotTrackers = document.querySelector('.carousel_trackers');
const dots = Array.from(dotTrackers.children);
console.log(slides);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

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

    moveToSlide(track, currentSlide, prevSlide);
    console.log("Shifted carousel to the left");
})


// click right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    console.log("Shifted carousel to the right");
})


// click carousel trackers to move