import languageConfig from "../../assets/language.json";

const state = {
  order: "",
  userBlocks: "",
  BleConnectStatus: false,
  curLevel: "",
  verifyResult: "",
  levelconfig: {
    "update": false,
    "version": "2.0.1",
    "level_1": { "status": "unlock", "complete": false, "guideView": false },
    "level_2": { "status": "lock", "complete": false, "guideView": false },
    "level_3": { "status": "lock", "complete": false, "guideView": false },
    "level_4": { "status": "lock", "complete": false, "guideView": false },
    "level_5": { "status": "lock", "complete": false, "guideView": false },
    "level_6": { "status": "lock", "complete": false, "guideView": false }
  },
  language: ""
}

const cmdtypeconfig = {
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

const getters = {
  getlevelconfig(state) {
    if (window.localStorage.getItem("AIeggy_levelStatus") !== null) {
      var localLevel = JSON.parse(window.localStorage.getItem("AIeggy_levelStatus"));
      if (localLevel.version !== "2.0.1") {
        //localstorage没有更新,将新版的levelconfig存起来
        window.localStorage.setItem("AIeggy_levelStatus", JSON.stringify(state.levelconfig));
      } else if (localLevel.version == "2.0.1") {
        state.levelconfig = JSON.parse(window.localStorage.getItem("AIeggy_levelStatus"));
      }
    } else {
      //localstorage中没有levelconfig,将原始levelconfig存起来
      window.localStorage.setItem("AIeggy_levelStatus", JSON.stringify(state.levelconfig));
    }
    return state.levelconfig;
  },
  getUserBlocks(state) {
    return state.userBlocks;
  },
  getOrder(state) {
    return state.order;
  },
  getBleConnectStatus(state) {
    return state.BleConnectStatus;
  },
  getCurLevel(state) {
    return state.curLevel;
  },
  getLanguage(state) {
    if (window.localStorage.getItem("language")) state.language = window.localStorage.getItem("language");
    else state.language = "English";
    return state.language;
  }
}


/*************
 * 
 * 
 * 
 * 查询电量
 * 
 * 
 * 
 ***************/

//开启通知接收设备返回值
const startnotify = function (service_uuid, characteristic_uuid) {
  ble.startNotification(window.localStorage.getItem("Ble_device_id"), service_uuid, characteristic_uuid, function (Data) {
    var energy = String.fromCharCode.apply(null, new Uint8Array(Data));
    window.localStorage.setItem("AIeggy_energy", energy);
  }, function (reason) {
    
  })
};
const powerbuffer = function (head, cmdtype, data1, data2, end) {
  var buffer = new ArrayBuffer(5);
  var dataView = new DataView(buffer);
  dataView.setInt8(0, head);
  dataView.setInt8(1, cmdtype);
  dataView.setInt8(2, data1);
  dataView.setInt8(3, data2);
  dataView.setInt8(4, end);
  return buffer;
};
const powersend = function (dataArr) {
  var order = powerbuffer(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr[4]);
  var service_uuid, characteristic_uuid, rxcharacteristic_uuid;
  var device_id = window.localStorage.getItem("Ble_device_id");
  if (cordova.platformId.toLowerCase() == "android") {
    service_uuid = "0000ae00-0000-1000-8000-00805f9b34fb";
    characteristic_uuid = "0000ae01-0000-1000-8000-00805f9b34fb";
    rxcharacteristic_uuid = "0000ae02-0000-1000-8000-00805f9b34fb";
  } else if (cordova.platformId.toLowerCase() == "ios") {
    service_uuid = "ae00";
    characteristic_uuid = "ae01";
    rxcharacteristic_uuid = "ae02";
  };
  //当cmdtype为4时才开启监听
  try {
    if (dataArr[1] == 4) startnotify(service_uuid, rxcharacteristic_uuid);
    ble.writeWithoutResponse(
      device_id, service_uuid, characteristic_uuid, order, function () {
        
      }, function () {
      }
    )
  } catch (err) {
    console.log(err)
  }
};
const queryPower = function () {
  try {
    powersend([60, 4, 0, 0, 62]);
    setInterval(function () {
      powersend([60, 4, 0, 0, 62]);
    }, 10000)
  } catch (err) {
    console.log(err)
  }
}
document.addEventListener("deviceready", function () {
  queryPower();
})
/*************
 * 
 * 
 *查询电量结束
 * 
 * 
 ***************/

const Tobuffer = function (head, cmdtype, cmdindex, data1, data2, totalnum, end) {
  var buffer = new ArrayBuffer(14);
  var dataView = new DataView(buffer);
  dataView.setInt8(0, head);
  dataView.setInt8(1, cmdtype);
  dataView.setInt16(2, cmdindex);
  dataView.setInt32(4, data1);
  dataView.setInt32(8, data2);
  dataView.setInt8(12, totalnum);
  dataView.setInt8(13, end);
  return buffer;
}

const initData = function (dataArr) {
  var Data = [];
  var Dataitem;
  var cmdtype;
  for (var i = 0; i < dataArr.length; i++) {
    cmdtype = dataArr[i].Data.cmdtype;
    if (cmdtype == cmdtypeconfig.front || cmdtype == cmdtypeconfig.back || cmdtype == cmdtypeconfig.turnleft || cmdtype == cmdtypeconfig.turnright || cmdtype == cmdtypeconfig.turnround) {
      Dataitem = Tobuffer(35, cmdtype, dataArr[i].Data.index, dataArr[i].Data.speed, dataArr[i].Data.time, dataArr[i].Data.length, 36);
    }
    if (cmdtype == cmdtypeconfig.rgb || cmdtype == cmdtypeconfig.music) {
      Dataitem = Tobuffer(35, cmdtype, dataArr[i].Data.index, dataArr[i].Data.num, 0, dataArr[i].Data.length, 36);
    }
    if (cmdtype == cmdtypeconfig.linefront || cmdtype == cmdtypeconfig.lineround || cmdtype == cmdtypeconfig.lineleft || cmdtype == cmdtypeconfig.lineright) {
      Dataitem = Tobuffer(35, cmdtype, dataArr[i].Data.index, 0, dataArr[i].Data.time, dataArr[i].Data.length, 36);
    }
    if (cmdtype == cmdtypeconfig.barrierhead || cmdtype == cmdtypeconfig.barrierend) {
      Dataitem = Tobuffer(35, cmdtype, dataArr[i].Data.index, 0, 0, dataArr[i].Data.length, 36)
    }
    Data.push(Dataitem);
  }
  return Data;
}

const send = function (dataArr) {
  var DataArr = initData(dataArr);
  var service_uuid, characteristic_uuid, rxcharacteristic_uuid;
  var device_id = window.localStorage.getItem("Ble_device_id");
  if (cordova.platformId.toLowerCase() == "android") {
    service_uuid = "0000ae00-0000-1000-8000-00805f9b34fb";
    characteristic_uuid = "0000ae01-0000-1000-8000-00805f9b34fb";
    rxcharacteristic_uuid = "0000ae02-0000-1000-8000-00805f9b34fb";
  } else if (cordova.platformId.toLowerCase() == "ios") {
    service_uuid = "ae00";
    characteristic_uuid = "ae01";
    rxcharacteristic_uuid = "ae02";
  }
  try {
    for (var i = 0; i < DataArr.length; i++) {
      ble.writeWithoutResponse(
        device_id, service_uuid, characteristic_uuid, DataArr[i], function () {
          // window.plugins.toast.showLongCenter("send successful");
          window.plugins.toast.showLongCenter(languageConfig[getters.getLanguage(state)]["send_successfully"]);
        }, function (reason) {
          // window.plugins.toast.showLongCenter("send failed");
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
}

const mutations = {
  changeOrder(state, newOrder) {
    for (var i = 0; i < newOrder.length; i++) {
      newOrder[i].Data.index = i;
      newOrder[i].Data.length = newOrder.length;
    }
    state.order = newOrder;
    if (state.order.length > 0) {
      if (state.curLevel !== "") {
        return;
      }
      send(state.order);
    }
  },
  VerifyResult(state, string) {
    state.verifyResult = string;
    if (state.verifyResult == "success") {
      send(state.order);
    }
  }
}

const actions = {
  invokeOrder(context, newOrder) {
    context.commit("changeOrder", newOrder);
  },
  invokeBlocks(context, blocks) {
    state.userBlocks = blocks;
  },
  invokeBleConnectStatus(context, booleans) {
    state.BleConnectStatus = booleans;
  },
  invokeCurLevel(context, string) {
    state.curLevel = string;
  },
  invokeLanguage(context, curLanguage) {
    state.language = curLanguage;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}