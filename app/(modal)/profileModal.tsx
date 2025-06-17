import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { getProfileImage } from '@/services/imageService';
import { GetInfoUser, UpdateUser } from '@/services/userService';
import { UserDataType } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const ProfileModal = () => {
 
    const [uploadStatus, setUploadStatus] = useState('');

    const [userData, setUserData] = useState<UserDataType>({
        name : "",
        image : null, 
        
    });
    const [loading, setLoading] = useState(false); 

    useEffect(() =>{
        const checkToken  = async () => { 
            //console.log(token);
            const token = await AsyncStorage.getItem("userToken"); 
            if(token == null)
            {
              router.push("/login");
            }
        };
        checkToken();
        const loadUserData = async () => {
        try {
            const userInfor = await GetInfoUser();    
            if(userInfor){

                setUserData({name :userInfor.name||"",image: userInfor.image});
                console.log(userInfor);
            }
            else{
                //console.log("kyf ta");
                setUserData({name : "",image : null} ); 
            }
        } catch (e) {
        console.log('Failed to load token', e);
        } finally {

    };
    };

    loadUserData();
    },[]);

    const onSubmit = async()=>{
        let {name, image} = userData;
        if(!name.trim()){
            Alert.alert("User","Xin vui lòng nhập các trường !");
            return;
        }
        //console.log("Ok roi")
        setLoading(true);
        console.log(image);
        // if(image)
        // { 
        //     const imgeUploadRes = await uploadImage();
        //     if(!imgeUploadRes.success)
        //     {
        //         return {success:false, msg: imgeUploadRes.msg || "Tải file lên bị thất bại!"};
        //     }
        //     userData.image = imgeUploadRes.data;
        //     //uploadImage();
        // }
        // console.log(image);
        const res = await UpdateUser(1, userData);
        setLoading(false);
        if(res.success)
        {
            // Update userData
            
            // Back list
            router.back();
        }
        else
        {
            Alert.alert("User", res.msg);
        }
    };

    const onPickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        //console.log(result.assets[0]);
    
        if (!result.canceled) {
          setUserData({ ... userData, image: result.assets[0]})
        }
      };

 
//  const uploadImage = async (file:string) : Promise<ResponseType> => { 

//         //setUploadStatus('Uploading...');

       
    
//         // Prepare the FormData
//         //const formData = new FormData();
    
//         // Convert the local URI to a format that can be sent in FormData
//         // Expo doesn't directly give you the file name and type, so you might need to infer it
//         // const uriParts = userData.image.split('.');
//         // const fileType = uriParts[uriParts.length - 1];
//         // const fileName = `image-${Date.now()}.${fileType}`;
    
//         // formData.append('file', {
//         //   uri: userData.image,
//         //   name: fileName,
//         //   type: `image/${fileType}`, // Adjust the type if needed
//         // } as any);
//         // const formData = new FormData();
//         // formData.append("file",{
//         //     uri:file,
//         //     type: "image/jpeg",
//         //     name: file.split("/").pop()||"file.jpg", 
//         // } as any);
//         // formData.append('couponCode',"Profile");
//         // formData.append('url',urlAPI!);
    
//         try {
         
//         //   let response = await fetch(urlAPI+'api/userappapi/uploadprofile', {
//         //     method: 'POST',
//         //     body: formData,
//         //     headers: {
//         //       'Authorization': `Bearer ${token}` ,
//         //       'Content-Type': 'multipart/form-data',
//         //     },
//         //   });
//          const token = await AsyncStorage.getItem("userToken"); 
//             const formData = new FormData();
//             formData.append("file",{
//                 uri:file,
//                 type: "image/jpeg",
//                 name: file.split("/").pop()||"file.jpg", 
//             } as any);
//             formData.append('couponCode',"Profile");
//             formData.append('url',urlAPI!);
//             const urlPost = urlAPI +"/api/userappapi/uploadprofile";
            
//             const response = await axios.post(urlPost, formData,{
//                 headers:{
//                     'Authorization': `Bearer ${token}` ,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
    
//           //const responseData = await response.json();
//           console.log(response.data.path);
//           return {success:true, data: response.data.path}
           
        
//         } catch (error: any) {
//           console.log(error.message);
//             return {success:false, msg: error.message}
//         }
//       };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
        title="Cập nhật tài khoản"
        leftIcon={<BackButton/>}
        style={{marginBottom:spacingY._10}}
        />
        {/** form */}
        <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.avatarContainer}>
                <Image 
                style={styles.avatar}
                source={getProfileImage(userData.image)}
                contentFit='cover'
                transition={100}
                />
                <TouchableOpacity onPress={onPickImage } style={styles.editIcon}>
                    <Ionicons
                    name='pencil'
                    size = {verticalScale(20)}
                    color={colors.neutral800}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Typo color={colors.neutral200}>Tên</Typo>
                <Input 
                    placeholder='Tên'
                    value={userData.name}
                    onChangeText={(value)=> setUserData({...userData, name:value})}
                />
            </View>
        </ScrollView>
      </View>
      <View style ={styles.footer}>
            <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
                <Typo color={colors.black} fontWeight={"700"}>Cập nhật</Typo>
            </Button>
      </View>
    </ModalWrapper>
  )
}

export default ProfileModal

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        paddingHorizontal:spacingX._20
    },
    footer:{
        alignContent:"center",
        flexDirection:"row",
        justifyContent:"center",
        paddingHorizontal: spacingX._20,
        gap:scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth:1
    },
    form:{
        gap: spacingY._30,
        marginTop: spacingY._15
    },
    avatarContainer:{
        position:"relative",
        alignItems:"center"
    },
    avatar:{
        alignSelf:"center",
        backgroundColor:colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius:200,
        borderWidth:1,
        borderColor: colors.neutral500
    },
    editIcon:{
        position:"absolute",
        bottom:spacingY._5,
        right:spacingY._7,
        borderRadius:100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.25,
        shadowRadius:10,
        elevation:4,
        padding:spacingY._7
    },

    inputContainer:{
        gap: spacingY._10
    }
})