import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getBrowserTimezone } from "./timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultFormat = "DD MMMM YYYY, hh:mm a";

export const formatDate = (date: Date, timezone?: string, format?: string) => {
  return dayjs(date)
    .tz(timezone ?? getBrowserTimezone())
    .format(format ?? defaultFormat);
};
