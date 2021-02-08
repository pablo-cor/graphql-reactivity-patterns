import { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import useTasks from '../../hooks/useTasks'

export function TaskList() {
    const { tasks, tasksLoading, updateTask } = useTasks()

    const t = !tasksLoading && [...tasks.tasks].sort(function (a, b) {
        if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          } 
        return 0
    })
    

    const onDragEnd = useCallback(({ destination, source }) => {

       console.log({
           source,
        destination
       })
        updateTask({
            variables: {
                id: t[source.index].id, 
                order: destination.index + 1,
            },
            /* optimisticResponse: {
                __typename: "Mutation",
                updateTask: {
                    __typename: "Task",
                    id: t[source.index].id,
                    order: destination.index + 1,
                }
            } */
        })

       
        updateTask({
            variables: {
                id: t[destination.index].id, 
                order: source.index + 1,
            },
            /* optimisticResponse: {
                __typename: "Mutation",
                updateTask: {
                    __typename: "Task",
                    id: t[destination.index].id, 
                    order: source.index + 1,
                }
            } */
        })

    }, [updateTask, t])

    if (!tasks && tasksLoading) {
        return <p>Loading</p>
    }

    
   
    return <>
        <h2>TASK LIST</h2>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div  {...provided.droppableProps} ref={provided.innerRef}>
                {t.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                        <li ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                            Name: {task.title} ({task.task_status})
                        </li>
                        )}
                    </Draggable>
                ))}
                </div>)}
            </Droppable>
        </DragDropContext>
    </>
}