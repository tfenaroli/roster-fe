import { TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const EditScreen = (props) => {
	const user = props.route.params;

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	const updateUser = (id) => {
		console.log("updating user with id: " + id);
		axios
			.put("https://blooming-crag-81802.herokuapp.com/" + id, {
				firstName,
				lastName
			})
			.catch(err => console.log(err))
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<Text style={styles.userText}>Editing user: {user.firstName} {user.lastName}</Text>
			<TextInput
				style={styles.input}
				placeholder="First Name"
				value={firstName}
				onChangeText={text => setFirstName(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Last Name"
				value={lastName}
				onChangeText={text => setLastName(text)}
			/>
			<TouchableOpacity style={styles.button} onPress={() => updateUser(user._id)}>
				<Text style={styles.buttonText}>Update</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}

export default EditScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	userText: {
		position: 'absolute',
		top: 100,
		fontSize: 24,
		fontWeight: 'bold',
	},

	input: {
		backgroundColor: '#FFF',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
		width: '50%'
	},

	button: {
		backgroundColor: 'rgb(205, 92, 92)',
		width: '40%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},

	buttonText: {
		color: '#FFF',
		fontWeight: '700',
		fontSize: 16
	},
})