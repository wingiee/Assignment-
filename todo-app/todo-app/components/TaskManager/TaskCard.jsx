import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./TaskList.style";

export const TaskCard = ({ task, onDelete, onEdit }) => {
    return (
        <View style={styles.card}>

    {/* Task Text */}
    <View style={{flex:1}}>
        <TouchableOpacity>
            <Text 
                style={[
                    styles.taskTitle,
                    task.completed && {textDecorationLine: "line-through"}
                ]}
            >
                {task.taskText}
            </Text>

            <Text>
                {task.taskDescription}
            </Text>
        </TouchableOpacity>
    </View>

    {/* Buttons */}
    <View style={{flexDirection:"row", alignItems:"center", gap:10}}>

        <Pressable
            onPress={() => onEdit(task)}
            style={{backgroundColor:"blue", padding:6, borderRadius:4}}
        >
            <Text style={{color:"white"}}>Edit</Text>
        </Pressable>

        <Pressable
            onPress={() => onDelete(task.taskId)}
            style={{backgroundColor:"red", padding:6, borderRadius:4}}
        >
            <Text style={{color:"white"}}>Delete</Text>
        </Pressable>

    </View>

</View>
    )
}