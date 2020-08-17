const username = document.getElementById("username");
const savebtn = document.getElementById("savebtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highscore = JSON.parse(localStorage.getItem('highscore')) || [];
//when sending data to web server data has to be string to convert it into string 
//stringify is used

const MAX_HIGH_SCORE= 5;

// when receiving data from web server(process the client request and return the webpage)
//data is always a  string to convert it into js obj json.parse is used

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',()=>{
    savebtn.disabled = !username.value;
}); 

 savehighscore=(e)=>{
    e.preventDefault();
    
    const score={
        score:mostRecentScore,
        name:username.value
    };

    highscore.push(score);
    highscore.sort((a,b)=> b.score-a.score);
    highscore.splice(5);
    
    localStorage.setItem("highscore",JSON.stringify(highscore));
    window.location.assign("/html/index.html");
};