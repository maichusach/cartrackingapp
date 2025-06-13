 
import { ResponseType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const uploadFileToServer = async (
    file: {uri?: string} | string,
    folderName : string,
    api_url: string
) : Promise<ResponseType> =>{
    try {

        if(typeof file ==="string")
        {
            return {success: true, data: file};
        }
        if(file && file.uri)
        {
            const token = await AsyncStorage.getItem("authToken");
            const formData = new FormData();
            formData.append("file",{
                uri: file?.uri,
                type : "image/jpeg",
                name : file?.uri?.split("/").pop() || "file.jpg"
            } as any);
            //formData.append("","");
            formData.append("folder",folderName);

            const  response = await axios.post(api_url,formData,{
                headers:{
                    'Authorization': `Bearer ${token}` ,
                    'Content-Type': 'multipart/form-data',
                }
            });
            return {success: true, data: response?.data?.secure_url};
        }
        return {success:true}
    } catch (error: any) {
        console.log("Error when upload imag", error);
        return {success: false, msg : error.message || "Could not upload file"}
    }
}
 

export const getProfileImage = (file: any) =>{
    if(file && typeof file == 'string') return file;
    if(file && typeof file == 'object') return file.uri;

    return require("../assets/images/defaultAvatar.jpg");
}


export const getFilePath = (file: any) =>{
    if(file && typeof file == 'string') return file;
    if(file && typeof file == 'object') return file.uri;

    return null;
}