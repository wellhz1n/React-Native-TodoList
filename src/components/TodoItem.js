import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import { Container } from './styles';
/**
 * 
 * @param {{Situation:int,Title: string,Description:String,onPress:Function,Cor:String}} props 
 */
const TodoItem = (props) => {
    //#region  Estilo
    const estilo = StyleSheet.create({

        TodoItem: {
            height: 250,
            width: 300,
            borderRadius: 18,
            padding: 10,
            backgroundColor: props.Cor,
            borderColor: '#00000022', borderWidth: 1
        },
        Shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 3,
        },
        TodoItemContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        }

    });
    //#endregion

    return (
        <TouchableOpacity activeOpacity={0.8} style={[estilo.TodoItem, estilo.Shadow, ...props.style]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Icon size={20} color='#FFF' name={props.Situation != undefined && props.Situation == 1 ? "checkcircle" : "clockcircleo"}></Icon>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', left: 10 }}>{props.Title}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ color: '#FFF', fontSize: 16, textAlign: 'justify' }}>{props.Description}</Text>
            </View>
        </TouchableOpacity>
    );

}

export default TodoItem;