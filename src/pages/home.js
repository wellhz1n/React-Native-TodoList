import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TodoItem from '../components/TodoItem';
// import { Container } from './styles';

const home = (props) => {
    console.log(props);
    const dados = [
        { Id: 0, tipo: 0 },
        {
            Id: 1,
            Title: "Terminar App",
            Description: "Preciso terminar logo esse app",
            Situacao: 0,
            Color: "#004334fa"
        },
        {
            Id: 2,
            Title: "Terminar App2",
            Description: "Preciso terminar logo esse app2",
            Situacao: 1,
            Color: "#aa4334fa"
        }];
    return (

        <View style={estilo.container}>
            <View style={estilo.TodoTitleContainer}>
                <Text style={estilo.TodoTitle}>TODO</Text>
            </View>

            <FlatList
                keyExtractor={(item) => JSON.stringify(item.Id)}
                style={{ flex: 1, marginVertical: 80 }}
                horizontal={true}
                scrollEventThrottle={10}
                ItemSeparatorComponent={() => <View style={{ marginHorizontal: 10 }} />}
                showsHorizontalScrollIndicator={false}
                data={dados}
                contentContainerStyle={estilo.TodoItemContainer}
                renderItem={({ item, index }) => {
                    console.log(index)

                    if (item.tipo != undefined)
                        return (
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('newTodo')}
                                activeOpacity={0.8}
                                style={[estilo.TodoItem,
                                {
                                    backgroundColor: `#aaeaaa5a`,
                                    borderColor: '#00000022',
                                    borderWidth: 1, justifyContent: 'center',
                                    alignItems: 'center'
                                },
                                index == 0 ?
                                    { marginLeft: 20 } :
                                    index == dados.length - 1 ?
                                        { marginRight: 30 } :
                                        null]}>
                                <Icon size={60} color='#d96464' name="addfile"></Icon>
                                <Text style={{ color: '#d96464', fontSize: 20, fontWeight: 'bold' }}>Adicionar uma tarefa</Text>
                            </TouchableOpacity>
                        )
                    else
                        return (
                            <TodoItem
                                Title={item.Title}
                                Description={item.Description}
                                Situation={item.Situacao}
                                Cor={item.Color}
                                style={[index == 0 ? { marginLeft: 38 } : index == dados.length - 1 ? { marginRight: 30 } : null]}
                            />
                        )
                }}
            />
        </View>
    );
};

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    TodoTitleContainer: {
        flex: 0.5,
        marginTop: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TodoTitle: {
        fontWeight: 'bold',
        fontSize: 100,

    },
    TodoItem: {
        height: 250,
        width: 300,
        borderRadius: 18,
        padding: 10,

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

export default home;