const root = document.documentElement;
const tipField = document.getElementById("tip");
const bg = document.getElementById("gradBG");
const mainBody = document.getElementById("mainBody");
const memMax = 60;
const dupItsMax = 55;
let allTips = [];
let dupIts = 0;
let randGrad;

const sheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCgpXv8IJAZPzQ_RAWY7PIRedKHrCeWjOVHo1xogs-mzrXkQZh9J7d3VAONBjN4dsLUhsP-LYdRQUy/pub?gid=0&single=true&output=csv';

const colourSets = [
    {x:"rgb(194,84,246)", y:"rgb(48,54,123)"},
    {x:"rgb(255,8,97)", y:"rgb(214,242,140)"},
    {x:"rgb(240,184,56)", y:"rgb(210,54,180)"},
    {x:"rgb(222,147,162)", y:"rgb(211,99,166)"},
    
    {x:"rgb(85,41,210)", y:"rgb(102,160,233)"},
    {x:"rgb(23,196,209)", y:"rgb(74,231,44)"},
    {x:"rgb(140,205,49)", y:"rgb(139,119,6)"},
    
    {x:"rgb(213,73,24)", y:"rgb(221,6,40)"}
]

let prevState = [
    {
        id: null,
        tip:null,
        grad:0
    }
]

//all events
window.addEventListener('DOMContentLoaded', initAll);

document.addEventListener("click", e => {
    
    //if matches
    if(e.target.matches("#newTip")) {
        genState();
    }
    
});

function resizeView() {
    root.style.setProperty('--largest-dist', `${(window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight}px`);
}
  
window.onresize = resizeView;

const getCC = _ => {
    return (Math.floor(Math.random() * Math.floor(255))) + 1;
}

const genState = _ => {
    //setColours
    let currTip = allTips[Math.floor(Math.random() * Math.floor(allTips.length))];
    let result = prevState.filter(state => state.id === currTip.id);
    console.log(currTip.id);
    
    if (dupIts === 999) {
        //if too many rand iterations, then just increment the previous tip id by one. if previous was the last tip, then go to beginning
        currTip = (prevState[prevState.length - 1].id === allTips[allTips.length - 1].id) ? allTips[0] : allTips[prevState[prevState.length - 1].id - 100];
        result = [];
        dupIts = 0;
    }
    
    if (result.length === 0) {
        
        if (prevState.length > 1) {
            randGrad = Math.floor(Math.random() * Math.floor(colourSets.length));
        }
        
        while (randGrad === prevState[prevState.length - 1].grad) {
            randGrad = Math.floor(Math.random() * Math.floor(colourSets.length));
            console.log("DUP COL");
        }
        
        root.style.setProperty('--colour-grad-x', colourSets[randGrad].x);
        root.style.setProperty('--colour-grad-y', colourSets[randGrad].y);
        
        //newTip
        tipField.innerText = currTip.tip;
        
        if (prevState.length === memMax) {
            prevState.splice(0,1);
            
        }
        prevState.push({
            id: currTip.id,
            tip: currTip.tip,
            grad: randGrad
        });
    }
    else {
        console.log("DUP");
        dupIts++;
        if (dupIts > dupItsMax) {
            dupIts = 999;
            console.log("DUP CUT");
        }
        
        genState();
    }
    
    console.log(prevState);
}

function initAll() {
    //get initial colours
    randGrad = Math.floor(Math.random() * Math.floor(colourSets.length));
    root.style.setProperty('--colour-grad-x', colourSets[randGrad].x);
    root.style.setProperty('--colour-grad-y', colourSets[randGrad].y);
    
    //set largest dist
    root.style.setProperty('--largest-dist', `${(window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight}px`);
    
    Papa.parse(sheetsURL, {
        download: true,
        header: false,
        complete: genArr
    });
}

function genArr(results) {
    results.data.map((tipArr, i) => {
        allTips[i] = {id: 101 + i, tip: tipArr[0]};
    });
    console.log(allTips);
    //init
    bg.parentElement.classList.add("active");
    mainBody.classList.add("active");
    genState();
}
