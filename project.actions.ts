"use server";

import { ID, Query } from "node-appwrite";

import {
  DATABASE_ID,
  databases,
  PROJECT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createProject = async (
  project: CreateProjectParams
) => {
  try {
    const newProject = await databases.createDocument(
      DATABASE_ID!,
      PROJECT_COLLECTION_ID!,
      ID.unique(),
      project
    );

    // revalidatePath("/");
    return parseStringify(newProject);
  } catch (error) {
    console.error("An error occurred while creating a new trash:", error);
  }
};

export const getRecentProjectList = async () => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      PROJECT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return parseStringify(data.documents);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent trash tables:",
      error
    );
  }
};

export const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      DATABASE_ID!,
      PROJECT_COLLECTION_ID!,
      projectId
    );

    return parseStringify(project);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// Editar un formulario
//  UPDATE APPOINTMENT
export const updateProject = async ( projectId: string, project: CreateProjectParams
) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      PROJECT_COLLECTION_ID!,
      projectId,
      project
    );

    if (!updatedAppointment) throw Error;

    // revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// Eliminar un formulario
export async function deleteProject(documentId: string) {
  try {
    await databases.deleteDocument(DATABASE_ID!, PROJECT_COLLECTION_ID!, documentId);
    return true;
  } catch (error) {
    console.error("Error al eliminar el formulario:", error);
    throw error;
  }
}