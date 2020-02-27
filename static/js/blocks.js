var baseIcon = {
  front: "./static/img/blockIcon/forward.png",
  back: "./static/img/blockIcon/back.png",
  turnleft: "./static/img/blockIcon/turnleft.png",
  turnright: "./static/img/blockIcon/turnright.png",
  turnround: "./static/img/blockIcon/turnround.png",
  sport_random: "./static/img/blockIcon/sportrandom.png",
  cat_sound: "./static/img/blockIcon/cat.png",
  dog_sound: "./static/img/blockIcon/dog.png",
  duck_sound: "./static/img/blockIcon/duck.png",
  horse_sound: "./static/img/blockIcon/horse.png",
  pig_sound: "./static/img/blockIcon/pig.png",
  bird_sound: "./static/img/blockIcon/bird.png",
  boring_sound: "./static/img/blockIcon/boring.png",
  lalala_sound: "./static/img/blockIcon/lalala.png",
  miss_sound: "./static/img/blockIcon/kiss.png",
  shakelip_sound: "./static/img/blockIcon/shakelip.png",
  sleep_sound: "./static/img/blockIcon/sleep.png",
  sneeze_sound: "./static/img/blockIcon/sneeze.png",
  muscle_sound: "./static/img/blockIcon/muscle.png",
  soundrandom: "./static/img/blockIcon/soundrandom.png",
  lightred: "./static/img/blockIcon/lightred.png",
  lightorange: "./static/img/blockIcon/lightorange.png",
  lightyellow: "./static/img/blockIcon/lightyellow.png",
  lightgreen: "./static/img/blockIcon/lightgreen.png",
  lightcyan: "./static/img/blockIcon/lightcyan.png",
  lightblue: "./static/img/blockIcon/lightblue.png",
  lightpurple: "./static/img/blockIcon/lightpurple.png",
  lightrandom: "./static/img/blockIcon/lightrandom.png",
  lineround: "./static/img/blockIcon/lineround.png",
  linefront: "./static/img/blockIcon/linefront.png",
  lineRight: "./static/img/blockIcon/lineRight.png",
  lineLeft: "./static/img/blockIcon/lineLeft.png",
  flagGreen: "./static/img/blockIcon/flagGreen.png",
  step1: "./static/img/blockIcon/step1.png",
  step2: "./static/img/blockIcon/step2.png",
  step3: "./static/img/blockIcon/step3.png",
  barrier: "./static/img/blockIcon/barrier.png",
  loop: "./static/img/blockIcon/loop.png",
  loop1: "./static/img/blockIcon/loop1.png",
  loop2: "./static/img/blockIcon/loop2.png",
  loop3: "./static/img/blockIcon/loop3.png"
};

var cmdtype = {
  "front": 1,
  "back": 2,
  "turnleft": 3,
  "turnright": 4,
  "delay": 5,
  "rgb": 6,
  "music": 7,
  "turnround": 8,
  // "turnright360": 9,
  "linefront": 10,
  "lineround": 11,
  "lineleft": 12,
  "lineright": 13,
  "barrierhead": 14,
  "barrierend": 15
}

var musicindex = {
  "cat": 9,
  "dog": 10,
  "duck": 11,
  "horse": 12,
  "pig": 13,
  "bird": 14,
  "boring": 15,
  "lalala": 16,
  "miss": 17,
  "shakelip": 18,
  "sleep": 19,
  "sneeze": 20,
  "muscle": 21
}


/******************iocnBlocks********************/
/**************************开始模块***************************/
Blockly.Blocks['iconblockly_hat'] = {
  init: function() {
    // this.setOnChange(function (event) {
    //   console.log(event)
    // });
    Blockly.BlockSvg.START_HAT = true;
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(baseIcon.flagGreen, 80, 40, "*"), 'flagGreen');
        this.setPreviousStatement(false, null);
        this.setNextStatement(true, null);
    this.setColour("#37851D");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_hat'] = function(block) {
  return ''
};



/******************运动模块********************/
Blockly.Blocks['iconblockly_front'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(baseIcon.front, 80, 80, "*"))
        .appendField(new Blockly.FieldDropdown([[{"src":baseIcon.step1,"width":25,"height":25,"alt":"*"},"1"], [{"src":baseIcon.step2,"width":25,"height":25,"alt":"*"},"2"], [{"src":baseIcon.step3,"width":25,"height":25,"alt":"*"},"3"]]), "step");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0f61ad");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_front'] = function(block) {
  var step = block.getFieldValue('step');
  var standard_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_front", "attr": "front", "Data": { "cmdtype":' +  cmdtype.front + ', "step": 1, "speed": 40, "time": 2000, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var codes = "";
  for (var i = 0; i < step; i++) {
    codes += standard_code;
  }
  return codes;
};


/*---------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_back'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.back, 80, 80, "*"), 'back')
      .appendField(new Blockly.FieldDropdown([
        [{ "src": baseIcon.step1, "width": 25, "height": 25, "alt": "后退一步" }, '1'],
        [{ "src": baseIcon.step2, "width": 25, "height": 25, "alt": "后退两步" }, '2'],
        [{ "src": baseIcon.step3, "width": 25, "height": 25, "alt": "后退五步" }, '3']
      ]), 'backitems');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0f61ad");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_back'] = function(block) {
  var dropdown_items = block.getFieldValue('backitems');
  var standard_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_back", "attr": "back", "Data": { "cmdtype":' + cmdtype.back + ', "step": 1, "speed": 40, "time": 2000, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var codes = "";
  for (var i = 0; i < dropdown_items; i++) {
    codes += standard_code;
  }
  return codes;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_turnleft'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.turnleft, 115, 80, "*"), 'turnleft')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0f61ad");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_turnleft'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_turnleft", "attr": "turnleft", "Data": { "cmdtype":' + cmdtype.turnleft + ', "speed": 30, "time": 975, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_turnright'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.turnright, 115, 80, "*"), 'turnright')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0f61ad");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_turnright'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_turnright", "attr": "turnright", "Data": { "cmdtype":' + cmdtype.turnright + ', "speed": 30, "time": 975, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_turnround'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.turnround, 115, 80, "*"), 'turnround')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0f61ad");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_turnround'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_turnround", "attr": "turnround", "Data": { "cmdtype":' + cmdtype.turnround + ', "speed": 30, "time": 1950, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/******************声音模块********************/
Blockly.Blocks['iconblockly_catsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.cat_sound, 115, 80, "*"), 'catsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_catsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_catsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.cat + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_dogsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.dog_sound, 115, 80, "*"), 'dogsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_dogsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_dogsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.dog + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_ducksound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.duck_sound, 115, 80, "*"), 'ducksound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_ducksound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_ducksound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.duck + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_horsesound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.horse_sound, 115, 80, "*"), 'horsesound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_horsesound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_horsesound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.horse + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_pigsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.pig_sound, 115, 80, "*"), 'pigsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_pigsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_pigsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.pig + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_birdsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.bird_sound, 115, 80, "*"), 'birdsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_birdsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_birdsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.bird + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
// Blockly.Blocks['iconblockly_boringsound'] = {
//   init: function () {
//     var _this = this;
//     this.appendDummyInput()
//       .setAlign(Blockly.ALIGN_CENTRE)
//       .appendField(new Blockly.FieldImage(baseIcon.boring_sound, 115, 80, "*"), 'boringsound')
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour("#59b43c");
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };
// Blockly.JavaScript['iconblockly_boringsound'] = function(block) {
//   var code = '{ "type": "aieggy", "mode": "music", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.boring + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
//   return code;
// };


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lalalasound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lalala_sound, 115, 80, "*"), 'lalalasound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_lalalasound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_lalalasound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.lalala + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_misssound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.miss_sound, 115, 80, "*"), 'misssound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_misssound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_misssound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.miss + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_shakelipsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.shakelip_sound, 115, 80, "*"), 'shakelipsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_shakelipsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_shakelipsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.shakelip + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_sleepsound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.sleep_sound, 115, 80, "*"), 'sleepsound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_sleepsound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_sleepsound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.sleep + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_sneezesound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.sneeze_sound, 115, 80, "*"), 'sneezesound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_sneezesound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_sneezesound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.sneeze + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_musclesound'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.muscle_sound, 115, 80, "*"), 'musclesound')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59b43c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_musclesound'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_musclesound", "attr": "animal", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + musicindex.muscle + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};



/**************************灯光模块***************************/
Blockly.Blocks['iconblockly_lightred'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightred, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightred'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightred", "attr": "red", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 1, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightorange'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightorange, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightorange'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightorange", "attr": "orange", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 2, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightyellow'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightyellow, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightyellow'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightyellow", "attr": "yellow", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 3, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightgreen'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightgreen, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightgreen'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightgreen", "attr": "green", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 4, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightcyan'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightcyan, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightcyan'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightcyan", "attr": "cyan", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 5, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightblue'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightblue, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightblue'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightblue", "attr": "blue", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 6, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lightpurple'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightpurple, 115, 80, "*"), 'light')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#f5bf39");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['iconblockly_lightpurple'] = function(block) {
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightpurple", "attr": "purple", "Data": { "cmdtype":' + cmdtype.rgb + ', "num": 7, "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};



/**************************巡线模块***************************/
Blockly.Blocks['iconblockly_linefront'] = {
  init: function () {
    var _this = this;
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.linefront, 115, 80, "*"), 'line')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#003040");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_linefront'] = function(block) {
  var line_code = '{ "type": "line", "mode": "forward", "blockName": "iconblockly_linefront", "angle": 0, "Timestamp":' +  new Date().getTime() + '}';
  var aieggy_code = '{ "type": "aieggy", "mode": "line", "blockName": "iconblockly_linefront", "attr": "linefront", "Data": { "cmdtype":'+ cmdtype.linefront + ', "time": 100, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var code = line_code + aieggy_code;
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lineLeft'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lineLeft, 115, 80, "*"), 'line')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#003040");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_lineLeft'] = function(block) {
  var line_code = '{ "type": "line", "mode": "rotate", "blockName": "iconblockly_lineLeft", "angle": "left", "Timestamp":' +  new Date().getTime() + '}';
  var aieggy_code = '{ "type": "aieggy", "mode": "line", "blockName": "iconblockly_lineLeft", "attr": "lineleft", "Data": { "cmdtype":' + cmdtype.lineleft + ', "time": 100, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var code = line_code + aieggy_code;
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lineRight'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lineRight, 115, 80, "*"), 'line')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#003040");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_lineRight'] = function(block) {
  var line_code = '{ "type": "line", "mode": "rotate", "blockName": "iconblockly_lineRight", "angle": "right", "Timestamp":' +  new Date().getTime() + '}';
  var aieggy_code = '{ "type": "aieggy", "mode": "line", "blockName": "iconblockly_lineRight", "attr": "lineright", "Data": { "cmdtype":' + cmdtype.lineright + ', "time": 100, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var code = line_code + aieggy_code;
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_lineround'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lineround, 115, 80, "*"), 'line')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#003040");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_lineround'] = function(block) {
  var line_code = '{ "type": "line", "mode": "rotate", "blockName": "iconblockly_lineround", "angle": "back", "Timestamp":' +  new Date().getTime() + '}';
  var aieggy_code = '{ "type": "aieggy", "mode": "line", "blockName": "iconblockly_lineround", "attr": "linefront", "Data": { "cmdtype":' + cmdtype.lineround + ', "time": 100, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var code = line_code + aieggy_code;
  return code;
};



/**************************逻辑模块***************************/
Blockly.Blocks['iconblockly_lightrandom'] = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.lightrandom, 115, 80, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#db3d9c");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_lightrandom'] = function(block) {
  var randomNum = Math.floor(Math.random() * 8);
  randomNum == 0 ? randomNum = 1 : randomNum = randomNum;
  var code = '{ "type": "aieggy", "mode": "light", "blockName": "iconblockly_lightrandom", "attr": "", "Data": { "cmdtype":' + cmdtype.rgb + ', "num":' + randomNum + ', "time": 0, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_soundrandom'] = {
  init: function() {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage(baseIcon.soundrandom, 115, 80, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#db3d9c");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_soundrandom'] = function(block) {
  var randomNum = Math.floor(Math.random() * 22);
  randomNum <= 9 ? randomNum = 9 : randomNum = randomNum;
  randomNum == 15 ? randomNum = 16 : randomNum = randomNum;
  var code = '{ "type": "aieggy", "mode": "music", "blockName": "iconblockly_soundrandom", "attr": "soundrandom", "Data": { "cmdtype":' + cmdtype.music + ', "num":' + randomNum + ', "time": "", "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_sportrandom'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(baseIcon.sport_random, 115, 80, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#db3d9c");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_sportrandom'] = function(block) {
  var front_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_sportrandom", "attr": "front", "Data": { "cmdtype":' +  cmdtype.front + ', "step": 1, "speed": 40, "time": 2000, "index": "", "length": "" }, "Timestamp":' +  new Date().getTime() + '}';
  var back_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_sportrandom", "attr": "back", "Data": { "cmdtype":' + cmdtype.back + ', "step": 1, "speed": 40, "time": 2000, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var left_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_sportrandom", "attr": "turnleft", "Data": { "cmdtype":' + cmdtype.turnleft + ', "speed": 30, "time": 975, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var right_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_sportrandom", "attr": "turnright", "Data": { "cmdtype":' + cmdtype.turnright + ', "speed": 30, "time": 975, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var round_code = '{ "type": "aieggy", "mode": "exercise", "blockName": "iconblockly_sportrandom", "attr": "turnround", "Data": { "cmdtype":' + cmdtype.turnround + ', "speed": 30, "time": 1950, "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var randomNum = Math.floor(Math.random() * 5);
  var codes = [front_code, back_code, left_code, right_code, round_code]
  return codes[randomNum];
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_loop'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(baseIcon.loop, 80, 80, "*"))
        .appendField(new Blockly.FieldDropdown([[{"src": baseIcon.loop1,"width":25,"height":25,"alt":"*"},"1"], [{"src":baseIcon.loop2,"width":25,"height":25,"alt":"*"},"2"], [{"src":baseIcon.loop3,"width":25,"height":25,"alt":"*"},"3"]]), "step");
    this.appendStatementInput("loopcontent")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#db3d9c");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_loop'] = function(block) {
  var dropdown_step = block.getFieldValue('step');
  var statements_loopcontent = Blockly.JavaScript.statementToCode(block, 'loopcontent');
  var code = "";
  for (var i = 0; i < dropdown_step; i++) {
    code += statements_loopcontent;
  }
  return code;
};


/*----------------------------------------------------------------------------------------------------------------*/
Blockly.Blocks['iconblockly_barrier'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(new Blockly.FieldImage(baseIcon.barrier, 115, 80, "*"));
    this.appendStatementInput("content")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#db3d9c");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['iconblockly_barrier'] = function(block) {
  var dropdown_step = block.getFieldValue('step');
  var statements_content = Blockly.JavaScript.statementToCode(block, 'content');
  var barrierhead_code = '{ "type": "aieggy", "mode": "barrier", "blockName": "iconblockly_barrier", "attr": "logic", "Data": { "cmdtype":' + cmdtype.barrierhead + ', "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var barrierend_code = '{ "type": "aieggy", "mode": "barrier", "blockName": "iconblockly_barrier", "attr": "logic", "Data": { "cmdtype":' + cmdtype.barrierend + ', "index": "", "length": "" }, "Timestamp":' + new Date().getTime() + '}';
  var codes = barrierhead_code + statements_content + barrierend_code;
  if (statements_content) {
    return codes;
  } else {
    return "";
  }
};