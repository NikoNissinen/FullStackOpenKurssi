import { NewPatientEntry, Gender, Entry } from "../types";
import * as z from "zod";

export const newEntrySchema = z.object({
  name: z.string(),
  occupation: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  ssn: z.string(),
  entries: z.array(z.string()),
});

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(gender);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const isEntries = (param: unknown): param is Entry[] => {
  return Array.isArray(param);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !isEntries(entries)) {
    throw new Error("Incorrect or missing entries: " + entries);
  }

  return entries;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data in NewPatientEntry");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "occupation" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: object.name as string,
      dateOfBirth: object.dateOfBirth as string,
      ssn: object.ssn as string,
      gender: parseGender(object.gender),
      occupation: object.occupation as string,
      entries: parseEntries(object.entries) as string[],
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};
