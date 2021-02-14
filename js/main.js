const root = document.documentElement;
const tipField = document.getElementById("tip");
const bg = document.getElementById("gradBG");
const memMax = 3;

const testTips = [
    {
        id:101,
        tip:"Create a background effect by cutting out a small slice of your existing audio and manipulating it (pitch shift, time stretch, reverse, reverb, filter, delay, frequency shift...)."
    },
    {
        id: 102,
        tip:"Automate a swell in volume or a prominent effect parameter of any sound that leads into an important beat."
    },
    {
        id:103,
        tip:"tip 3."
    },
    {
        id:104,
        tip:"tip 4."
    },
    {
        id:105,
        tip:"tip 5."
    },
]

const colourSets = [
    {x:"rgb(194,84,246)", y:"rgb(48,54,123)"},
    {x:"rgb(255,8,97)", y:"rgb(214,242,140)"},
    {x:"rgb(212,58,130)", y:"rgb(150,75,12)"},
    {x:"rgb(194,4,46)", y:"rgb(79,156,98)"},
    {x:"rgb(240,184,56)", y:"rgb(210,54,180)"}
]

let prevState = [
    {
        id: null,
        tip:null,
        grad:0
    }
]

//all click events
document.addEventListener("click", e => {
    
    //if matches
    if(e.target.matches("#newTip")) {
        genState();
    }
    
});

const getCC = _ => {
    return (Math.floor(Math.random() * Math.floor(255))) + 1;
}

const genState = _ => {
    //setColours
    let currTip = testTips[Math.floor(Math.random() * Math.floor(testTips.length))];
    let result = prevState.filter(state => state.id === currTip.id);
    console.log(currTip.id);
    
    if (result.length == 0) {
        
        let randGrad = Math.floor(Math.random() * Math.floor(colourSets.length));
        
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
        genState();
    }
    
    console.log(prevState);
}

//init
genState();