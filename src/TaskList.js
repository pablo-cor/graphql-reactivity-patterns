import { useQuery, gql } from '@apollo/client';

export const GET_TASKS = gql`
  query listTasks{
  tasks{
    id
    title
    task_status
  }
}
`;


export function TaskList() {
    const {data} = useQuery(GET_TASKS)
    console.log('data',data)
    if (!data) {
        return <p>Loading</p>
    }

    return <>
        <h2>Task List</h2>
        {data.tasks.map(task => (
            <li>Name: {task.title} ({task.task_status})</li>
        ))}
    </>
}