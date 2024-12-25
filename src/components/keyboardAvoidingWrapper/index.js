import React, {useEffect, memo } from "react";

import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, keyboard  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const KeyboardAvoidingWrapper =  ({children}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView style={{flex:1}}>
                <ScrollView style={{flex:1}} bounces={false} scrollEnabled={false} showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback >
                        {children}
                    </TouchableWithoutFeedback>    
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default KeyboardAvoidingWrapper