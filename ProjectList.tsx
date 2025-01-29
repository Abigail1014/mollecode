"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteProject, getRecentProjectList } from "@/lib/actions/project.actions";
import { Button } from "@/components/ui/button";

type ProjectItem = {
  $id: string;
  projectName: string,
  orgName: string,
  ODS: string,
  contact: string,
  responsible: string,
};

export function ProjectList() {
  const [projectItems, setProjectItems] = useState([]);

  // Cargamos los datos de forma asíncrona en el cliente
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentProjectList();
      setProjectItems(data);
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
      await deleteProject(id);
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
      <h2 className="text-2xl mb-4">Proyectos</h2>
      <div className="space-y-4">
        {projectItems.map((item: ProjectItem) => (
          <div key={item.$id} className="p-4 border rounded-md shadow-sm space-y-2 grid grid-cols-6">
            {/* <div>{JSON.stringify(item)}</div> */}
            <p><strong>Nombre:</strong> {item.projectName}</p>
            <p><strong>Organización:</strong> {item.orgName}</p>
            <p><strong>ODS:</strong> {item.ODS}</p>
            <p><strong>Contacto:</strong> {item.contact}</p>
            <p><strong>Responsable:</strong> {item.responsible}</p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push(`/dashboard/editProject/${item.$id}`)}>
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
