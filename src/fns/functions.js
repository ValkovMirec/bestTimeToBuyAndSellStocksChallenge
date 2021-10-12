//Calc profit fn

export function calculatingProfit(buy, sell) {
    const profit = sell - buy;
  
    if (profit === 0) {
      return <p className="fns-no-profit-output">No profit for you.</p>;
    } else {
      return <p className="fns-profit-output">{profit}</p>;
    }
  }
  
  //Function for generating array of days with prices on them
  
  export function daysGenerator(amount) {
    const daysArray = [];
    const min = 1;
    const max = 10;
    //Populating array with numbers
    for (let i = 1; i < amount + 1; i++) {
      daysArray.push(Math.floor(Math.random() * (max - min) + min));
    }
    return daysArray;
  }
  