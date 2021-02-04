import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query listTasks{
  tasks{
    id
    title
    task_status
  }
}
`;

export const CREATE_TASKS = gql`
  mutation createTask($title: String, $task_status: TaskStatus ){
    createTask(data: {title: $title, task_status: $task_status}){
        id
        title
        task_status
    }
}
`;