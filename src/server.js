let serverUrl;

if (process.env.NODE_ENV === "production") {
  serverUrl = process.env.REACT_APP_SERVER_URL;
} else {
  serverUrl = "http://localhost:8080/api";
}

export default serverUrl;
