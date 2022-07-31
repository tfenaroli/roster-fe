import { RefreshControl, KeyboardAvoidingView, TextInput, ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import User from '../components/User'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios';

const HomeScreen = () => {
	const [users, setUsers] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const getUsers = () => {
		setRefreshing(true);
		axios.get("http://localhost:8000/")
			.then((res) => {
				setRefreshing(false);
				console.log("retrieved users");
				setUsers(res.data);
			})
			.catch(err => console.log(err.message))
	};

	const createUser = () => {
		console.log("creating user with name: " + firstName + " " + lastName);
		axios.post("http://localhost:8000/", {
			firstName,
			lastName,
		})
			.catch(err => console.log(err.message))
		setFirstName("");
		setLastName("");
	};

	useEffect(() => {
		getUsers();
	}, [])

	const navigation = useNavigation();

	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				navigation.replace("Login")
			})
			.catch(error => alert(error.message))
	}

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text style={styles.accountText}>Signed in as: {auth.currentUser?.email}</Text>
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
			<TouchableOpacity style={styles.button} onPress={createUser}>
				<Text style={styles.buttonText}>Post</Text>
			</TouchableOpacity>
			<View style={styles.usersContainer}>
				<ScrollView refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={getUsers}
					/>
				}>
					{users.map((user) =>
						<User firstName={user.firstName} lastName={user.lastName} id={user._id} key={user._id} />
					)}
				</ScrollView>
			</View>
			<TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleSignOut}>
				<Text style={styles.buttonOutlineText}>Sign out</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
	},

	accountText: {
		fontSize: 18,
		marginVertical: 14,
	},

	button: {
		backgroundColor: '#0782F9',
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

	buttonOutline: {
		backgroundColor: '#FFF',
		marginTop: 20,
		borderColor: '#0782F9',
		borderWidth: 2
	},

	buttonOutlineText: {
		color: '#0782F9',
		fontWeight: '700',
		fontSize: 16
	},

	usersContainer: {
		// backgroundColor: 'rgb(230, 230, 230)',
		height: '56%',
		width: '90%',
	},
	input: {
		backgroundColor: '#FFF',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
		width: '50%'
	},

})