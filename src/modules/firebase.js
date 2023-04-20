const highscoreListEl = document.getElementById("highscoreList");
export async function getDatabase() {
  const url = "https://miniprojekt1-3dbf4-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  const highscoreList = Object.values(data);
  // console.log(highscoreList);
  //sorterar från högst till lägst
  highscoreList.sort((a, b) => b.score - a.score);

  const olEl = document.createElement("ol");
  //loopar fram li element med spelarnas poäng och namn
  for(let i = 0; i < highscoreList.length; i++) {
    // const highscoreListObj = highscoreList[i];
    // console.log(highscoreList);
    const playerName = highscoreList[i].name;
    const playerScore = highscoreList[i].score;
    const playerNameAndPlayerScore = `Name: ${playerName} - Score: ${playerScore}`;


    const liEl = document.createElement("li");
    liEl.textContent = playerNameAndPlayerScore;
    olEl.append(liEl);
    highscoreListEl.append(olEl);
  };
}

export async function addAndPatchHighscore(playerName, playerScore) {
  const url = "https://miniprojekt1-3dbf4-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";
  const response = await fetch(url);
  const data = await response.json();

  let lowestScore = 100;
  let lowestScoreKey = null;
  //loopar igenom varje objekt i data
  for(const key in data) {
    const playerObj = data[key];
    console.log(playerObj);
    //jämför spelarens poäng med den lägsta poängen som hittas
    if(playerObj.score <= lowestScore){
      lowestScore = playerObj.score;
      lowestScoreKey = key;
    };
  }
  //är spelarens poäng högre än den lägsta poängen läggs den nya poängen till i databasen
  if(playerScore > lowestScore) {
    //skapa nytt objekt med spelarens poäng och namn
    const newHighscore = {
      name: playerName,
      score: playerScore,
    };
    const options = {
      method: "PATCH",
      body: JSON.stringify(newHighscore),
      headers: {
        "content-type": "application.json; charset=UTF-8"
      }
    };
    const patchUrl = `https://miniprojekt1-3dbf4-default-rtdb.europe-west1.firebasedatabase.app/highscore/${lowestScoreKey}.json`;
    await fetch(patchUrl, options);
    getDatabase();
  } else if(playerScore === lowestScore || playerScore < lowestScore) {
    getDatabase();
  };
}
