import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";


export default class EmployeesListItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.item}>
                <Image style={styles.photo} source={{uri: `data:image/png;base64,${this.props.item.photo}`}}/>
                <Text style={styles.fio}>{this.props.item.fio}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        marginHorizontal: 8,
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#380914',
        backgroundColor: '#fdf7f7'
    },
    fio: {
        fontSize: 18,
        textAlign: 'center',
        flex: 1
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'rgba(124,91,106,0.84)',
        marginRight: 10,
    },
});
