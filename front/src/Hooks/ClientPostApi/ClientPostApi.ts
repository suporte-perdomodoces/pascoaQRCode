
import { api } from '../UseApi';



type Post = {
  id: string;
  clientId: string;
  nf: string;
  fileName: string;
  createdAt: string;
  comments?: string
}

type DataClientPost = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  _count: { post: number }
  post: Post[]

}


export const CleintPostApi = {
  getClientPost: async (clientId: string): Promise<DataClientPost> => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/clientPost?clientId=${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    // if (res.status === 401) {
    //   return false;  
    // }

    return res.data as DataClientPost;
  },

}