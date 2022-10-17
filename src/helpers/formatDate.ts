class FormatDate {
  filesName(date: Date) {
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    return `${year}${month}${day}_${hour}${minutes}${seconds}`;
  }
}

export default new FormatDate();
