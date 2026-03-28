import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settingsStyles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';

const DangerZone = () => {
    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingStyles = createSettingsStyles(colors);
    const clearAllTodos = useMutation(api.todos.clearAllTodos)



    const continueDeleteAll = async () => {
        try {
            const result = await clearAllTodos();
            Alert.alert(
                "App Reset",
                `Successfully deleted ${result.deleteCount} todo${result.deleteCount === 1 ? "" : "s"}. Your app has been reset.`
            )

        } catch (err: any) {
            console.log("error deleting all todos", err.message)
        }
    }

    const handleDeleteAllTodos = async () => {
        Alert.alert("Reset App", "This will delete all your todos permanently. This action cannot be undone", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete All",
                style: "destructive",
                onPress: continueDeleteAll
            }
        ])
    }

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitleDanger}>Danger Zone</Text>
            <TouchableOpacity style={[settingStyles.actionButton, { borderBottomWidth: 0 }]} onPress={handleDeleteAllTodos}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingStyles.settingIcon}>
                        <Ionicons name="trash" size={18} color={"#fff"} />
                    </LinearGradient>
                    <Text style={settingStyles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name="chevron-forward" color={colors.textMuted} size={18} />
            </TouchableOpacity>

        </LinearGradient>
    )
}

export default DangerZone