import { gql } from '@apollo/client';

export const CREATE_TASKS = gql`
  mutation createTask($title: String, $task_status: TaskStatus ){
    createTask(data: {title: $title, task_status: $task_status}){
        id
        title
        task_status
    }
}
`;
export const GET_TASKS = gql`
  query listTasks{
  tasks{
    id
    title
    task_status
    order
  }
}
`;

export const UPDATE_TASK = gql`
  mutation updateTask($id: ID, $order: Int ){
    updateTask(data: {order: $order}, where: {id: $id}){
        id
        title
        task_status
        order
    }
}
`;