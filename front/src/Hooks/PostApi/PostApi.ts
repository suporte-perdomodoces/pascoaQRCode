
import { api } from '../UseApi';

// type NewPostData = {
//   clientID: string;

// }

export const PostApi = {


  newPost: async (): Promise<ArrayBuffer> => {
    console.log(import.meta.env.VITE_API_BASE_URL)

    const res = await api.post('/post')



    return res.data as ArrayBuffer
  },

  getPost: async (fileName: string): Promise<ArrayBuffer> => {
    console.log(import.meta.env.VITE_API_BASE_URL)

    const res = await api.get(`/post:&fileName=${fileName}`)
    
    return res.data as ArrayBuffer
  },
}