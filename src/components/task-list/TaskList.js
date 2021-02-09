import useTasks from '../../hooks/useTasks'

export function TaskList() {
    const { tasks, tasksLoading } = useTasks()

    if (!tasks) {
        return <p>Loading</p>
    }
    return <>
        <h2>TASK LIST</h2>
        <div  >
            {tasks.tasks.map((task, index) => (
                <li>
                    Name: {task.title} ({task.task_status})
                </li>
            ))}
        </div>
    </>
}