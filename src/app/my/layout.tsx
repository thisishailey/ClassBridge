"use client";

import { useState } from "react";

const menus = [
  "profile",
  "chat",
  "class",
  "like",
  "review",
  "purchase",
  "tutorClass",
  "tutorReview",
  "tutorSales",
  "tutorSalesManagement",
] as const;

export type Menus = (typeof menus)[number];

interface Props {
  children: React.ReactNode;
  profile: React.ReactNode;
  chat: React.ReactNode;
  class: React.ReactNode;
  like: React.ReactNode;
  review: React.ReactNode;
  purchase: React.ReactNode;
  tutorClass: React.ReactNode;
  tutorReview: React.ReactNode;
  tutorSales: React.ReactNode;
  tutorSalesManagement: React.ReactNode;
}

export default function Layout(props: Props) {
  const [currentMenu, setCurrentMenu] = useState<Menus>("profile");

  return (
    <div className="flex">
      <style>{`header {display: none;} main {top: 0 !important; display: block !important; padding: 0 !important}`}</style>
      {props.children}
      {menus.map((key) => {
        return currentMenu === key && props[key];
      })}
    </div>
  );
}
