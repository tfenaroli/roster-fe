import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import React from 'react';

const User = (props) => {

	const navigation = useNavigation()

	const deleteUser = (id) => {
		console.log("deleting user with id: " + id);
		axios
			.delete("https://blooming-crag-81802.herokuapp.com/" + id)
			.catch(err => console.log(err))
	};

	return (
		<TouchableOpacity style={styles.user} onPress={() => navigation.navigate("Edit", props.user)}>
			<Text style={styles.userText}>{props.user.firstName} {props.user.lastName}</Text>
			<TouchableOpacity onPress={() => deleteUser(props.user._id)}>
				<Ionicons name="md-trash-outline" size={24} color="red" />
			</TouchableOpacity>
		</TouchableOpacity>
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