import { ReactNode } from "react";
import { IconType } from "rocketicons";

interface WeatherCardProps {
  icon: ReactNode;
  title: string;
  info: number | string;
  description?: string;
  children?: ReactNode;
}
export default function WeatherCard(props: WeatherCardProps) {
  return (
    <>
      <div>
        <div className="inline">{props.icon}</div>
        {props.title}
      </div>
      <div>{props.info}</div>
      <div>{props.description}</div>
    </>
  );
}
