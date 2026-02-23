type CoursePart = {
  name: string;
  exerciseCount: number;
};

type Props = {
  courseParts: CoursePart[];
};

export default function Content({ courseParts }: Props) {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
}