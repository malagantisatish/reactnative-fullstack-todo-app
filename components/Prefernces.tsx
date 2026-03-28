import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settingsStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Prefernces = () => {
    const [notification, setNotification] = useState<boolean>(false);
    const [autosync, setAutoSync] = useState<boolean>(false);
    const { colors, isDarkMode, toggleDarkMode } = useTheme();
    const settingStyles = createSettingsStyles(colors)
    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>Preferences</Text>
            {/* dark mode */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}>
                        <Ionicons name="moon" size={18} color={"#FFF"} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Dark Mode</Text>
                </View>
                <Switch ios_backgroundColor={colors.border} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={"#fff"} value={isDarkMode} onValueChange={toggleDarkMode} />

            </View>
            {/* notification */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning} style={settingStyles.settingIcon}>
                        <Ionicons name="notifications" size={18} color={"#fff"} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Notification</Text>
                </View>
                <Switch ios_backgroundColor={colors.border} trackColor={{ false: colors.border, true: colors.primary }} thumbColor="#fff" value={notification} onValueChange={() => setNotification(!notification)} />

            </View>
            {/* auto sync */}
            <View style={settingStyles.settingItem}>
                <View style={settingStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.success} style={settingStyles.settingIcon}>
                        <Ionicons name="sync" color={"#FFF"} size={18} />
                    </LinearGradient>
                    <Text style={settingStyles.settingText}>Auto Sync</Text>
                </View>
                <Switch ios_backgroundColor={colors.border} trackColor={{ false: colors.border, true: colors.primary }} thumbColor="#fff" value={autosync} onValueChange={() => setAutoSync(!autosync)} />
            </View>
        </LinearGradient>
    )
}

export default Prefernces