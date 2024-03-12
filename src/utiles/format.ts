import * as dayjs from 'dayjs'

export function formatDate(date: string, format = 'YYYY年MM月DD HH:mm') {
  return dayjs(date).format(format)
}
