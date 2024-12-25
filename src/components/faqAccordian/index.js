import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import FontSize from '../../screens/utility/fonts';
import Colors from '../../screens/utility/color';



const AccordionItem = ({ children, title, expanded, onToggle }) => {
    // const [ expanded, setExpanded ] = useState(false);
  
    // function toggleItem() {
    //   setExpanded(!expanded);
    // }

    
  
    const body = <View style={styles.accordBody}>{ children }</View>;
  
    return (
      <View style={[styles.accordContainer]}>
         
        <TouchableOpacity activeOpacity={0.91} style={styles.accordHeader} onPress={onToggle}>
            
            <View style={{width:'100%',justifyContent:'center',alignItems: 'flex-start',alignContent:'center'}}>
                    <Text style={[styles.accordTitle,{fontSize:FontSize.p,color:Colors.black}]}>{title}</Text>
            </View>
            {/* <View style={{width:'20%',justifyContent:'center',alignItems: 'center',alignContent:'center'}}>
                    <Text style={{fontSize:FontSize.p,color:Colors.gray}}>
                        { expanded ? '-' : '+'}
                    </Text>    
            </View> */}
          
            {/* <Icon name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color="#bbb" /> */}  

        </TouchableOpacity>
        { expanded && body }
      </View>
    );
}

const styles = new StyleSheet.create({
     
      accordContainer: {
        width:'100%',
        paddingBottom: 4,
        // borderBottomWidth:1, 
        // borderBottomColor:Colors.lightGray,
        marginBottom:6, 
      },
      accordHeader: {
        
        paddingVertical: 12, 
        color: '#eee', 
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor:'#ffffff',
        elevation:2, 
      },
      accordTitle: {
        
      },
      accordBody: {
        paddingVertical: 12,
        backgroundColor:'#ffffff',
        marginTop:6,
        paddingHorizontal:8,
        elevation:4
      },
      textSmall: {
        fontSize: 16
      },
      seperator: {
        height: 12
      }
})

export default memo(AccordionItem);