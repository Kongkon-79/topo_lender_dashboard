import { NotFoundUI } from "@/components/ui/not-found";

export default function BookingsNotFound() {
  return (
    <NotFoundUI
      title="Booking Not Found"
      description="We couldn't find the booking you're looking for. It may have been canceled or the URL might be incorrect."
      imageSrc="/woman-green-dress.png"
      primaryActionLabel="View All Bookings"
      primaryActionHref="/bookings"
    />
  );
}
