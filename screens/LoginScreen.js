import { Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from "../firebase"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

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
		setModalVisible(false)
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
					placeholderTextColor="#808080"
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor="#808080"
					secureTextEntry
					value={password}
					onChangeText={text => setPassword(text)}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => setModalVisible(true)}>
					<Text style={styles.buttonOutlineText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType="slide"
				visible={modalVisible}
			>
				<KeyboardAvoidingView
					style={styles.container}
					behavior="padding">
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => setModalVisible(false)}
					>
						<Ionicons name="caret-down" size={40} color="#808080" />
					</TouchableOpacity>
					<Text style={styles.title}>Sign Up</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Email"
							placeholderTextColor="#808080"
							value={email}
							onChangeText={text => setEmail(text)}
						/>
						<TextInput
							style={styles.input}
							placeholder="Password"
							placeholderTextColor="#808080"
							secureTextEntry
							value={password}
							onChangeText={text => setPassword(text)}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={handleRegister}>
							<Text style={styles.buttonText}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		</KeyboardAvoidingView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},

	title: {
		marginBottom: 100,
		fontSize: 40,
		fontWeight: 'bold',
	},

	inputContainer: {
		width: '80%',
	},

	input: {
		backgroundColor: 'rgb(230, 230, 230)',
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

	backButton: {
		position: 'absolute',
		top: 60,
		// left: 10,
		// backgroundColor: 'rgb(205, 92, 92)',
		width: '20%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center'
	},

	button: {
		backgroundColor: 'rgb(205, 92, 92)',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center'

	},
	buttonOutline: {
		backgroundColor: '#FFF',
		marginTop: 5,
		borderColor: 'rgb(205, 92, 92)',
		borderWidth: 2
	},
	buttonText: {
		color: '#FFF',
		fontWeight: '700',
		fontSize: 16
	},
	buttonOutlineText: {
		color: 'rgb(205, 92, 92)',
		fontWeight: '700',
		fontSize: 16
	}
})