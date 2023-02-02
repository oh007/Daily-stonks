 let element=document.querySelector("#btn-search");
 element?.addEventListener("click", getInput);
/* Function 2 get stock that user search on */
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

let infoDiv = document.querySelector('.ticker-info')as HTMLDivElement;

/* Function 2 get closing numbers */
function getInfo() {
  infoDiv.innerHTML="";
  let userPress = (<HTMLInputElement>document.querySelector(".headers")).innerText;
  async function stonkTwo(){
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${userPress}&apikey=NF4D92V4LLY53NLT`);
    const data =await response.json();
    console.log(data);
    let yesterday = document.createElement('h4').innerText= data['Time Series (Daily)']['2023-01-31']['4. close']+'$';
    infoDiv.innerHTML=`
    <br> 
    <div>
    <h2>Closing Price for ${userPress}</h2>
    <p>2023-01-31</p>
    <h4>
    ${yesterday}
    </h4>
    </div>`;
  };
  stonkTwo();
}

let newsDiv = document.querySelector('.news-section')as HTMLDivElement;
/* Gets news based on users pick of topic */
function getNews() {

  let userNews = (<HTMLInputElement>document.querySelector(".li-news")).innerText;
  async function news(){
    const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${userNews}&limit=10&apikey=NF4D92V4LLY53NLT`);
    const data =await response.json();
    console.log(data);
    newsDiv.innerHTML="";
 for (let i = 0; i < 15; i++) {
  let articleDiv = document.createElement('div');
  console.log(data['feed'][`${i}`]['banner_image']['source']);
  let newsImg = data['feed'][`${i}`]['banner_image'];
  let newsSrc=data['feed'][`${i}`]['source'];
  let sum=data['feed'][`${i}`]['summary'];
  let title=data['feed'][`${i}`]['title'];

  articleDiv.innerHTML=`<img src="${newsImg}" alt="noice" width="50%" height="50%">
  <p style="color:white">Source:${newsSrc}</p> 
  <h4 style="color:white">${title}</h4>
  <h6 style="color:white">News summary</h6>
  <p style="color:white">${sum}</p>
  <br>`;
  newsDiv.append(articleDiv);
 i++;
 }
 
  };
  news();
}
