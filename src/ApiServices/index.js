import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    HTTP_OK, 
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED, 
    HTTP_SERVER_ERROR
} from './statusCodes';
import GlobalData from "../screens/utility/config";

 
const ApiService = {

  async Getapiheader(url) {
    // const Token = await AsyncStorage.getItem('UserToken');
    // console.log('token------========',Token);
    // let config = {
    //     headers: {
    //         "x-api-key": Token,
    //         "Content-type": "application/json"
    //     }
    // };
    // console.log(config);
    // return axios.get(`${GlobalData.APIURL}${url}`,config);
    try {
      const Token = await AsyncStorage.getItem('UserToken');
      console.log('token------========',Token);
      let config = {
          headers: {
              "x-api-key": Token,
              "Content-type": "application/json"
          }
      };
      console.log(config);
      const response = await axios.get(`${GlobalData.APIURL}${url}`,config);
      if(response.status != 200){
        handleStatusCode(response.status, response.data);
      }else{
        return response.data;
      } 
    } catch (error) {
      console.log(error.config);
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error: ', error.message);
        return error.message;
        // throw error
      }
    }
  }, 

  async GetWithoutHeader(url) {
    let config = {
      headers: { 
          "Content-type": "application/json"
      }
    };
    return axios.get(`${GlobalData.APIURL}${url}`,config);
  }, 

  async GetapiheaderWithFullURL(url) {  
    try {
      const Token = await AsyncStorage.getItem('UserToken');
      console.log('token------========',Token);
      let config = {
          headers: {
              "x-api-key": Token,
              "Content-type": "application/json"
          }
      };
      console.log(config);
      const response = await axios.get(`${url}`,config);
      if(response.status != 200){
        handleStatusCode(response.status, response.data);
      }else{
        return response.data;
      }
    } catch (error) {
      console.log(error.config);
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
        // throw error
      }
      
       
    }
  },

  // async Post(url, data) {
  //   const Token = await AsyncStorage.getItem('UserToken');
    
  //   let config = {
  //     headers: {
  //           "x-api-key": Token,
  //           "Content-type": "application/json"
  //       }
  //   };  
  //   console.log('config------========',config);
  //   return axios.post(`${GlobalData.APIURL}${url}`, data, config);
  // },

  async Post(url, data) {
    try {
      const Token = await AsyncStorage.getItem('UserToken');
      
      let config = {
        headers: {
              "x-api-key": Token,
              "Content-type": "application/json"
          }
      };  
      console.log('config------========',config);
      const response = await axios.post(`${GlobalData.APIURL}${url}`, data, config);
      if(response.status != 200){
        handleStatusCode(response.status, response.data);
      }else{ 
        return response;
      }
    } catch (error) {
      console.log(error.config);
      // Handle error 
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return error.message;
      } 
      // throw error;
    }
  },

  async PostWithoutData(url){
    const Token = await AsyncStorage.getItem('UserToken');
    let config = {
      headers: {
            "x-api-key": Token, 
        }
    };  
    return axios.post(`${GlobalData.APIURL}${url}`, config) 
  },

  async Uploadapi(url, data) { 
    const Token = await AsyncStorage.getItem('UserToken');
    console.log('Token------========',Token);

    let postData = data;
    let config = {
        headers: {
            'x-api-key': Token,
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
        }
    }; 
    return axios.post(`${GlobalData.APIURL}${url}`, postData, config);
    
  },
  
  async PostTesting(url,data){
    const Token = await AsyncStorage.getItem('UserToken');
    let config = {
      headers: {
            "x-api-key": Token, 
        }
    };  
      console.log({
        "url":`${GlobalData.APIURL}${url}`,
        config,
        data
      })
     await axios.post(`${GlobalData.APIURL}${url}`,data, config)
     .then(response=>{
        console.log("____________________::", response);
        return response;
     })
     .catch(error=>{
        console.log("-----------------------:::",error);
        return error;
     })  
  },

  async Put(url, data) {
    const Token = await AsyncStorage.getItem('UserToken');
    let config = {
      headers: {
            'x-api-key': Token,
        }
    };  
    return axios.put(`${GlobalData.APIURL}${url}`, data, config) 
  },

  Delete(url) {
    return axios.delete(`${GlobalData.APIURL}${url}`);
  },

  async Testing(url){
    const Token = await AsyncStorage.getItem('UserToken');
    console.log('token------========',Token);
    let config = {
        headers: {
            "x-api-key": Token,
            "Content-type": "application/json"
        }
    };
    console.log(config);
    return axios.get(`${url}`,config);
  }
  
  // Add more methods as needed (e.g., patch)
};


const handleStatusCode = (status, data) => {
  switch (status) {
    case 400:
      return 'Bad Request: The server could not understand the request.'; 
    case 401:
      return 'Unauthorized: Access is denied due to invalid credentials.'; 
    case 403:
      return 'Forbidden: You do not have permission to access this resource.';
    case 404:
      return 'Not Found: The requested resource could not be found.'; 
    case 500:
      return `Internal Server Error: ${data}`; 
    default:
    return `Unexpected Error: Received status code ${status} with message: ${data}`;
  } 
};

export default ApiService;