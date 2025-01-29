"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  ORGANIZATION_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config";
import {parseStringify } from "../utils";

// REGISTER ORG
export const registerOrganization = async ({
  logo,
  ...organization
}: RegisterOrganizationParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (logo) {
      const inputFile =
        logo &&
        InputFile.fromBuffer(
          logo?.get("blobFile") as Blob,
          logo?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newOrganization = await databases.createDocument(
      DATABASE_ID!,
      ORGANIZATION_COLLECTION_ID!,
      ID.unique(),
      {
        logoId: file?.$id ? file.$id : null,
        logoUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...organization,
      }
    );

    return parseStringify(newOrganization);
  } catch (error) {
    console.error("An error occurred while creating a new organization:", error);
  }
};

export const getRecentOrganizationList = async () => {
  try {
    const data = await databases.listDocuments(
      DATABASE_ID!,
      ORGANIZATION_COLLECTION_ID!,
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
export const getOrganization = async (projectId: string) => {
  try {
    const organization = await databases.getDocument(
      DATABASE_ID!,
      ORGANIZATION_COLLECTION_ID!,
      projectId
    );

    return parseStringify(organization);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

// Editar un formulario
//  UPDATE APPOINTMENT
export const updateOrganization = async ( organizationId: string, organization: CreateOrganizationParams
) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      ORGANIZATION_COLLECTION_ID!,
      organizationId,
      organization
    );

    if (!updatedAppointment) throw Error;

    // revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// Eliminar un formulario
export async function deleteOrganization(documentId: string) {
  try {
    await databases.deleteDocument(DATABASE_ID!, ORGANIZATION_COLLECTION_ID!, documentId);
    return true;
  } catch (error) {
    console.error("Error al eliminar el formulario:", error);
    throw error;
  }
}