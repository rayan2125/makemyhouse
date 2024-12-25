import { StyleSheet,Dimensions } from 'react-native';
import { Util } from '../../utility/scaling';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const { height,width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Colors: {
    headerColor: '#012E58',  //#006db5
    headerText: '#fff',
    backgroundPrimary: '#f8f6f7',
    borderColor: '#eaeaea',
    buttonColor: "#3ab54a",
    FBtnColor: '#4267b2',
    errorColor: "red",
    black: "black",
    lightGray: "#ccc",
    gray: "gray",
    blue: '#34a0e6'
  },
  flex: {
    flexDirection: 'row'
  },
  button:
  {
    // borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  wrapper: {},
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonInt: {
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  enqrybttn: {
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#4CB050',
    // alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    left: 120,
  },
  addrestxt: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    width: Util.getWidth(95),
    height: Util.getHeight(15),
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    margin: 5,
    marginTop: 15,
  },
  addrestxt2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    width: Util.getWidth(95),
    height: Util.getHeight(6),
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    margin: 5,
  },
  contrytxt2: {
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    width: Util.getWidth(95),
     height:Util.getHeight(0.2),
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  //  marginVertical: 5,
    flexGrow: 1,
    ///    backgroundColor: '#fff',
    // alignItems: 'flex-start',
   // paddingLeft: 5,
    // paddingTop:50,
    // padding: 20,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
  },
  inputtxt: {
    color: '#5F5F5F',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    marginLeft: 5,
  },
  inputtxt1: {
    color: '#5F5F5F',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    marginLeft: 5,
    backgroundColor: '#E7EBEE'
  },
  enqrytxt: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'SFUIText-Regular',
  },
  descptxt: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'SFUIText-Regular',
  },
  viewPlan: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#D0CFCF',
    borderBottomWidth: 1,
    width: Util.getWidth(90)
  },
  viewPlan1: {
    flexDirection: 'row',
    padding: 5,
    width: Util.getWidth(90)
  },
  plan: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'SFUIText-Bold',
    marginBottom: 15
  },
  select: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'SFUIText-Bold',
    textAlign: 'center'
    // marginBottom: 15
  },
  planText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'SFUIText-Bold',
    width: Util.getWidth(50)
  },
  planText1: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'SFUIText-Regular',
    width: Util.getWidth(50)
  },
  checktext: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SFUIText-Regular',
    // width: Util.getWidth(50)
  },
  catg: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    paddingHorizontal: 10,
    margin: 5
  },
  houseText: {
    fontSize: 14,
    color: '#2072BA',
    // textAlign:'center',
    marginTop: 5,
    fontFamily: 'SFUIText-Semibold',
  },
  archiText: {
    fontSize: 18,
    color: '#2072BA',
    alignItems:'flex-start',
    width:Util.getWidth(40),
    marginTop: 10,
    fontFamily: 'SFUIText-Medium',
  },
  archiText2: {
    fontSize: 18,
    color: '#000',
    alignSelf:'center',
    justifyContent:'center',
    textAlign:'center',
    width:Util.getWidth(70),
  //  marginTop: 10,
    fontFamily: 'SFUIText-Regular',
  },
  archiText3: {
    fontSize: 18,
    color: '#2072BA',
    alignItems:'flex-start',
    width:Util.getWidth(80),
    marginTop: 10,
    fontFamily: 'SFUIText-Medium',
  },
  reqstbutn: {
    backgroundColor: '#4CB050',
    borderRadius: 10,
    width: Util.getWidth(30),
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
   // marginTop: 10,
   // padding: 3
  },
  selectbutn:
  {
    backgroundColor: '#4CB050',
    borderRadius: 5,
    width: Util.getWidth(20),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 3
  },
  selectText:
  {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 13,
    padding: 5,
    fontFamily: 'SFUIText-Regular'
  },
  applytxt: {
    textAlign: 'center',
    marginTop: 8,
    color: '#ffffff',
    fontSize: 14,
    padding: 5,
    fontFamily: 'SFUIText-Regular'
  },
  homeicon: {
    width: 50,
    height: 50,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  checkhomeicon: {
    width: 50,
    height: 50,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  rupeeIcon: {
    width: 20,
    height: 20,
  },
  rupeeIcon1: {
    width: 10,
    height: 10,
    marginTop: 4
  },
  arrow: {
    width: 10,
    height: 10,
    marginTop: 4,
    alignSelf: 'center',

  },
  rupeeText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginTop: -5,
    fontFamily: 'SFUIText-Regular',
  },
  searchIcon: {
    width: 25,
    height: 22,
    margin: 5,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  procesBtn: {
    backgroundColor: '#4CB050',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:'center',
    padding: 5, margin: 5,
    width: Util.getWidth(50),
    borderRadius: 20
  },
  boxView: {
   alignSelf: 'center',
   justifyContent:'center',
   backgroundColor:'#C4C4C4',
   paddingVertical: 10,
 // flex: 1,
// marginVertical: responsiveHeight(0),  
   //flexGrow:1,
    width: Util.getWidth(100),
},
selected: {
  backgroundColor: 'blue',
  color: '#fff'
},
  procesText: {
    fontSize: 24,
    fontFamily: 'SFUIText-Regular',
    alignSelf: 'center',
    color: '#ffffff'
  },
  submtText: {
    fontSize: 20,
    fontFamily: 'SFUIText-Regular',
    alignSelf: 'center',
    color: '#ffffff'
  },
  submtBtn: {
    backgroundColor: '#4CB050',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent:'center',
   // padding: 5, 
   marginBottom: 20,
   paddingHorizontal: 3,
   paddingVertical: 3,
    width: Util.getWidth(90),
    borderRadius: 30
  },
  arowIcon: {
    width: 20,
    height: 20,
    margin: 5,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  moreIcons: {
    width: 40,
    height: 40,
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  countIcons: {
    width: Util.getWidth(8),
    height: Util.getWidth(8),
    paddingVertical: 5,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0CFCF',
    textAlign: 'center', margin: 5,
    fontFamily: 'SFUIText-Bold',
    fontSize: 16
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 3,
    //  backgroundColor:'#ffffff',

  },
  moretxt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 4,
  },
  textInt: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 3,
    padding: 2
  },
  viewStyle: {
    width: Util.getWidth(99),
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 2,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  filterView: {
    width: Util.getWidth(40),
    //  borderRadius: 0,
    backgroundColor: '#f6f6f6',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },

  textStyle1: {
    width: Util.getWidth(65),
    fontSize: 12,
    fontWeight:"400",
    color: '#000000',
    padding:10
  },

  textStyle2: {
    width: Util.getWidth(75 ),
    fontSize: 12,
    fontFamily: 'SFUIText-Bold',
    marginTop: 5,
    color: '#000000',
  },
  textStyle: {
    width: Util.getWidth(30),
    alignItems: 'flex-end',

  },
  imageHeart: {
    width: Util.getWidth(5),
    height: Util.getHeight(5),
  },
  imagearow: {
    width: Util.getWidth(5),
    height: Util.getHeight(5),
  
  },
  imageBook: {
    width: Util.getWidth(10),
  },
  cardStyle: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  image5: {
    width: Util.getWidth(100),
    height: Util.getHeight(30),
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  container: {
    width: "100%",
    height: "100%",
  },
  positionImg: {
    position: 'absolute',
    width: Util.getWidth(10),
    height: Util.getHeight(5),
    bottom: 10,
    right: 5,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#6e6d6d',
  },
  heartView: {
    width: Util.getWidth(10),
    height: Util.getHeight(5),
    top: 90,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#282928',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  centeredView1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  centeredView2: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: Util.getWidth(100),
    alignItems: 'flex-start',
    backgroundColor: '#2f2f2f'
  },
  centeredView3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Util.getWidth(90),
    margin: 22,
  },
  modalView1: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    flexDirection: 'row',
    width: Util.getWidth(100),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: Util.getWidth(100),
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  input: {
    padding: 5,
    width: Util.getWidth(25),
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  input2: {
    padding: 5,
    width: Util.getWidth(28),
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    elevation: 2,
  },

  input3: {
    width: Util.getWidth(60),
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  input4: {
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 5,

    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#3CAF4B',
    marginHorizontal: 25,
    padding: 10,
    alignItems: 'center',
    width: Util.getWidth(30),
    justifyContent: 'center'
  },
  buttonClose: {
    backgroundColor: '#FFBD00',
    marginHorizontal: 25,
    padding: 10,
    alignItems: 'center',
    width: Util.getWidth(30),
    justifyContent: 'center'
  },
  textmodal: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'SFUIText-Regular',
    alignItems:'flex-start',
  },
  textmodal11: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'SFUIText-Bold',

  },
  modalText: {
    marginTop: 15,
    width: Util.getWidth(25),
    fontFamily: 'SFUIText-Regular',
    textAlign: 'center',
    fontSize: 16,
    color: '#000000'
  },
  modalTextEnq: {
    marginTop: 15,
    width: Util.getWidth(90),
    fontFamily: 'SFUIText-Bold',
    alignItems: 'flex-start',
    fontSize: 16,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    padding: 3,
    marginHorizontal: 5,
    color: '#ffffff'
  },
  modalTextEnq2: {
    marginTop: 15,
    width: Util.getWidth(90),
    fontFamily: 'SFUIText-Bold',
    alignItems: 'flex-start',
    fontSize: 16,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    padding: 3,
    marginRight: 20,
    marginHorizontal: 15,
    color: '#ffffff'
  },

  modalTextEnq3: {
    marginTop: 15,
    width: Util.getWidth(90),
    fontFamily: 'SFUIText-Regular',
    alignItems: 'flex-start',
    fontSize: 20,
    padding: 3,
    margin:5,
    color: '#000000'
  },
 
  modalTextView:{
    width: Util.getWidth(90),
    height: Util.getHeight(10),
    borderColor: '#C4C4C4',
    marginTop:15,
    borderWidth: 1,
    borderRadius:5,
    alignSelf:'flex-start',
    justifyContent:'flex-start'
  },

  modalborderview:{
    borderTopWidth: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: -16,
    borderTopColor: '#C4C4C4',
    width:Util.getWidth(30)
  },
  modalTextInputs:{
    fontFamily: 'SFUIText-Regular',
    fontSize: 12,
    alignSelf:'flex-start',
    justifyContent:'flex-start',
    width:Util.getWidth(90),
    color: '#000000',
    margin:5
  },

  downloadView: {
    // position: 'absolute',
    width: Util.getWidth(10.9),
    height: Util.getHeight(5.1),
    top: 120,
    //  right: 5,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: '#282928',
    shadowColor: '#f5f5f5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  shareView: {
    // position: 'absolute',
    width: Util.getWidth(10),
    height: Util.getHeight(5),
    top: 150,
    //  right: 5,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#282928',
    shadowColor: '#efefef',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  txt: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center'
  },
  imageDown: {
    width: Util.getWidth(7),
    height: Util.getHeight(5),
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 5
    // alignItems:'flex-end',
  },
  imageclose: {
    width: Util.getWidth(5),
    height: Util.getHeight(5),
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 7
  },
  imageGrid: {
    width: Util.getWidth(7),
    height: Util.getHeight(5),
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 5
    // alignItems:'flex-end',
  },
  imageheart: {
    width: Util.getWidth(7),
    height: Util.getHeight(5),
    alignSelf: 'center',
    justifyContent: 'center',
    // bottom: 5
    // alignItems:'flex-end',
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
    height: 20,

  },
  pickerItem: {
    color: 'red'
  },
  onePicker: {
    width: 200,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red'
  },
  twoPickers: {
    width: 200,
    height: 88,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  twoPickerItems: {
    height: 88,
    color: 'red'
  },

  // filters 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 160,
      width: 220

  },
  button: {
      borderRadius: 15,
      padding: 5,
      elevation: 2,
  },
  buttonOpen: {
      backgroundColor: '#F194FF',
  },
  buttonClose: {
      backgroundColor: '#2196F3',
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  modalText: {
      color: "#000000",
      fontSize: 17,
      lineHeight: 35,
      fontWeight: "600"
  },
  modalText2: {
      color: "#000000",
      fontSize: 13,
      lineHeight: 15
  },
  // category popups
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 160,
      width: 220

  },
  button: {
      borderRadius: 15,
      padding: 5,
      elevation: 2,
  },
  buttonOpen: {
      backgroundColor: '#F194FF',
  },
  buttonClose: {
      backgroundColor: '#2196F3',
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  modalText: {
      color: "#000000",
      fontSize: 17,
      lineHeight: 35,
      fontWeight: "600"
  },
  modalText2: {
      color: "#000000",
      fontSize: 13,
      lineHeight: 15
  },
})
export default styles;