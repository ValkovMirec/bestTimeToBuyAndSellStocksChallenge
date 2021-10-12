import { useState } from "react";
import "./index.css";

//Components import
import Form from "./components/Form.js";

//Variables

const TODAYS_DATE = new Date();
const SET_MAX_INTERVAL = 14;

export default function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [dayInterval, setDayInterval] = useState(null);
  const [stocks, setStocks] = useState([]);

  //Main function for finding profit from array of days and prices

  const mainFunction = (pricesEachDay) => {
    let buyPrice = pricesEachDay[0];
    let bestProfit = 0;
    let boughtDay = 1;
    let lastPriceDay = 1;
    let soldDay = 1;
    let idx = 1;
    for (const price of pricesEachDay) {
      if (price < buyPrice) {
        buyPrice = price;
        lastPriceDay = idx;
      }
      if (price - buyPrice > bestProfit) {
        bestProfit = price - buyPrice;
        soldDay = idx;
        boughtDay = lastPriceDay;
      }
      idx++;
    }

    if (bestProfit === 0) {
      return [
        { name: "Profit: ", value: "No profit for you:(." },
        { name: "Buy day:", value: "-" },
        { name: "Sell day:", value: "-" }
      ];
    } else {
      return [
        { name: "Profit: ", value: bestProfit },
        { name: "Buy day:", value: boughtDay },
        { name: "Sell day:", value: soldDay }
      ];
    }
  };

  return (
    <div className="App">
      <div className="left-side">
        <Form
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          maxDate={maxDate}
          setMaxDate={setMaxDate}
          setDayInterval={setDayInterval}
          setStocks={setStocks}
          TODAYS_DATE={TODAYS_DATE}
          SET_MAX_INTERVAL={SET_MAX_INTERVAL}
        />

        <div className="info-container">
          <div className="output-container">
            {mainFunction(stocks).map((output, idx) => (
              <div key={idx} className="fns-profit-output">
                {output.name} {output.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="days-preview">
        <ol>
          {stocks.map((stock, idx) => (
            <li key={idx} className="stock-list">
              day : {stock}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
