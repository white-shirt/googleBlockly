Blockly.JavaScript["blockly_front"] = function (block) {
	var dropdown_front = block.getFieldValue("front");
	var number_speed = block.getFieldValue("SPEED");
	var frontData = "aieggy.move('front'," + dropdown_front + "," + number_speed + ");" + "\n";
	return frontData;
};
Blockly.JavaScript["blockly_left"] = function (block) {
	var dropdown_left = block.getFieldValue("left");
	var number_speed = block.getFieldValue("SPEED");
	var leftData = "aieggy.move('left'," + dropdown_left + "," + number_speed + ");" + "\n";
	return leftData;
};
Blockly.JavaScript["blockly_back"] = function (block) {
	var dropdown_back = block.getFieldValue("back");
	var number_speed = block.getFieldValue("SPEED");
	var backData = "aieggy.move('back'," + dropdown_back + "," + number_speed + ");" + "\n";
	return backData;
};
Blockly.JavaScript['blockly_keepwalking_front'] = function(block) {
  var number_time = block.getFieldValue('time');
  var dropdown_speed = block.getFieldValue('speed');
  var code = "aieggy.move('keepwalking'," + number_time + "," + dropdown_speed + ");" + "\n";
  return code;
};
Blockly.JavaScript['blockly_keepwalking_back'] = function(block) {
  var number_time = block.getFieldValue('time');
  var dropdown_speed = block.getFieldValue('speed');
  var code = "aieggy.move('keepwalking'," + number_time + "," + dropdown_speed + ");" + "\n";
  return code;
};
Blockly.JavaScript["blockly_right"] = function (block) {
	var dropdown_right = block.getFieldValue("RIGHT");
	var number_speed = block.getFieldValue("SPEED");
	var rightData = "aieggy.move('right'," + dropdown_right + "," + number_speed + ");" + "\n";
	return rightData;
};
Blockly.JavaScript["blockly_rotate"] = function (block) {
	var number_rotatestep = block.getFieldValue("ROTATESTEP");
	var dropdown_dir = block.getFieldValue("dir");
	var dropdown_speed = block.getFieldValue("SPEED");
	dropdown_dir == 0 ? dropdown_speed = dropdown_speed : dropdown_speed = -dropdown_speed;
	var code = "aieggy.move('rotate'," + number_rotatestep + "," + dropdown_speed + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_turnleft"] = function (block) {
	var code = "aieggy.move('turnleft');" + "\n";
	return code;
};
Blockly.JavaScript["blockly_turnright"] = function (block) {
	var code = "aieggy.move('turnright');" + "\n";
	return code;
};
Blockly.JavaScript["blockly_differential"] = function (block) {
	var value_right_control = Blockly.JavaScript.valueToCode(block, "right_control", Blockly.JavaScript.ORDER_ATOMIC);
	var value_left_control = Blockly.JavaScript.valueToCode(block, "left_control", Blockly.JavaScript.ORDER_ATOMIC);
	var number_time = block.getFieldValue("TIME");
	value_right_control = value_right_control.replace("(", "").replace(")", "");
	value_left_control = value_left_control.replace("(", "").replace(")", ""); (value_right_control == "") ? (value_right_control = 50) : (value_right_control = value_right_control); (value_left_control == "") ? (value_left_control = 50) : (value_left_control = value_left_control);
	var code = "aieggy.differential(" + value_right_control + "," + value_left_control + "," + number_time + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_differential_control"] = function (block) {
	var dropdown_direction = block.getFieldValue("direction"); (dropdown_direction == "+") ? (dropdown_direction = "") : (dropdown_direction = dropdown_direction);
	var dropdown_speed = block.getFieldValue("SPEED");
	var code = (dropdown_direction + dropdown_speed) * 1;
	return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript["blockly_earcolor"] = function (block) {
	var colour_color = block.getFieldValue("COLOR");
	switch (colour_color) {
		case "#ffffff":
			colour_color = 1;
			break;
		case "#ff0000":
			colour_color = 115;
			break;
		case "#ffa500":
			colour_color = 101;
			break;
		case "#ffff00":
			colour_color = 100;
			break;
		case "#00ff00":
			colour_color = 26;
			break;
		case "#007fff":
			colour_color = 3;
			break;
		case "#0000ff":
			colour_color = 10;
			break;
		case "#8b00ff":
			colour_color = 28;
			break;
	}
	var dropdown_light = block.getFieldValue("LIGHT");
	var dropdown_blink = block.getFieldValue("BLINK");
	var code = "aieggy.earColor(" + colour_color + "," + dropdown_blink + "," + 0 + "," + dropdown_light + ");" + "\n";
	return code;
};
Blockly.JavaScript['blockly_eyelight'] = function(block) {
	var dropdown_eyelight = block.getFieldValue('eyeLight');

  // var code = '...;\n';
  // return code;
};
Blockly.JavaScript['blockly_customeye'] = function(block) {
  // var code = '';
  // return code;
};
Blockly.JavaScript['blockly_customizecolor'] = function(block) {
  var number_red = block.getFieldValue('RED');
  var number_green = block.getFieldValue('green');
  var number_blue = block.getFieldValue('BLUE');
  var dropdown_blink = block.getFieldValue('Blink');
	var dropdown_brightness = block.getFieldValue('Brightness');
	function rgb2hsv (r, g, b) {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360)
    };
	};
	var color = rgb2hsv(number_red, number_green, number_blue).h;
  var code = "aieggy.customEarColor(" + color + "," + dropdown_blink + "," + dropdown_brightness + ")" + "\n";
  return code;
};
Blockly.JavaScript['blockly_closelight'] = function(block) {
  var code = "aieggy.turnOff();" + "\n";
  return code;
};
Blockly.JavaScript['blockly_eyeswitch'] = function(block) {
  var text_left = block.getFieldValue('left');
  var text_right = block.getFieldValue('right');
	var reg = /^[0-9a-fA-F]$/;
	text_left = parseInt(text_left, 16);
	text_right = parseInt(text_right, 16);
  var code = "aieggy.eyeSwitch(" + text_left + "," + text_right + "," + 0 + ");" + "\n";
  return code;
};
Blockly.JavaScript['blockly_math_plus'] = function(block) {
  var value_value_1 = Blockly.JavaScript.valueToCode(block, 'value_1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_2 = Blockly.JavaScript.valueToCode(block, 'value_2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
	value_value_1 = value_value_1.replace("(", "").replace(")", "");
	value_value_2 = value_value_2.replace("(", "").replace(")", "");
	value_result = value_result.replace("(", "").replace(")", "");
	var code;
	if (value_value_1 === "" || value_value_2 === "" || value_result === "") {
		code = false;
	};
	if (value_value_1 !== "" && value_value_2 !== "" && value_result !== "") {
		var num_left = value_value_1 * 1 + value_value_2 * 1;
		code = num_left + dropdown_operator + value_result;
		code = eval(code);
	};
	console.log("加法:" + code)
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_math_sub'] = function(block) {
  var value_value_1 = Blockly.JavaScript.valueToCode(block, 'value_1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_2 = Blockly.JavaScript.valueToCode(block, 'value_2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
	var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
	value_value_1 = value_value_1.replace("(", "").replace(")", "");
	value_value_2 = value_value_2.replace("(", "").replace(")", "");
	value_result = value_result.replace("(", "").replace(")", "");
	var code;
	if (value_value_1 === "" || value_value_2 === "" || value_result === "") {
		code = false;
	};
	if (value_value_1 !== "" && value_value_2 !== "" && value_result !== "") {
		var num_left = value_value_1 * 1 - value_value_2 * 1;
		code = num_left + dropdown_operator + value_result;
		code = eval(code);
	};
	console.log("减法:" + code)
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_math_mul'] = function(block) {
  var value_value_1 = Blockly.JavaScript.valueToCode(block, 'value_1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_2 = Blockly.JavaScript.valueToCode(block, 'value_2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
	var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
	value_value_1 = value_value_1.replace("(", "").replace(")", "");
	value_value_2 = value_value_2.replace("(", "").replace(")", "");
	value_result = value_result.replace("(", "").replace(")", "");
	var code;
	if (value_value_1 === "" || value_value_2 === "" || value_result === "") {
		code = false;
	};
	if (value_value_1 !== "" && value_value_2 !== "" && value_result !== "") {
		var num_left = (value_value_1 * 1) * (value_value_2 * 1);
		code = num_left + dropdown_operator + value_result;
		code = eval(code);
	};
	console.log("乘法:" + code)
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_math_div'] = function(block) {
  var value_value_1 = Blockly.JavaScript.valueToCode(block, 'value_1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value_2 = Blockly.JavaScript.valueToCode(block, 'value_2', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
	var value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
	value_value_1 = value_value_1.replace("(", "").replace(")", "");
	value_value_2 = value_value_2.replace("(", "").replace(")", "");
	value_result = value_result.replace("(", "").replace(")", "");
	var code;
	if (value_value_1 === "" || value_value_2 === "" || value_result === "") {
		code = false;
	};
	if (value_value_1 !== "" && value_value_2 !== "" && value_result !== "") {
		var num_left = (value_value_1 * 1) / (value_value_2 * 1);
		console.log(num_left)
		code = num_left + dropdown_operator + value_result;
		code = eval(code);
	};
	console.log("除法:" + code)
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_isoddevenprime'] = function(block) {
	var value_number = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
			value_number = value_number.replace("(", "").replace(")", "");
			value_number = value_number * 1;
	var dropdown_oddevenprime = block.getFieldValue('oddevenprime');
	var code;
	function isPrime(num){
		if (!isNum(num)){
				return false;
		}
		if (!isInteger(num)){
				return false;
		}
		for (var i = 2; i <= Math.sqrt(num); i++) {
				if (num%i==0){
				return false;
		}
		};
		return true;
	};
	function isInteger(num){
		return num == ~~num ? true : false;
	};
	function isNum(num){
		return num == +num ? true : false;
	};
	function isOdd(num) {
		return (num % 2 == 1) ? true : false;
	};
	function isEven(num) {
		return (num % 2 == 0) ? true : false;
	};
	if (value_number > 0) {
		switch (dropdown_oddevenprime) {
			case "odd":
				if (isOdd(value_number)) {
					code = true;
				} else {
					code = false;
				}
				break;
			case "even":
				if (isEven(value_number)) {
					code = true;
				} else {
					code = false;
				}
				break;
			case "prime":
				if (isPrime(value_number)) {
					code = true;
				} else {
					code = false;
				}
				break;
		}
	} else {
		code = false;
	}
	console.log("奇偶质:" + code);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_logic_or'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC) || false;
	var value_second = Blockly.JavaScript.valueToCode(block, 'second', Blockly.JavaScript.ORDER_ATOMIC) || false;
	value_first = value_first.replace("(", "").replace(")", "");
	value_second = value_second.replace("(", "").replace(")", "");
	var code;
	if (value_first == 'true' || value_second == 'true') {
		code = true;
	} else {
		code = false;
	}
	console.log("逻辑或:" + code);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_logic_and'] = function(block) {
  var value_first = Blockly.JavaScript.valueToCode(block, 'first', Blockly.JavaScript.ORDER_ATOMIC);
	var value_second = Blockly.JavaScript.valueToCode(block, 'second', Blockly.JavaScript.ORDER_ATOMIC);
	value_first = value_first.replace("(", "").replace(")", "");
	value_second = value_second.replace("(", "").replace(")", "");
	var code;
	if (value_first == "true" && value_second == "true") {
		code = true;
	} else {
		code = false;
	}
	console.log("逻辑且:" + code);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['blockly_number'] = function(block) {
  var number_number = block.getFieldValue('number');
	var code = number_number;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["blockly_if"] = function (block) {
	var value_if = Blockly.JavaScript.valueToCode(block, "if", Blockly.JavaScript.ORDER_ATOMIC) || false;
	value_if == "(true)" ? (value_if = "true") : (value_if = "false");
	var statements_do = Blockly.JavaScript.statementToCode(block, "do");
	var code = "if (" + value_if + ")" + " {" + "\n";
	code += statements_do;
	code += "};" + "\n";
	return code;
};
Blockly.JavaScript['blockly_ifelse'] = function (block) {
	var value_if = Blockly.JavaScript.valueToCode(block, 'if', Blockly.JavaScript.ORDER_ATOMIC) || false;
	value_if == "(true)" ? (value_if = "true") : (value_if = "false");
	var statements_istrue = Blockly.JavaScript.statementToCode(block, 'isTrue') || "\n";
	var statements_isfalse = Blockly.JavaScript.statementToCode(block, 'isFalse') || "\n";
	var code = "if (" + value_if + ")" + " {" + "\n";
	code += statements_istrue;
	code += "} else {" + "\n";
	code += statements_isfalse;
	code += "};" + "\n";
	return code;
};
Blockly.JavaScript["blockly_tracking"] = function (block) {
	var number_time = block.getFieldValue("TIME");
	var number_speed = block.getFieldValue("SPEED");
	var code = "aieggy.mode('pattern'," + number_speed + ',' + number_time + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_obsessive"] = function (block) {
	var number_time = block.getFieldValue("TIME");
	var number_speed = block.getFieldValue("SPEED");
	var code = "aieggy.mode('elude',"+ number_speed + ',' + number_time + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_follow"] = function (block) {
	var number_time = block.getFieldValue("TIME");
	var code = "aieggy.mode('follow'," + 0 + ',' + number_time + ");" + "\n";
	return code;
};
Blockly.JavaScript['blockly_trackingdir'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var code = "aieggy.patternFront(" + dropdown_direction + ")" + "\n";
  return code;
};
Blockly.JavaScript['blockly_btmsensor'] = function(block) {
  var statements_onground = Blockly.JavaScript.statementToCode(block, 'onground');
  var statements_onhand = Blockly.JavaScript.statementToCode(block, 'onhand');
	var code = "if (true) {" + "\n";
			code += "  aieggy.onground('start');" + "\n";
			code += statements_onground;
			code += "  aieggy.onground('end');" + "\n";
			code +=	"};" + "\n";
			code += "if (true) {" + "\n";
			code += "  aieggy.pickUp('start');" + "\n";
			code += statements_onhand;
			code += "  aieggy.pickUp('end');" + "\n";
			code += "};" + "\n";
  return code;
};
Blockly.JavaScript['blockly_eyesensor'] = function(block) {
	var dropdown_distance = block.getFieldValue('DISTANCE');
  var statements_eyesensor = Blockly.JavaScript.statementToCode(block, 'EYESENSOR');
	var code = "if (true) {" + "\n";
			code += "  aieggy.eyeSensor('start'," + "'" + dropdown_distance + "'" + ");" + "\n";
			code += statements_eyesensor;
			code += "  aieggy.eyeSensor('end'," + "'" + dropdown_distance + "'" + ");" + "\n";
			code += "};" + "\n";
  return code;
};
Blockly.JavaScript["blockly_pause"] = function (block) {
	var number_pausetime = block.getFieldValue("pauseTime");
	var code = "aieggy.control('pause'," + number_pausetime + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_play"] = function (block) {
	var dropdown_music = block.getFieldValue("MUSIC");
	var dropdown_wait = block.getFieldValue("WAIT");
	(dropdown_music == 0) ? (dropdown_music = Math.ceil(10 * Math.random()) + 40) : (dropdown_music = dropdown_music);
	var code = "aieggy.play('music'," + dropdown_music + "," + dropdown_wait + ");" + "\n";
	return code;
};
Blockly.JavaScript["blockly_animal"] = function (block) {
	var dropdown_animal = block.getFieldValue("animal");
	var dropdown_wait = block.getFieldValue("WAIT");
	(dropdown_animal == 0) ? (dropdown_animal = Math.ceil(10 * Math.random())) : (dropdown_animal = dropdown_animal);
	var code = "aieggy.play('animal'," + dropdown_animal + "," + dropdown_wait + ");" + "\n";
	return code;
};
Blockly.JavaScript['blockly_note'] = function(block) {
	var dropdown_notename = block.getFieldValue('notename');
	(dropdown_notename == 0) ? (dropdown_notename = Math.ceil(8 * Math.random())) : (dropdown_notename = dropdown_notename);
  var code = "aieggy.play('note'," + dropdown_notename + "," + 1 + ");" + "\n";
  return code;
};
Blockly.JavaScript['blockly_speak'] = function(block) {
	var dropdown_speakcon = block.getFieldValue('speakCon');
	(dropdown_speakcon == 0) ? (dropdown_speakcon = Math.ceil(11 * Math.random()) + 11) : (dropdown_speakcon = dropdown_speakcon);
  var dropdown_wait = block.getFieldValue('wait');
  var code = "aieggy.play('speak'," + dropdown_speakcon + "," + dropdown_wait + ");" + "\n";
  return code;
};
Blockly.JavaScript['blockly_secret'] = function(block) {
  var dropdown_secrets = block.getFieldValue('secrets');
	var dropdown_wait = block.getFieldValue('wait');
	(dropdown_secrets == 0) ? (dropdown_secrets = Math.ceil(10 * Math.random()) + 30) : (dropdown_secrets = dropdown_secrets);
  var code = "aieggy.play('secret'," + dropdown_secrets + "," + dropdown_wait + ");" + "\n";
  return code;
};
Blockly.JavaScript["blockly_controls_for"] = function (block) {
	var dropdown_var = block.getFieldValue("var");
	var dropdown_from = block.getFieldValue("FROM");
	var dropdown_to = block.getFieldValue("TO");
	var dropdown_by = block.getFieldValue("BY");
	var statements_do = Blockly.JavaScript.statementToCode(block, "DO");
	var code = "for" + "(" + "var" + " " + dropdown_var + "=" + dropdown_from + ";" + dropdown_var + "<=" + dropdown_to + ";" + dropdown_var + dropdown_by + ")" + "{" + "\n";
		  code += statements_do;
		  code += "};" + "\n";
	return code;
};
var loopCount = 0;
Blockly.JavaScript['blockly_loop'] = function(block) {
	var number_loopstep = block.getFieldValue('loopStep');
  var statements_loop = Blockly.JavaScript.statementToCode(block, 'loop');
  var code = "for" + "( var" + " " + "num_" + ++loopCount + " = 0" + "; " + "num_" + loopCount + " < " + number_loopstep + "; " + ("num_" + loopCount) + "++" + ")" + "{" + "\n";
	code += statements_loop;
	code += "};" + "\n";
	return code;
};

