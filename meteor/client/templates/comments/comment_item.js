Template.commentItem.helpers({
  submittedText: function () {
    var time = new Date(this.submitted);
    var year = time.getFullYear();
    var month = time.getUTCMonth() + 1;
    var date = time.getDate();
    month = (month < 10)? '0' + month : month;
    return month + '-' + date + '-' + year;
  }
});