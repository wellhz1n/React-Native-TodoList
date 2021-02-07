import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

// import { Container } from './styles';

const newTodo = (props) => {
    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                <Text>New Todo</Text>
            </View>
        </SafeAreaView>
    );
};

export default newTodo;