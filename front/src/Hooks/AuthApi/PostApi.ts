
import { api } from '../UseApi';



export const PostApi = {


  newPost: async (): Promise<> => {
    console.log(import.meta.env.VITE_API_BASE_URL)

    const res = api.post('/post')
  },

  petPost: (): Promise<> => {


    const res = api.post('/post')
  },
}