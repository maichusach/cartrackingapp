import { ResponseType, UserDataType, UserType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const loginUserService = async (username: string, password:string) => {
  try {
  //   // const baseUrl = 'http://erp.vietnguyencons.com/gettoken';
  //   // const params = {
  //   //   username: username,
  //   //   password: password,
  //   //   grant_type: "password"
  //   // };

  //   // // Build query string
  //   // const queryString = new URLSearchParams(params).toString();
  //   // const urlWithParams = `${baseUrl}?${queryString}`;

  //   // fetch(urlWithParams, {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'Accept': 'application/json',
  //   //     'Content-Type': 'application/x-www-form-urlencoded'
  //   //     // Add Authorization if needed
  //   //     // 'Authorization': `Bearer ${token}`
  //   //   }
  //   // })
  //   //   .then(response => {
  //   //     if (!response.ok) {
  //   //       throw new Error(`HTTP error! Status: ${response.status}`);
  //   //     }
  //   //     //return response.json();
  //   //      console.log('Data ne:', response.json());
  //   //   })
  //   //   .then(data => {
  //   //     console.log('Data:', data);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error fetching data:', error);
  //   //   });
      const url = 'http://erp.vietnguyencons.com/gettoken'; // Replace with your token URL
      const data = {
        username: username,
        password: password,
        grant_type: "password"
      };

      fetch(url, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
          //'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/json',
          //   'Accept': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
          // 'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataRes = response.json();
        console.log(dataRes);
        
      })
      .catch(error => {
        console.error('Error fetching token:', error);
        //return {success:false, msg: error};
      });
    return {success:true, msg: "ok"};
  } catch (error: any) {
    return {success:false, msg: error.message};
  }
  
      // try {
      //   const res = await axios.post('http://erp.vietnguyencons.com/gettoken',
      //      {
      //       username:'0975560914',
      //       password:'Vnc@123',
      //       grant_type: "password",
      //   }, 
      //   {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", // Tell API it's JSON data
      //       }, 
      //   }
      //   );
      //   console.log("ok1");
      //    const token = res.data.access_token;
      //   console.log(res.data);
      //   //const { token, user } = res.data;
      //   //setUser(user);
      //   await AsyncStorage.setItem('userToken', token);
      //   //console.log("OK2");
      //   return {success:true}
      // } catch (error: any) {
      //   //let msg = error.mese
      //   //throw new Error('Login failed');

      //   let errorMessage = "An unexpected error occurred during login.";
      //   if (axios.isAxiosError(error)) {
      //     if (error.response) {
      //       // The request was made and the server responded with a status code
      //       // that falls out of the range of 2xx
      //       // console.error('Error data:', error.response.data);
      //       // console.error('Error status:', error.response.status);
      //       errorMessage = `Login failed: ${error.response.data.error_description || error.response.data.message || error.response.status}`;
      //     } else if (error.request) {
      //       // The request was made but no response was received
      //       // console.error('Error request:', error.request);
      //       errorMessage = "Login failed: No response from server.";
      //     } else {
      //       // Something happened in setting up the request that triggered an Error
      //       // console.error('Error message:', error.message);
      //       errorMessage = `Login failed: ${error.message}`;
      //     }
      //   } else {
      //     errorMessage = `Login failed: ${error.message}`;
      //   }
      //   return { success: false, msg: errorMessage };
      //   // return {success:false, msg: error.message};
      // }
      // try {
      //   var data = new XMLHttpRequest();
      //   var username = '0975560914';
      //   var password = 'Vnc@123';
        
      //   data.open("POST", "http://erp.vietnguyencons.com/gettoken",true);
      //   data.setRequestHeader("Content-Type", "application/json");
      //   // data.addEventListener("load", function () {
      //   //   var response = JSON.parse(data.response);
      //   //   console.log(response);
      //   //   if (response.token) {
      //   //     console.log(response);
      //   //     AsyncStorage.setItem('userToken', response.token);
      //   //     //return {success:true}
      //   //   }
      //   //   else{
      //   //     console.log("No token");
      //   //     //return {success:false}
      //   //   }
          
      //   // }
      //   // );
      //   data.onreadystatechange = function () {
      //     if (data.readyState === 4) {
      //       console.log(data.status);
      //       if (data.status === 200) {
      //         var response = JSON.parse(data.responseText);
      //         AsyncStorage.setItem('userToken', response.access_token);
      //         console.log(response);
      //       }
      //       else{
      //         console.log("No token", data.status, data.responseText);
      //       }
      //     }
      //   }

      // var sendObject = JSON.stringify({
      //   username: username,
      //   password: password,
      //   grant_type: "password"
      // });
      // console.log(sendObject);
      //   data.send(sendObject);

    //   return {success:true} 
        
    //   } catch (error: any) {
    //     return {success:false, msg: error.message};
    //   }
    };

 export    const logoutUser = async () => { 
      await AsyncStorage.removeItem('userToken');
      return {success:false};
    };

 export      const loginNew = async (username: string, password:string) => {
      try {
        const linkCustom = await AsyncStorage.getItem("companyLink"); 
        const res = await axios.post(linkCustom+'/gettoken', {
            username,
            password,
            grant_type: "password",
        },
        {
            headers: {
              //'Content-Type': 'application/json'
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", // Tell API it's JSON data
            }, 
        }
        );
        //console.log("ok1");
        const token = res.data.access_token;
        //console.log(res.data);
        //const { token, user } = res.data;
        //setUser(user);
        await AsyncStorage.setItem('userToken', token);
        //console.log("OK2");
        return {success:true}
      } catch (error: any) {
        //let msg = error.mese
        //throw new Error('Login failed');
        return {success:false, msg:"Login failed" + error.message};
      }
    };

export const UpdateUser = async (
    userid: number,
    updateData: UserDataType
):Promise<ResponseType> =>{
    try {
        // Update here
        if(updateData.image)
        {
            const imgeUploadRes = await UploadProfileUser(updateData.image,"Profile");
            if(!imgeUploadRes.success)
            {
                return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
            }
            updateData.image = imgeUploadRes.data;
        }
        UpdateInfoUser(userid,updateData);
        return {success: true, msg: "Update Success!"};
    } catch (error: any) {
        console.log("Error update user", error);
        return {success: false, msg: "Loi cap nhat"};
    }
};

export const UpdateInfoUser = async(userId: number,userData: UserDataType) =>{
    try {
        const token = await AsyncStorage.getItem("userToken"); 
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        const response = await axios.post(urlAPI+'/api/userappapi/updateuserprofile',
            {   
                userId: userId,  
                fullName: userData.name, 
                image:userData.image, 
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


export const UploadProfileUser = async(
    file:{uri?: string} | string,
    couponCode: string
): Promise<ResponseType> =>{
    try {
        const urlAPI = await AsyncStorage.getItem("companyLink"); 
        if(!file) return {success:true, data: null};
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

            const urlPost = urlAPI +"/api/userappapi/uploadprofile";
            
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

export const GetInfoUser = async () 
: Promise<UserType> => {
    try {
      
      const token = await AsyncStorage.getItem('userToken');
      const urlAPI = await AsyncStorage.getItem("companyLink"); 
      //console.log(token);
      if (token) {
        // Optionally fetch user profile using the token
        const res = await axios.get(urlAPI+'/api/userappapi/getuserapp', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res.data);  
        return {name: res.data.kq.name, image: res.data.kq.image, userid: res.data.kq.userid, username: res.data.kq.username};
        
      }
      else{
        //console.log("kyf ta");
         return {name: "", image: ""};
      }
    } catch (e) {
      console.log('Failed to load token', e);
      return {name: "", image: ""};
    } 
};