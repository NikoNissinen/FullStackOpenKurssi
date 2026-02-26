import { z } from "zod";
import { newEntrySchema } from "./services/utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
