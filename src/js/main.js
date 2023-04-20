import { getDatabase, addAndPatchHighscore } from "../modules/firebase.js";
import { removeButtons } from "../modules/removeButtons.js";
getDatabase();
const highscoreListEl = document.getElementById("highscoreList");

const formButton = document.querySelector("form Button");
const inputEl = document.querySelector(".inputPlayerName");

formButton.addEventListener("click", event =>{
    event.preventDefault();
    
        //hämtar input värdet
        const inputText = inputEl.value;
        
        const playerName = document.querySelector(".playerName");
        const errorMessageEl = document.querySelector("#errorMessage");
        if(inputText === "") {
            errorMessageEl.textContent = "You need to enter your name to start the game!"
        } else {
            //visar det namn användaren skriver in
            playerName.textContent = `${inputText} chose: `;
            playerName.append(playerText);
    
            //Tar bort formuläret så användaren inte kan skriva in namn igen
            const removeForm = document.querySelector("#form");
            removeForm.remove();

            playerButtonsChoice.forEach(button => button.disabled = false);
        } 
    });

    const playerText = document.querySelector("#playerText");
    const computerText = document.querySelector("#computerText");
    const resultText = document.querySelector("#resultText");
    const playerButtonsChoice = document.querySelectorAll(".buttonChoice");
    // disablar sten, sax, påse knapparna tills användaren skriver in något i inputen
    playerButtonsChoice.forEach(button => button.disabled = true);
    let player;
    let computer;
    let result;
    let score = 0;

    //hämtar span taggarna med spelaren & datorn namn och sätter de till 0
    let playerScore = document.querySelector(".playerScore");
    // const computerScore = document.querySelector(".computerScore");
    playerScore.innerText = 0;
    // computerScore.innerText = 0;

    playerButtonsChoice.forEach(button => button.addEventListener("click", () => {
        //få fram texten på knappen användaren trycker på (Rock, Paper, Scissors)
        player = button.textContent;
        playerText.innerText = `${player}`;
        //funktion för datorns val
        computersChoice();
        //få fram texten på knappen datorns random val (Rock, Paper, Scissors)
        computerText.innerText = `Computer chose: ${computer}`;
        resultText.innerText = `Winner: ${checkResult()}`;
    }));

    //datorns val
    function computersChoice() {
        //random nummer 1-3
        const randomNumber = Math.floor(Math.random() *playerButtonsChoice.length) +1;
        // console.log(randomNumber);

        if(randomNumber === 1){
            computer = "Rock";
        }
        else if(randomNumber === 2) {
            computer = "Paper";
        }
        else if(randomNumber === 3) {
            computer = "Scissors";
        }
    } 
    //kolla vinnaren
    function checkResult(){
        if(player === computer){
            result = "It's a draw";
            //uppdaterar result
            return result;
        }
        //Spelaren vinner
        if(player === "Rock" && computer === "Scissors" || player === "Paper" && computer === "Rock" || player === "Scissors" && computer === "Paper"){
            result = "You won this round!"
            score++
            playerScore.textContent = score;
            return result;
        }
        //Datorn vinner
        if(computer === "Rock" && player === "Paper" || computer === "Paper" && player === "Rock" || computer === "Scissors" && player === "Paper" || computer === "Rock" && player === "Scissors"){
            result = "You lost, try again!";
                //Tar bort knappar när datorn vinner
                removeButtons();
                addAndPatchHighscore(inputEl.value, score);
                //nollställer databasen
                highscoreListEl.textContent = "";
            }
            return result;
        }
    const playAgain = document.querySelector("#playAgain");
    //starta om spelet
    playAgain.addEventListener("click", function(){
        window.location.reload();
    });


   