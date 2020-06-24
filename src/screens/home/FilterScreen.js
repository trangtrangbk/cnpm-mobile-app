import React, {useEffect } from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Image, 
  Modal 
 } from 'react-native';
import NumberFormat from 'react-number-format';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik'
import * as yup from 'yup'
var { width, height } = Dimensions.get('window');

import Button from '../../components/Button'
import geCities from '../../api/apiPlaces/getCities'
import getDistricts from '../../api/apiPlaces/getDistrict';
import getWards from '../../api/apiPlaces/getWards'
import Route from '../../constants/Route';
import getContentFilter from '../../storage/getContentFilter';
import saveContentFilter from '../../storage/saveContentFilter';

import icGear from '../../assets/icons/gear.png'
import icCancel from '../../assets/icons/wrong.png';

export const FilterScreen = ({navigation , route}) => {
  let {filter, city, district, ward, price, area } = route.params;
  const [data, setData] = React.useState([]); 
  const {_handleLoadDataFilter} = route.params;
  const [current, setCurrent] = React.useState(-1);
  const [hide, setHide] = React.useState(0);
  const [ isLoading, setLoading ] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  useEffect(() => {
    
    if(filter === 1) {
      geCities().then(res => {
        setData(res)
        setLoading(false)
      })
      setCurrent(city.code)
    }
    else if(filter === 2 && city.code !== -1) {
      getDistricts(city.code).then(res => {
        setData(res)
        setLoading(false)
      })
      setCurrent(district.code)
    }
    else if(filter === 3 && city.code !== -1 && district.code !== -1 ){
      getWards(city.code, district.code).then(res =>{
        setData(res)
        setLoading(false)
      })
      setCurrent(ward.code)
    }    
    else if(filter === 4){
      setLoading(false)
      console.log('a', price)
      setHide(price.code)
    }
    else if(filter === 5) {
      setLoading(false)
      setHide(area.code)
    }

    return () => {
      _handle();
      console.log("Filters____________________Component-Will-Un-mount");
    };
  }, []);

  const _handle = () =>{
    getContentFilter()
      .then(content => {
        if(filter ===1 ) {
          _handleLoadDataFilter({city:content}, {district: ''}, {ward: ''}, {price:price.title}, {area: area.title})
        }
        else if(filter ===2) {
          _handleLoadDataFilter({city:city.name}, {district: content}, {ward: ''}, {price:price.title}, {area: area.title})
        }
        else if(filter ===3) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: content}, {price:price.title}, {area: area.title})
        }
        else if(filter ===4) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: ward.name}, {price:content}, {area: area.title})
        }
        else if(filter === 5) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: ward.name}, {price:price.title}, {area: content})
        }
    })
  }
  const _handleContent = item =>{
    const { _handleFilter } = route.params;
    saveContentFilter(item.title)
    _handleFilter(item)
  }
  const _handleUnContent = () =>{
    const { _handleUnFilter } = route.params;
    saveContentFilter('')
    _handleUnFilter();
  }
  const _handleOnClick = item =>{
      if(current === item.code) {
        setCurrent(-1)
         _handleUnContent();
        return;
      }
     setCurrent(item.code)
    _handleContent(item);
    _handle();
    navigation.navigate(Route.HOMEPAGE)
  }
  const _handleOnClickPrice = async(min, max , iHide) => {
    const {_handleFilter} = route.params;
    if(iHide === hide) {
      setHide(0)
      saveContentFilter('')
      _handleFilter({code: -1, title: ''})
    }
    else {
      setHide(iHide)
      saveContentFilter(`${min},${max}`)
      _handleFilter({code: iHide, title: `${min},${max}`})
      _handle();
      navigation.navigate(Route.HOMEPAGE)
    }
  }

  const _handleOnClickArea = (min, max , iHide) => {
    const {_handleFilter} = route.params;
    if(iHide === hide) {
      setHide(-1)
      saveContentFilter('')
      _handleFilter({code: -1, title: ''})
    }else {
      setHide(iHide)
      saveContentFilter(`${min},${max}`)
      _handleFilter({code: iHide, title: `${min},${max}`})
      _handle();
      navigation.navigate(Route.HOMEPAGE)
    }
  }
  const _onAddArea = (values, hide) =>{ 
    setHide(hide)
    const {_handleFilter} = route.params;
    _handleFilter({code: hide, title: `${values.min},${values.max}`})
    navigation.navigate(Route.HOMEPAGE)
  }
  const _showTopToolbar = () =>{
    return(
      <View style={styleTopBars.view}>
        <Text>{route.params.title}</Text>
      </View>
    )
  }
  const _showLoading = () =>{
    if(isLoading) 
      return <Spinner visible={isLoading} textStyle={{color: '#FFF'}}/>
  }
  const _showViewFilterArea = (hide) =>{
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={hide == 1?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(0, 20, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Dưới 20m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 2?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(20, 40, 2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 20 đến 40m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 3?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(40, 60, 3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 40 đến 60m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <Formik
          initialValues = {{min: '', max: ''}}
          onSubmit = {(values) => {
            _onAddArea(values, 4)
        }}>
          {formikProps => (
            <TouchableOpacity style={hide == 4?styleTFilters.active:styleTFilters.unactive} onPress = {() => _onAddArea({}, 4)}>
              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Diện tích từ:</Text>
                    <TextInput
                    keyboardType='numeric'
                    style={{marginLeft: 10}}
                    formikProps = {formikProps}
                    label='min'
                    placeholder={'Ví dụ: 100'}
                    value={formikProps.values.min}
                    onChangeText = {formikProps.handleChange('min')}
                    onBlur = {formikProps.handleBlur('min')}/>
                  <Text style = {styles.txtError}>
                      {formikProps.touched['min'] && formikProps.errors['min']} 
                  </Text>
                </View>
                <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                    <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
                </View>   
              </View>
              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Diện tích đến:</Text>
                      <TextInput
                      keyboardType='numeric'
                      style={{marginLeft: 10}}
                      formikProps = {formikProps}
                      label='max'
                      placeholder={'Ví dụ: 150'}
                      value={formikProps.values.max}
                      onChangeText = {formikProps.handleChange('max')}
                      onBlur = {formikProps.handleBlur('max')}/>
                  <Text style = {styles.txtError}>
                      {formikProps.touched['max'] && formikProps.errors['max']} 
                  </Text>
                  </View>
                  <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                      <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
                  </View>   
                </View>
            
              <TouchableOpacity onPress={ formikProps.handleSubmit}>
                <Text>Áp dụng</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </Formik>
      <View style={styleTFilters.divider} />
     </View>
    )
  }

  const _showViewFilterPrice = (hide) =>{
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={ hide === 1 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(0, 1000000, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Dưới 1,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 2 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(1000000, 2000000,2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 1,000,000 đến 2,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 3 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(2000000, 5000000,3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 2,000,000 đến 5,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />

        <TouchableOpacity style={ hide === 4 ?styleTFilters.active:styleTFilters.unactive}
        onPress = {() => {if(hide === 4) _handleOnClickPrice(0, 0 ,4)}}>
          <View style={[styleTFilters.title,{flexDirection: 'row', marginLeft: width/3 }]} 
            onPress ={() => {
          }}
          >
            <Text style={{textAlign: 'center', marginTop: 2}}>{price.title!==''&& hide ===4 ? price.title.replace(',',' đến '): '... đến ...'}</Text>

            <Button style={[price.title!==''&& hide ===4 ? {backgroundColor:'#b3ccff', marginLeft: 20}:{backgroundColor:'white', marginLeft: 70},{width: 50, marginTop: -10, height: 40}]} 
            onPress = {() => {
              setShowForm(showForm=>!showForm)
            }}
            >
              <Image source={icGear} style ={styleTFilters.icon}/>
            </Button>
          </View>
        </TouchableOpacity>
      <View style={styleTFilters.divider} />
     </View>
    )
  }
  const _handlePrice = (str) =>{
    let arr = str.split(',')
    str ='',
    arr.forEach(item => str +=item)
    return str
}
  const showModelPrice = () => {
    let mMax =0, mMin =0; 
    if(price.title !=='') {{
      let arr = price.title.split(',');
      mMin = Number(arr[0].replace(',',''));
      mMax = Number(arr[1].replace(',',''));
    }}
    const validationSchema = yup.object().shape({
      min: yup.string('Vui lòng nhập đúng!')
      .label('min')
      .required('Vui lòng nhập giá tiền!')
      .min(0, 'Vui lòng nhập đúng!'),
      max: yup.string()
      .label('max')
      .required('Vui lòng nhập nội dung')
      .test('price_max', 'Vui nhập lại giá trị', function(value) {
        console.log(Number(_handlePrice(value)),"()()()()()")

        console.log(parseFloat(this.parent.min.replace(',',''),10), parseFloat(_handlePrice(value),10), '+++++++++++++++++++++++++++')
        return parseFloat( _handlePrice(this.parent.min),10) < parseFloat(_handlePrice(value),10);
      }),
    })
    return (
      <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showForm}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style = {{flexDirection: 'row',}}>
              <Text style = {styles.titleModel}>Nhâp giá trị:</Text>
              <Button
              style={{backgroundColor: 'white', width: 40, height: 40, marginTop: -30}}
               onPress={() => {
                setShowForm(showForm => !showForm)
              }}>
                <Image source={icCancel} style={styles.cancel}/>
              </Button>
           </View>
              <Formik
                initialValues = { price.code === 4 && mMax!== 0 && hide!==0? {min: mMin, max: mMax} : {min: '',max: ''}}
                onSubmit = {({min, max}) => {
                  setShowForm(false)
                   _handleOnClickPrice(parseFloat(_handlePrice(min)), parseFloat(_handlePrice(max)),4)
              }}
                validationSchema = {validationSchema}
                >
                {formikProps => (
                    <View style={{borderRadius: 10, borderColor: '#DEE1E6', borderWidth: 1,width: width -60, backgroundColor: 'white'}} >
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>Giá từ:</Text>
                        <NumberFormat
                          value={formikProps.values.min}
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={value => (
                            <TextInput
                              keyboardType='numeric'
                              style={{marginLeft: 10, height: 40, fontSize: 16, width: width/2}}
                              placeholder={'Ví dụ: 1,500,000'}
                              formikProps = {formikProps}
                              label='min'
                              onChangeText = {formikProps.handleChange('min')}
                              onBlur = {formikProps.handleBlur('min')}
                              value= {value}/>
                          )}/>
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>VND</Text>
                      </View>
                      <Text style = {styles.txtError}>
                          {formikProps.touched['min'] && formikProps.errors['min']} 
                      </Text>
                      <View style={styles.dividerForm}/>
                      <View style={{flexDirection: 'row'}}> 
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>Giá tới:</Text>
                        <NumberFormat
                          value={formikProps.values.max}
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={value => (
                            <TextInput
                              keyboardType='numeric'
                              style={{marginLeft: 10, height: 40, fontSize: 16, width: width/2}}
                              placeholder={'Ví dụ: 2,500,000'}
                              formikProps = {formikProps}
                              label='max'
                              onChangeText = {formikProps.handleChange('max')}
                              onBlur = {formikProps.handleBlur('max')}
                              value= {value}/>
                          )}/>
                          <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>VND</Text>
                      </View>
                      <Text style = {styles.txtError}>
                          {formikProps.touched['max'] && formikProps.errors['max']} 
                      </Text>
                      <View style={styles.dividerForm}/>
                      <Button
                        onPress={ formikProps.handleSubmit}
                        style={{ marginBottom: 12 , marginTop: 15, marginLeft: width/6+10, borderRadius: 15, width: width/2, backgroundColor: '#4dc3ff'}}>
                        <Text button >Xác  nhập</Text>
                      </Button>         
                    </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  const ItemFilter = ({item}) =>{
    let status = false;
    if( current === item.code)  {
      status = true
    }

    return (
      <View style={{
        width: width-20,
        marginLeft: 10,
        borderRadius: 10,
      }}>
        <TouchableOpacity style={status?styleTFilters.active:styleTFilters.unactive} onPress = {() => _handleOnClick(item)}>
            <View style={styleTFilters.title}>
              <Text style={{alignSelf: 'center'}}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
      </View>

  );
  }
  return (
    <View style = {styles.container}>
      {_showLoading()}
        {_showTopToolbar()}
        <View style={styles.divider}/>
        {
          filter ===1 || filter===2 ||filter ===3 ?
          <FlatList
            data={data}
            renderItem={({ item }) => <ItemFilter item ={item}/>}
            keyExtractor={item => item._id}/>
          : 
           filter === 4 ?
            _showViewFilterPrice(hide)
            : 
            _showViewFilterArea(hide)
        } 
      {showModelPrice()}
    </View>
  );
};
const styles = StyleSheet.create({
  cancel: {
    width: 20,
    height: 20,
  },
  centeredView: {
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  titleModel:{
    width: width-100,
    textAlign: 'center',
    color: 'black' ,
    fontSize: 17, 
    marginBottom: 25, 
    marginTop: -10,
  },
  modalView: {
    width: width-30,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  txtError: {
    fontSize: 12,
    color: 'red', 
    marginTop: -15, 
    paddingBottom: 7,
    marginLeft: 16
  },
  item:{
    marginLeft: 10,
    width: 2*width/3+20,
    height: height/10,
  },
  p_a:{
    width: width-40, 
    flexDirection: 'row'
  },
  label: {
    fontSize: 17,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  divider:{
    width: width,
    height: 1,
    backgroundColor: '#DADBDC',
    marginBottom: 10,
  },
});
const styleTopBars = StyleSheet.create({
  view: {height: 60, width: width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}
}); 

const styleTFilters = StyleSheet.create({
  active:{
    borderRadius: 10,
    backgroundColor: '#b3ccff'
  },
  unactive: {
    borderRadius: 10,
    backgroundColor: 'white'
  },
  title: {
    marginTop: 10,
    height: height/20
  },
  divider:{
    width: width-20,
    height: 1,
    backgroundColor: '#DADBDC',
  },
  icon: {
    height: 25,
    width: 25
  }
})