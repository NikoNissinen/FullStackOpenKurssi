type Props = {
  courseName: string
}

export default function Header({courseName}: Props) {
  return (
    <h1>{courseName}</h1>
  )
}