function getApi(params) {
  console.log(params);
  let apiURL;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    apiURL = "http://localhost:8080" + params;
    console.log("dev environment");
  } else {
    // production code
    apiURL = "https://backend-api-crud-app.herokuapp.com" + params;
    console.log("production environment");
  }
  return apiURL;
}

export default getApi;
