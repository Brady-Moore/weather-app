import { ReactNode } from "react";
import { IconType } from "rocketicons";
import CardBorder from "./CardBorder";

interface WeatherCardProps {
  icon: ReactNode;
  title: string;
  info: number | string;
  description?: string;
  children?: ReactNode;
}
export default function WeatherCard(props: WeatherCardProps) {
  return (
    <div className="grid col-auto">
      <CardBorder>
        <div>
          <div className="inline">{props.icon}</div>
          {props.title}
        </div>
        <div>{props.info}</div>
        <div>{props.description}</div>
      </CardBorder>
    </div>
  );
}
