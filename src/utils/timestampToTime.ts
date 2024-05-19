export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function timestampToDate(timestamp: number): ITime {
  const res: ITime = { hours: 0, minutes: 0, seconds: 0 };
  let diff = Math.floor(timestamp / 1000);
  res.hours = Math.floor(diff / 3600);
  diff = diff % 3600;
  res.minutes = Math.floor(diff / 60);
  res.seconds = diff % 60;
  return res;
}
