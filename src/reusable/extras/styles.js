import {StyleSheet} from 'react-native';
const Bold_Font = 'Montserrat-Bold';
const Medium_Font = 'Montserrat-SemiBold';
const NoramlText_Font = 'Montserrat-Light';
const CollectionText = 'Montserrat-Regular';
const Btn_Font = 'Lato-Regular';
const Price_Font = 'Lato-Bold';

const Splash_Screen = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Search_Header=StyleSheet.create({
  header: {
    height: 120,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1B4656',
  },
  input: {
    height: 50,
    width: '80%',
    color:'#000'
  },
})

const Onboarding_Screen = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
    width: 70,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#1B4656',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 350,
  },
  txtBtn: {
    position: 'absolute',
    top: '50%',
    right: 0,
    alignSelf: 'flex-end',
  },
  text: {
    textAlign: 'center',
    fontFamily: NoramlText_Font,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    fontFamily: Medium_Font,
    textAlign: 'center',
  },
  btnText: {
    fontSize: 14,
    fontFamily: NoramlText_Font,
    color: 'white',
    backgroundColor: '#1B4656',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 22,
    textAlign: 'center',
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 0.8,
    elevation: 8,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
});

const GetStarted_Screen = StyleSheet.create({
  Container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  SigninContainer: {
    alignSelf: 'flex-end',
    alignItems:'center',
    width: 100,
  },
  BtnSignin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  SigninText: {
    fontSize: 13,
    fontFamily: Medium_Font,
    paddingHorizontal: 5,
  },
  SignIcon: {
    height: 15,
    width: 15,
  },
  ContentView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headText: {
    fontFamily: Bold_Font,
    fontSize: 26,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  btnContainer: {
    marginTop: 25,
    paddingHorizontal: 50,
  },
  filterContainer:{
    marginTop: 25,
    paddingHorizontal:10,
    flexDirection: 'row',
    alignItems:'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  categoryText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 12,
    fontFamily: Medium_Font,
  },

  btnView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 0.8,
    elevation:3,
    shadowRadius: 15,
  },
  btnView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderWidth: 1.5,
    borderRadius: 20,
  },
  shopContainer: {
    marginTop: 25,
    paddingHorizontal: 60,
  },
  shopView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 30,
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 0.8,
    elevation: 8,
    shadowRadius: 15,
  },
  btnText: {
    fontFamily: Btn_Font,
    fontSize: 14,
    textAlign: 'center',
  },
  animatedText: {
    fontFamily: Btn_Font,
    maxWidth: '99%',
    padding: 5,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: {width: 10, height: 10},
    textShadowRadius: 15,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
});
const Header_Style = StyleSheet.create({
  Header_Container: {
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  cartView: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    left: 10,
    height: 18,
    width: 18,
    borderRadius: 15,
  },
  cartText: {
    fontSize: 12,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Medium_Font,
    position: 'absolute',
    left: 50,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  imgStyle: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  customIcon2: {
    position: 'absolute',
    top: 25,
    right: 75,
  },
  customIcon3: {
    position: 'absolute',
    top: 20,
    right: 45,
  },
  cartView: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: 18,
    alignItems: 'center',
    width: 18,
    borderRadius: 15,
  },
});
const Categories_Screen = StyleSheet.create({
  Category_Container: {
    flex: 1,
  },
  Category_FlatList: {
    flexGrow: 1,
    paddingBottom: 130,
  },
});
const Categories_Card = StyleSheet.create({
  Category_View: {
    flex: 1,
    marginTop: 15,
  },
  BackImageStyle: {
    marginTop: 18,
    alignItems: 'center',
    width: 1200,
    height: 200,
    backgroundColor: '#000',
    opacity: 0.6,
    justifyContent: 'center',
  },
  defaultImage: {
    marginTop: 18,
    flex: 1,
    width: null,
    elevation:1,
    height: 180,
    backgroundColor: '#000',
    opacity: 0.6,
  },

  ImgStyle: {
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.75,
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 14,
    fontFamily: Medium_Font,
    color: 'white',
    opacity: 2,
    position: 'absolute',
    zIndex: 1,
    left: 30,
    maxWidth:'90%',
    top: '50%',
  },
  categoriesText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Btn_Font,
    textAlign: 'center',
    color: 'rgb(27, 70, 86)',
  },
  loadText: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
    paddingHorizontal: 50,
  },
  productText: {
    fontSize: 16,
    marginTop: 6,
    fontFamily: CollectionText,
    textAlign: 'left',
    paddingStart: 5,
    color: 'rgb(27, 70, 86)',
  },
  collectionImage: {
    flex: 1,
    width: null,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    opacity: 0.6,
  },
  collectionsText: {
    fontFamily: CollectionText,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 150,
    color: 'rgb(27, 70, 86)',
    flexShrink: 1,
  },
});

const SubCategory_Card = StyleSheet.create({
  container_View: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    color: 'black',
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 55,
  },
  head_View: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: NoramlText_Font,
    paddingVertical: 12,
  },
  orderContainer: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  profile_View: {
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    borderTopWidth: 2,
    justifyContent: 'space-between',
    height: 55,
    marginStart: 25,
    marginRight: 12,
  },
  subContainer: {
    marginTop: 30,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  size_btn_container: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingHorizontal: "30%",
    // marginHorizontal: 3,
    borderWidth: 0.5,
  },
  text_Style: {
    fontSize: 16,
    fontFamily: Bold_Font,
    textAlign: 'left',
  },
  normatTextStyle: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: NoramlText_Font,
  },
  headerStyle: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: NoramlText_Font,
    alignSelf: 'center',
    fontWeight: '700',
  },
  orderTextStyle: {
    fontSize: 14,
    paddingTop: 2,
    textAlign: 'left',
    fontFamily: NoramlText_Font,
  },
  priceStyle: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: Price_Font,
    textAlign: 'left',
  },
  ProductDetails_btn_Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  btn_addToCart: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  btn_buyNow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 23,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  btn1_Text: {
    // marginTop: 15,
    marginHorizontal: 20,
    fontFamily: NoramlText_Font,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  itemsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textStyle: {
    textAlign: 'left',
    fontFamily: Btn_Font,
    fontSize: 11,
  },
  shareoption: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: Btn_Font,
    fontSize: 11,
  },
  sortoption: {
    alignSelf: 'center',
    fontFamily: Btn_Font,
    fontSize: 16,
  },
  iconStyle: {
    height: 12,
    width: 12,
  },
  optionBtnStyle: {
    height: 18,
    width: 18,
  },
});
const CheckOut = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    paddingHorizontal: 50,
  },
  shippingContainer: {
    borderRadius: 5,
    paddingBottom: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#bcbec2',
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  innerShippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingBottom:10
  },
});
const Linear_Gradient = StyleSheet.create({
  buttonText: {
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '50%',
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});

const Product_Details_Screen = StyleSheet.create({
  ProductDetails_Container: {
    flex: 1,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '50%',
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  sortIconStyle: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginRight: 5,
  },
  ProductDetails_ScrollView: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  ProductDetails_ImageBackground: {
    height: 350,
    width: 370,
    paddingRight: 30,
    alignItems: 'flex-end',
  },
  ProductDetails_WishList_Container: {
    backgroundColor: '#fff',
    elevation:3,
    shadowColor:'#000',
    shadowOpacity:0.6,
    shadowRadius:10,
    shadowOffset:{
     height:3,
     width:10
    },
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10,
  },
  ProductDetails_WhishList_Image: {
    height: 20,
    width: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 20,
  },
  subContainer: {
    marginHorizontal: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  colContainer: {
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    width: 100,
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  size_btn_container: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingHorizontal: "30%",
    // marginHorizontal: 3,
    borderWidth: 0.5,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: Btn_Font,
    textAlign: 'left',
  },
  descrptionStyle: {
    fontSize: 16,
    fontFamily: NoramlText_Font,
    textAlign: 'left',
    marginTop: 5,
  },
  headStyle: {
    fontSize: 14.5,
    fontFamily: Medium_Font,
    textAlign: 'left',
  },
  normalStyle: {
    fontFamily: NoramlText_Font,
    fontSize: 14,
    textAlign: 'left',
  },
  priceStyle: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'left',
  },
  optionStyle: {
    marginTop: 0,
    fontSize: 15,
  },
  ProductDetails_btn_Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  cart_btn_Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 70,
  },
  cart_buyNow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    width: '85%',
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  btn_addToCart: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  btn_buyNow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    marginBottom: 6,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    width: 140,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  modelBtnView: {
    marginVertical: 15,
  },
  modelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 42,
    marginBottom: 6,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  btn1_Text: {
    fontFamily: NoramlText_Font,
    fontSize: 13,
    fontWeight: '600',
  },
  noFound_Text: {
    fontFamily: NoramlText_Font,
    paddingTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  noInternet_Text: {
    fontFamily: NoramlText_Font,
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
const Cart_Screen = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  img: {
    marginBottom: 30,
    height: 170,
    width: 170,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
  },
  notifications: {fontSize: 10, textAlign: 'center', paddingHorizontal: 10},
});

const MyCartItem = StyleSheet.create({
  Product_View: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  ImgStyle: {
    width: 120,
    height: 150,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.55,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 13,
    fontFamily: Price_Font,
    textAlign: 'left',
    maxWidth: 160,
  },
  priceStyle: {
    fontSize: 14,
    fontFamily: Price_Font,
    textAlign: 'left',
  },
  quantity_Price_Container: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Product_Card = StyleSheet.create({
  Product_View: {
    flex: 1,
    marginHorizontal: 4,
    marginTop: 10,
  },
  ImgStyle: {
    height: 230,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 0.55,
    justifyContent: 'center',
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
     height:50,
     marginVertical:10,
    alignItems: 'flex-start',
    paddingHorizontal:3,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 13,
    fontFamily: Btn_Font,
    textAlign: 'left',
  },
  priceStyle: {
    fontSize: 13,
    fontFamily: Btn_Font,
    textAlign: 'left',
  },
});

const Custom_Header = StyleSheet.create({
  textStyle: {
    fontSize: 13,
    fontFamily: Medium_Font,
    paddingStart: 5,
  },
  ImgStyle: {
    height: 15,
    width: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 15,
    marginTop: 20,
    padding: 10,
    width: 80,
  },
});
const Forget_Password = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ForgetText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Bold_Font,
  },
  messageText: {
    fontFamily: NoramlText_Font,
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 35,
    marginTop: 25,
  },
  InputFieldView: {
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 6,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  btnContainer: {
    marginTop: 30,
    paddingHorizontal: 50,
    marginBottom: 0,
  },
  btnView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: 'rgba(46, 19, 127, 0.3)',
    shadowOpacity: 0.6,
    elevation: 5,
    shadowRadius: 15,
  },

  btnText: {
    fontFamily: Btn_Font,
    fontSize: 14,
    paddingHorizontal: 15,
  },
});

const Update_Password = StyleSheet.create({
  Container: {
    flex: 1,
  },
  BackimageView: {
    height: 240,
  },
  ForgetText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Bold_Font,
  },
  messageText: {
    fontFamily: NoramlText_Font,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 35,
    marginTop: 25,
  },
  ForgetPass_Text: {
    marginTop: 15,
    marginHorizontal: 20,
    fontFamily: NoramlText_Font,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  InputFieldContainer: {
    marginTop: 30,
  },
  Signup_textView: {
    marginTop: 15,
  },
  InputFieldView: {
    paddingHorizontal: 0,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 6,
  },

  iconView: {
    height: 50,
    width: 45,
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    justifyContent: 'center',
  },
  InputFieldView2: {
    elevation: 2,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 15,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
  },
  InputFieldView1: {
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 0,
  },

  InputFieldView3: {
    elevation: 1,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 15,
    borderWidth: 0,
    borderRadius: 6,
  },

  iconStyle: {
    height: 25,
    width: 25,
  },
  btnContainer: {
    marginTop: 30,
    paddingHorizontal: 50,
    marginBottom: 30,
  },
  confirmContainer: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  confirmView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  btnView1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  btnView2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    borderWidth: 1.5,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: Btn_Font,
    fontSize: 14,
  },

  GoggleText: {
    fontFamily: Btn_Font,
    fontSize: 14,
    paddingStart: 5,
  },
  titleLogin: {
    marginTop: 25,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: Bold_Font,
    paddingHorizontal: 40,
  },
  titleSignup: {
    marginTop: 25,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: Bold_Font,
    paddingHorizontal: 45,
    width: 250,
  },

  titlePhoneSign: {
    marginTop: 25,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: Bold_Font,
    paddingHorizontal: 45,
  },
  privayPolicyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 15,
    marginTop: 25,
    marginRight: 50,
    marginBottom: 25,
  },
  privacyPolicyText: {
    fontFamily: NoramlText_Font,
    fontSize: 12,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  otpContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 280,
    width: 230,
    borderRadius: 20,
    shadowColor: '#808080',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 1,
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  otpcontentText: {
    fontFamily: NoramlText_Font,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  Resend: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: NoramlText_Font,
  },
});

const Verify_Code = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Code_View: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  Verify_Icon: {
    marginRight: 10,
    marginTop: 4,
    color: 'white',
  },

  Resend_View: {
    alignSelf: 'center',
    marginTop: 5,
  },

  Resend_Button: {
    borderBottomWidth: 1,
    borderBottomColor: '#31AA47',
  },

  Resend_Text: {
    color: '#31AA47',
    fontWeight: 'bold',
  },
  Verify_Code: {
    borderWidth: 1.5,
    borderTopRightRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    color: '#31AA47',
    fontWeight: 'bold',
    fontSize: 20,
    height: 60,
    width: 45,
  },
});

const Getting_Started = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export {
  Splash_Screen,
  Onboarding_Screen,
  GetStarted_Screen,
  Custom_Header,
  Forget_Password,
  Cart_Screen,
  Linear_Gradient,
  Update_Password,
  Verify_Code,
  Getting_Started,
  Search_Header,
  Header_Style,
  Categories_Screen,
  Categories_Card,
  Product_Card,
  Product_Details_Screen,
  MyCartItem,
  CheckOut,
  SubCategory_Card,
};
