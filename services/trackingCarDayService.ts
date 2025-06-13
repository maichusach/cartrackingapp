
import { EquipmentRentalTrackingType, ResponseType } from "@/types";
import { convertDate } from "@/utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from 'dayjs';

export const createOrUpdateTrackingCarDay = async(
    trackingData: Partial<EquipmentRentalTrackingType>
) =>{
    
    try {
        
        const fullFuelSupply: EquipmentRentalTrackingType = {
            trackingId: trackingData?.trackingId??"", 
            dateTracking: trackingData?.dateTracking ?? "",   
            projectCode: trackingData?.projectCode ?? "",
            projectName: trackingData?.projectName ?? "",
            contractId: trackingData?.contractId ?? "",
            contractCode: trackingData?.contractCode ?? "" ,
            carCode: trackingData?.carCode ?? "",
            licensePlate: trackingData?.licensePlate ?? "",
            typeHiringCode: trackingData?.typeHiringCode ?? "",
            typeHiringName: trackingData?.typeHiringName ?? "",
            timesFrom: trackingData?.timesFrom ?? new Date(),
            timesTo: trackingData?.timesTo ?? new Date(),
            dateTimesFrom: trackingData?.dateTimesFrom ?? new Date(),
            dateTimesTo: trackingData?.dateTimesTo ?? new Date(),
            timesFromLocal: trackingData?.timesFromLocal??"" ,
            timesToLocal: trackingData?.timesToLocal??"",
            timeWorks: trackingData?.timeWorks ??0, 
            shirtWorks: trackingData?.shirtWorks ??0, 
            price: trackingData?.price ?? 0,
            amount: trackingData?.amount ?? 0, 
            deduction: trackingData?.deduction ?? 0,    
            classify1: trackingData?.classify1 ?? "" ,
            classify2: trackingData?.classify2 ?? "" ,
            worksContent: trackingData?.worksContent ?? "" ,
            constructionSite: trackingData?.constructionSite ?? "" ,
            description: trackingData?.description ?? "" ,
            image: trackingData?.image??""
        };
        const {trackingId, dateTracking,  projectCode,  contractId, price, amount} = trackingData; 
        console.log(trackingData?.timesFromLocal);
        console.log(trackingData?.timesToLocal);
        if(!dateTracking || !projectCode || !contractId || !price|| !amount)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(trackingId){
            console.log("Update tracking ");
            if(fullFuelSupply.image)
            {
                const imgeUploadRes = await UploadFileToTracking(fullFuelSupply.image,"Tracking");
                if(!imgeUploadRes.success)
                {
                    return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
                }
                fullFuelSupply.image = imgeUploadRes.data;
            }
            //todo update data
            UpdateTrackingCarDay(fullFuelSupply);
            return {success:true, data:{... trackingData}, id : trackingId };
        }
        else{
            console.log("Thêm mới khách hàng");
            // Insert
            const imgeUploadRes = await UploadFileToTracking(fullFuelSupply.image,"Tracking");
            if(!imgeUploadRes.success)
            {
                return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
            }
            fullFuelSupply.image = imgeUploadRes.data;
            console.log(imgeUploadRes.data);
            const newid = AddNewTrackingCarDay(fullFuelSupply); 
            return {success:true, data:{... trackingData}, id : newid };
        }

        // // const transactionRef = id
        // // ? doc(firestore,"transaction", id)
        // // :doc(collection(firestore,transactionData,));
        // //const customerIdRef = customerId?customerId:newid;
        // return {success:true, data:{... customerData}, id : customerIdRef };
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return {success:false, msg: err.message};
    }
}


export const deleteTrackingCarDay = async (trackingId: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
         const token = await AsyncStorage.getItem("userToken"); 
         const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/trackingapi/deletetracking/${trackingId}`, {
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
 
export const GetTrackingCarDayList = async():Promise<EquipmentRentalTrackingType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/trackingapi/listtracking`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const dataResponse = await response.json(); 
        const listCustomers = dataResponse.data; 
        console.log(dataResponse);
        return listCustomers;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const UpdateTrackingCarDay = async(contractData: EquipmentRentalTrackingType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/trackingapi/updatetracking',
            {   
                trackingId: contractData.trackingId, 
                dateTracking: convertDate(dayjs(contractData.dateTracking as string).format("YYYY-MM-DD")), 
                projectCode: contractData.projectCode,
                contractId: contractData.contractId,
                typeHiringCode:contractData.typeHiringCode,
                timesFrom:contractData.timesFrom,
                timesTo:contractData.timesTo,
                timesFromLocal:contractData.timesFromLocal,
                timesToLocal:contractData.timesToLocal,
                timeWorks:contractData.timeWorks,
                shirtWorks:contractData.shirtWorks,
                price:contractData.price,
                amount:contractData.amount,  
                deduction:contractData.deduction, 
                classify1:contractData.classify1, 
                classify2:contractData.classify2, 
                worksContent:contractData.worksContent, 
                constructionSite:contractData.constructionSite, 
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

export const AddNewTrackingCarDay = async(contractData: EquipmentRentalTrackingType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        //console.log(token);
        //console.log((urlAPI+'api/contractapi/savecontract'));
        //console.log(dayjs(contractData.contractSign as string).format("YYYY-MM-DD"));
        const response = await axios.post(urlAPI+'/api/trackingapi/savetracking',
            {   
              trackingId: contractData.trackingId, 
                dateTracking: convertDate(dayjs(contractData.dateTracking as string).format("YYYY-MM-DD")), 
                projectCode: contractData.projectCode,
                contractId: contractData.contractId,
                typeHiringCode:contractData.typeHiringCode,
                timesFrom:contractData.timesFrom,
                timesTo:contractData.timesTo,
                timesFromLocal:contractData.timesFromLocal,
                timesToLocal:contractData.timesToLocal,
                timeWorks:contractData.timeWorks,
                shirtWorks:contractData.shirtWorks,
                price:contractData.price,
                amount:contractData.amount,  
                deduction:contractData.deduction, 
                classify1:contractData.classify1, 
                classify2:contractData.classify2, 
                worksContent:contractData.worksContent, 
                constructionSite:contractData.constructionSite, 
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

export const UploadFileToTracking = async(
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

            const urlPost = urlAPI +"/api/trackingapi/uploadimage";
            
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
