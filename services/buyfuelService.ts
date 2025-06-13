
import { InputFuelType, ResponseType } from "@/types";
import { convertDate } from "@/utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from 'dayjs';

export const createOrUpdateBuyFuel = async(
    buyfuelData: Partial<InputFuelType>
) =>{
    
    try {
        
        const fullContract: InputFuelType = {
            inputFuelId: buyfuelData?.inputFuelId??"", 
            dateOfSupply: buyfuelData?.dateOfSupply ?? "",   
            projectCode: buyfuelData?.projectCode ?? "",
            projectName: buyfuelData?.projectName ?? "",
            customerId: buyfuelData?.customerId ?? "",
            customerCode: buyfuelData?.customerCode ?? "" ,
            customerName: buyfuelData?.customerName ?? "",
            fuelTypeCode: buyfuelData?.fuelTypeCode ?? "",
            fuelTypeName: buyfuelData?.fuelTypeName ?? "",
            quantity: buyfuelData?.quantity ??0, 
            price: buyfuelData?.price ?? 0,
            amount: buyfuelData?.amount ?? 0, 
            startDate: buyfuelData?.startDate ?? "",   
            endDate: buyfuelData?.endDate ?? "",   
            description: buyfuelData?.description ?? "" ,
            image: buyfuelData?.image??""
        };
        const {inputFuelId,dateOfSupply,  projectCode,  customerId, fuelTypeCode, quantity, amount} = buyfuelData; 

        if(!dateOfSupply || !projectCode || !customerId || !fuelTypeCode || !quantity || !amount)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(inputFuelId){
            console.log("Update khách hàng");
            if(fullContract.image)
            {
                const imgeUploadRes = await UploadFileToBuyingFuel(fullContract.image,"BuyFuel");
                if(!imgeUploadRes.success)
                {
                    return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
                }
                fullContract.image = imgeUploadRes.data;
            }
            // todo update data
            UpdateBuyFuel(fullContract);
            return {success:true, data:{... buyfuelData}, id : inputFuelId };
        }
        else{
            console.log("Thêm mới khách hàng");
            const imgeUploadRes = await UploadFileToBuyingFuel(fullContract.image,"BuyFuel");
            if(!imgeUploadRes.success)
            {
                return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
            }
            fullContract.image = imgeUploadRes.data;
            // Insert
            const newid = AddNewBuyFuel(fullContract); 
            return {success:true, data:{... fullContract}, id : newid };
        }
         
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return {success:false, msg: err.message};
    }
}


export const deleteBuyFuel = async (inputFuelId: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
         const token = await AsyncStorage.getItem("userToken"); 
         const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/inputfuelapi/deleteinputfuel/${inputFuelId}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });
        if (response.ok) {
            // Success – remove item from local list
            //setData(prev => prev.filter(item => item.id !== id));
            console.warn("Ok luôn");
            return {success:true, msg: "Xóa ncc/NTP thành công!"};
        } else {
            console.warn('Failed to delete item:', response.status);
            return {success:false, msg: "Xóa ncc/NTP thất bại!"};
        }  
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return {success:false, msg: err.message};
    }
}
 
export const GetBuyFuelList = async():Promise<InputFuelType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/inputfuelapi/listinputfuel`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const dataResponse = await response.json(); 
        const listCustomers = dataResponse.data; 
        //console.log(listCustomers);
        return listCustomers;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const UpdateBuyFuel = async(contractData: InputFuelType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/inputfuelapi/updateinputfuel',
            {   
               inputFuelId: contractData.inputFuelId, 
              dateOfSupply: convertDate(dayjs(contractData.dateOfSupply as string).format("YYYY-MM-DD")), 
              projectCode: contractData.projectCode,
              customerId: contractData.customerId,
              fuelTypeCode:contractData.fuelTypeCode,
              quantity:contractData.quantity,
              price:contractData.price,
              amount:contractData.amount, 
              startDate: convertDate(dayjs(contractData.startDate as string).format("YYYY-MM-DD")), 
              endDate: convertDate(dayjs(contractData.endDate as string).format("YYYY-MM-DD")), 
              description:contractData.description,
              image:contractData.image,
              
            },
            { headers: {
              'Authorization': `Bearer ${token}` ,
              'Content-Type': "application/json; charset=utf-8"
              } }
          );
          console.log(response.data);
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const AddNewBuyFuel = async(contractData: InputFuelType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        //console.log(token);
        //console.log((urlAPI+'api/contractapi/savecontract'));
        //console.log(dayjs(contractData.contractSign as string).format("YYYY-MM-DD"));
        const response = await axios.post(urlAPI+'/api/inputfuelapi/saveinputfuel',
            {   
              inputFuelId: contractData.inputFuelId, 
              dateOfSupply: convertDate(dayjs(contractData.dateOfSupply as string).format("YYYY-MM-DD")), 
              projectCode: contractData.projectCode,
              customerId: contractData.customerId,
              fuelTypeCode:contractData.fuelTypeCode,
              quantity:contractData.quantity,
              price:contractData.price,
              amount:contractData.amount, 
              startDate: convertDate(dayjs(contractData.startDate as string).format("YYYY-MM-DD")), 
              endDate: convertDate(dayjs(contractData.endDate as string).format("YYYY-MM-DD")), 
              description:contractData.description,
              image:contractData.image,
              
            },
            { 
            headers: {
              'Authorization': `Bearer ${token}` ,
              'Content-Type': "application/json; charset=utf-8"
              } 
            }
          );
          console.log(response.data.id);
        return response.data.id;
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const UploadFileToBuyingFuel = async(
    file:{uri?: string} | string,
    couponCode: string
): Promise<ResponseType> =>{
    try {
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        if(!file) return {success:true, data: null}
        if(typeof file ==="string")
        {
            return {success:true, data:file};
        }
        if(file && file.uri)
        {
            
            const token = await AsyncStorage.getItem("userToken");
            const formData = new FormData();
            formData.append("file",{
               uri:file?.uri,
               type: "image/jpeg",
               name: file?.uri.split("/").pop()||"file.jpg", 
            } as any);
            formData.append("couponCode",couponCode);
            formData.append("url",urlAPI||"");

            const urlPost = urlAPI +"/api/inputfuelapi/uploadimage";
            
            const response = await axios.post(urlPost, formData,{
                headers:{
                    'Authorization': `Bearer ${token}` ,
                    'Content-Type': 'multipart/form-data',
                },
            });
            //console.log(response.data);
            return {success:true, data: response.data.path}
        }
        return {success:true}
        
    } catch (error: any) {
        console.log(error.message);
        return {success:false, msg: error.message}
    }
}
