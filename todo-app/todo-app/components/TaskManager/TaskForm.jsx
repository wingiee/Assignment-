import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./TaskForm.style"
import { useState, useEffect } from "react";

export const TaskInput = ({ addTask, editTask, updateTask }) => {

    const [taskObj, setTaskObj] = useState({
        taskId: 0,
        taskText: "",
        taskDescription: "",
        completed: false
    });

    useEffect(() => {
        if (editTask) {
            setTaskObj(editTask);
        }
    }, [editTask]);

    const handleTextChange = (key, value) => {
        setTaskObj({
            ...taskObj,
            [key]: value,
            taskId: taskObj.taskId || Math.random().toString()
        });
    }

    const submitHandler = () => {

        if (editTask) {
            updateTask(taskObj);
        }
        else {
            addTask(taskObj);
        }

        setTaskObj({
            taskId: 0,
            taskText: "",
            taskDescription: "",
            completed: false
        });
    }

    return (
        <View>

            <TextInput
                style={styles.input}
                placeholder="Enter your task"
                value={taskObj.taskText}
                onChangeText={(text) => handleTextChange("taskText", text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter description"
                value={taskObj.taskDescription}
                onChangeText={(text) => handleTextChange("taskDescription", text)}
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={submitHandler}
            >
                <Text style={styles.btnText}>
                    {editTask ? "Update Task" : "Add Task"}
                </Text>
            </TouchableOpacity>

        </View>
    )
}