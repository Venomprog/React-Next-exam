
export interface IPost {
  userId: number,
  id: number,
  title: 'string',
  body?: 'string'
}

export interface IPosts {
  dataPosts: IPost[]
}


export interface IUser {
  id: number,
  name: string,
  userName: string,
  email: string,
  address?: {},
  phone?: string,
  website?: string,
  company?: {}
}


export type TypeTodo = {
  completed: boolean,
  id: number,
  title: string,
  userId: number,
}