const root = document.documentElement;
const tipField = document.getElementById("tip");
const bg = document.getElementById("gradBG");

const testTips = [
    "Create a background effect by cutting out a small slice of your existing audio and manipulating it (pitch shift, time stretch, reverse, reverb, filter, delay, frequency shift...).",
    "Automate a swell in volume or a prominent effect parameter of any sound that leads into an important beat."
]

//all click events
document.addEventListener("click", e => {
    
    //if matches
    if(e.target.matches("#newTip")) {
        newTip();
        setColours();
    }
    
});

const getCC = _ => {
    return (Math.floor(Math.random() * Math.floor(255))) + 1;
}
const setColours = _ => {
    root.style.setProperty('--colour-grad-x', `rgb(${getCC()},${getCC()},${getCC()})`);
    root.style.setProperty('--colour-grad-y', `rgb(${getCC()},${getCC()},${getCC()})`);
}

const newTip = _ => {
    tipField.innerText = testTips[Math.floor(Math.random() * Math.floor(testTips.length))];
}

//init
setColours();
newTip();
