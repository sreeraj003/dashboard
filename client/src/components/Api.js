import("dotenv/config")
import axios from "axios";
const url = import.meta.env.VITE_URL
export default async function getData(endPoint) {
    try {
        const data = await axios.get(url + endPoint)
        return data
    } catch (error) {
        console.log(error);

    }
}