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
/*
let headerPress=document.querySelector(".headers");
 headerPress?.addEventListener("click", getInput); */
function getInfo() {
    let userPress = document.querySelector(".headers").innerText;
    function stonkTwo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=NF4D92V4LLY53NLT`);
            const data = yield response.json();
            console.log(data);
        });
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
