// global variables

const addCurrencyBtn = document.querySelector(".add-currency-btn");
const addCurrencyList = document.querySelector(".add-currency-list");
const currenciesList = document.querySelector(".currencies")



const startingCurrencies = ["Ne", "Nm"];
let baseCurrency;
let baseCurrencyAmount;




let currencies = [
    {
        name: "English Count",
        abbreviation: "Ne",
        symbol: "𝒏𝒆",
        flagURL: "./ne.png",
        rate: 1,
        
      },
      {
        name: "Metric Count",
        abbreviation: "Nm",
        symbol: "ℕ𝕞",
        flagURL: "./nm.png",
        rate: 1.693
        
      },
      
      {
        name: "Worsted Count",
        abbreviation: "Worsted",
        symbol: "𝓦𝓸𝓻",
        flagURL: "./wor.png",
        rate: 1.5
        
      },
      {
        name: "Woolen Count",
        abbreviation: "Woolen",
        symbol: "𝐖𝐨𝐨𝐥",
        flagURL: "./wool.png",
        rate: 3.28125
        
      },
];



// eventlistener 

addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

function addCurrencyBtnClick(event){
    addCurrencyBtn.classList.toggle("open");
}

addCurrencyList.addEventListener("click", addCurrencyListClick);

function addCurrencyListClick(){
    const clickedListItem = event.target.closest("li");
    if(!clickedListItem.classList.contains("disabled")){
        const newCurrency = currencies.find(c => c.abbreviation===clickedListItem.getAttribute("data-currency"));
        if(newCurrency) newCurrenciesListItem(newCurrency);
    }
}

currenciesList.addEventListener("click", currenciesListClick);

function currenciesListClick(event){
    if(event.target.classList.contains("close")){
        const parentNode = event.target.parentNode;
        parentNode.remove();
        addCurrencyList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove("disabled");
        if(parentNode.classList.contains("base-currency")){
            const newBaseCurrencyLi = currenciesList.querySelector(".currency");
            if(newBaseCurrencyLi) {
                setNewBaseCurrency(newBaseCurrencyLi);
                baseCurrencyAmount = Number(newBaseCurrencyLi.querySelector(".input input").value);
                
            }
        }
    }
}

function setNewBaseCurrency(newBaseCurrencyLi){
    newBaseCurrencyLi.classList.add("base-currency");
    baseCurrency = newBaseCurrencyLi.id;
    const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
    currenciesList.querySelectorAll(".currency").forEach(currencyLI =>{
        const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
        const exchangeRate = currencyLI.id == baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(7);
        currencyLI.querySelector(".base-currency-rate").textContent = `1 ${baseCurrency} = ${exchangeRate} ${currencyLI.id}`;
    });
}

currenciesList.addEventListener("input", currenciesListInputChange);

function currenciesListInputChange(event){
    const isNewBaseCurrency = event.target.closest("li").id !== baseCurrency;
    if(isNewBaseCurrency){
        currenciesList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
        setNewBaseCurrency(event.target.closest("li"));
    }
    const newBaseCurrencyAmount = isNaN(event.target.value) ? 0 : Number(event.target.value);
    if(baseCurrencyAmount !== newBaseCurrencyAmount || isNewBaseCurrency){
        baseCurrencyAmount = newBaseCurrencyAmount;
        const baseCurrencyRate = currencies.find(currency => currency.abbreviation===baseCurrency).rate;
        currenciesList.querySelectorAll(".currency").forEach(currencyLI =>{
            if(currencyLI.id !== baseCurrency){
                const currencyRate = currencies.find(currency => currency.abbreviation===currencyLI.id).rate;
                const exchangeRate = currencyLI.id == baseCurrency ? 1 : (currencyRate/baseCurrencyRate).toFixed(7);
                currencyLI.querySelector(".input input").value = exchangeRate*baseCurrencyAmount !== 0 ? (exchangeRate*baseCurrencyAmount).toFixed(7) : "";
            }
            
        });
    }
}

currenciesList.addEventListener("focusout", currenciesListFocusOut); /* When focuses out adds those extra 0 */

function currenciesListFocusOut(event) {
  const inputValue = event.target.value;
  if(isNaN(inputValue) || Number(inputValue)===0) event.target.value="";
  else event.target.value = Number(inputValue).toFixed(7);
}

currenciesList.addEventListener("keydown", currenciesListKeyDown);

function currenciesListKeyDown(event){
    if(event.key === "Enter") event.target.blur();

}

// Func for currency list to show (Auxiliary functions)

function showCurrencyList(){
    for(let i =0; i < currencies.length; i++){
        addCurrencyList.insertAdjacentHTML("beforeend", `<li data-currency=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} - ${currencies[i].name}</span>
        </li>`)
    }
}

function ShowStartingList(){
    for(let i =0; i <startingCurrencies.length; i++){
        const currency = currencies.find(c => c.abbreviation === startingCurrencies[i]);
        if(currency) newCurrenciesListItem(currency);
    }
}


function newCurrenciesListItem(currency){
    if(currenciesList.childElementCount === 0){
        baseCurrency = currency.abbreviation;
        baseCurrencyAmount = 0;
    }
    addCurrencyList.querySelector(`[data-currency=${currency.abbreviation}]`).classList.add("disabled");
    const baseCurrencyRate = currencies.find(c => c.abbreviation === baseCurrency).rate;
    const exchangeRate = currency.abbreviation === baseCurrency ? 1 : (currency.rate/baseCurrencyRate).toFixed(7);
    const inputValue = baseCurrencyAmount ? (baseCurrencyAmount*ehangeRat).toFixed(7) : "";

    currenciesList.insertAdjacentHTML(
        "beforeend",
        `<li class="currency ${currency.abbreviation === baseCurrency ? "base-currency": ""}"" id=${currency.abbreviation}>
            <img src=${currency.flagURL} class="flag">
                <div class="info">
                    <p class="input"><span class="currrency-symbol">${currency.symbol}</span><input type="text" placeholder="0.00000" value=${inputValue}></p>
                    <p class="currency-name">${currency.abbreviation} -  ${currency.name}</p>
                    <p class="base-currency-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
                </div>
                <span class="close">&times;</span>
        </li>`
    );

}


showCurrencyList();

ShowStartingList();





