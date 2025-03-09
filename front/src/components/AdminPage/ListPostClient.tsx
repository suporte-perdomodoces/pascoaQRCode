import './ListPostClient.css'
import type { JSX } from "react";
import { UseApi } from "../../Hooks/UseApi";
import { imprimirBlob } from "../../script/ImprimirQRCode";
import { Table } from "../Table/Table";



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

type Props = {
  props: {
    clientPost: DataClientPost
    isModal: () => void;
  }
}


const qrCodeApi = new UseApi().qrCodeApi
export const ListPostClient = ({ props }: Props) => {

  const client = props.clientPost


  const thead: JSX.Element = (
    <tr>
      <th>NF</th>
      <th>TIPO</th>
      <th>DATA</th>
      <th>AÇÃO</th>
    </tr>
  )

  const tbody: JSX.Element[] =  (
    props.clientPost.post.map((item) => {
      const extensionFile = item.fileName.split(".")[1]
      const data = item.createdAt.split("T")[0]
      return (
        <tr key={item.id}>
          <td>{item.nf}</td>
          <td>{extensionFile}</td>
          <td>{data}</td>
          <td>
            <button
              type="button"
              onClick={() => printQRCode(item.fileName)}
            >Open</button>
          </td>
        </tr>
      )
    })
  )


  const printQRCode = async (fileName: string) => {
    console.log(fileName)

    const res = await qrCodeApi.getQRCode(fileName)
    
    imprimirBlob(res)


  }

  return (
    <section className=''>
      <h2>Client Details</h2>
      <div className="data-user-model">
        <span> <p>Nome: </p> <p>{client.name}</p> </span>
        <span> <p>Fone: </p> <p>{client.phone}</p> </span>
        <span> <p>Nº Post: </p> <p>{client._count.post}</p> </span>
      </div>
      <h3>Posts</h3>

      <Table props={{ thead, tbody }}/>

      <button type="button" onClick={props.isModal}>Close</button>
    </section>
  )
} 