import rawPatients from "../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Patient[] = rawPatients as Patient[];

const generateId = () => {
  const id = uuidv4();
  return id;
};

const getAllPatients = (): NonSensitivePatient[] => {
  return patients.map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
    entries: p.entries,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return patient;
  } else {
    return undefined;
  }
};

const createNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: generateId(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getAllPatients, createNewPatient, getPatientById };
