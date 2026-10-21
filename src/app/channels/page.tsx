import { redirect } from "next/navigation";

/* Each channel has its own page now (/channels/store, /email, /whatsapp, /instagram); this path stays so existing
   links still land. */
export default function ChannelsIndexRedirect() {
  redirect("/channels/store/");
}
