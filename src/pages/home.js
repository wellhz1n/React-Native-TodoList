import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TodoItem from '../components/TodoItem';
import { setItem, getItem, getItems, removeItem } from '../utils/AsyncStorageUtils';
// import { Container } from './styles';

const home = (props) => {

    //#region UseEffects
    const AtualizaDados = async () => {
        var itens = await getItems();
        if (itens == null)
            itens = [];
        if (itens.length > 0)
            itens = itens.sort((a, b) => a.situacao - b.situacao);

        setdados([{ id: 0, tipo: 0 }, ...itens]);
        console.log(JSON.stringify(itens));
    }
    useEffect(() => {
        const FocusNavigationEvent = props.navigation.addListener('focus', async (e) => {
            if (props.route.params?.recarregar != null && props.route.params.recarregar) {
                await AtualizaDados();
            }
        });
        return () => {

        };
    }, [props.navigation]);



    const [dados, setdados] = useState([{ id: 0, tipo: 0 }])
    useEffect(() => {
        console.log(JSON.stringify(props.navigation));
        (async () => {
            await AtualizaDados();
        })();
        return () => { };
    }, [])
    //#endregion
    return (

        <View style={estilo.container}>
            <View style={estilo.TodoTitleContainer}>
                <Text style={estilo.TodoTitle}>TODO</Text>
            </View>

            <FlatList
                keyExtractor={(item) => JSON.stringify(item.id)}
                style={{ flex: 1, marginVertical: 80 }}
                horizontal={true}
                scrollEventThrottle={10}
                ItemSeparatorComponent={() => <View style={{ marginHorizontal: 10 }} />}
                showsHorizontalScrollIndicator={false}
                data={dados}
                contentContainerStyle={estilo.TodoItemContainer}
                renderItem={({ item, index }) => {
                    console.log(index)
                    var it = item;
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
                                onPress={() => {
                                    props.navigation.navigate('newTodo', { Todo: it });
                                }}
                                onLongPress={() => {
                                    Alert.alert("Opções", "Selecione a operação desejada", [
                                        {
                                            text: "Cancelar",
                                            onPress: () => false
                                        },
                                        {
                                            text: "Excluir",
                                            onPress: async () => {
                                                if (await removeItem(it.id)) {
                                                    await AtualizaDados();
                                                    return true;
                                                }
                                            }
                                        },
                                        {
                                            text: (it.situacao == 0 ? "Concluir" : "Pendente"),
                                            onPress: () => {
                                                (async () => {
                                                    var i = it;
                                                    i.situacao = i.situacao == 0 ? 1 : 0;

                                                    console.log("adsad")
                                                    await setItem(i);
                                                    await AtualizaDados();
                                                    return true;
                                                })();
                                            }
                                        }
                                    ],
                                        { cancelable: true })
                                }}
                                Title={item.titulo}
                                Description={item.descricao}
                                Situation={item.situacao}
                                Cor={item.cor}
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
        elevation: 2,
    },
    TodoItemContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default home;