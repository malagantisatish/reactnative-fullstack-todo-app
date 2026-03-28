import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createSettingsStyles } from '@/assets/styles/settingsStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const ProgressStats = () => {
    const { colors, isDarkMode, toggleDarkMode } = useTheme()
    const settingStyles = createSettingsStyles(colors)

    const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter((item: any) => item.isCompleted).length : 0;
    const activetodos = totalTodos - completedTodos

    // get all todoes by query 
    return (
        <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
            <Text style={settingStyles.sectionTitle}>Progress Stats</Text>
            <View style={settingStyles.statsContainer}>
                {/* total todos */}
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient style={settingStyles.statIcon} colors={colors.gradients.primary}>
                            <Ionicons name="list" size={20} color="#fff" />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingStyles.statNumber}>{totalTodos}</Text>
                        <Text style={settingStyles.statLabel}>Total Todos</Text>
                    </View>
                </LinearGradient>
                {/* completed todos */}
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.success }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.success} style={settingStyles.actionIcon}>
                            <Ionicons name="checkmark-circle" size={20} color={"#fff"} />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingStyles.statNumber}>{completedTodos}</Text>
                        <Text style={settingStyles.statLabel}>Completed todos</Text>
                    </View>
                </LinearGradient>
                {/* active todos */}
                <LinearGradient colors={colors.gradients.background} style={[settingStyles.statCard, { borderLeftColor: colors.warning }]}>
                    <View style={settingStyles.statIconContainer}>
                        <LinearGradient style={settingStyles.statIcon} colors={colors.gradients.warning}>
                            <Ionicons name="time" size={20} color="#fff" />
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingStyles.statNumber}>{activetodos}</Text>
                        <Text style={settingStyles.statLabel}>Active todo</Text>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}

export default ProgressStats