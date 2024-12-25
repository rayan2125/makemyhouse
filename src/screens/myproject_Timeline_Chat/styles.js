import { StyleSheet } from 'react-native';
import Util from '../utility/utility';
const styles = StyleSheet.create({
    Vi: {
        flex: 1,backgroundColor:"white"
    },
    Vi1: {
        height: Util.getHeight(7), backgroundColor: '#05836b', flexDirection: 'row' 
    },
    Vi2: {
        marginTop: 10
    },
    Vi3: {
        flex: 1,
        // padding:10,
        // paddingBottom:60
    },
    Vi4: {
        flexDirection: 'row',justifyContent: 'center',alignItems: 'center',
        backgroundColor: '#fff',borderWidth:.5,borderColor: '#000', bottom:0,
        position:'relative', width: Util.getWidth(95),height: Util.getHeight(5),borderRadius: 20,margin: 10
    },
    tex: {
        color: '#000000',fontSize:18
    },
    Img: {
        width: 20, margin: 16, height: 20 
    },
    Img1: {
        width: 30, height: 30,
    },
    Img2: {
        width: 22, height: 23, margin: 13, left:30
    },
    Img3: {
        width: 22, height: 23, margin: 10,
    },
    Img4: {
        width: 25, height: 25, padding: 10,margin: 5,
        resizeMode: 'stretch', alignItems: 'center'
    },
    Img5: {
        width: 22, height: 23, margin: 10,left:20
    },
    Img6: {
        width: 30, height: 30, margin: 10,left:25
    },
      msgInnerBlock1: {
        marginVertical: 5,
        maxWidth: Util.getWidth(100),
        padding: 10,
        backgroundColor: 'white',
        alignSelf:"flex-end",
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        borderBottomLeftRadius:15,

      },
      msgInnerBlock2: {
        marginVertical: 5,
        maxWidth: Util.getWidth(100),
        padding: 10,
        alignSelf: 'flex-start',
        backgroundColor: 'lightgrey',
        alignSelf:"flex-start",
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        borderBottomRightRadius:15
        

      },
})
export default styles;