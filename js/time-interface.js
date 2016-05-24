var Howl = require("howler").Howl;

function update() {
  $('#hourDiv').text(moment().format('hh'));
  $('#minuteDiv').text(moment().format('mm A'));
  $("#timeZone").text(" PST")
}
setInterval(update, 1000);

$(document).ready(function(){

  $("#newAlarmBtn").hide();
  $("#alarm").hide();
  $("#snoozeBtn").hide();

  var sound = new Howl({
    urls: ['/alarm.mp3']
  });

  $('#alarm-form').submit(function(event){
    event.preventDefault();
    hour = parseInt($('#hour').val());
    minute = parseInt($('#minute').val());
    var formatMinute = $("#minute").val();
    $("#alarm-set").text("Alarm: " + hour + ":" + formatMinute);
    $("h2").hide();
    $("#setAlarm").hide();
    $("#newAlarmBtn").show();
    $("#snoozeBtn").hide();


    function alarmTimer() {
      var currentHour = parseInt(moment().format('hh'));
      var currentMinute = parseInt(moment().format('mm A'));

      if ((hour === currentHour) && (minute === currentMinute)) {
        $('#alarm').show();
        $('.alarm-set').hide();
        $("#snoozeBtn").show();
        sound.play();

      } else {
        $('#alarm').hide();
      }
    }
    setInterval(alarmTimer, 1000);
  });

  $('#newAlarmBtn').click(function(event){
    event.preventDefault();
    var hour = 0;
    var minute = 0;
    $("#alarm-set").empty();
    $("#setAlarm").show();
    $("#newAlarmBtn").hide();
  });

  $('#snoozeBtn').click(function(event){
    event.preventDefault();
    var snoozeMinute = minute + 9;
    minute = snoozeMinute;
    $("#snoozeBtn").hide();
    $("#newAlarmBtn").show();
    $("#alarm-set").text("Snooze Till: " + hour + ":" + snoozeMinute);
    sound.stop();

    function snoozeTimer() {
      var currentHour = parseInt(moment().format('hh'));
      var currentMinute = parseInt(moment().format('mm A'));

      if ((hour === currentHour) && (minute === currentMinute)) {
        $('#alarm').show();
        $('.alarm-set').hide();
        $('#snoozeBtn').show();
      } else {
        $('#alarm').hide();
        $('#snoozeBtn').hide();
      }
    }
    setInterval(alarmTimer, 1000);

});
});
