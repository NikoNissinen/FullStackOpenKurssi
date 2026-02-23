import type { CoursePart } from "./types";

type Props = {
  course: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default function Part({ course }: Props) {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p><i>{course.description}</i></p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p>Project exercises {course.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p><i>{course.description}</i></p>
          <p>Background material: {course.backgroundMaterial}</p>
        </div>
      );
    case "description":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p><i>{course.description}</i></p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{course.name} {course.exerciseCount}</h3>
          <p><i>{course.description}</i></p>
          <p>Required skills: {course.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(course);
  }
}