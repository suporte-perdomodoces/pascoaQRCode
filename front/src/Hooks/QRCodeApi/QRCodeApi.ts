
import { api } from '../UseApi';

// type NewPostData = {
//   name: string;
//   nf: string;
//   phone: string;
//   file: Blob;
// }


// type NewQRCode = {
//   newPost: {
//     id: string;
//     clientId: string;
//     nf: string;
//     fileName: string;
//     message: string | null;
//   };
//   newQRCode: {
//     type: "Buffer";
//     data: number[];
//   };
// };


export const QRCodeApi = {
  getQRCode: async (fileName: string): Promise<Blob> => {

    const token = localStorage.getItem('token')

    const res = await api.get(`/qrcode?postName=${fileName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob'
    })

    // if (res.status === 401) {
    //   return false;
    // }

    console.log(res.data)
    return res.data
  }
}