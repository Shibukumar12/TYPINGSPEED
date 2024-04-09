const lines = [
    "the sun rises, painting the sky with hues of gold through this",
    "birds chirp melodiously announcing the arrival of dawn's",
    "dew-kissed grass glistens reflecting the morning's gentle on",
    "a gentle breeze whispers secrets through the rustling leaves",
    "mountains stand tall guardians of ancient tales untold color",
    "rivers meander lazily carving paths through verdant world i",
    "flowers bloom their vibrant colors dancing in the sunlight",
    "time marches on a relentless force shaping the world your",
    "dreams take flight carried on wings of hope and ambition a",
    "life's symphony plays on each note a story unfolding on ear"
];

let score = 0;
let error = 0;
let accuracy=0;
let parentdiv = document.querySelector(".parentclass");
let randmvalue = Math.floor((Math.random() * 9) + 1);
let mainpara = lines[randmvalue].split(" ");
let mainpara2 = lines[randmvalue];
const keypressmusic= new Audio('typing.mp4');
const gameoverSound= new Audio('gameoversound.wav');
// ************************* Main process **********************

const process = (score, error) => {
    parentdiv.innerHTML = `
    <section class="container">
        <h2 class="timer">60</h2>
        <div class="record">
            <p>Accuracy</p>
            <h2 class="accuracy">---</h2>
        </div>
        <div class="record">
            <p>Words/mins</p>
            <h2 class=wpm>${score} WPM</h2>
        </div>
        <div class="record">
            <p>Error</p>
            <h2 class="error">${error}</h2>
        </div>
    </section>
    
    <section class="content visible ">
    <div class="read">
    <h2 class="readtext">${mainpara2}</h2>
        </div>
        
        <input type="text" placeholder="Start Typing here....">
        </section>
        `;
        
        
        let userinput = document.querySelector("input");
        let user = "";
        let index = 0;
        let key = true;
        
        userinput.addEventListener("keyup", (evt) => {
            console.log(userinput);
            keypressmusic.play();
            console.log(evt.key);
            if (key) {
                setTIme();    
                key = false
            }
            
            user = evt.target.value;
            
            if (evt.code == "Space") {
                
                let usertyp = user.trim();
                matching(usertyp, index);
                evt.target.value = "";
                
                if (mainpara.length - 1 == index) {
                    updateArray();
                    console.log(mainpara);
                    index = 0;
                    return;
                }
            user = "";
            console.log(index);
            index += 1;
        }
        
        evt.preventDefault();
    });
    
    
};

// ********************* update Question text **********************

const updateArray = () => {
    randmvalue = Math.floor((Math.random() * 9) + 1);
    mainpara = lines[randmvalue].split(" ");
    mainpara2 = lines[randmvalue];
    document.querySelector(".readtext").innerText = mainpara2;
    
};



// ****************** matching *************************
// check the user Answer. it Ture or False

const matching = (usertyp, index) => {
   
    if (usertyp == mainpara[index]) {
        score += 1;
        document.querySelector(".wpm").innerText = `${score} WPM`

    } else {
        error += 1;
        document.querySelector(".error").innerText = `${error} `
       
    }
    let total=score+error;
    accuracy=Math.round((score/total)*100)+"%"
    document.querySelector('.accuracy').innerText=accuracy
};



// ********************** timer *****************************
// control the timer system. only one time call the SetTime() function in the addEventListener={} .

let endTime;
const setTIme = () => {
    endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + 60)
    controlTimer()
}

const controlTimer = () => {
    let currentTime = new Date();
    let remaintimming = ((endTime - currentTime) / 1000)
    
    if (remaintimming <= 0) {
        document.querySelector('.parentclass').innerHTML=`
        <section class="container">

        <div class="record">
            <p>Accuracy</p>
            <h2 class="accuracy">${accuracy}</h2>
        </div>
        <div class="record">
            <p>Words/mins</p>
            <h2 class=wpm>${score} WPM</h2>
        </div>
        <div class="record">
            <p>Error</p>
            <h2 class="error">${error}</h2>
        </div>

    </section>
        <button class="newgame"> Play Again  </button>
        `
        gameoverSound.play();
        playagain();
        let removecontent =document.querySelector('.content')
        removecontent.classList.remove("content")
    }
    else {
        let seconds = Math.round(remaintimming % 60)
        document.querySelector(".timer").innerText = seconds
        setTimeout(controlTimer, 1000);
    }
}



// ****************** For playagain function ****************

const playagain=()=>{
  const newgame=  document.querySelector(".newgame");

  newgame.addEventListener("click",()=>{
    score=0;
    error=0;
    accuracy=0;
    process(score,error);
    updateArray();
    
  })
}


process(score, error);

