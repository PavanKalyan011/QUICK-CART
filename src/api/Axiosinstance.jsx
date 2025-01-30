import axios from "axios"

const Axiosinstance=axios.create({
    baseURL:"https://fakestoreapi.com"
});
 export const Axiosinstance2=axios.create({
    baseURL:"https://fakestoreapi.in/api"

})
export default Axiosinstance;
