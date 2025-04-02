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
      <div className=" rounded-sm">
        <div className="mb-2">
          <div className="inline mr-1">{props.icon}</div>
          {props.title}
        </div>
        <div className="text-2xl pb-2">{props.info}</div>
        <div className="text-neutral-300 text-xs pb-0">{props.description}</div>
        <div>{props.children}</div>
      </div>
    </CardBorder>
  );
}
