
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TASKS, GET_TASKS, UPDATE_TASK } from "./query"

export default function useTasks() {
    /* query que lista las tareas */
    const { 
        data: tasks, 
        loading: tasksLoading, 
        error: tasksError
    } = useQuery(GET_TASKS)

    /* mutación que crea una nueva tarea */
    const [ createTask, { 
        loading: createTaskLoading, 
        error: createTaskError,
    } ] = useMutation(CREATE_TASKS, {
        update: (proxy, { data: { createTask } }) => { 
            const data = proxy.readQuery({ query: GET_TASKS });
            
            /* pone la nueva tarea en la caché */
            proxy.writeQuery({ query: GET_TASKS, data: {
            ...data,
            tasks: [
                ...data.tasks, 
                createTask
            ]
            }});
        }, 
    })

    return {
        /* lectura */
        tasks,
        tasksLoading,
        tasksError,

        /* escritura */
        createTask,
        createTaskLoading,
        createTaskError,
    }
}