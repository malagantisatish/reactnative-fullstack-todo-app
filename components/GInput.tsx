import { View, Text, TextInput, TouchableOpacity, TextInputChangeEvent, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/homeStyles'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const GInput = () => {
    const [todo, setTodo] = useState("")
    const { colors } = useTheme()
    const homeStyles = createHomeStyles(colors);

    const addTodo = useMutation(api.todos.addTodo)

    const handleChange = (value: string) => {
        setTodo(value)
    }




    const handleAddTodo = async () => {
        if (todo.trim()) {
            try {
                await addTodo({ text: todo });
                setTodo("")

            } catch (error: any) {
                console.log("error at add", error?.message)
                Alert.alert("Error", "Failed to addd todo")
            }
        }

    }

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput placeholder="What needs to be done?" onSubmitEditing={handleAddTodo} placeholderTextColor={colors.textMuted} value={todo} onChangeText={handleChange} style={homeStyles.input} />
                <TouchableOpacity onPress={handleAddTodo}>
                    <LinearGradient colors={todo.trim() ? colors.gradients.primary : colors.gradients.muted} style={[homeStyles.addButton, !todo.trim() && homeStyles.addButtonDisabled]}>
                        <Ionicons name='add' size={24} color={"#fff"} />
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default GInput