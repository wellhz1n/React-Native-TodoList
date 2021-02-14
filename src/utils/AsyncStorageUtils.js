import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoClass from '../class/TodoClass'

// import { Container } from './styles';

const Key = "@TODOLISTSAVE"
const KeyID = "@TODOLISTSAVEID"

const setItem = async (item = TodoClass()) => {
    try{
           var itens = await getItems();
           if(itens == null)
            itens = [];
            if(item.id ==0){
                item.id = await getNextId();                
                await AsyncStorage.setItem(Key,JSON.stringify([item,...itens]));
                await AsyncStorage.setItem(KeyID,JSON.stringify(item.id));
            }
            else{
                var i = itens.filter(x=> x.id == item.id)[0] 
                console.log(i);
                i = item;
                await AsyncStorage.setItem(Key,JSON.stringify(itens));
            }

            console.log("Item Salvo",JSON.stringify(item));
            return true;
    }catch(ex){
        console.log(ex);
        return false;
    }
}


const getNextId = async ()=>{
      var id =  await AsyncStorage.getItem(KeyID);
      if(id == null)
          return 1;
      else
          return JSON.parse(id)+1;
}

const getItem = async (id) => {
    try{
       var  itens = await AsyncStorage.getItem(Key);
       if(itens != null){
           return JSON.parse(itens.filter(x=> x.id == id)[0]);
       } 
       return null
    }catch(ex){
        console.log(ex);
    }
}

const getItems = async () => {
    try{
       return JSON.parse(await AsyncStorage.getItem(Key));
    }catch(ex){
        console.log(ex);
    }
}


export  {setItem,getItem,getItems};