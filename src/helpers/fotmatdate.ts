import * as moment from 'moment'

export const formatDateDB = (date: Date) => {
  return moment(date).format(`YYYY-MM-DD hh:mm:ss`)
}
