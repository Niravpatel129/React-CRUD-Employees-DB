function getApi (params) {
  const apiURL =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? `http://localhost:8080${params}`
      : `https://backend-api-crud-app.herokuapp.com${params}`;

  return apiURL;
}

export default getApi;
