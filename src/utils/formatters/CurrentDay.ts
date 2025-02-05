import { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import toFarsiNumber from "./NumberToPersian";

const date = new DateObject({ calendar: persian, locale: persian_fa })

const currentDay: string =`${date.weekDay.name} ` + ` ${toFarsiNumber(date.day)}` + ` ${date.month.name} `;

export default currentDay;
