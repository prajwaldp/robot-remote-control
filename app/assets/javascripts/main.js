// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on('ready', function() {
  new Vue({

    el: '#app',

    data: {
      address: null,
      leftCalibrate: 100,
      rightCalibrate: 200,
      motorSpeed: 0,
      heading: null,
      calibration: null,
      instructions: null
    },

    created: function() {
    },

    methods: {
      sendNavigationInfo: function () {
	var self = this;

	var diff = Math.abs(self.leftCalibrate - self.rightCalibrate);

	if (self.leftCalibrate > self.rightCalibrate) {
	  self.calibration = {
	    left: diff,
	    right: 0
	  }
	} else {
	  self.calibration = {
	    left: 0,
	    right: diff
	  }
	}

	console.log('Calibration Left  : ', self.calibration['left'])
	console.log('Calibration Right : ', self.calibration['right'])

	switch (self.heading) {
	case 'forward':
	  self.instructions = [
	    Number(self.motorSpeed) + Number(self.calibration['left']),
	    0,
	    Number(self.motorSpeed) + Number(self.calibration['right']),
	    0
	  ]
	  break;

	case 'backward':
	  self.instructions = [
	    0,
	    Number(self.motorSpeed) + Number(self.calibration['left']),
	    0,
	    Number(self.motorSpeed) + Number(self.calibration['right']),
	  ]
	  break;

	case 'right':
	  self.instructions = [
	    Number(self.motorSpeed) + Number(self.calibration['left']),
	    0,
	    0,
	    Number(self.motorSpeed) + Number(self.calibration['right'])
	  ]
	  break;

	case 'left':
	  self.instructions = [
	    0,
	    Number(self.motorSpeed) + Number(self.calibration['left']),
	    Number(self.motorSpeed) + Number(self.calibration['right']),
	    0
	  ]
	  break;

	default:
	  self.instructions = [0, 0, 0, 0];
	  break;

	}

	console.log('Instructions Given:', self.instructions);

	$.get(window.location.href + 'navigate', {
	  h: self.instructions[0],
	  j: self.instructions[1],
	  k: self.instructions[2],
	  l: self.instructions[3]
	}, function (data , status) {
	  console.log(data);
	  console.log(status);
	});

      },

      accelerate: function(event) {
	this.heading = 'forward';

	this.sendNavigationInfo();
      },

      reverse: function(event) {
	this.heading = 'backward';

	this.sendNavigationInfo();
      },

      turnLeft: function(event) {
	this.heading = 'left';

	this.sendNavigationInfo();
      },

      turnRight: function(event) {
	this.heading = 'right';

	this.sendNavigationInfo();
      },

      brake: function(event) {
	this.heading = null;

	this.sendNavigationInfo();
      }
     }
  });


});
