
import { DropdownType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetProjectCombobox = async():Promise<DropdownType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/appcategoryapi/getprojectcombo`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const resultProject = await response.json(); 
        const formattedDataProject = resultProject.map((item: { label: any; value: any; }) => ({
          label: item.label, // Display name
          value: item.value,   // Unique ID
        }));
        //console.log(listCustomers);
        return formattedDataProject;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}
    
export const GetEpuipmentCombobox = async():Promise<DropdownType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/appcategoryapi/getequipmenttypecombo`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const resultEpuipment = await response.json(); 
        const formattedDataEpuipment = resultEpuipment.map((item: { label: any; value: any; }) => ({
          label: item.label, // Display name
          value: item.value,   // Unique ID
        }));
        //console.log(listCustomers);
        return formattedDataEpuipment;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const GetFuelTypeCombobox = async():Promise<DropdownType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/appcategoryapi/getfueltypecombo`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const resultFuelType = await response.json(); 
        const formattedDataFuelType = resultFuelType.map((item: { label: any; value: any; }) => ({
          label: item.label, // Display name
          value: item.value,   // Unique ID
        }));
        //console.log(listCustomers);
        return formattedDataFuelType;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const GetCustomerCombobox = async():Promise<DropdownType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken");
        const urlAPI = await AsyncStorage.getItem("companyLink");  
        const response  = await fetch(urlAPI+`/api/appcategoryapi/getcustomercombo`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const resultCustomer = await response.json(); 
        const formattedDataCustomer = resultCustomer.map((item: { label: any; value: any; }) => ({
          label: item.label, // Display name
          value: item.value,   // Unique ID
        }));
        //console.log(listCustomers);
        return formattedDataCustomer;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const GetUnitHiringCombobox = async():Promise<DropdownType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/appcategoryapi/getunithiringtypecombo`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        }); 
        const resultUnitHiring = await response.json(); 
        const formattedDataUnitHiring = resultUnitHiring.map((item: { label: any; value: any; }) => ({
          label: item.label, // Display name
          value: item.value,   // Unique ID
        }));
        //console.log(listCustomers);
        return formattedDataUnitHiring;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const GetContractByProjectCombobox = async(projectCode: string):Promise<DropdownType[]> =>{
    try {
        if(projectCode !=="")
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
            const response  = await fetch(urlAPI+`/api/appcategoryapi/getcontractbyprojectcombo/`+projectCode, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            }); 
            const resultContractByProject = await response.json(); 
            //console.log(resultContractByProject);
            const formattedDataContractByProject = resultContractByProject.map((item: { label: any; value: any; }) => ({
            label: item.label, // Display name
            value: item.value,   // Unique ID
            }));
            //console.log(listCustomers);
            return formattedDataContractByProject;
        
        }
        else{
            const resultContractByProject = [
                                                {label: "Chọn hợp đồng", value: "0"} 
                                            ];
            const formattedDataContractByProject = resultContractByProject.map((item: { label: any; value: any; }) => ({
                label: item.label, // Display name
                value: item.value,   // Unique ID
            }));
            //console.log(listCustomers);
            return formattedDataContractByProject;
        }
         
    } catch (err: any) {
        console.log("Load contract by project Error", err);
        return [];
    }
}

