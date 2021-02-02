import { useCallback, useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import {GET_TASKS} from './TaskList'

const CREATE_TASKS = gql`
  mutation createTask($title: String, $task_status: TaskStatus ){
    createTask(data: {title: $title, task_status: $task_status}){
        id
        title
        task_status
    }
}
`;

export function TaskCreate() {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('Normal')
    const [ save ] = useMutation(CREATE_TASKS, {
        /* REFETCH QUERY */
/*         refetchQueries: [
            { query: GET_TASKS }
        ], */
        /* Write Cache */
       update: (proxy, { data: { createTask } }) => {
            const data = proxy.readQuery({ query: GET_TASKS });
            proxy.writeQuery({ query: GET_TASKS, data: {
              ...data,
              tasks: [...data.tasks, createTask]
            }});
        }
    })

    const saveTask = useCallback(() => {
        save({ variables: {
            title,
            task_status: status,
        }})
        return
    }, [save, status, title])
    return <>
        <h2>Task Create</h2>
        <form>
            <input value={title} placeholder="Task Title" onChange={e => setTitle(e.target.value)} />
            <select placeholder="Status" onChange={e => setStatus(e.target.value)} >
                <option value="Normal">Normal</option>
                <option value="Start">Start</option>
                <option value="Complete">Complete</option>
            </select>
            <br />
            <code>
                Name: {title}<br />
                Status: {status}
            </code>
            <br />
            <button type="button" onClick={saveTask}>Create</button>
        </form>
    </>
}