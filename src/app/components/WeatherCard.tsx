import { ReactNode } from "react";
import CardBorder from "./CardBorder";

interface WeatherCardProps {
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
        <div>
          <div className="inline">{props.icon}</div>
          {props.title}
        </div>
        <div>{props.info}</div>
        <div>{props.description}</div>
        <div>{props.children}</div>
      </CardBorder>
    </div>
  );
}
