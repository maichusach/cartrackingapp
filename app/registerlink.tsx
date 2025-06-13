import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

const RegisterLink = () => {
  const [linkcustom, setLinkcustom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

   useEffect(() => { 
      const checkLink  = async () => { 
            //console.log(token);
            const linkCurrent = await AsyncStorage.getItem("companyLink"); 
            if(linkCurrent)
            {
               setLinkcustom(linkCurrent);
            }
        };
        checkLink();
    }, []);


    const handleSubmit = async ()=>{
        if(!linkcustom)
        {
            Alert.alert("Đăng ký link","Xin vui lòng nhập đường link!");
            return;
        }

        setIsLoading(true);
        
        await AsyncStorage.setItem('companyLink', linkcustom);
        setIsLoading(false);
        router.push("/login");
         
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
                    value={linkcustom}
                    onChangeText={(value)=>setLinkcustom(value)}
                    icon={<FontAwesome
                        name='link'
                        size={verticalScale(26)}
                        color={colors.neutral300}
                        weight='fill'/>
                    }
                /> 
                <Button loading={isLoading} onPress={handleSubmit}>
                    <Typo fontWeight={"700"} color={colors.black} size={21}>
                        Đăng ký link
                    </Typo>
                </Button>
            </View> 
        </View>
    </ScreenWrapper>
  )
}

export default RegisterLink

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