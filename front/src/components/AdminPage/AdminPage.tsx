import { type JSX, useState } from "react"
import './AdminPage.css'
import Modal from "../Modal";
import { Table } from "../Table/Table";





export const AdminPage = () => {
  const [isOpenModalPost, setIsOpenModalPost] = useState(false);
  const data = [
    { id: "f1r1rf13r2f", name: 'John Doe', phone: '0987654321', postNumber: 1 },
    { id: "fg34345h46jr", name: 'Jane Doe', phone: '1234567890', postNumber: 2 },
    { id: "34g3yyerhe4", name: 'Alice Doe', phone: '2345678901', postNumber: 3 },
    //... more data
  ]

  const thead: JSX.Element = (
    <tr>
      <th>NOME</th>
      <th>FONE</th>
      <th>Nº POST</th>
      <th>AÇÃO</th>
    </tr>
  )

  const tbody: JSX.Element[] =  (
    data.map((client) => {
      return (
        <tr key={client.id}>
          <td>{client.name}</td>
          <td>{client.phone}</td>
          <td>{client.postNumber}</td>
          <td>
            <button
              type="button"
              onClick={() => setIsOpenModalPost(!isOpenModalPost)}
            >Open</button>
          </td>
        </tr>
      )
    })
  )

  // const 


  return (
    <section className="container">
      <Table props={{thead, tbody}}/>

      {isOpenModalPost && (
        <Modal>
          <h2>Client Details</h2>
          <h2>sdlnvsd</h2>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button onClick={() => setIsOpenModalPost(false)}>Close</button>
        </Modal>
      )}
      
    </section>
  )
}