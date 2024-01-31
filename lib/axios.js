import axios from "axios";
const Token = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Axios = axios.create({
  baseURL: BackendURL,
  headers: {
    authorization: `Bearer ${Token}`,
  },
});

export default Axios;
