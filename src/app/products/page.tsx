import { redirect } from "next/navigation";

/* The old "All capabilities" index was replaced by Why Aurevia; this path stays so existing links still land. */
export default function ProductsIndexRedirect() {
  redirect("/why-aurevia/");
}
