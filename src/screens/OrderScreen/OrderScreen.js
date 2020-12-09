import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class OrderScreen extends React.Component {
    componentDidMount(){
        this.props.getOrders()
    }

    render() {
        return (
            <View>
                <Text>hello</Text>
            </View>
        )
    }
}