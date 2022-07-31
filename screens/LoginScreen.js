import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from "../firebase"
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation()

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.replace("Home");
			}
		});
		return unsub;
	}, [])

	const handleRegister = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				const user = userCredentials.user;
			})
			.catch(error => alert(error.message))

	}

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredentials => {
				const user = userCredentials.user;
			})
			.catch(error => alert(error.message))
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior="padding">
			<Text style={styles.title}>Roster</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={text => setPassword(text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleRegister}>
					<Text style={styles.buttonOutlineText}>Register</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},

	title: {
		fontSize: 40,
		fontWeight: 'bold',
		marginBottom: 80,
	},

	inputContainer: {
		width: '80%',
	},
	input: {
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: '#0782F9',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center'

	},
	buttonOutline: {
		backgroundColor: '#FFF',
		marginTop: 5,
		borderColor: '#0782F9',
		borderWidth: 2
	},
	buttonText: {
		color: '#FFF',
		fontWeight: '700',
		fontSize: 16
	},
	buttonOutlineText: {
		color: '#0782F9',
		fontWeight: '700',
		fontSize: 16
	}
})