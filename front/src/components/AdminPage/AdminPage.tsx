import { type JSX, useEffect, useState } from "react"
import './AdminPage.css'
import { UseApi } from "../../Hooks/UseApi";
import Modal from "../Modal";
import { Table } from "../Table/Table";
import { ListPostClient } from "./ListPostClient";


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


const clientApi = new UseApi().clientApi;
const clientPostApi = new UseApi().clientPostApi


export const AdminPage = () => {
  const [isOpenModalPost, setIsOpenModalPost] = useState(false);
  const [clientPost, setClientPost] = useState< DataClientPost  | null>(null);
  const [client, setClient] = useState<DataClientPost[] | null>(null)

  const handleIsModalOpen = async (clientId: string) => {
    setIsOpenModalPost(!isOpenModalPost)


    const res = await clientPostApi.getClientPost(clientId);

    setClientPost(res)

    console.log("modal: ", res)


  }

  const thead: JSX.Element = (
    <tr>
      <th>NOME</th>
      <th>FONE</th>
      <th>Nº POST</th>
      <th>AÇÃO</th>
    </tr>
  )

  const tbody: JSX.Element[] | JSX.Element =  (
    ( client ? (
      client.map((client) => {
        return (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.phone}</td>
            <td>{client._count.post}</td>
            <td>
              <button
                type="button"
                onClick={() => 
                  handleIsModalOpen(client.id)
                }
              >Open</button>
            </td>
          </tr>
        )
      })
      ) : (
      <tr>
        <td colSpan={4} >Nenhum cliente encontrado</td>
      </tr>
    ))
  )

  useEffect(() => {
    const getClient = async () => {
      const res = await clientApi.getClient()

      if(!res) {
        console.error("Erro ao buscar clientes");
      }
      setClient(res)
    }
    getClient()

  }, []);

  return (
    <section className="container">
      {thead && tbody && (
        <Table props={{ thead, tbody }} />
      )}

      {isOpenModalPost && (
        <Modal>
          {
            clientPost ? (
              <ListPostClient
                props={{
                  clientPost,
                  isModal: () => setIsOpenModalPost(!isOpenModalPost),
                }}
              />) :
              (
                <p>Loading...</p>
              )
          }
        </Modal>
      )}
      
    </section>
  )
}
