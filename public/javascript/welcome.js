// objects
// =====================================
// ============= Scroll ================
// =====================================
const arrow_up = document.querySelector('.arrow_up');
arrow_up.addEventListener('click', scroll_up);

function scroll_up() {
    window.scroll({
        top: 0
    ,   left: 0
    ,   behavior: "smooth"
    });
}

// =====================================
// ============= Slider ================
// =====================================
function getSlideData() {
    const slideData = [ 
        {
            img: "../images/Travel_main.jpg"
        ,   description: "The Travel Blog" 
        }
        ,
        {
            img: "../images/Coffee_main.jpg"
        ,   description: "The Coffee Blog"
        }
        ,
        {
            img: "../images/Soccer_main.jpg"
        ,   description: "The Soccer Blog"
        }
    ];
    return slideData;
}

const slide_area = document.querySelector('.slide_show');
const left_slide_btn = document.querySelector('.fa-arrow-left');
const right_slide_btn = document.querySelector('.fa-arrow-right');

let counter = 0;
function right_slide() {
    let slideImgData = getSlideData();
    if (counter == slideImgData.length) {
        counter = 0;
        slide_area.children[1].src = slideImgData[counter].img;
        slide_area.children[4].textContent = slideImgData[counter].description;
        counter++;
    } else {
        slide_area.children[1].src = slideImgData[counter].img;
        slide_area.children[4].textContent = slideImgData[counter].description;
        counter++;
    }
}

function left_slide() {
    let sliderImageData = getSlideData();
    if (counter == 0) {
        counter = sliderImageData.length - 1;
        console.log(counter);
        slide_area.children[1].src = sliderImageData[counter].img;
        slide_area.children[4].textContent = sliderImageData[counter].description;
    } else {
        slide_area.children[1].src = sliderImageData[--counter].img;
        slide_area.children[4].textContent = sliderImageData[counter].description;
    }
    
}

right_slide_btn.addEventListener("click", right_slide);
left_slide_btn.addEventListener("click", left_slide);
