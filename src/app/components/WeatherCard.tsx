import { ReactNode } from "react";
import CardBorder from "./CardBorder";

export interface WeatherCardProps {
  icon: ReactNode;
  title: string;
  info?: number | string;
  description?: string;
  children?: ReactNode;
}
export default function WeatherCard(props: WeatherCardProps) {
  return (
    <div>
      <CardBorder>
        <div className="bg-neutral-950 rounded-sm text-neutral-50 px-2 py-1">
          <div>
            <div className="inline">{props.icon}</div>
            {props.title}
          </div>
          <div>{props.info}</div>
          <div>{props.description}</div>
          <div>{props.children}</div>
        </div>
      </CardBorder>
    </div>
  );
}
