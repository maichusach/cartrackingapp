import { colors, radius } from '@/constants/theme';
import { getFilePath } from '@/services/imageService';
import { ImageUploadProps } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from './Typo';
 


const ImageToUpload = ({
    file = null,
    onSelect,
    onClear,
    containerStyle,
    imageStyle,
    placeholder = ""
}: ImageUploadProps) => {

    const pickImage = async () =>{
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
    
        //console.log(result.assets[0]);
    
        if (!result.canceled) {
            onSelect(result.assets[0]);
        }
    }
  return (
    <View>
      {
        !file && (
            <TouchableOpacity 
            onPress={pickImage}
            style={[styles.inputContainer,containerStyle && containerStyle ]}>
                <Feather name='upload-cloud' size={verticalScale(24)} color={colors.neutral200} />
                {
                    placeholder && <Typo size={15}> {placeholder}</Typo>
                }
            </TouchableOpacity>
        )
      }

      {
        file && (
            <View style = {[styles.image, imageStyle && imageStyle]}>
                 <Image 
                    style={{flex:1}}
                    source={getFilePath(file)} 
                    contentFit='cover'
                    transition={100}
                 />
                 <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
                    <AntDesign
                        name='closecircleo' 
                        size={verticalScale(24)}
                        weight='fill'
                        color={colors.white}
                    />
                 </TouchableOpacity>
            </View>
        )
      }
    </View>
  )
}

export default ImageToUpload

const styles = StyleSheet.create({
    inputContainer:{
        height: verticalScale(54),
        backgroundColor: colors.neutral600,
        borderRadius: radius._15,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: colors.neutral500,
        borderStyle: "dashed"
    },
    image:{
        height : scale(150),
        width : scale(150),
        borderRadius: radius._15,
        borderCurve: "continuous",
        overflow:"hidden"
    },
    deleteIcon:{
        position: "absolute",
        top: scale(6),
        right: scale(6),
        shadowColor: colors.black,
        shadowOffset:{ width: 0, height: 5},
        shadowOpacity:1,
        shadowRadius:10,
    }
})