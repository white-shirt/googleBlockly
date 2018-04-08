Blockly.Blocks["blockly_pause"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("延迟").appendField(new Blockly.FieldNumber(0, 1, 10, 1), "pauseTime").appendField("秒");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#008c97");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks['blockly_loop'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("重复")
			.appendField(new Blockly.FieldNumber(5, 0, 10, 1), "loopStep")
			.appendField("次");
		this.appendStatementInput("loop")
			.setCheck(null)
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#008c97");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks["blockly_if"] = {
	init: function () {
		this.appendValueInput("if").setCheck("IF").setAlign(Blockly.ALIGN_CENTRE).appendField("如果");
		this.appendStatementInput("do").setCheck(null).setAlign(Blockly.ALIGN_CENTRE).appendField("执行");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#008c97");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks['blockly_ifelse'] = {
	init: function () {
		this.appendValueInput("if")
			.setCheck("IF")
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("如果");
		this.appendStatementInput("isTrue")
			.setCheck(null)
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("执行");
		this.appendStatementInput("isFalse")
			.setCheck(null)
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("否则");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#008c97");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks["blockly_front"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向前走").appendField(new Blockly.FieldNumber(0, 1, 10, 1), "front").appendField("步 ").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_left"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向左走").appendField(new Blockly.FieldNumber(1, 1, 10, 1), "left").appendField("步 ").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_back"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向后走").appendField(new Blockly.FieldNumber(0, 1, 10, 1), "back").appendField("步 ").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_right"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向右走").appendField(new Blockly.FieldNumber(0, 1, 10, 1), "RIGHT").appendField("步 ").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_rotate"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("旋转").appendField(new Blockly.FieldNumber(5.5, 1, 30, 0), "ROTATESTEP").appendField("秒").appendField("").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_turnleft"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向左旋转 90°");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_turnright"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("向右旋转 90°");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_differential"] = {
	init: function () {
		this.appendValueInput("right_control").setCheck("differential").setAlign(Blockly.ALIGN_RIGHT).appendField("右轮");
		this.appendValueInput("left_control").setCheck("differential").setAlign(Blockly.ALIGN_RIGHT).appendField("左轮");
		this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField("时间").appendField(new Blockly.FieldNumber(5, 1, 10, 1), "TIME");
		this.setInputsInline(false);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_differential_control"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("方向").appendField(new Blockly.FieldDropdown([["前", "+"], ["后", "-"]]), "direction").appendField("速度").appendField(new Blockly.FieldDropdown([["慢", "50"], ["正常", "80"], ["快", "120"], ["超快", "160"]]), "SPEED");
		this.setOutput(true, "differential");
		this.setColour("#f5821f");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_earcolor"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("耳朵颜色").appendField(new Blockly.FieldColour("#ff0000"), "COLOR").appendField("闪烁").appendField(new Blockly.FieldDropdown([["慢闪", "5"], ["快闪", "20"], ["常亮", "0"]]), "BLINK").appendField("时间").appendField(new Blockly.FieldDropdown([["5秒", "5"], ["30秒", "30"], ["60秒", "60"]]), "TIME").appendField("亮度").appendField(new Blockly.FieldDropdown([["暗", "50"], ["正常", "150"], ["亮", "250"]]), "LIGHT");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#fec002");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks['blockly_eyelight'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("眼睛灯光")
			.appendField(new Blockly.FieldDropdown([["旋转", "旋转"], ["闪烁", "闪烁"], ["随机", "随机"]]), "eyeLight");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#fec002");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_customizecolor'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField(" 耳朵灯光  ")
			.appendField("红")
			.appendField(new Blockly.FieldNumber(0, 0, 255, 1), "RED")
			.appendField("黄")
			.appendField(new Blockly.FieldNumber(0, 0, 255, 1), "YELLLOW")
			.appendField("蓝")
			.appendField(new Blockly.FieldNumber(0, 0, 255, 1), "BLUE")
			.appendField(new Blockly.FieldDropdown([["慢闪", "慢闪"], ["快闪", "快闪"], ["静止", "静止"]]), "Blink")
			.appendField(new Blockly.FieldDropdown([["暗", "暗"], ["亮", "亮"], ["正常", "正常"]]), "Brightness");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#fec002");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_closelight'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("关闭所有灯光");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#fec002");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks["blockly_play"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("播放音乐").appendField(new Blockly.FieldDropdown([["随机播放", "0"], ["Head shoulders kness...", "41"], ["Bingo", "42"], ["Donkey", "43"], ["Food I Like", "44"], ["Little Star", "45"], ["Long long ago", "46"], ["乖乖大小姐", "47"], ["拍拍手", "48"], ["三只小熊", "49"], ["洋娃娃和小熊跳舞", "50"]]), "MUSIC").appendField(new Blockly.FieldDropdown([["等待", "0"], ["继续", "1"]]), "WAIT");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#d80381");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_animal"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("动物声音").appendField(new Blockly.FieldDropdown([["随机播放", "0"], ["猫", "1"], ["狗", "2"], ["公鸡", "3"], ["狮子", "4"], ["大象", "5"], ["青蛙", "6"], ["绵羊", "7"], ["鸭子", "8"], ["马", "11"], ["啄木鸟", "12"]]), "animal").appendField(new Blockly.FieldDropdown([["等待", "0"], ["继续", "1"]]), "WAIT");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#d80381");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_note'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("蛋仔音符")
			.appendField(new Blockly.FieldDropdown([["随机播放", "0"], ["Do", "1"], ["Re", "2"], ["Mi", "3"], ["Fa", "4"], ["Sol", "5"], ["La", "6"], ["Ti", "7"], ["i-Do", "8"]]), "notename");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#d80381");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_speak'] = {
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("蛋仔音效")
			.appendField(new Blockly.FieldDropdown([["随机播放", "0"], ["睡觉", "12"], ["biubiubiu", "13"], ["啊呀", "14"], ["吧唧嘴", "15"], ["哔哔哔", "16"], ["打哈欠", "17"], ["抖嘴唇", "18"], ["难受", "19"], ["亲亲", "20"], ["哇塞", "21"], ["咻咻咻", "22"]]), "speakCon")
			.appendField(new Blockly.FieldDropdown([["等待", "0"], ["继续", "1"]]), "wait");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#d80381");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_secret'] = {
	init: function() {
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_CENTRE)
		  .appendField("\"蛋仔\"的小秘密")
		  .appendField(new Blockly.FieldDropdown([["随机","0"], ["兴趣爱好","31"], ["超能力","32"], ["梦想","33"], ["上山打老虎","34"], ["特长","35"], ["喜欢的人","36"], ["喜欢的食物","37"], ["喜欢的事","38"], ["星座","39"], ["自我介绍", "40"]]), "secrets")
		  .appendField(new Blockly.FieldDropdown([["等待","0"], ["继续","1"]]), "wait");
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour("#d80381");
	  this.setTooltip("");
	  this.setHelpUrl("");
	}
};
  
Blockly.Blocks["blockly_plus"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("数字").appendField(new Blockly.FieldNumber(1), "NUM1").appendField("+").appendField(new Blockly.FieldNumber(2), "NUM2").appendField(new Blockly.FieldDropdown([["=", "=="], ["≠", "!="], [">", ">"], ["<", "<"]]), "OPERATOR").appendField(new Blockly.FieldNumber(0), "NUM3");
		this.setOutput(true, "IF");
		this.setColour("#01bee6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_sub"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("数字").appendField(new Blockly.FieldNumber(1), "NUM1").appendField("-").appendField(new Blockly.FieldNumber(2), "NUM2").appendField(new Blockly.FieldDropdown([["=", "=="], ["≠", "!="], [">", ">"], ["<", "<"]]), "OPERATOR").appendField(new Blockly.FieldNumber(0), "NUM3");
		this.setOutput(true, "IF");
		this.setColour("#01bee6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_mul"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("数字").appendField(new Blockly.FieldNumber(1), "NUM1").appendField("×").appendField(new Blockly.FieldNumber(2), "NUM2").appendField(new Blockly.FieldDropdown([["=", "=="], ["≠", "!="], [">", ">"], ["<", "<"]]), "OPERATOR").appendField(new Blockly.FieldNumber(0), "NUM3");
		this.setOutput(true, "IF");
		this.setColour("#01bee6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_div"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("数字").appendField(new Blockly.FieldNumber(1), "NUM1").appendField("÷").appendField(new Blockly.FieldNumber(2), "NUM2").appendField(new Blockly.FieldDropdown([["=", "=="], ["≠", "!="], [">", ">"], ["<", "<"]]), "OPERATOR").appendField(new Blockly.FieldNumber(0), "NUM3");
		this.setOutput(true, "IF");
		this.setColour("#01bee6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_tracking"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("\"蛋仔\"进入巡线模式").appendField(new Blockly.FieldNumber(0, 6, 1000, 1), "TIME").appendField("秒");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#01c1b6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_obsessive"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("\"蛋仔\"进入避障模式").appendField(new Blockly.FieldNumber(0, 6, 1000, 1), "TIME").appendField("秒");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#01c1b6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks["blockly_follow"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("\"蛋仔\"进入跟随模式").appendField(new Blockly.FieldNumber(0, 6, 1000, 1), "TIME").appendField("秒");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#01c1b6");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks['blockly_btmsensor'] = {
	init: function () {
		this.appendDummyInput()
			.appendField("当\"蛋仔\"被放置在地面");
		this.appendStatementInput("onground")
			.setCheck(null)
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("执行");
		this.appendDummyInput()
			.appendField("当\"蛋仔\"被拿起");
		this.appendStatementInput("onhand")
			.setCheck(null)
			.setAlign(Blockly.ALIGN_CENTRE)
			.appendField("执行");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#01c1b6");
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_eyesensor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("当\"蛋仔\"侦测到前方")
        .appendField(new Blockly.FieldDropdown([["近","litDistance"], ["中","midDistance"], ["远","farDistance"]]), "DISTANCE")
        .appendField("有障碍物时");
    this.appendStatementInput("EYESENSOR")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("执行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#01c1b6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks["blockly_controls_for"] = {
	init: function () {
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("数字").appendField(new Blockly.FieldDropdown([["i", "i"], ["j", "j"], ["k", "k"]]), "var");
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("从").appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "FROM");
		this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField("到").appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]]), "TO");
		this.appendDummyInput().appendField("间隔").appendField(new Blockly.FieldDropdown([["1", "++"]]), "BY");
		this.appendStatementInput("DO").setCheck(null).setAlign(Blockly.ALIGN_CENTRE).appendField("执行");
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour("#008c97");
		this.setTooltip("");
		this.setHelpUrl("")
	}
};
Blockly.Blocks['blockly_math_plus'] = {
  init: function() {
    this.appendValueInput("value_1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("加");
    this.appendValueInput("value_2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["=","=="], ["≠","!=="], [">",">"], ["<","<"]]), "operator");
    this.appendValueInput("result")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setOutput(true, ["IF", "logic"]);
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_math_sub'] = {
  init: function() {
    this.appendValueInput("value_1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("减");
    this.appendValueInput("value_2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["=","=="], ["≠","!=="], [">",">"], ["<","<"]]), "operator");
    this.appendValueInput("result")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setOutput(true, ["IF", "logic"]);
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_math_mul'] = {
  init: function() {
    this.appendValueInput("value_1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("乘");
    this.appendValueInput("value_2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["=","=="], ["≠","!=="], [">",">"], ["<","<"]]), "operator");
    this.appendValueInput("result")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setOutput(true, ["IF", "logic"]);
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_math_div'] = {
  init: function() {
    this.appendValueInput("value_1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("除");
    this.appendValueInput("value_2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldDropdown([["=","=="], ["≠","!=="], [">",">"], ["<","<"]]), "operator");
    this.appendValueInput("result")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setOutput(true, ["IF", "logic"]);
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_isoddevenprime'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("正整数");
    this.appendValueInput("number")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("是")
        .appendField(new Blockly.FieldDropdown([["偶数","even"], ["奇数","odd"], ["质数","prime"]]), "oddevenprime");
    this.setInputsInline(true);
    this.setOutput(true, ["IF", "logic"]);
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_logic_or'] = {
  init: function() {
    this.appendValueInput("first")
        .setCheck("logic")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("或");
    this.appendValueInput("second")
        .setCheck("logic")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setOutput(true, "IF");
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['blockly_logic_and'] = {
	init: function() {
	  this.appendValueInput("first")
		  .setCheck("logic")
		  .setAlign(Blockly.ALIGN_CENTRE);
	  this.appendDummyInput()
		  .setAlign(Blockly.ALIGN_CENTRE)
		  .appendField("且");
	  this.appendValueInput("second")
		  .setCheck("logic")
		  .setAlign(Blockly.ALIGN_CENTRE);
	  this.setInputsInline(true);
	  this.setOutput(true, "IF");
	  this.setColour("#01bee6");
   	  this.setTooltip("");
      this.setHelpUrl("");
	}
};
Blockly.Blocks['blockly_number'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldNumber(0, -100, 1000, 1), "number");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour("#01bee6");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.FieldColour.COLOURS = ["#ffffff", "#ff0000", "#ffa500", "#ffff00", "#00ff00", "#007fff", "#0000ff", "#8b00ff"];
Blockly.FieldColour.COLUMNS = 4;
