import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createHomeStyles } from '@/assets/styles/homeStyles';
import { createSettingsStyles } from '@/assets/styles/settingsStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Prefernces from '@/components/Prefernces';
import DangerZone from '@/components/DangerZone';

const Settings = () => {

    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingStyles = createSettingsStyles(colors)
    console.log("Convex URL:", process.env.EXPO_PUBLIC_CONVEX_URL);
    return (
        <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
            <SafeAreaView style={settingStyles.safeArea}>
                {/* header */}
                <View style={settingStyles.header}>
                    <View style={settingStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
                            <Ionicons name="settings" size={28} color="#ffffff" />
                        </LinearGradient>
                        <Text style={settingStyles.title}>Settings</Text>
                    </View>
                </View>
                {/* preferences */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={settingStyles.content} style={settingStyles.scrollView}>
                    <ProgressStats />
                    <Prefernces />
                    <DangerZone />
                </ScrollView>

            </SafeAreaView>
        </LinearGradient>


    )
}

export default Settings