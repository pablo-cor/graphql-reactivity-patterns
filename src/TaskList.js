import { useQuery } from '@apollo/client';
import { GET_TASKS } from './query'

export function TaskList() {
    const {data, loading} = useQuery(GET_TASKS)
    if (!data && loading) {
        return <p>Loading</p>
    }

    return <>
        <h2>TASK LIST</h2>
        {data.tasks.map(task => (
            <li>Name: {task.title} ({task.task_status})</li>
        ))}
    </>
}