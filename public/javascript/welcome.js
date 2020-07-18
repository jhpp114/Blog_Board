// objects
function getSlideData() {
    const slideData = [ 
        {
            img: "../images/Travel_main.jpg"
        ,   description: "The Travel Blog"
        }
        ,
        {
            img: "../images/Programming_main.jpg"
        ,   description: "The Programming Blog"
        }
        ,
        {
            img: "../images/Nature_main.jpg"
        ,   description: "The Nature Blog"
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
    slide_area.children[1].src = slideImgData[counter].img;
    counter++;
}
console.log(slide_area.children[1].src);

right_slide_btn.addEventListener("click", right_slide);
