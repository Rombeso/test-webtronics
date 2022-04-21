import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://188.166.119.86:8080/api'
});