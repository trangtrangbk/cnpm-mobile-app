import React from 'react';
import { Image, View , StyleSheet } from 'react-native';

import icEnergy from '../assets/icons/ic_phone.png'
export default class ShowEnergy extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isShowText: false,
            close: false, 
        };
        var myVar = setInterval(()=>{

            this.setState({
                isShowText : !this.state.isShowText
            });
            if(this.state.close === this.state.isShowText) clearInterval(myVar);
            else {
                this.setState({
                    close : this.state.isShowText
                }); 
            }
            console.log("show--------"+ this.state.isShowText+ 'close----------'+ this.state.close)
        } , 500);
    }
    componentDidMount = ()=> {
        
        console.log(this.props.isShow)
    }
    render(){
        const { isShowText } = this.state;
        return(
            <View style = {isShowText?styles.active : styles.un_active}>
                <Image source={icEnergy} style={styles.icon}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    active: {
        opacity: 1, 
    },
    un_active: {
        opacity: 0, 
    },
})