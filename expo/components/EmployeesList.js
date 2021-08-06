import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import EmployeesListItem from './EmployeesListItem';


export default class EmployeesList extends React.Component {
	state = {
		offset: 0,
		users: [],
		loaded: false
	}

	componentDidMount() {
		this.fetchRecords();
	}

	fetchRecords = (offset) => {
		fetch(`http://192.168.45.66:5000/api/users/${offset || 0}`)
			.then(res => res.json())
			.then(response => {
				this.setState({
					users: [...this.state.users, ...response.users],
					loaded: response.users && response.users.length > 0
				});
			});
	}
	onScrollHandler = () => {
		this.setState({
			offset: this.state.offset + 10
		}, () => {
			this.fetchRecords(this.state.offset);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.users}
					renderItem={({item}) => {
						return <EmployeesListItem item={item}/>;
					}}
					keyExtractor={item => item.id + ""}
					onEndReached={this.onScrollHandler}
					onEndThreshold={0}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(220,207,212,1)',
		marginTop: StatusBar.currentHeight || 0,
	},
});
