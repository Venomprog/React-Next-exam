// "use client"
import axios, {isCancel, AxiosError} from 'axios';
import * as AxiosLogger from 'axios-logger';
import { TypeTodo } from './types/types';

console.log(axios.isCancel('something'));
const instance = axios.create();
instance.interceptors.request.use(AxiosLogger.requestLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger);


type GetTodosResponse = {
  data: TypeTodo[];
};

export const getTodosData = () => {
  const request = async () => {
    console.log('request', new Date)
    try {
      const response = await instance.get<GetTodosResponse>('https://jsonplaceholder.typicode.com/todos');

      console.log('response', new Date)
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  return {request}
}

export const useRequest = () => {
  const request = async (url: string, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    console.log('request', new Date)
    try {
      const response = await instance.get(url);

      console.log('response', new Date)
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error);
    }

    // try {
    //   const response = await fetch(url, {method, body, headers});

    //   if (!response.ok) {
    //       throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    //   }

    //   const data = await response.json();


    //   return data
      
    // } catch(e){
    //   console.log(e)
    // }

    

  }

  return {request}
}