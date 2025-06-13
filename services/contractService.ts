
import { ContractType, ResponseType } from "@/types";
import { convertDate } from "@/utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import dayjs from 'dayjs';

export const createOrUpdateContract = async(
    contractData: Partial<ContractType>
) =>{
    
    try {
        
        const fullContract: ContractType = {
            contractId: contractData?.contractId??"",
            contractCode: contractData?.contractCode ?? "",
            contractSign: contractData?.contractSign ?? "",
            content: contractData?.content ?? "",
            projectCode: contractData?.projectCode ?? "",
            projectName: contractData?.projectName ?? "",
            customerId: contractData?.customerId ?? "",
            customerCode: contractData?.customerCode ?? "" ,
            customerName: contractData?.customerName ?? "",
            equipmentTypeCode: contractData?.equipmentTypeCode ?? "",
            equipmentTypeName: contractData?.equipmentTypeName ?? "",
            unitCode: contractData?.unitCode ?? "",
            unitName: contractData?.unitName ?? "" ,
            price: contractData?.price ?? 0,
            driver: contractData?.driver ?? "" ,
            carCode: contractData?.carCode ?? "",
            description: contractData?.description ?? "" ,
            image: contractData?.image??""
        };
        const {contractId,contractCode,  projectCode,  customerId} = contractData; 

        if(!contractCode || !projectCode || !customerId)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(contractId){
            console.log("Update khách hàng");
            // todo update data
            UpdateContract(fullContract);
            return {success:true, data:{... contractData}, id : contractId };
        }
        else{
            console.log("Thêm mới khách hàng");
            // Insert
            const newid = AddNewContract(fullContract); 
            return {success:true, data:{... fullContract}, id : newid };
        }
        // Update here
        // if(image)
        // {
        //     // const imgeUploadRes = await uploadFileToServer(image,"transaction","");
        //     // if(!imgeUploadRes.success)
        //     // {
        //     //     return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
        //     // }
        //     // transactionData.image = imgeUploadRes.data;
        // }

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


export const deleteContract = async (contractId: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
         const token = await AsyncStorage.getItem("userToken"); 
         const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/contractapi/deletecontract/${contractId}`, {
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
 
export const GetContractList = async():Promise<ContractType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/contractapi/listcontract`, {
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

export const UpdateContract = async(contractData: ContractType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/contractapi/updatecontract',
            {   
              contractId: contractData.contractId,
              contractCode: contractData.contractCode, 
              contractSign: convertDate(dayjs(contractData.contractSign as string).format("YYYY-MM-DD")),
              content: contractData.content,
              projectCode: contractData.projectCode,
              customerId: contractData.customerId,
              equipmentTypeCode:contractData.equipmentTypeCode,
              unitCode:contractData.unitCode,
              price:contractData.price,
              driver:contractData.driver,
              carCode:contractData.carCode,
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

export const AddNewContract = async(contractData: ContractType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        //console.log(token);
        //console.log((urlAPI+'api/contractapi/savecontract'));
        //console.log(dayjs(contractData.contractSign as string).format("YYYY-MM-DD"));
        const response = await axios.post(urlAPI+'/api/contractapi/savecontract',
            {   
              contractId: contractData.contractId,
              contractCode: contractData.contractCode, 
              contractSign: convertDate(dayjs(contractData.contractSign as string).format("YYYY-MM-DD")),
              content: contractData.content,
              projectCode: contractData.projectCode,
              customerId: contractData.customerId,
              equipmentTypeCode:contractData.equipmentTypeCode,
              unitCode:contractData.unitCode,
              price:contractData.price,
              driver:contractData.driver,
              carCode:contractData.carCode,
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

export const GetContractDetailByContractId = async(contractId: string):Promise<ContractType> =>{
    try {
        if(contractId !=="")
        {
            
            const token = await AsyncStorage.getItem("userToken"); 
            const urlAPI = await AsyncStorage.getItem("companyLink"); 
            // const response = await fetch(urlAPI+`api/appcategoryapi/getcontractfromprojectcombo`, 
            // { 
            //     method: 'POST',
            //     headers: {
            //     'Authorization': `Bearer ${token}` ,
            //     'Content-Type': "application/json; charset=utf-8"
            //     } ,
            //     body: JSON.stringify({ projectCode:projectCode})
            // }
            // );
            // console.log(projectCode);
            //const token = await AsyncStorage.getItem("userToken"); 
            const response  = await fetch(urlAPI+`/api/contractapi/getcontractbyid/`+contractId, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            }); 
            const resultContractByProject = await response.json(); 
            //console.log(resultContractByProject);
            // const formattedDataContractByProject = resultContractByProject.map((item: { label: any; value: any; }) => ({
            // label: item.label, // Display name
            // value: item.value,   // Unique ID
            // }));
            console.log(resultContractByProject);
            return resultContractByProject;
        
        }
        else{
             const contractNoneDropdownload: ContractType = {
                contractId: "0",contractCode: "",contractSign: "" ,content: "",projectCode: "",projectName: "",
                customerId: "",customerCode: "",customerName: "", equipmentTypeCode: "",equipmentTypeName: "",
                unitCode: "",unitName: "",price:0,driver: "",carCode: "Chọn tài xế",description: "",image:""
            };
            //console.log(listCustomers);
            return contractNoneDropdownload;
        }
         
    } catch (err: any) {
        console.log("Load contract by project Error", err);
        //const contractDropdownNone:ContractType={contractId: "Chọn hợp đồng", contractCode: "0"};
        const contractNoneDropdownload: ContractType = {
        contractId: "0",contractCode: "",contractSign: "" ,content: "",projectCode: "",projectName: "",
        customerId: "",customerCode: "",customerName: "", equipmentTypeCode: "",equipmentTypeName: "",
        unitCode: "",unitName: "",price:0,driver: "",carCode: "Chọn tài xế",description: "",image:""};

        return contractNoneDropdownload;
    }
}