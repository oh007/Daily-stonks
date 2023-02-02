"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let element = document.querySelector("#btn-search");
element === null || element === void 0 ? void 0 : element.addEventListener("click", getInput);
/* Function 2 get stock that user search on */
function getInput() {
    let userInput = document.getElementById("name").value;
    function stonk() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`
    https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=NF4D92V4LLY53NLT`);
            const data = yield response.json();
            let infoDiv = document.querySelector('.ticker-box');
            infoDiv.innerHTML = "";
            let ticker = data.bestMatches;
            let matchScore = data.bestMatches;
            let tickerNames = data.bestMatches;
            for (const key in matchScore) {
                let contentDiv = document.createElement("div");
                contentDiv.className = "stock-div";
                contentDiv.innerHTML = "";
                const header = ticker[key]["1. symbol"];
                const matchE = matchScore[key]["9. matchScore"];
                const tickerName = tickerNames[key]["2. name"];
                //
                if (matchE > 0.7) {
                    contentDiv.innerHTML = `<button class="headers" onclick="getInfo()"> <br>${header}</button>${tickerName}<br> ${matchE * 100}% match `;
                    infoDiv.append(contentDiv);
                } /*  else if (matchE===0){
                  contentDiv.innerHTML=`<h4>No Match on that search , try again</h4>`;
                } */
            }
        });
    }
    stonk();
}
let infoDiv = document.querySelector('.ticker-info');
/* Function 2 get closing numbers */
function getInfo() {
    infoDiv.innerHTML = "";
    let userPress = document.querySelector(".headers").innerText;
    function stonkTwo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=NF4D92V4LLY53NLT`);
            const data = yield response.json();
            console.log(data);
            //let daily = document.createElement('p').innerText= data['Time Series (Daily)'][currentDate]['4. close']+'$';
            let yesterday = document.createElement('h4').innerText = data['Time Series (Daily)']['2023-01-31']['4. close'] + '$';
            infoDiv.innerHTML = `
    <br> 
    <div>
    <h2>Closing Price for ${userPress}</h2>
    <p>2023-01-31</p>
    <h4>
    ${yesterday}
    </h4>
    </div>`;
        });
    }
    ;
    stonkTwo();
}
//To-do 
/* Bygga ut funktionen för att hämta ut alla sök resultat , ex med for-in loop
Bygga ut så alla sök alternativen kommer ut som tryckbar text.

När användaren trycker på texten så ska det göras en ny sökning via Api:et för att ta fram
veckans kurs på aktien. Samt eventuell information om aktien

Fixa en snurrande text med ticker namn + senaste kursvärdet
*/
let newsDiv = document.querySelector('.news-section');
function getNews() {
    let userNews = document.querySelector(".li-news").innerText;
    function news() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${userNews}&limit=10&apikey=NF4D92V4LLY53NLT`);
            const data = yield response.json();
            console.log(data);
            newsDiv.innerHTML = "";
            for (let i = 0; i < 15; i++) {
                let articleDiv = document.createElement('div');
                console.log(data['feed'][`${i}`]['banner_image']['source']);
                let newsImg = data['feed'][`${i}`]['banner_image'];
                let newsSrc = data['feed'][`${i}`]['source'];
                let sum = data['feed'][`${i}`]['summary'];
                let title = data['feed'][`${i}`]['title'];
                articleDiv.innerHTML = `<img src="${newsImg}" alt="noice" width="50%" height="50%">
  <p style="color:white">Source:${newsSrc}</p> 
  <h4 style="color:white">${title}</h4>
  <h6 style="color:white">News summary</h6>
  <p style="color:white">${sum}</p>
  <br>`;
                newsDiv.append(articleDiv);
                i++;
            }
        });
    }
    ;
    news();
}
