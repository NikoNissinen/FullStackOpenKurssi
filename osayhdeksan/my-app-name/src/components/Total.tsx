type Props = {
  totalExercises: number
}

export default function Total({totalExercises}: Props) {
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}