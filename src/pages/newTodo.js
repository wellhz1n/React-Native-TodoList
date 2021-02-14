import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, SafeAreaView,
    TextInput, StyleSheet, TouchableOpacity,
    FlatList, ScrollView, ToastAndroid, Platform,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TodoClass from '../class/TodoClass';
import { setItem, getItem, getItems, removeItem } from '../utils/AsyncStorageUtils';

const newTodo = (props) => {
    const [Salvando, setSalvando] = useState(false);
    const [Removendo, setRemovendo] = useState(false);

    const [listaCores, setListaCores] = useState([
        { cor: '#006622aa', selected: true },
        { cor: '#aa4332fa', selected: false },
        { cor: '#32a1fffa', selected: false },
        { cor: '#aa55ff', selected: false },
        { cor: '#ff33aa', selected: false },
    ]);

    const TituloRef = useRef(null);
    const DescricaoRef = useRef(null);

    //#region Variaveis
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cor, setCor] = useState(listaCores.filter(x => x.selected)[0].cor);
    const [situacao, setSituacao] = useState(0);
    //#endregion
    const [Editando, setEditando] = useState(false);


    useEffect(() => {
        if (props.route.params?.Todo != undefined) {
            setTitulo(props.route.params.Todo.titulo);
            setDescricao(props.route.params.Todo.descricao);
            setSituacao(props.route.params.Todo.situacao);
            setCor(props.route.params.Todo.cor);
            let cores = listaCores.map(x => {
                if (x.cor == props.route.params.Todo.cor)
                    x.selected = true;
                else
                    x.selected = false;

                return x;
            });
            setListaCores(cores);
            setEditando(true);
            console.log(props.route.params)
        }
        return () => {
        }
    }, [props.route.params?.Todo])




    const Save = async () => {
        setSalvando(true);
        //#region VALIDACAO
        if (titulo == "" || titulo == null) {
            TituloRef.current.focus();
            if (Platform.OS == "android")
                ToastAndroid.showWithGravity("Preencha o Titulo", ToastAndroid.LONG, ToastAndroid.CENTER)
            else {
                Alert("Preencha o Titulo");
            }
            setSalvando(false);
            return;
        }
        if (descricao == "" || descricao == null) {
            DescricaoRef.current.focus();
            if (Platform.OS == "android")
                ToastAndroid.showWithGravity("Preencha a Descrição", ToastAndroid.LONG, ToastAndroid.CENTER)
            else {
                Alert("Preencha a Descrição");
            }
            setSalvando(false);
            return;
        }
        //#endregion
        var todo = TodoClass()
        todo.titulo = titulo;
        todo.cor = cor;
        todo.descricao = descricao;
        todo.situacao = situacao;
        if (props.route.params?.Todo != undefined)
            todo.id = props.route.params.Todo.id;

        if (await setItem(todo)) {
            console.log(JSON.stringify(todo));
            setSalvando(false);
            props.navigation.navigate("Home", { recarregar: true });
        }


    }

    const CancelarClick = async () => {
        if (!Editando) {
            props.navigation.pop();
        }
        else {
            setRemovendo(true);
            if (await removeItem(props.route.params.Todo.id)) {
                setRemovendo(false);
                props.navigation.navigate("Home", { recarregar: true });
            }
        }
    }
    const ColorClick = (color) => {
        if (!listaCores.filter(x => x.cor == color.cor)[0].selected) {
            var list = listaCores.map(x => {
                x.selected = x.cor == color.cor;
                return x
            });
            console.log(color.cor)
            setListaCores(list);
            setCor(color.cor);
        }
    }

    return (
        <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1, margin: 10, paddingBottom: 20 }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[estilo.Title, { fontSize: 40 }]}>{Editando ? "Editar Tarefa" : "Adicionar Tarefa"}</Text>
            </View>

            <View>
                <Text style={estilo.Title}>Titulo</Text>
                <TextInput
                    ref={TituloRef}
                    value={titulo}
                    onChange={(input) => setTitulo(input.nativeEvent.text)}
                    maxLength={80} style={estilo.TextField}></TextInput>
            </View>
            <View>
                <Text style={estilo.Title}>Descrição</Text>
                <TextInput
                    ref={DescricaoRef}
                    value={descricao}
                    onChange={(input) => setDescricao(input.nativeEvent.text)}
                    style={estilo.TextFieldM} textAlign='left' multiline={true} maxLength={300} numberOfLines={8} ></TextInput>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={estilo.Title}>Selecione uma cor</Text>
            </View>
            <View>
                <FlatList
                    data={listaCores}
                    ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
                    horizontal={true}
                    keyExtractor={(item) => item.cor}
                    renderItem={({ item, index }) => {
                        const a = item;
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    ColorClick(a);

                                }}
                                style={[estilo.ColorBall, { backgroundColor: item.cor }, item.selected ? estilo.CorSelecionada : null]}>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text style={estilo.Title}>Selecione a situação</Text>
            </View>
            <View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setSituacao(situacao == 0 ? 1 : 0)} style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Icon size={20} color='#2a1aaa' name={situacao == 0 ? "clockcircleo" : "checkcircle"}></Icon>
                    <Text style={estilo.Title}>{situacao == 0 ? "Pendente" : "Concluído"}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={CancelarClick}
                    style={[estilo.Btn, Editando ? { backgroundColor: '#ff0111' } : null]}>
                    {Removendo ? (<ActivityIndicator color="#fff" />) : (<Text style={{ color: '#fff', fontWeight: 'bold' }}>{Editando ? "Remover" : "Cancelar"}</Text>)}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => await Save()}
                    activeOpacity={0.8} style={[estilo.Btn, { backgroundColor: '#2a1aaa' }]}>
                    {Salvando ? (<ActivityIndicator color="#fff" />) : (<Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>)}
                </TouchableOpacity>
            </View>

        </ScrollView>
    );

};
const estilo = StyleSheet.create({
    ColorBall: {
        height: 60,
        width: 60,
        borderRadius: 100,
        borderColor: '#000000aa',
        borderWidth: 2,
    },
    CorSelecionada: {
        borderWidth: 6,
        borderColor: '#000000',
        shadowOpacity: 10,
        elevation: 2,
    },
    TextField: {
        borderWidth: 2,
        fontWeight: 'bold',
        borderColor: '#2a1aaa',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    TextFieldM: {
        borderWidth: 2,
        borderColor: '#2a1aaa',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        lineHeight: 18,
        minHeight: 150,
        maxHeight: 150,
        textAlignVertical: 'top'

    },
    Title: {
        fontWeight: 'bold',
        color: '#2a1aaa',
        marginLeft: 10
    },
    Btn: {
        backgroundColor: '#aaaaaa',
        padding: 10,
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 40,
        marginHorizontal: 5,
    }
});
export default newTodo;