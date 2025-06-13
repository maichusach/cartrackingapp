
import { FuelSupplyType, ResponseType } from "@/types";
import { convertDate } from "@/utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from 'dayjs';

export const createOrUpdateFuelSupply = async(
    buyfuelData: Partial<FuelSupplyType>
) =>{
    
    try {
        
        const fullFuelSupply: FuelSupplyType = {
            fuelSupplyId: buyfuelData?.fuelSupplyId??"", 
            dateOfSupply: buyfuelData?.dateOfSupply ?? "",   
            projectCode: buyfuelData?.projectCode ?? "",
            projectName: buyfuelData?.projectName ?? "",
            contractId: buyfuelData?.contractId ?? "",
            contractCode: buyfuelData?.contractCode ?? "" ,
            carCode: buyfuelData?.carCode ?? "",
            licensePlate: buyfuelData?.licensePlate ?? "",
            equipmentTypeCode: buyfuelData?.equipmentTypeCode ?? "",
            equipmentTypeName: buyfuelData?.equipmentTypeName ?? "",
            fuelTypeCode: buyfuelData?.fuelTypeCode ?? "",
            fuelTypeName: buyfuelData?.fuelTypeName ?? "",
            quantity: buyfuelData?.quantity ??0, 
            price: buyfuelData?.price ?? 0,
            amount: buyfuelData?.amount ?? 0, 
            month: buyfuelData?.month ?? 0,   
            year: buyfuelData?.year ??0,   
            description: buyfuelData?.description ?? "" ,
            image: buyfuelData?.image??""
        };
        const {fuelSupplyId,dateOfSupply,  projectCode,  contractId, fuelTypeCode, quantity, price, amount} = buyfuelData; 

        if(!dateOfSupply || !projectCode || !contractId || !fuelTypeCode || !quantity || !price|| !amount)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(fuelSupplyId){
            console.log("Update khách hàng");
            if(fullFuelSupply.image)
            {
                const imgeUploadRes = await UploadFileToTracking(fullFuelSupply.image,"FuelSupply");
                if(!imgeUploadRes.success)
                {
                    return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
                }
                fullFuelSupply.image = imgeUploadRes.data;
            }
            // todo update data
            UpdateFuelSupply(fullFuelSupply);
            return {success:true, data:{... buyfuelData}, id : fuelSupplyId };
        }
        else{
            console.log("Thêm mới khách hàng");
             const imgeUploadRes = await UploadFileToTracking(fullFuelSupply.image,"FuelSupply");
            if(!imgeUploadRes.success)
            {
                return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
            }
            fullFuelSupply.image = imgeUploadRes.data;
            // Insert
            const newid = AddNewFuelSupply(fullFuelSupply); 
            return {success:true, data:{... buyfuelData}, id : newid };
        }
        
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return {success:false, msg: err.message};
    }
}


export const deleteFuelSupply = async (inputFuelId: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
         const token = await AsyncStorage.getItem("userToken"); 
         const urlAPI = await AsyncStorage.getItem("companyLink");
        const response  = await fetch(urlAPI+`/api/fuelsupplyapi/deletefuelsupply/${inputFuelId}`, {
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
 
export const GetFuelSupplyList = async():Promise<FuelSupplyType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink");
        const response  = await fetch(urlAPI+`/api/fuelsupplyapi/listfuelsupply`, {
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

export const UpdateFuelSupply = async(contractData: FuelSupplyType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink");
        const response = await axios.post(urlAPI+'/api/fuelsupplyapi/updatefuelsupply',
            {   
               fuelSupplyId: contractData.fuelSupplyId, 
              dateOfSupply: convertDate(dayjs(contractData.dateOfSupply as string).format("YYYY-MM-DD")), 
              projectCode: contractData.projectCode,
              contractId: contractData.contractId,
              fuelTypeCode:contractData.fuelTypeCode,
              quantity:contractData.quantity,
              price:contractData.price,
              amount:contractData.amount,  
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

export const AddNewFuelSupply = async(contractData: FuelSupplyType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink");
        //console.log(token);
        //console.log((urlAPI+'api/contractapi/savecontract'));
        //console.log(dayjs(contractData.contractSign as string).format("YYYY-MM-DD"));
        const response = await axios.post(urlAPI+'/api/fuelsupplyapi/savefuelsupply',
            {   
              inputFuelId: contractData.fuelSupplyId, 
              dateOfSupply: convertDate(dayjs(contractData.dateOfSupply as string).format("YYYY-MM-DD")), 
              projectCode: contractData.projectCode,
              contractId: contractData.contractId,
              fuelTypeCode:contractData.fuelTypeCode,
              quantity:contractData.quantity,
              price:contractData.price,
              amount:contractData.amount,  
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


export const UploadFileToTracking = async(
    file:{uri?: string} | string,
    couponCode: string
): Promise<ResponseType> =>{
    try {
        if(!file) return {success:true, data: null}
        if(typeof file ==="string")
        {
            return {success:true, data:file};
        }
        if(file && file.uri)
        {
            
            const token = await AsyncStorage.getItem("userToken");
            const urlAPI = await AsyncStorage.getItem("companyLink");
            const formData = new FormData();
            formData.append("file",{
               uri:file?.uri,
               type: "image/jpeg",
               name: file?.uri.split("/").pop()||"file.jpg", 
            } as any);
            formData.append("couponCode",couponCode);
            formData.append("url",urlAPI||"");

            const urlPost = urlAPI +"/api/fuelsupplyapi/uploadimage";
            
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
