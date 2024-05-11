import BookingForm from "@/components/form/booking-form";
import QueryWrapper from "@/components/form/query-wrapper";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-landing bg-cover bg-bottom">
      <div className="container flex flex-col min-h-screen py-10">
        <Image
          src="/logo.svg"
          alt="Swell Match"
          width={120}
          height={40}
          className="self-center"
        />
        <Card className="flex flex-col items-stretch md:flex-row min-h-96 max-w-5xl w-full self-center mt-32">
          <div className="bg-beach w-full max-w-none md:self-auto md:h-auto md:w-auto h-52 bg-cover bg-bottom md:bg-center md:max-w-96 md:flex-1 overflow-hidden"></div>
          <QueryWrapper>
            <BookingForm />
          </QueryWrapper>
        </Card>
      </div>
    </main>
  );
}
