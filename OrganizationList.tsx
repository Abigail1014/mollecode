"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteOrganization, getRecentOrganizationList } from "@/lib/actions/organization.actions";
import { Button } from "@/components/ui/button";

type OrganizationItem = {
  $id: string;
  organization: string;
  socialMedia: string;
  contact: string;
  responsible: string;
  logo: FormData | undefined;
};

export function OrganizationList() {
  const [organizationItems, setOrganizationItems] = useState([]);

  // Cargamos los datos de forma asíncrona en el cliente
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentOrganizationList();
      setOrganizationItems(data);
      // console.log("=========================")
      // console.log(trashItems)
    };
    fetchData();
  }, []);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar este formulario?");
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteOrganization(id);
      // await deleteTrash(id, currentUserId, currentUserRole);
      router.refresh(); // Refresca la página para actualizar la lista
    } catch (error) {
      console.error("Error al eliminar el formulario:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto pt-10">
      <h2 className="text-2xl mb-4">Organizacion</h2>
      <div className="space-y-4">
        {organizationItems.map((item: OrganizationItem) => (
          <div key={item.$id} className="p-4 border rounded-md shadow-sm space-y-2 grid grid-cols-5">
            {/* <div>{JSON.stringify(item)}</div> */}
            <p><strong>Organizacion:</strong> {item.organization}</p>
            <p><strong>Red Social:</strong> {item.socialMedia}</p>
            <p><strong>Contacto:</strong> {item.contact}</p>
            <p><strong>Responsable:</strong> {item.responsible}</p>
            {/* <p><strong>Ciudad:</strong> {item.logo}</p> */}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push(`/dashboard/editOrganization/${item.$id}`)}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(item.$id)} disabled={isDeleting}>
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
