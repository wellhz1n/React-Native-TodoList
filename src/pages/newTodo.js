import React,{useState} from 'react';
import { View, Text, SafeAreaView ,TextInput,StyleSheet,TouchableOpacity,FlatList} from 'react-native';

// import { Container } from './styles';

const newTodo = (props) => {
    const [listaCores,setListaCores] =  useState([
        {cor:'#004334fa',selected:true},
        {cor:'#aa4334fa',selected:false},
        {cor:'#321134fa',selected:false}
    ]);
    return (
            <View style={{ flex: 1 }}>
                <TextInput underlineColorAndroid="red"></TextInput>

                    <FlatList 
                        data={listaCores}
                        ItemSeparatorComponent={()=> <View style={{marginHorizontal:5}} />}
                        horizontal={true}
                        keyExtractor={(item)=> item.cor}
                        renderItem={({item,index})=>{
                            const a = item;
                                return(
                                    <TouchableOpacity 
                                    activeOpacity={0.8}
                                    onPress={()=>{
                                               var list = listaCores.map(x=>{ x.selected = x.cor == a.cor;
                                                                        return x});
                                                                        console.log(a.cor)
                                       setListaCores(list);
                                    }}
                                    style={[estilo.ColorBall,{backgroundColor:item.cor},item.selected?estilo.CorSelecionada:null]}>
                                    </TouchableOpacity>
                                );
                        }}
                    />
            </View>
    );

};
const estilo = StyleSheet.create({
    ColorBall:{
            height:60,
            width:60,
            borderRadius:100,
            borderColor:'#000000aa',
            borderWidth:2,
    },
    CorSelecionada:{
        borderWidth:4,
        borderColor:'#000000'
    },
    TextField:{

    }
});
export default newTodo;