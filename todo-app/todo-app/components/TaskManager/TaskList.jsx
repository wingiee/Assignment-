import { View } from "react-native";
import { TaskCard } from "./TaskCard";

export const TaskList = ({ tasks, onDelete, onEdit }) => {
    return (
        <View>
            {
                tasks.map((task) => (
                    <TaskCard
                        key={task.taskId}
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            }
        </View>
    )
}