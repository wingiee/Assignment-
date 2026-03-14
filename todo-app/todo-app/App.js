import { ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './App.styles';
import { Header } from './components/Header/Header';
import { TaskList } from './components/TaskManager/TaskList';
import { useState } from 'react';
import { TaskInput } from './components/TaskManager/TaskForm';

export default function App() {

  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const addTask = (task) => {
    setTaskList([...taskList, task]);
  }

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.taskId !== id));
  }

  const handleEdit = (task) => {
    setEditTask(task);
  }

  const updateTask = (updatedTask) => {
    const updatedList = taskList.map((task) =>
      task.taskId === updatedTask.taskId ? updatedTask : task
    );

    setTaskList(updatedList);
    setEditTask(null);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Header */}
        <View style={styles.headerWrapper}>
          <Header />
        </View>

        {/* Task Input */}
        <View style={styles.taskInputWrapper}>
          <TaskInput
            addTask={addTask}
            editTask={editTask}
            updateTask={updateTask}
          />
        </View>

        {/* Task List */}
        <View style={styles.taskWrapper}>
          <ScrollView>
            <TaskList
              tasks={taskList}
              onDelete={deleteTask}
              onEdit={handleEdit}
            />
          </ScrollView>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}