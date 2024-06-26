import Link from "next/link";
import Button, { type ButtonColorScheme } from "@/components/common/Button";
import type { ClassTabs } from "@/app/my/@class/page";
import { ReservationListData } from "@/lib/supabase/actions/reservation";
import {
  formatDateToLocaleString,
  formatTimeToLocaleString,
} from "@/lib/utils";

export type ReservedClassCardStatus = "completed" | "success" | "canceled";

interface Props {
  data: ReservationListData;
  status?: ReservedClassCardStatus;
}

export default function ReservedClassCard({
  data,
  status = "completed",
}: Props) {
  const variant: { color: ButtonColorScheme; text: ClassTabs } = {
    color:
      status === "completed"
        ? "primary"
        : status === "success"
          ? "point"
          : "gray",
    text:
      status === "completed"
        ? "수강 완료"
        : status === "success"
          ? "예약 확정"
          : "예약 취소",
  };

  return (
    <div
      className={`flex items-center justify-between py-4 px-5 rounded border border-${variant.color}`}
    >
      <div className="space-y-2">
        <span className={`font-bold text-base text-${variant.color}`}>
          {variant.text}
        </span>
        <h4 className="font-bold text-2xl text-black">{data.class.name}</h4>
        <div className="flex gap-4 font-normal text-base text-black">
          <span>
            {formatDateToLocaleString(new Date(data.lesson.time), {
              withoutYear: true,
            })}
          </span>
          <span>{formatTimeToLocaleString(new Date(data.lesson.time))}</span>
          <span>{`${data.quantity}인`}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 w-[94px]">
        {["문의하기", "상세보기"].map((button, i) => (
          <Link
            key={button}
            href={
              button === "문의하기" ? "/" : `/class/${data.lesson.class_id}`
            }
            className="flex"
          >
            <Button
              text={button}
              primary={i === 0}
              colorScheme={variant.color}
              className="flex-1"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
