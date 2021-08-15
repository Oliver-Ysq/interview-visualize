export const getChineseNumber = (num: number) => {
  const map = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
  ]
  return map[num]
}
