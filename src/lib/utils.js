import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateDayOptions = () => {
  const days = [];
  for (let i = 1; i <= 30; i++) {
    if (i === 1) {
      days.push({ value: i, label: "Same Day" });
    } else {
      days.push({ value: i, label: `${i} Days` });
    }
  }
  return days;
};

export const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

export const BORDER_EFFECT =
  "bg-zinc-100 hover:border-zinc-300 border duration-100";

export const BORDER_EFFECT_ACTIVE =
  "bg-zinc-900 border-zinc-900 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-700 duration-100";

export const BORDER_EFFECT_ERROR =
  "bg-red-100 border-red-300 text-red-500 hover:bg-red-200 hover:border-red-400 duration-100";

// export const BORDER_EFFECT_
