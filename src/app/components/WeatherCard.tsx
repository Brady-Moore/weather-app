import { ReactNode } from "react";
import CardBorder from "./CardBorder";
import { handleClassName } from "rocketicons/core/utils";

export interface WeatherCardProps {
  className?: string;
  icon: ReactNode;
  title: string;
  info?: number | string;
  description?: string;
  children?: ReactNode;
}
export default function WeatherCard(props: WeatherCardProps) {
  return (
    <CardBorder className={props.className}>
      <div className=" rounded-sm text-neutral-50">
        <div className="mb-2">
          <div className="inline mr-1">{props.icon}</div>
          {props.title}
        </div>
        <div>{props.info}</div>
        <div>{props.description}</div>
        <div>{props.children}</div>
      </div>
    </CardBorder>
  );
}
