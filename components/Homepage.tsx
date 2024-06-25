import { StyleSheet,Text,View,Image } from "react-native";
import React from "react";

const Homepage=()=>{
    return(
        <View style={{alignItems:"center"}}>
            <Image source={require("../assets/images/todo.png")} style={{height:300,width:300}} />
            
        </View>
    )
}
export default Homepage;