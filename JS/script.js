//0.Requirements
let choose_img = document.querySelector(".choose-img button");
let choose_input = document.querySelector(".choose-img input");
let display_img = document.querySelector(".view-image img");
let filter_buttons = document.querySelectorAll(".icons-room button");
let slider = document.querySelector(".slider input");
let filter_name = document.querySelector(".filter-information .name");
let slider_value = document.querySelector(".filter-information .value");
let brightness = 100, contrast = 100, saturate = 100, invert = 0, blur = 0, rotate = 0, flip_x = 1, flip_y = 1;
let rotate_buttons = document.querySelectorAll(".rotate-room button");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

//1.How to access User File System
choose_img.addEventListener(
    "click",
    ()=> choose_input.click()
)

//2.Process To Upload User Choice Image & open all options for user
choose_input.addEventListener(
    "change",
    ()=>{
       let fileName = choose_input.files[0];
       if(!fileName)
           return;
       display_img.src = URL.createObjectURL(fileName);
       display_img.addEventListener(
        "load",
        document.querySelector(".container").classList.remove("disabled")
       )
    }
)

filter_buttons.forEach(
     (element)=>{
        element.addEventListener(
            "click",
            ()=>{
                document.querySelector(".active").classList.remove("active");
                element.classList.add("active");
                filter_name.innerText = element.id;
                if(element.id === "brightness"){
                   slider.max = "200";
                   slider.value = brightness;
                   slider_value.innerText = `${brightness}`;
                }else if(element.id === "contrast"){
                    slider.max = "200";
                    slider.value = contrast;
                    slider_value.innerText = `${contrast}`;
                }else if(element.id === "saturate"){
                    slider.max = "200";
                    slider.value = saturate;
                    slider_value.innerText = `${saturate}`;
                }else if(element.id === "invert"){
                    slider.max = "100";
                    slider.value = invert;
                    slider_value.innerText = `${invert}`;
                }else if(element.id === "blur"){
                    slider.max = "100";
                    slider.value = blur;
                    slider_value.innerText = `${blur}`;
                }
            }
        )
     }
);

slider.addEventListener(
    "input",

    ()=>{
        slider_value.innerText = `${slider.value}%`;
        let sliderState = document.querySelector(".icons-room .active");
        if(sliderState.id === 'brightness'){
            brightness = slider.value;
        }else if(sliderState.id === 'contrast'){
            contrast = slider.value;
        }else if(sliderState.id === 'saturate'){
            saturate = slider.value;
        }else if(sliderState.id === 'invert'){
            invert = slider.value;
        }else if(sliderState.id === 'blur'){
            blur = slider.value;
        }
        display_img.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    }
)

rotate_buttons.forEach(
    (element)=>{
        element.addEventListener(
            "click",
            ()=>{
                if(element.id === "rotate_left"){
                    rotate -= 90;
                }
                else if(element.id === "rotate_right"){
                    rotate += 90;
                }
                else if(element.id === "flip_x"){
                   flip_x = flip_x === 1 ? -1 : 1;
                }
                else if(element.id === "flip_y"){
                    flip_y = flip_y === 1 ? -1 : 1;
                }
                display_img.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
            }
        )
    }
)

reset.addEventListener(
    "click",
    ()=>{
        brightness = 100, contrast = 100, saturate = 100, invert = 0, blur = 0, rotate = 0, flip_x = 1, flip_y = 1;
        display_img.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
        display_img.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    }
)


save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = display_img.naturalWidth;
    canvas.height = display_img.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flip_x, flip_y);
    ctx.drawImage(
      display_img,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
})