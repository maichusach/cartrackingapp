import { CustomerType, ResponseType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const createOrUpdateCustomer = async(
    customerData: Partial<CustomerType>
) =>{
    
    try {
        
        const fullCustomer: CustomerType = {
            customerId: customerData?.customerId,
            customerCode: customerData?.customerCode ?? "",
            customerName: customerData?.customerName ?? "",
            address: customerData?.address ?? "",
            phone: customerData?.phone ?? "",
            fax: customerData?.fax ?? "",
            email: customerData?.email ?? "",
            contact: customerData?.contact ?? "" ,
            image: customerData?.image??""
        };
        const {customerId,customerCode, customerName,address, image} = customerData;
       
        if(!customerCode || !customerName || !address)
        {
            return {success: false, msg: "Không có dữ liệu khách hàng"}
        }
        if(customerId){
            console.log("Update khách hàng");
            // todo update data
            UpdateCustomer(fullCustomer);
            return {success:true, data:{... customerData}, id : customerId };
        }
        else{
            console.log("Thêm mới khách hàng");
            // Insert
            const newid = AddNewCustomer(fullCustomer); 
            return {success:true, data:{... customerData}, id : newid };
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


export const deleteCustomer = async (customerId: string) : Promise<ResponseType> =>{
    try {
        //const walletRef = 
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response  = await fetch(urlAPI+`/api/customerapi/deletecustomer/${customerId}`, {
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
 
export const GetCustomersList = async(keyword: string):Promise<CustomerType[]> =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        // const response  = await fetch(`http://qc.vietnguyencons.com/api/customerapi/listcustomer`, {
        //     method: "GET",
        //     headers: { "Authorization": `Bearer ${token}` },
        // });
        const response = await fetch(urlAPI+'/api/customerapi/listcustomerseach', 
            { 
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}` ,
                'Content-Type': "application/json; charset=utf-8"
                } ,
                body: JSON.stringify({ keysearch:keyword})
            }
          );
    
        const dataResponse = await response.json(); 
        const listCustomers = dataResponse.data; 
        //console.log(listCustomers);
        return listCustomers;
     
    } catch (err: any) {
        console.log("Loi khi dang xoa", err);
        return [];
    }
}

export const UpdateCustomer = async(customerData: CustomerType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/customerapi/updatecustomer', 
            {   
              customerId: customerData.customerId,
              customerCode: customerData.customerCode, 
              customerName: customerData.customerName,
              address: customerData.address,
              phone: customerData.phone,
              fax: customerData.fax,
              email:customerData.email,
              contact:customerData.contact,
              image:customerData.image,
              
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

export const AddNewCustomer = async(customerData: CustomerType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/customerapi/savecustomer',
            {   
              customerId: customerData.customerId,
              customerCode: customerData.customerCode, 
              customerName: customerData.customerName,
              address: customerData.address,
              phone: customerData.phone,
              fax: customerData.fax,
              email:customerData.email,
              contact:customerData.contact,
              image:customerData.image,
              
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