import DatePicker from "react-datepicker";
import "../index.css";
import "react-datepicker/dist/react-datepicker.css";

//Main functions import
import { daysGenerator } from "../fns/functions.js";

//Variables

const TODAYS_DATE = new Date();
const DATE_INTERVAL = 14;

//Helper for adding days to a date

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default function Form({
  startDate,
  endDate,
  maxDate,
  setStartDate,
  setEndDate,
  setMaxDate,
  setDayInterval,
  setStocks
}) {
  //Event handlers

  const handleCalendarOne = (date) => {
    //Convert. to UNIX timestamp for easier calculations
    setStartDate(date.getTime());
  };

  //

  const handleMaxDate = () => {
    //Adding maximum selectable date
    const maxDate = new Date(startDate).addDays(DATE_INTERVAL);
    setMaxDate(maxDate);
  };

  //

  const handleCalendarTwo = (date) => {
    //Convert. to UNIX timestamp for easier calculations
    setEndDate(date.getTime());
  };

  //

  const submitButtonHandler = () => {
    //Calc. of date interval in UNIX Timestamp
    const dateInterval = Math.abs(endDate - startDate);
    //Converting timestamp to days
    const getDays = Math.ceil(dateInterval / (1000 * 3600 * 24));
    //Generating days with random prices
    const priceDayArray = daysGenerator(getDays);
    setDayInterval(getDays);
    setStocks(priceDayArray);
  };

  return (
    <div className="form-container">
      <div className="date-picker-container">
        <DatePicker
          className="date-picker-one"
          selected={startDate}
          onChange={handleCalendarOne}
          minDate={TODAYS_DATE}
        />

        <DatePicker
          className="date-picker-two"
          selected={endDate}
          onInputClick={handleMaxDate}
          onChange={handleCalendarTwo}
          minDate={startDate}
          maxDate={maxDate}
        />
      </div>
      <button className="submit-button" onClick={submitButtonHandler}>
        Calc profit
      </button>
    </div>
  );
}
