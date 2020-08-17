const ques=document.getElementById("ques");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const choices=Array.from(document.getElementsByClassName("choice"));//creates a new array
const questioncounter=document.getElementById("questionCounter");
const scoretext=document.getElementById("scoreText");

let currentQuestion={};//object
let acceptingAns=true;
let score=0;
let quescounter=0;
let availableques=[];//array

let question=[];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        console.log(loadedQuestions.results);
        question =loadedQuestions.results.map(loadedQuestions =>{
            const formattedques={
                ques :loadedQuestions.question
            };
            const answerchoices=[...loadedQuestions.incorrect_answers];
            formattedques.answer=Math.floor(Math.random() *4)+1;
            answerchoices.splice(formattedques.answer-1,0,loadedQuestions.correct_answer);
            answerchoices.forEach((choice,index)=>{
                formattedques["choice"+(index+1)]=choice;
            });
            return formattedques;
            });
        startGame();
    })
    .catch(err => {
        console.error(err);
    });

   
const correctBonus=10;
const maxQues=5;

 startGame=()=>{
    quescounter=0;
    score=0;
    availableques=[...question];//displays all element of a question array
    console.log(availableques);
    getNewQuestion();
    };

getNewQuestion=()=>{
    if(availableques.length==0 || quescounter>=maxQues){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("\end.html");//load and display specified url
    }
    quescounter++;
    questioncounter.innerText= quescounter+"/"+maxQues;

    //displays ques
    const questionindex = Math.floor(Math.random()*availableques.length);//returns a random no bw 0 to 4(ie availno)
    currentQuestion = availableques[questionindex];
    ques.innerText = currentQuestion.ques;//inner text displays current ques
    
    //displays all choices of current ques
    choices.forEach((choice)=>{//for each-displays all element in the array
        const number=choice.dataset["number"];
        choice.innerText=currentQuestion["choice" +number];
    });
    
    availableques.splice(questionindex,1);//splice-items to be added splice(index,no of items removed)
    acceptingAns=true;
};
choices.forEach((choice)=>{
    choice.addEventListener("click",(e)=>{
       
        if(!acceptingAns)return;
        acceptingAns=false;
        const selectedchoice=e.target;//target-returns selected choice
        const selectedans=selectedchoice.dataset["number"];//returns choice's number 
       
        const classToApply=
        selectedans==currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply=="correct"){
            incrementScore(correctBonus);
        }
        selectedchoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
                selectedchoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
             },1000
        );
     });
});

incrementScore=(num)=>{
    score = score+num;
    scoretext.innerText = score;
};




