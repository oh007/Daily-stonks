

 let element=document.querySelector("#btn-search");
 element?.addEventListener("click", getInput);


function getInput() {
let userInput = (<HTMLInputElement>document.getElementById("name")).value;
async function stonk(stonk){
    const response = await fetch(`
    https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=NF4D92V4LLY53NLT`);
    const data =await response.json();
    let infoDiv = document.querySelector('.ticker-box')as HTMLHeadElement;
    infoDiv.innerHTML = ""


      const stock: { ticker: string, matchScore: any} = {
        ticker:"",
        matchScore:"",
      };
      

    let ticker =data.bestMatches;
    let matchScore =data.bestMatches;

    for (const key in matchScore) {
        const e = matchScore[key]["9. matchScore"];
        stock.matchScore=e;
       
    }
    for (const key in ticker) {
        
            const element = ticker[key]["1. symbol"];
            console.log(element);
            stock.ticker=element;
            infoDiv.innerHTML=element;
          
            /* infoDiv.innerHTML= `${infoDiv.innerHTML} ${element}`; */
    }
    

}
stonk(userInput);

}


//To-do 
/* Bygga ut funktionen för att hämta ut alla sök resultat , ex med for-in loop
Bygga ut så alla sök alternativen kommer ut som tryckbar text. 

När användaren trycker på texten så ska det göras en ny sökning via Api:et för att ta fram 
veckans kurs på aktien. Samt eventuell information om aktien

Fixa en snurrande text med ticker namn + senaste kursvärdet
*/
