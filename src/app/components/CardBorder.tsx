import { ReactNode } from "react";
import { joinClassNames } from "../util/format";

export interface CardBorderProps {
  className?: string;
  children: ReactNode;
  classNameBorder?: string;
}

export default function CardBorder(props: CardBorderProps) {
  const classNameBorder = props.classNameBorder ?? "border-neutral-700";
  return (
    <div
      className={joinClassNames(
        "rounded-xl border-2 bg-neutral-950 p-3",
        props.className,
        classNameBorder
      )}
    >
      {props.children}
    </div>
  );
}
