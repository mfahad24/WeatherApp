//network request constants
//NOTE - have to do 'REACT_APP_API_KEY=apikey npm start' to get this to work; to see if its showing up log process.env in mount method
export const apiKey = process.env.REACT_APP_API_KEY;
export const baseUrl = "https://api.openweathermap.org/data/2.5/";
export const weatherIconBaseUrl = "https://openweathermap.org/img/wn/";
export const weather = "weather";
export const forecast = "forecast";

//keyPress constant
export const enter = "Enter";

//error code constants
export const noNetworkConnection = "You are not connnected to the internet";
export const notAValidCity = "Please enter a valid city";
export const enterCityWithoutSpecialCharacters =
  "Please enter a city without special characters";
export const allOtherErrors =
  "Please make sure you have entered a value. The error is: ";

//special character constant
export const specialCharacters =
  /[~`!@#$%\\^&*+=\\[\]\\;,/{}|\\":<>\\?()\\._]/g;
