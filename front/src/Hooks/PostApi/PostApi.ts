
import { api } from '../UseApi';

type NewPostData = {
  name: string;
  nf: string;
  phone: string;
  file: Blob;
}


type NewQRCode = {
  newPost: {
    id: string;
    clientId: string;
    nf: string;
    fileName: string;
    message: string | null;
  };
  newQRCode: {
    type: "Buffer";
    data: number[];
  };
};


export const PostApi = {
  newPost: async (newPostData: NewPostData): Promise<NewQRCode> => {
    console.log(import.meta.env.VITE_API_BASE_URL)

        const formData = new FormData();

        formData.set("phone", newPostData.phone);
        formData.set("nf", newPostData.nf);
        formData.set("name", newPostData.name);
        formData.set("file", newPostData.file);

    const res = await api.post('/post', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log("res: ", res.data);

    return res.data as NewQRCode
  },

  getPost: async (fileName: string): Promise<ArrayBuffer> => {
    console.log("URL: ", import.meta.env.VITE_API_BASE_URL);
    const token = localStorage.getItem('token');

    const res = await api.get(`/post?postName=${fileName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    })

    console.log("Response: ", res)
    
    return res.data as ArrayBuffer
  },
}