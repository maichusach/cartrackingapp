
import { EquipmentTypeType, ResponseType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const createOrUpdateEquipmentType = async(
    equipmentTypeData: Partial<EquipmentTypeType>
) =>{
    
    try {
        
        const fullEquipmentType: EquipmentTypeType = {
            equipmentTypeCode: equipmentTypeData?.equipmentTypeCode??"",
            equipmentTypeName: equipmentTypeData?.equipmentTypeName ?? "",
            productName: equipmentTypeData?.productName ?? "",
            licensePlate: equipmentTypeData?.licensePlate ?? "",
            yearOfManufacture: equipmentTypeData?.yearOfManufacture ?? "",
            countryOfManufacture: equipmentTypeData?.countryOfManufacture ?? "",
            description: equipmentTypeData?.description ?? "", 
            isCreate: equipmentTypeData.isCreate??"",
            image: equipmentTypeData?.image??""
        };
        const {equipmentTypeCode,equipmentTypeName,isCreate,image} = equipmentTypeData;
       
        if(!equipmentTypeCode || !equipmentTypeName)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(isCreate){
            console.log("Update khách hàng");
            if(fullEquipmentType.image)
            {
                const imgeUploadRes = await uploadImageToServer(fullEquipmentType.image,"EquipmentType");
                if(!imgeUploadRes.success)
                {
                    return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
                }
                fullEquipmentType.image = imgeUploadRes.data;
            }
            // todo update data
            UpdateEquipmentType(fullEquipmentType);
            return {success:true, data:{... equipmentTypeData}, id : equipmentTypeCode };
        }
        else{
            console.log("Thêm mới khách hàng");
            if(fullEquipmentType.image)
            {
                const imgeUploadRes = await uploadImageToServer(fullEquipmentType.image,"EquipmentType");
                if(!imgeUploadRes.success)
                {
                    return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
                }
                fullEquipmentType.image = imgeUploadRes.data;
            }
            // Insert
            const newid = AddNewEquipmentType(fullEquipmentType); 

            
            return {success:true, data:{... equipmentTypeData}, id : newid };
        } 
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return {success:false, msg: err.message};
    }
}


export const deleteEquipmentType = async (equipmentTypeCode: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/equipmenttypeapi/deleteequipmenttype/${equipmentTypeCode}`, {
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
 
export const GetEquipmentTypeList = async(keyword: string):Promise<EquipmentTypeType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/equipmenttypeapi/listequipmenttype`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });
        // const response = await fetch('http://qc.vietnguyencons.com/api/equipmenttypeapi/listequipmentseach', 
        //     { 
        //         method: 'POST',
        //         headers: {
        //         'Authorization': `Bearer ${token}` ,
        //         'Content-Type': "application/json; charset=utf-8"
        //         } ,
        //         body: JSON.stringify({ keysearch:keyword})
        //     }
        //   );
    
        const dataResponse = await response.json(); 
        const listCustomers = dataResponse.data; 
        //console.log(listCustomers);
        return listCustomers;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const UpdateEquipmentType = async(equipmentData: EquipmentTypeType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/equipmenttypeapi/updateequipmenttype',
            {   
              equipmentTypeCode: equipmentData.equipmentTypeCode,
              equipmentTypeName: equipmentData.equipmentTypeName, 
              productName: equipmentData.productName,
              licensePlate: equipmentData.licensePlate,
              yearOfManufacture: equipmentData.yearOfManufacture,
              countryOfManufacture: equipmentData.countryOfManufacture,
              description:equipmentData.description, 
              image:equipmentData.image,
              
            },
            { headers: {
              'Authorization': `Bearer ${token}` ,
              'Content-Type': "application/json; charset=utf-8"
              } }
          );
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const AddNewEquipmentType = async(equipmentData: EquipmentTypeType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/equipmenttypeapi/saveequipmenttype',
            {   
              equipmentTypeCode: equipmentData.equipmentTypeCode,
              equipmentTypeName: equipmentData.equipmentTypeName, 
              productName: equipmentData.productName,
              licensePlate: equipmentData.licensePlate,
              yearOfManufacture: equipmentData.yearOfManufacture,
              countryOfManufacture: equipmentData.countryOfManufacture,
              description:equipmentData.description, 
              image:equipmentData.image,
              
            },
            { headers: {
              'Authorization': `Bearer ${token}` ,
              'Content-Type': "application/json; charset=utf-8"
              } }
          );
          console.log(response.data.id);
        return response.data.id;
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const uploadImageToServer = async(
    file: {uri?: string} | string,
    couponcode: string 
) : Promise<ResponseType> =>{
    try {
        const urlAPI = await AsyncStorage.getItem("companyLink");
        if(typeof file ==="string")
        {
            return {success: true, data: file};
        }
        if(file && file.uri)
        {
            const token = await AsyncStorage.getItem("userToken");
            const formData = new FormData();
            formData.append("file",{
                uri: file?.uri,
                type : "image/jpeg",
                name : file?.uri?.split("/").pop() || "file.jpg"
            } as any);
            formData.append("couponcode",couponcode);
            formData.append("url",urlAPI||"");
            //formData.append("folder",folderName);
            const urlPost = urlAPI +"/api/equipmenttypeapi/uploadimage";
            const  response = await axios.post(urlPost,formData,{
                headers:{
                    'Authorization': `Bearer ${token}` ,
                    'Content-Type': 'multipart/form-data',
                }
            });
            return {success: true, data: response?.data?.path};
        } 
        return {success:true}
    } catch (error: any) {
        console.error('Error uploading image:', error); 
        return {success: false, msg : error.message || "Could not upload file"};
    }
}