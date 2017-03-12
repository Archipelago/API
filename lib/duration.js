module.exports.validate = function(input) {
  return !!input.match(/^\d{1,2}h[0-5]?\d(m([0-5]?\ds?)?)?$/i);
}

module.exports.parse = function(input) {
  let units = input.match(/[a-z]/gi);
  let values = input.split(/[a-z]/gi);
  let hours, minutes, seconds;

  for (let i in values) {
    let value = parseInt(values[i]);
    if (units[i] == 'h')
      hours = value;
    else if (units[i] == 'm')
      minutes = value;
    else if (units[i] == 's')
      seconds = value;
    else if (minutes === undefined)
      minutes = value;
    else if (seconds === undefined)
      seconds = value;
  }
  return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
}

module.exports.readable = function(totalSeconds) {
  let hours = parseInt(totalSeconds / 3600);
  let minutes = parseInt(totalSeconds / 60) % 60;
  let seconds = totalSeconds % 60;
  return hours + 'h' + ('00' + minutes).slice(-2) + 'm' + ('00' + seconds).slice(-2) + 's';
}
