import { z } from "zod";

export const FormSchema = z.object({
    id: z.string().min(2, {
      message: "",
    }),
    organization: z.string().min(2, {
      message: "Por favor introduce un nombre de organzacion válido",
    }),
    socialMedia: z.string().min(2, {
      message: "Descripción no válida.",
    }),
    contact: z.string().min(2, {
      message: "Introduce una dirección válida.",
    }),
    responsible: z.string().min(2, {
      message: "Introduce un contacto válido.",
    }),
    logo: z.string().min(2, {
      message: "Introduce una ciudad válida.",
    }),
  }) 