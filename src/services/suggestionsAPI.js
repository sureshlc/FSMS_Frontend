// endpoint
const ENDPOINT = "http://localhost:4000";

export const fetchSuggestions = async (input,  category) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch(
    `${ENDPOINT}/auto/get-query?prefix=${input}&category=${category}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const submitQuery = async (question) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    query: question,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${ENDPOINT}/auto/add-query`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
