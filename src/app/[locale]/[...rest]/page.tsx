import { notFound } from "next/navigation";

// Toute adresse inconnue sous une langue affiche la 404 localisée.
export default function CatchAllPage() {
  notFound();
}
