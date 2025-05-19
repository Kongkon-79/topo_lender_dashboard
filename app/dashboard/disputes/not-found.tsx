import { NotFoundUI } from "@/components/ui/not-found";

export default function DisputesNotFound() {
  return (
    <NotFoundUI
      title="Dispute Not Found"
      description="We couldn't find the dispute you're looking for. It may have been resolved or the URL might be incorrect."
      imageSrc="/evidence-display.png"
      primaryActionLabel="View All Disputes"
      primaryActionHref="/disputes"
    />
  );
}
