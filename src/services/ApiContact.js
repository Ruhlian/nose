import axios from "axios";

const apiContact = axios.create({
  baseURL: "http://localhost:3002", // URL del backend
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiContact;
