import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Linking
  } from 'react-native'; 

  import { useNavigation } from '@react-navigation/native';


  export const DeepLinking = {
    prefixes: ['https://www.makemyhouse.com','http://www.makemyhouse.com','https://makemyhouse.com','http://makemyhouse.com'],
    config: {
      screens:{
        ArchitectDesign:{
            screens:{
                Architectdetaillist:{
                    path:'architectural-design/:projectId',
                }
            }
        }, 
        
        ProjectStack:{
            screens:{
                Dashboard:{
                    screens:{
                        Timeline:{
                          path:'deeplink/timeline'
                        },
                        Chat:{
                          path:'deeplink/chat'
                        }
                    }  
                }, 
            }
        }, 

        // contract 
        Contract:{
          path:'deeplink/contract', 
        }, 
        
         // rsform 
        RsForm:{
          path:'deeplink/rsform'
        },


        // paymebnt 
        CheckOutWebView:{
          path:'deeplink/payment'
        }




      },
    },
    subscribe(listener) {
  
      const onReceiveURL = ({ url }) => {
        console.log('Deep link received:', url);
        handleDeepLink(url);
        listener(url);
      };
  
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
  
      // If the app was launched from a link
      Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log('Initial URL: ', url);
          handleDeepLink(url);
          listener(url);
        }
      })
      .catch(error=>{
        console.log("deeplink does not work here", error);
      })
  
      return () => {
        // Clean up the event listener
        linkingSubscription.remove();
      };
    },
  };
  


// start: Custom function to handle deep link URLs
function handleDeepLink(url){
    // let navigation = useNavigation();
    try {
      AsyncStorage.removeItem('projectIdNewTimeline');
      // Parse query parameters
  
      // const queryParamss = GetQueryParams(url);
      // console.log('Query Parameters:', queryParamss);
      
      const {path,queryParams} = ExtractUrlDetails(url);
  
      console.log("new Data", {path,queryParams})
  
      // DONE 
      if(path == 'deeplink/timeline'){
        console.log("path is match do logical operations here for timeline screen.", queryParams.id)
        AsyncStorage.setItem('projectIdNewTimeline',`${queryParams.id}`);
      }

      // DONE
      if(path == 'deeplink/chat'){
        console.log("path is match do logical operations here for cath.")
        AsyncStorage.setItem('projectIdNewTimeline',`${queryParams.id}`);
        // AsyncStorage.setItem('projectCode','123123');
      }

      // rsform - contract - payment 
      // do same as we have done in notifications

      // Rsforn
      if(path == "deeplink/rsform"){
        const {id,isdcode,mobile} = queryParams;
        console.log("path is match do logical operations here for rsform", queryParams); 
        AsyncStorage.removeItem('rsFormData');
        AsyncStorage.setItem('rsFormData',JSON.stringify(queryParams));
      }

      // deeplink/contract
      // DONE
      if(path == 'deeplink/contract'){
         const {id} = queryParams; 
          console.log("deeplink/contract", queryParams.id);
          // return navigation.navigate('Contract',{orderCode:queryParams.id});
         AsyncStorage.removeItem('contractData');
         AsyncStorage.setItem('contractData',JSON.stringify(queryParams));
      }

      // DONE
      if(path == 'deeplink/payment/'){
        // https://www.makemyhouse.com/deeplink/payment/?amount=5850&id=16500&type=reminder
        console.log("deeplink/payment: ", {queryParams});
        AsyncStorage.getItem('UserToken', (err,token)=>{
           console.log(`--- deeplink: --- handler:: https://www.makemyhouse.com/deeplink/payment/?amount=${queryParams.amount}&id=${queryParams.id}&type=reminder&token=${token}`)
           AsyncStorage.setItem("PaymentLink",`https://www.makemyhouse.com/deeplink/payment?amount=${queryParams.amount}&id=${queryParams.id}&type=reminder&token=${token}`);    
        })
      }

      
      
    } catch (error) {
      console.error('Error handling deep link:', error);
    }
} 
// end: Custom function to handle deep link URLs


// Define the function with proper TypeScript types
export const ExtractUrlDetails = (url) => {
    // Split the URL at the '?' to separate the path from the query string
    const [path, queryString] = url.split('?');
  
    // Create an empty object to hold the query parameters
    const queryParams= {};
  
    // Check if there's a query string to parse
    if (queryString) {
      // Split the query string at each '&' to get individual key-value pairs
      const queryArray = queryString.split('&');
  
      // Iterate over each key-value pair
      queryArray.forEach(param => {
        // Split each pair at '=' to separate keys from values
        const [key, value] = param.split('=');
        if (key) {
          // Assign the value to the respective key in the queryParams object
          queryParams[key] = value || '';
        }
      });
    }
  
    // Return an object containing the path and query parameters
    return {
      // Ensure the path is correctly handled if '.com/' is not found
      path: path?.split('.com/')[1],
      queryParams
    };
  }
  

  
// Define the function with proper TypeScript types
export const ExtractUrlPath = (url) => {
    // Split the URL at the '?' to separate the path from the query string
    const [path, queryString] = url.split('?');
  
    // Extract the path part after '.com/'
    const onlyPath = path.split('.com/')[1];
  
    // Return an object containing the path and query parameters
    return {
      onlyPath,
      OnlyqueryParams: queryString
    };
  };
  
  
  export function GetQueryParams(url) {
    const queryParams = {};
    
    // Extract query string part from the URL
    const queryString = url.split('?')[1];
    
    if (queryString) {
      // Split by '&' to get individual key-value pairs
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        // Ensure key and value are defined
        if (key) {
          queryParams[key] = decodeURIComponent(value || '');
        }
      });
    } 
    return queryParams;
  }