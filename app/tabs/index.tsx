import { createHomeStyles } from "@/assets/styles/homeStyles";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient"
import Header from "@/components/Header";
import GInput from "@/components/GInput";
import { useEffect, useState } from "react";
import TodoItem, { TodoDetailsTy } from "@/components/EmptyState";
import EmptyState from "@/components/EmptyState";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


type TodoTy = Doc<"todos">

type EditTy = {
  id: Id<"todos">;
  edit: boolean;
  text: string
}

export default function Index() {
  const { toggleDarkMode, colors } = useTheme()
  const addTodo = useMutation(api.todos.addTodo)
  const todos = useQuery(api.todos.getTodos);
  const deletetodo = useMutation(api.todos.deletetodo);
  const updateTodo = useMutation(api.todos.updateTodo)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const [isEditing, setIsEditing] = useState<EditTy>({ id: "" as any, edit: false, text: "" })
  const [isloading, setIsloading] = useState<boolean>(false)

  const isLoading = todos === undefined

  const homeStyles = createHomeStyles(colors)


  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id: id })
    } catch (error: any) {
      console.log("error at handleToggleTodo", error?.message);
      Alert.alert("Error", "Failed to toggle todo")
    }
  }


  const handleDelete = (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure,you want to delete todo", [
      { text: "Cancel", style: "cancel", },
      { text: "Delete", style: "destructive", onPress: () => deletetodo({ id: id }) }
    ])
  }


  const handleEdit = (item: TodoTy) => {
    setIsEditing({ edit: true, id: item._id, text: item.text })
  }

  const handleSave = async () => {
    if (isEditing.id) {
      setIsloading(true)
      try {
        await updateTodo({ id: isEditing.id, text: isEditing.text });
        setIsEditing({ edit: false, id: "" as any, text: "" })

      } catch (error: any) {
        console.log("Error updating todo", error.message);
        Alert.alert("Error", "Failed to update todo")
      } finally {
        setIsloading(false)
      }
    }

  }

  const handleTextChange = (text: string) => {
    setIsEditing(prev => ({ ...prev, text: text }))
  };

  const handleCancel = () => {
    setIsEditing({ edit: false, id: "" as any, text: "" })
  }


  const renderTodoItem = ({ item }: { item: TodoTy }) => {
    console.log("Convex URL:", process.env.EXPO_PUBLIC_CONVEX_URL);
    return <View style={homeStyles.todoItemWrapper}>
      <LinearGradient colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
          <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
            style={
              [homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]
            }>
            {item.isCompleted && <Ionicons color={"#FFF"} name="checkmark" size={18} />}

          </LinearGradient>
        </TouchableOpacity>
        {(isEditing.edit && isEditing.id === item._id) ? <View style={homeStyles.editContainer}>
          <TextInput placeholder="Edit your todo.." placeholderTextColor={colors.textMuted} value={isEditing.text} style={homeStyles.editInput} onChangeText={handleTextChange} />
          <View style={homeStyles.editButtons}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSave}>
              <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                <Ionicons name="checkmark" size={24} color="#fff" />
                <Text style={homeStyles.editButtonText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleCancel}>
              <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                <Ionicons name="close" size={24} color="#fff" />
                <Text style={homeStyles.editButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View> :
          <View style={homeStyles.todoTextContainer}>
            <Text style={[homeStyles.todoText, item.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.8 }]}>{item.text}</Text>
            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => handleEdit(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                  <Ionicons name="pencil" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item._id)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                  <Ionicons name="trash" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>}

      </LinearGradient>
    </View>
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <GInput />
        <View style={homeStyles.todoList}>
          <FlatList data={todos} renderItem={renderTodoItem} keyExtractor={(item) => item._id}
            style={homeStyles.todoList}
            contentContainerStyle={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyState />} />

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

