import { ReactNode } from "react";

export default function CardBorder(props: { children: ReactNode }) {
  return (
    <div className="rounded-md border-2 border-blue-400 my-10 p-5">
      {props.children}
    </div>
  );
}
