import AbandonedCartEmail from "./AbandonedCartEmail";
import WhatsAppNudge from "./WhatsAppNudge";

/** The two recovery nudges together: the email, with the WhatsApp message layered over its corner. */
export default function RecoveryNudges() {
  return (
    <div className="demo-nudges">
      <AbandonedCartEmail />
      <div className="demo-nudges-wa">
        <WhatsAppNudge />
      </div>
    </div>
  );
}
