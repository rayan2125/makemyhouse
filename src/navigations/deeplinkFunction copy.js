
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation,useNavigationState } from '@react-navigation/native';


// deeplink url handler main 
export const deeplinkUrlHanlder = async (url,listener)=>{
    // let useNavigationInit = useNavigation();
    
    // let Token = await AsyncStorage.removeItem('UserToken');

    console.log("handle deeplink url here: ",url);

    if(url != '' || url != null ){
      
     const { path, queryParams } = extractUrlDetails(url);

      const {onlyPath,OnlyqueryParams} = extractUrlPath(url);
      console.log("extract only path:->", {onlyPath,OnlyqueryParams});

      if(onlyPath.includes('architectural-design')){
          // this will navigate the user to the articture design screen with the filters 

          const { path, queryParams } = extractUrlDetails(url); 
          console.log('Navigate->articture design list: ', {
            path, queryParams
          }); 
        

      }


      if(onlyPath.includes('deeplink/timeline')){
            // this will navigate to the myProjects dashboard 

            const { path, queryParams } = extractUrlDetails(url);
            console.log('Navigate-> my-project dashobard list: ', {
                path, queryParams
            }); 

            listener(url);

            
      }

      if(onlyPath.includes('deeplink/contract')){
          // this will navigate to the contract 

          const { path, queryParams } = extractUrlDetails(url);
          console.log('Navigate->contract list: ', {
              path, queryParams
          }); 
          return  listener(url);
      }

      if(onlyPath.includes('deeplink/rsform')){
          // this will navigate to the contract 
          const { path, queryParams } = extractUrlDetails(url);
          console.log('Navigate->rsform list: ', {
              path, queryParams
          }); 
          return  listener(url);
      }

     // return  listener(url); 

    } 
   
}

// extract only path 
export const extractUrlPath = (url) =>{
    const [path,queryString] = url.split('?');
    return {
        onlyPath:path.split('.com/')[1],
        OnlyqueryParams:queryString
    };
}

// get the url path and queryParams 
export const extractUrlDetails = (url)=>{
    // Split the URL at the '?' to separate the path from the query string
  const [path, queryString] = url.split('?');

  // Create an empty object to hold the query parameters
  const queryParams = {};

  // Check if there's a query string to parse
  if (queryString) {
    // Split the query string at each '&' to get individual key-value pairs
    const queryArray = queryString.split('&');

    // Iterate over each key-value pair
    queryArray.forEach(param => {
      // Split each pair at '=' to separate keys from values
      const [key, value] = param.split('=');
      // Assign the value to the respective key in the queryParams object
      queryParams[key] = value;
    });
  }

  // Return an object containing the path and query parameters
  return {
    path:path.split('.com/')[1],
    queryParams
  };
}