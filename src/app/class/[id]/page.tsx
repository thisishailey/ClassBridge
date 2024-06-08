"use client";

import ClassDetailBreadcrumb from "@/components/classDetail/nav/Breadcrumb";
import ClassDetailCarousel from "@/components/classDetail/carousel/Carousel";
import ClassDetailSummary from "@/components/classDetail/summary/Summary";
import ClassDetailTab from "@/components/classDetail/nav/Tab";
import ClassDetailSection from "@/components/classDetail/section/Section";

import BottomActionBar from "@/components/classDetail/reservation/BottomActionBar";
import ShareModal from "@/components/classDetail/share/Modal";
import ReservationModal from "@/components/classDetail/reservation/Modal";

import { TABS } from "@/constants/classDetailTabs";
import {
  mockCheckoutData,
  mockClassImages,
  mockClassSectionData,
  mockClassSummaryData,
  mockLessonData,
} from "@/lib/mock";
import { useClassData } from "@/hooks/useClassData";

interface Props {
  params: { id: string };
}

export default function ClassDetailPage({ params }: Props) {
  //   const { data } = useClassData(params.id);

  return (
    <>
      <ClassDetailBreadcrumb
        location="서울"
        category={{ id: 1, name: "피트니스" }}
      />
      <ClassDetailCarousel images={mockClassImages} />
      <ClassDetailSummary data={mockClassSummaryData} />
      <ClassDetailTab />
      {TABS.map((tab, i) => (
        <ClassDetailSection
          key={tab.id}
          tab={tab}
          data={mockClassSectionData[i]}
        />
      ))}
      <BottomActionBar price={40000} />
      <ShareModal />
      <ReservationModal
        data={mockLessonData}
        price={40000}
        checkoutData={mockCheckoutData}
      />
    </>
  );
}
