export interface DateItem {
  year: number
  month: number
  day: number
  week: number
  currentMonth: boolean
  isSelected: boolean
  isSelectedStart: boolean
  isSelectedEnd: boolean
}

class Calendar {
  date: Date
  weeks: DateItem[] = []
  selected: [number, number]
  setDate(date: string | Date) {
    this.date = new Date(date)
    this.updateWeeks()
  }

  setSelected(selected: [number, number]) {
    // 将selected转为当日0点的时间戳以及第二天0点的时间戳
    const startDate = new Date(selected[0])
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(selected[1])
    endDate.setHours(0, 0, 0, 0)
    this.selected = [startDate.getTime(), endDate.getTime() + 24 * 60 * 60 * 1000 - 1]
    this.updateWeeks()
  }

  constructor(date: string | Date, selected: [number, number]) {
    // 将date转换为Date对象
    this.date = new Date(date)
    // 将selected转为当日0点的时间戳以及第二天0点的时间戳
    const startDate = new Date(selected[0])
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(selected[1])
    endDate.setHours(0, 0, 0, 0)
    this.selected = [startDate.getTime(), endDate.getTime() + 24 * 60 * 60 * 1000 - 1]
    this.updateWeeks()
  }

  updateWeeks() {
    // 获取选择日期的年月日
    const startTimestamp = this.selected[0]
    const endTimestamp = this.selected[1]
    // 清空weeks
    this.weeks = []
    const year = this.date.getFullYear()
    const month = this.date.getMonth()
    // 获取1号是周几
    const week = new Date(year, month, 1).getDay()
    // 将周日到week放入weeks中
    for (let i = 0; i < week; i++) {
      const m = month === 0 ? 12 : month - 1
      const y = month === 0 ? year - 1 : year
      const d = new Date(y, m + 1, 0).getDate() - week + i + 1
      const timestamp = new Date(y, m, d).getTime()
      this.weeks.push({
        year: y,
        month: m,
        day: d,
        week: i,
        currentMonth: false,
        isSelected: timestamp >= startTimestamp && timestamp <= endTimestamp,
        isSelectedStart: timestamp === startTimestamp,
        isSelectedEnd: timestamp + 24 * 60 * 60 * 1000 - 1 === endTimestamp,

      })
    }
    // 获取本月一共多少天
    const currentMonthDays = new Date(year, month + 1, 0).getDate()
    // 将本月的天数放入weeks中
    for (let i = 1; i <= currentMonthDays; i++) {
      const timestamp = new Date(year, month, i).getTime()
      this.weeks.push({
        year,
        month,
        day: i,
        week: (week + i - 1) % 7,
        currentMonth: true,
        isSelected: timestamp >= startTimestamp && timestamp <= endTimestamp,
        isSelectedStart: timestamp === startTimestamp,
        isSelectedEnd: timestamp + 24 * 60 * 60 * 1000 - 1 === endTimestamp,
      })
    }
    // 如果weeks不够42个则把下个月的天数放入weeks中
    if (this.weeks.length < 42) {
      const nextMonthDays = 42 - this.weeks.length
      for (let i = 1; i <= nextMonthDays; i++) {
        const m = month === 11 ? 0 : month + 1
        const y = month === 11 ? year + 1 : year
        const timestamp = new Date(y, m, i).getTime()
        this.weeks.push({
          year: y,
          month: m,
          day: i,
          week: (week + currentMonthDays + i - 1) % 7,
          currentMonth: false,
          isSelected: timestamp >= startTimestamp && timestamp <= endTimestamp,
          isSelectedStart: timestamp === startTimestamp,
          isSelectedEnd: timestamp + 24 * 60 * 60 * 1000 - 1 === endTimestamp,
        })
      }
    }
  }
}

export { Calendar }
