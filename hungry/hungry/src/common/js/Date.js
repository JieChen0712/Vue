export function formatDate (time, fmt) {
  if (/(YY+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear().toString()).substr(4 - RegExp.$1.length))
  }
  let r = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }
  for (let i in r) {
    if (new RegExp(`(${i})`).test(fmt)) {
      let str = r[i].toString()
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : addZero(str))
    }
  }
  return fmt
}

function addZero (str) {
  return ('00' + str).substr(str.length)
}
