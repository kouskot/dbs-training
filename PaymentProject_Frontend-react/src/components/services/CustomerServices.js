import axios from "axios";
const CUSTOMER_BASE_REST_API_URL="http://localhost:8093/api/v1/internaldata";
class CustomerServices{
    getCustomerById(){
        //const CUSTOMER_BASE_REST_API_URL="http://localhost:8093/api/v1/internaldata";
       return axios.get(CUSTOMER_BASE_REST_API_URL)
    }
   
}
export default new CustomerServices();