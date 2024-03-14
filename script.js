let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const input = document.getElementById('cash')
const div = document.getElementById('change-due')
const button = document.getElementById('purchase-btn')
const priceText = document.getElementById('price-screen')
const drawerDisplay = document.getElementById('cash-drawer-display')

const resultFormat = (status, change) => {
  div.innerHTML = `<p>Status: ${status}</p>`;
  const changeHtml = change.map(money => `<p>${money[0]}: $${money[1]}</p>`).join('');
  div.innerHTML += changeHtml;
  return;
}

  const inputValidation = () => { 
  const cash = parseFloat(input.value)
  if(cash < price) {
    alert('Customer does not have enough money to purchase the item')
    cash = ""
    return;
  } else if (cash === price) {
    div.textContent = "No change due - customer paid with exact cash"
    cash = ""
    return;
  } 

  
let amount = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
let change = Number(input.value) - price;
let reverseCid = [...cid].reverse()
let result = { status: 'OPEN', change: [] }
let totalCid = parseFloat(
  cid
  .map(total => total[1])
  .reduce((prev, curr) => prev + curr)
  .toFixed(2)
  );

  if(totalCid < change) {
    return (div.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  } else if (totalCid === change){
    result.status = 'CLOSED'
  }

for(let i = 0; i <= reverseCid.length; i++) {
    if (change > amount[i] && change > 0) {
      let count = 0;
      let total = reverseCid[i][1];
      while (total > 0 && change >= amount[i]) {
        total -= amount[i];
        change = parseFloat((change -= amount[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.change.push([reverseCid[i][0], count * amount[i]]);
      }
    }
  }
  if (change > 0) {
    return (div.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  resultFormat(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  inputValidation();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  // Update cid if change is passed in
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = '';
  priceText.textContent = `Total: $${price}`;
  drawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

button.addEventListener('click', checkResults);

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();