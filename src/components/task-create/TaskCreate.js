import { useCallback, useState } from 'react'
import useTasks from '../../hooks/useTasks';

export function TaskCreate() {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('Normal')
    const { createTask } = useTasks()

    const saveTask = useCallback(() => {
        createTask({ 
            variables: {
                title,
                task_status: status,
            },
            optimisticResponse: {
                __typename: "Mutation",
                createTask: {
                    __typename: "Task",
                    id: -1,
                    title,
                    task_status: status,
                }
            }
        })
        return
    }, [createTask, status, title])

    return <>
    <hr/>
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