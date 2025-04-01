import { ReactNode } from "react";

export interface CardBorderProps {
  className?: string;
  children: ReactNode;
}

export default function CardBorder(props: CardBorderProps) {
  return (
    <div
      className={
        "rounded-md border-2 bg-neutral-950 border-neutral-700 m-5 p-3 " +
        props.className
      }
    >
      {props.children}
    </div>
  );
}
