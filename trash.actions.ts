"use server";

import { ID, Query } from "node-appwrite";

import {
  TRASH_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createTrash = async (
  trash: CreateTrashParams
) => {
  try {
    const newTrash = await databases.createDocument(
      DATABASE_ID!,
      TRASH_COLLECTION_ID!,
      ID.unique(),
      trash
    );

    // revalidatePath("/");
    return parseStringify(newTrash);
  } catch (error) {
    console.error("An error occurred while creating a new trash:", error);
  }
};

export const getRecentTrashList = async () => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      TRASH_COLLECTION_ID!,
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

export const getTrash = async (trashId: string) => {
  try {
    const trash = await databases.getDocument(
      DATABASE_ID!,
      TRASH_COLLECTION_ID!,
      trashId
    );

    return parseStringify(trash);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// Editar un formulario
//  UPDATE APPOINTMENT
export const updateTrash = async ( trashId: string, trash: CreateTrashParams
) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      TRASH_COLLECTION_ID!,
      trashId,
      trash
    );

    if (!updatedAppointment) throw Error;

    // revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// Eliminar un formulario
export async function deleteTrash(documentId: string) {
  try {
    await databases.deleteDocument(DATABASE_ID!, TRASH_COLLECTION_ID!, documentId);
    return true;
  } catch (error) {
    console.error("Error al eliminar el formulario:", error);
    throw error;
  }
}