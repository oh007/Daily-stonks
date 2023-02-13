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
let key = 'NF4D92V4LLY53NLT';
let infoDiv = document.querySelector('.display-none');
let element = document.querySelector(".button-31");
element.addEventListener("click", getInput);
/* Function 2 get stock that user search on */
function getInput() {
    let userInput = document.getElementById("name").value;
    function stonk() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`
    https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${key}`);
            const data = yield response.json();
            infoDiv.className = "show-ticker-box";
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
                    let headerClick = document.getElementById("headers");
                    headerClick === null || headerClick === void 0 ? void 0 : headerClick.addEventListener("click", getInfo);
                    contentDiv.innerHTML = `<button id="headers"> <br>${header}</button>${tickerName}<br> ${matchE * 100}% match `;
                    infoDiv.append(contentDiv);
                }
            }
        });
    }
    stonk();
}
/* Function 2 get closing numbers */
function getInfo() {
    infoDiv.className = "show-ticker-box";
    let userPress = document.getElementById("headers").innerText;
    infoDiv.innerHTML = "";
    function stonkTwo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=${key}`);
            const data = yield response.json();
            let yesterday = document.createElement('h4').innerText = data['Time Series (Daily)']['2023-02-09']['4. close'] + '$';
            infoDiv.innerHTML = `
    <br> 
    <div class="cl-div">
    <h2>Closing Price for ${userPress}</h2>
    <p>2023-02-09</p>
    <h4>
    ${yesterday}
    </h4>
    </div>`;
        });
    }
    ;
    stonkTwo();
}
let liBtn = document.querySelector('.news-pick');
liBtn === null || liBtn === void 0 ? void 0 : liBtn.addEventListener("change", getNews);
let newsDiv = document.querySelector('.user-news');
/* Gets news based on users pick of topic */
function getNews() {
    let userNews = document.querySelector(".news-pick").innerText;
    function news() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${userNews}&limit=50&apikey=${key}`);
            const data = yield response.json();
            newsDiv.innerHTML = "";
            for (let i = 0; i < 51; i++) {
                let articleDiv = document.createElement('div');
                articleDiv.className = "article-div";
                let newsImg = data['feed'][`${i}`]['banner_image'];
                let newsSrc = data['feed'][`${i}`]['source'];
                let sum = data['feed'][`${i}`]['summary'];
                let title = data['feed'][`${i}`]['title'];
                articleDiv.innerHTML = `<img src="${newsImg}" class="news-img" alt="noice">
  <p class="news-para">Source:${newsSrc}</p> 
  <h4 class="news-title">${title}</h4>
  <h4 class="news-sum-header">News summary</h4>
  <p class="news-sum">${sum}</p>
  <br>`;
                newsDiv.append(articleDiv);
                i++;
            }
        });
    }
    ;
    news();
}
