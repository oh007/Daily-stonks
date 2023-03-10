/* -----------------Insert your API:key here---------------------- */
let key:string='';
/* -----------------Insert your API:key here---------------------- */
 let infoDiv = document.querySelector('.display-none')as HTMLDivElement;
 let element=document.querySelector(".button-search") as HTMLButtonElement;
 element.addEventListener("click", getInput);
/* Function 2 get stock that user search on */
function getInput() {
let userInput = (<HTMLInputElement>document.getElementById("name")).value;
if(userInput===""||null||undefined){
  infoDiv.innerHTML=`<h4>Search empty try again...</h4>`;
}
else{
async function stonk(){
    const response = await fetch(`
    https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${userInput}&apikey=${key}`);
    const data =await response.json();
    infoDiv.className="show-ticker-box";
    infoDiv.innerHTML = ""

    if(data.bestMatches===0){
      infoDiv.innerHTML=`<h4>Sorry no matches on that search :/</h4>`
    }
  else{

   
    let ticker=data.bestMatches;
    let matchScore =data.bestMatches;
    let tickerNames=data.bestMatches;

    for (const key in matchScore) {
      let contentDiv= document.createElement("div") as HTMLDivElement;
        contentDiv.className="stock-div";
        contentDiv.innerHTML="";
        const header:string = ticker[key]["1. symbol"]
        const matchE:number = matchScore[key]["9. matchScore"];
        const tickerName:string= tickerNames[key]["2. name"]
        //
        if (matchE>0.7) {
          let headerClick= document.getElementById("headers") as HTMLButtonElement;
          headerClick?.addEventListener("click",getInfo);
          contentDiv.innerHTML=`<button id="headers"> <br>${header}</button>${tickerName}<br> ${matchE*100}% match `;
          infoDiv.append(contentDiv);
        }
    }
  }
}
stonk();
}

}
/* Function 2 get closing numbers */
function getInfo() {  
  let userPress = (<HTMLElement>document.getElementById("headers")).innerText;
  infoDiv.innerHTML = ""
  async function stonkTwo(){
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=${key}`);
    const data =await response.json();
    let yesterday = document.createElement('h4').innerText= data['Time Series (Daily)']['2023-02-09']['4. close']+'$';
    infoDiv.innerHTML=`
    <br> 
    <div class="cl-div">
    <h2>Closing Price for ${userPress}</h2>
    <p>2023-02-09</p>
    <h4>
    ${yesterday}
    </h4>
    </div>`;
  };
  stonkTwo();
}
let liBtn= document.querySelector('.news-pick') as HTMLSelectElement;
liBtn?.addEventListener("change", getNews);
let newsDiv = document.querySelector('.user-news')as HTMLDivElement;
/* Gets news based on users pick of topic */
function getNews() {

  let userNews = (<HTMLElement>document.querySelector(".news-pick")).innerText;
  async function news(){
    const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${userNews}&limit=50&apikey=${key}`);
    const data =await response.json();
    newsDiv.innerHTML="";
 for (let i = 0; i < 51; i++) {
  let articleDiv = document.createElement('div');
  articleDiv.className="article-div";
  let newsImg:string= data['feed'][`${i}`]['banner_image'];
  let newsSrc:string=data['feed'][`${i}`]['source'];
  let sum:string=data['feed'][`${i}`]['summary'];
  let title:string=data['feed'][`${i}`]['title'];

  articleDiv.innerHTML=`<img src="${newsImg}" class="news-img" alt="noice">
  <p class="news-para">Source:${newsSrc}</p> 
  <h4 class="news-title">${title}</h4>
  <h4 class="news-sum-header">News summary</h4>
  <p class="news-sum">${sum}</p>
  <br>`;
  newsDiv.append(articleDiv);
 i++;
 }
  };
  news();
}

