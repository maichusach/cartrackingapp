 
import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { getProfileImage } from '@/services/imageService';
import { GetInfoUser, logoutUser } from '@/services/userService';
import { accountOptionType, UserType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from "react-native-reanimated";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserType>(null);

     useEffect(() => { 
            const loadUserData = async () => {
                try {
                    const userInfor = await GetInfoUser();    
                    if(userInfor){
 
                        setUser(userInfor);
                        console.log(userInfor);
                    }
                    else{
                        //console.log("kyf ta");
                        setUser(null); 
                    }
                } catch (e) {
                console.log('Failed to load token', e);
                } finally {
        
            };
            };
        
            loadUserData();
        }, []);

    const accountOptions: accountOptionType[] = [
        {
            title: "Edit Profile",
            icon: <FontAwesome
                name="user"
                size={26}
                color={colors.white} 
                weight='fill' 
            />,
            routeName:"/(modal)/profileModal",
            bgColor:"#6366f1"
        },
        {
            title: "Settings",
            icon: <FontAwesome
                name="gear"
                size={26}
                color={colors.white} 
                weight='fill' 
            />,
            //routeName:"/(modals)/profileModal",
            bgColor:"#059669"
        },
        {
            title: "Privacy Policy",
            icon: <MaterialIcons
                name="policy"
                size={26}
                color={colors.white} 
                weight='fill' 
            />,
            //routeName:"/(modals)/profileModal",
            bgColor:colors.neutral600
        },
        {
            title: "Logout",
            icon: <AntDesign
                name="logout"
                size={26}
                color={colors.white} 
                weight='fill' 
            />,
            //routeName:"/(modals)/profileModal",
            bgColor:"#e11d48"
        }
    ];

    const handleLogout = async ()=>{
        logoutUser();
        router.push("/login");
    }

    const showLogoutAlert = () =>{
        Alert.alert("Xác nhận","Bạn có chắc muốn thoát không?",[
            {
                text:"Hủy bỏ",
                onPress:()=> console.log("Khong thoat"),
                style:'cancel'
            },
            {
                text:"Đăng xuất",
                onPress:()=> handleLogout(),
                style:'destructive'
            }
        ] )
    }
    const handlePress =  (item : accountOptionType) =>{
        if(item.title === 'Logout')
        {
            showLogoutAlert();
        }
        if(item.routeName) router.push(item.routeName);
    }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Thông tin tai khoan' style={{marginVertical: spacingY._10}} />
        {/** user info */}
        <View style={styles.userInfo}>
            {/** avatar */}
            <View>
                 {/** image */}
                <Image 
                    source={getProfileImage(user?.image)} 
                    style={styles.avatar} 
                    contentFit="cover" 
                    transition={100} 
                />
            </View>
            {/** name & usernam */}
            <View style={styles.nameContainer}>
                <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
                    {user?.name}
                </Typo>
                <Typo size={15}  color={colors.neutral400}>
                    {user?.username}
                </Typo>
            </View>
        </View>
         {/** account options */}
         <View style={styles.accountOption} >
            {
                accountOptions.map((item, index)=>{
                    return (
                        <Animated.View 
                        key={index.toString()}
                            entering={FadeInDown.delay(index*50)
                            .springify()
                            .damping(14)
                        }
                        style={styles.listItem}>
                            <TouchableOpacity style ={styles.flexRow} onPress={()=>handlePress(item)}>
                                {/** icon */}
                                <View style={[
                                    styles.listIcon,
                                    {
                                        backgroundColor:item?.bgColor,
                                    }
                                ]}>
                                    {item.icon && item.icon}
                                </View>
                                <Typo size={16} style={{flex:1}} fontWeight={"500"}>
                                    {item.title}
                                </Typo>
                                <FontAwesome5 size={24} name="caret-right" color="black" /> 
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })
            }
         </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:spacingX._20
    },
    userInfo:{
        marginTop: verticalScale(30),
        alignItems:"center",
        gap: spacingY._15
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
        borderRadius:200
    },
    editIcon:{
        position:"absolute",
        bottom:5,
        right:8,
        borderRadius:50,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.25,
        shadowRadius:10,
        elevation:4,
        padding:5
    },
    nameContainer:{
        gap: verticalScale(4),
        alignItems:"center",
    },
    listIcon:{
        height: verticalScale(44),
        width: verticalScale(44),
        backgroundColor: colors.neutral500,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:radius._15,
        borderCurve:"continuous"
    },
    listItem:{
        marginBottom: verticalScale(17),
    },
    accountOption:{
        marginTop:spacingY._35
    },
    flexRow:{
        flexDirection:"row",
        alignItems:"center",
        gap: spacingX._10
    }
})
// import { colors, radius, spacingX, spacingY } from '@/constants/theme';
// import { logoutUser } from '@/services/userService';
// import { accountOptionType } from '@/types';
// import { verticalScale } from '@/utils/styling';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import {
//     Alert,
//     Dimensions,
//     Platform,
//     StatusBar, StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import Animated, { FadeInDown } from 'react-native-reanimated';
// const {height} = Dimensions.get('window');

// const Profile = () => {
//     const router = useRouter();
//      let paddingTop = Platform.OS === 'ios'?height*0.06:0;

//     const accountOptions: accountOptionType[] = [
//         {
//             title: "Edit Profile",
//             icon: null,
//             // <Icons.User
//             //     size={26}
//             //     color={"white"} 
//             //     weight='fill' 
//             // />,
//             //routeName:"/(modals)/profileModal",
//             bgColor:"#6366f1"
//         },
//         {
//             title: "Settings",
//             icon: null, //<IconSymbol size={28} name="paperplane.fill" color={colors.black} />,
//             // <Icons.GearSix
//             //     size={26}
//             //     color={colors.white} 
//             //     weight='fill' 
//             // />,
//             //routeName:"/(modals)/profileModal",
//             bgColor:"#059669"
//         },
//         {
//             title: "Privacy Policy",
//             icon: null,
//             // <Icons.User
//             //     size={26}
//             //     color={colors.white} 
//             //     weight='fill' 
//             // />,
//             //routeName:"/(modals)/profileModal",
//             bgColor:"#059669"
//         },
//         {
//             title: "Logout",
//             icon: null,
//             // <Icons.Power
//             //     size={26}
//             //     color={colors.white} 
//             //     weight='fill' 
//             // />,
//             //routeName:"/(modals)/profileModal",
//             bgColor:"#e11d48"
//         }
//     ];

//     const handleLogout = async ()=>{
//         logoutUser();
//         router.push("/login");
//     }

//     const showLogoutAlert = () =>{
//         Alert.alert("Xác nhận","Bạn có chắc muốn thoát không?",[
//             {
//                 text:"Hủy bỏ",
//                 onPress:()=> console.log("Khong thoat"),
//                 style:'cancel'
//             },
//             {
//                 text:"Đăng xuất",
//                 onPress:()=> handleLogout(),
//                 style:'destructive'
//             }
//         ] )
//     }
//     const handlePress =  (item : accountOptionType) =>{
//         if(item.title === 'Logout')
//         {
//             showLogoutAlert();
//         }
//         if(item.routeName) router.push(item.routeName);
//     }
//   return (
//      <View style={{
//         paddingTop,
//             flex:1,
//             backgroundColor:"red"
//         }}>
//         <StatusBar barStyle="light-content" backgroundColor={"red"}/> 
//       <View style={styles.container}>
//             <View style={styles.containerHeader}>
//                 <View style={styles.leftIcon}></View>
//                 <Text style={{fontSize:22,
//                     fontWeight:"600",
//                     textAlign:"center",
//                     width:"100%"
//                 }}>Thong tin</Text>
//         </View>
//         {/* <Header title='Thông tin' style={{marginVertical: spacingY._10}} /> */}
//         {/** user info */}
//         <View style={styles.userInfo}>
//             {/** avatar */}
//             <View>
//                  {/** image */}
//                 {/* <Image 
//                     source={user?.image} 
//                     style={styles.avatar} 
//                     contentFit="cover" 
//                     transition={100} 
//                 /> */}
//             </View>
//             {/** name & usernam */}
//             <View style={styles.nameContainer}>
//                  <Text style={{fontSize:24,
//                     fontWeight:"600", 
//                     color:"black"
//                 }}>NGuyen van A</Text>
//                  <Text style={{fontSize:15, 
//                     color:"blue"
//                 }}>ACB</Text> 
//             </View>
//         </View>
//          {/** account options */}
//          <View style={styles.accountOption} >
//             {
//                 accountOptions.map((item, index)=>{
//                     return (
//                         <Animated.View 
//                         key={index.toString()}
//                             entering={FadeInDown.delay(index*50)
//                             .springify()
//                             .damping(14)
//                         }
//                         style={styles.listItem}>
//                             <TouchableOpacity style ={styles.flexRow} onPress={()=>handlePress(item)}>
                                
//                                 <View style={[
//                                     styles.listIcon,
//                                     {
//                                         backgroundColor:item?.bgColor,
//                                     }
//                                 ]}>
//                                     {item.icon && item.icon}
//                                 </View>
//                                  <Text style={{fontSize:16,
//                                     fontWeight:"500", 
//                                     flex:1
//                                     }}>{item.title}
//                                 </Text> 
//                                 <FontAwesome5 size={24} name="caret-right" color="black" />
//                                 {/* <Icons.CaretRight 
//                                     size={20}
//                                     weight='bold'
//                                     color={"white"}
//                                 /> */}
//                             </TouchableOpacity>
//                         </Animated.View>
//                     );
//                 })
//             }
//          </View>
//       </View>
//     </View>
//   )
// }

// export default Profile;

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         paddingHorizontal:spacingX._20
//     },
//     userInfo:{
//         marginTop: verticalScale(30),
//         alignItems:"center",
//         gap: spacingY._15
//     },
//     avatarContainer:{
//         position:"relative",
//         alignItems:"center"
//     },
//     avatar:{
//         alignSelf:"center",
//         backgroundColor:colors.neutral300,
//         height: verticalScale(135),
//         width: verticalScale(135),
//         borderRadius:200
//     },
//     editIcon:{
//         position:"absolute",
//         bottom:5,
//         right:8,
//         borderRadius:50,
//         backgroundColor: colors.neutral100,
//         shadowColor: colors.black,
//         shadowOffset:{width:0,height:0},
//         shadowOpacity:0.25,
//         shadowRadius:10,
//         elevation:4,
//         padding:5
//     },
//     nameContainer:{
//         gap: verticalScale(4),
//         alignItems:"center",
//     },
//     listIcon:{
//         height: verticalScale(44),
//         width: verticalScale(44),
//         backgroundColor: colors.neutral500,
//         alignItems:"center",
//         justifyContent:"center",
//         borderRadius:radius._15,
//         borderCurve:"continuous"
//     },
//     listItem:{
//         marginBottom: verticalScale(17),
//     },
//     accountOption:{
//         marginTop:spacingY._35
//     },
//     flexRow:{
//         flexDirection:"row",
//         alignItems:"center",
//         gap: spacingX._10
//     },
//     containerHeader:{
//         width:"100%",
//         alignItems:"center",
//         flexDirection:"row"
//     },
//     leftIcon:{
//         alignSelf:"flex-start"
//     }
// })