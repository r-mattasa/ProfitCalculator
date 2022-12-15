import axios from "axios";
const BASEURL = "https://localhost:7214"; // please update the backend api url

export const ENDPOINTS = {
  getProfitResults: "ProfitCalculatorResults",
  getProfitMarginResults: "ProfitCalculatorResults/ProfitMargin",
  saveProfitMarginResults: "ProfitCalculatorResults/saveOrder",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASEURL + "/api/" + endpoint + "/";

  console.log("BASEURL", url);
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
  };
};
