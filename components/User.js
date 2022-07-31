import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import React from 'react';

const User = (props) => {

	const deleteUser = (id) => {
		console.log("deleting user with id: " + id);
		axios
			.delete("http://localhost:8000/" + id)
			.catch(err => console.log(err))
	};

	return (
		<View style={styles.user}>
			<Text style={styles.userText}>{props.firstName} {props.lastName}</Text>
			<TouchableOpacity onPress={() => deleteUser(props.id)}>
				<Ionicons name="md-trash-outline" size={24} color="red" />
			</TouchableOpacity>
		</View>
	)
}

export default User

const styles = StyleSheet.create({
	user: {
		backgroundColor: 'rgb(234, 234, 234)',
		marginBottom: 10,
		paddingHorizontal: 30,
		paddingVertical: 20,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	userText: {
		fontWeight: 'bold',
		fontSize: 18,
	},
})