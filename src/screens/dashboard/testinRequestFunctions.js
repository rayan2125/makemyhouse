import ApiService from "../../ApiServices";
 
export const getCustomerPendingOrderData =  async () => {
  let url = `customer/orders`;
  try {
    const response = await ApiService.Getapiheader(url); 
    return response.data
  }
  catch(error){
    console.log("get CustomerPendingOrderData error", error);
    return error;
  } 
}
