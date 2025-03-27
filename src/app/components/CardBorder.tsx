import { ReactNode } from "react";

export interface CardBorderProps {
  children: ReactNode;
}

export default function CardBorder(props: CardBorderProps) {
  return (
    <div className="rounded-md border-2 border-blue-400 my-5 p-5">
      {props.children}
    </div>
  );
}
