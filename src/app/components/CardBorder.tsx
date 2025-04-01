import { ReactNode } from "react";

export interface CardBorderProps {
  className?: string;
  children: ReactNode;
  classNameBorder?: string;
}

export default function CardBorder(props: CardBorderProps) {
  const classNameBorder = props.classNameBorder ?? "border-neutral-700";
  return (
    <div
      className={
        "rounded-md border-2 bg-neutral-950 m-2 p-3 " +
        props.className +
        " " +
        classNameBorder
      }
    >
      {props.children}
    </div>
  );
}
