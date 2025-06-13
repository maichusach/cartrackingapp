 
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingY } from '@/constants/theme';
import { loginNew } from '@/services/userService';
import { verticalScale } from '@/utils/styling';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';


const Login = () => {
 
    const usernameRef = useRef(""); 
    const passwordRef = useRef(""); 
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => { 
      const checkLink  = async () => { 
            //console.log(token);
            const linkCustom = await AsyncStorage.getItem("companyLink"); 
            if(linkCustom == null)
            {
              router.push("/registerlink");
            }
        };
        checkLink();
    }, []);


    const handleSubmit = async ()=>{
        if(!usernameRef.current || !passwordRef.current)
        {
            Alert.alert("Đăng nhập","Xin vui lòng nhập tất cả các ô!");
            return;
        }

        setIsLoading(true);
        console.log("beforeRes");
        // Alert.alert("Đăng nhập",usernameRef.current);
        // Alert.alert("Đăng nhập",passwordRef.current);
        const res = await loginNew(usernameRef.current,passwordRef.current);
        console.log("AfterRes");
        console.log(res);
        setIsLoading(false);
        if(!res.success){
            Alert.alert("Login hau", res.msg);
        }
        else{
            router.replace("/(tabs)");
        }
    }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            {/* <BackButton iconSize={28} /> */}
            <View style={{gap:5, marginTop:spacingY._20}}>
                <Typo size={25} fontWeight={"800"}>
                    NHẬT KÝ CÔNG TRƯỜNG
                </Typo>
                <Typo size={25} fontWeight={"800"} style={{ alignItems:"center"}}>
                   VIỆT NGUYÊN 
                </Typo>
            </View>
            {/* form */}
            <View style={styles.form}>
                <Typo size={16} color={colors.textLighter}>
                    Đăng nhập nhật ký công trường
                </Typo>

                {/* input */}
                <Input 
                    placeholder='Nhập tài khoản' 
                    onChangeText={(value)=>(usernameRef.current = value)}
                    icon={<FontAwesome
                        name='user'
                        size={verticalScale(26)}
                        color={colors.neutral300}
                        weight='fill'/>
                    }
                />
                <Input 
                    placeholder='Nhập mật khẩu' 
                    secureTextEntry
                    onChangeText={(value)=>(passwordRef.current = value)}
                    icon={<FontAwesome5
                        name='lock' 
                        size={verticalScale(26)}
                        color={colors.neutral300}
                        weight='fill'/>
                    }
                />
                <Typo size={14} color={colors.text} style={{alignSelf:"flex-end"}}>
                    Quên mật khẩu
                </Typo>
                <Button loading={isLoading} onPress={handleSubmit}>
                    <Typo fontWeight={"700"} color={colors.black} size={21}>
                        Đăng nhập
                    </Typo>
                </Button>
            </View>

            {/** footer */}
            {/* <View style={styles.footer}>
                <Typo size={15}>Bạn chưa có tài khoản?</Typo>
                <Pressable onPress={()=> router.navigate("/(auth)/register")}>
                    <Typo size={15} fontWeight={"700"} color={colors.primary}>
                        Đăng ký
                    </Typo>
                </Pressable>
            </View> */}
            
        </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap: spacingY._30,
        paddingHorizontal:spacingY._20,
    },
    welcomeText:{
        fontSize: verticalScale(20),
        fontWeight:"bold",
        color: colors.text,
    },
    form:{
        gap:spacingY._20,
    },
    forgotPassword:{
        textAlign:"right",
        fontWeight: "500",
        color:colors.text,
    },
    footer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,
    },
    footerText:{
        textAlign:"center",
        color:colors.text,
        fontSize:verticalScale(15),
    }
})