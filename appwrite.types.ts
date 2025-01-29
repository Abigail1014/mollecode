import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: "male" | "female" | "other";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: "pending" | "scheduled" | "cancelled";
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}

export interface Project extends Models.Document {
  id: string
  projectName: string
  orgName: string
  ODS: "ODS1" | "ODS2" | "ODS3" | "ODS4" | "ODS5" | "ODS6" | "ODS7" | "ODS8" | "ODS9" | "ODS10" | "ODS11" | "ODS12" | "ODS13" | "ODS14" | "ODS15" | "ODS16" | "ODS17"
  contact: string
  responsible: string
}