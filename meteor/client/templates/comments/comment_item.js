Template.commentItem.helpers({
  submittedText: function () {
    var time = new Date(parseInt(this.submitted));
    var year = time.getFullYear();
    var month = time.getUTCMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    month = (month < 10) ? '0' + month : month;
    date = (date < 10) ? '0' + date : date;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
  }
});