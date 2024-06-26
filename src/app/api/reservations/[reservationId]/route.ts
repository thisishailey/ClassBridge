import { NextResponse, NextRequest } from "next/server";
import { ReservationDetailResponse } from "@/app/api/reservations/[reservationId]/type";

interface Params {
  reservationId: string;
}

export const GET = async (
  request: NextRequest,
  context: { params: Params },
) => {
  const headers = request.headers;

  const response = await fetch(
    `${process.env.ALLOWED_ORIGIN}/api/reservations/${context.params.reservationId}`,
    { cache: "no-store", headers },
  );

  const res: ReservationDetailResponse = await response.json();

  return NextResponse.json(res);
};
