

 let element=document.querySelector("#btn-search");
 element?.addEventListener("click", getInput);


function getInput() {
let userInput = (<HTMLInputElement>document.getElementById("name")).value;
async function stonk(){
    const response = await fetch(`
    https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=NF4D92V4LLY53NLT`);
    const data =await response.json();
    let infoDiv = document.querySelector('.ticker-box')as HTMLDivElement;
    infoDiv.innerHTML = ""
    

    let ticker =data.bestMatches;
    let matchScore =data.bestMatches;
    let tickerNames=data.bestMatches;
   
    

    for (const key in matchScore) {
      let contentDiv= document.createElement("div") as HTMLDivElement;
        contentDiv.className="stock-div";
        contentDiv.innerHTML="";
        const header = ticker[key]["1. symbol"]
        const matchE = matchScore[key]["9. matchScore"];
        const tickerName= tickerNames[key]["2. name"]
        //
        if (matchE>0.7) {
          contentDiv.innerHTML=`<button class="headers" onclick="getInfo()"> <br>${header}</button>${tickerName}<br> ${matchE*100}% match `;
          infoDiv.append(contentDiv);
        }/*  else if (matchE===0){
          contentDiv.innerHTML=`<h4>No Match on that search , try again</h4>`;
        } */
    }
}
stonk();
}




/* 
let headerPress=document.querySelector(".headers");
 headerPress?.addEventListener("click", getInput); */
function getInfo() {
let userPress = (<HTMLInputElement>document.querySelector(".headers")).innerText;
  async function stonkTwo(){
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=NF4D92V4LLY53NLT`);
    const data =await response.json();
    console.log(data);

  }
  stonkTwo();
}


//To-do 
/* Bygga ut funktionen för att hämta ut alla sök resultat , ex med for-in loop
Bygga ut så alla sök alternativen kommer ut som tryckbar text. 

När användaren trycker på texten så ska det göras en ny sökning via Api:et för att ta fram 
veckans kurs på aktien. Samt eventuell information om aktien

Fixa en snurrande text med ticker namn + senaste kursvärdet
*/
