import type { JSX } from "react"
import "./Table.css"



type Props = {
  props: {
    thead: JSX.Element;
    tbody: JSX.Element[] | JSX.Element;
  }
}

export const Table = ({ props }: Props) => {


  return (
    <table>
      <thead>
        {props.thead}
      </thead>
      <tbody>
        {props.tbody}
      </tbody>
    </table>
  )
}