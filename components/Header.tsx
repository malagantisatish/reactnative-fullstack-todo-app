import { Text, View } from 'react-native'
import React from 'react'
import { createHomeStyles } from '@/assets/styles/homeStyles';
import useTheme from '@/hooks/useTheme';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const completedCount = todos ? todos.filter((todo: any) => todo.isCompleted).length : 0;
    const totalCount = todos ? todos.length : 0;
    const percentageOfCompleted = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
    return (
        <View style={homeStyles.header}>
            <View style={homeStyles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
                    <Ionicons name="flash-outline" size={28} color={"#fff"} />
                </LinearGradient>
                <View style={homeStyles.titleTextContainer}>
                    <Text style={homeStyles.title}>Today's Tasks 👀</Text>
                    <Text style={homeStyles.subtitle}>{`${completedCount} of ${totalCount}`} completed</Text>
                </View>
            </View>
            <View style={homeStyles.progressContainer}>
                <View style={homeStyles.progressBarContainer}>
                    <View style={homeStyles.progressBar}>
                        <LinearGradient colors={colors.gradients.success} style={[homeStyles.progressFill, { width: `${percentageOfCompleted}%` }]} />
                    </View>
                    <Text style={homeStyles.progressText}>{`${percentageOfCompleted.toFixed()}%`}</Text>
                </View>
            </View>
        </View>
    )
}

export default Header

