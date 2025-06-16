import dayjs from "dayjs"

export const formatToDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD")
}

export const formatToTime = (date: string) => {
  return dayjs(date).format("hh:mm")
}
