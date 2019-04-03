/* eslint-disable */
let ipCidr = (rule, value, callback) => {
  if (!value) callback()
  let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([0-9]|[1-2][0-9]|3[0-2]))?$/
  let reg1 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))?$/
  if (reg.test(value) || reg1.test(value)) {
    callback()
  } else {
    callback(new Error('IP输入有误'))
  }
}
let routerFilter = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    let i,result = "",c,testList = []
    for (i = 0; i < value.length; i++) {
        c = value.substr(i, 1)
        if (c == "\n")
            result = result + "|"
        else if (c != "\r")
            result = result + c
    }
    result = result.split('|')
    let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))$/;
    result.forEach(function (item) {
      let list = item.split(',')
      let listOne = list[0].split('/')
      if (!reg.test(listOne[0])) {
        callback(new Error('请按照提示输入'))
      }
      if (parseInt(listOne[1])<0 || parseInt(listOne[1]) >= 32) {
        callback(new Error('请按照提示输入'))
      }
      if (!reg.test(list[1])) {
        callback(new Error('请按照提示输入'))
      }
    })
    callback()
  }
}
let dns = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    let i,result = "",c,testList = []
    for (i = 0; i < value.length; i++) {
        c = value.substr(i, 1)
        if (c == "\n")
            result = result + "/"
        else if (c != "\r")
            result = result + c
    }
    result = result.split('/')
    let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))?$/;
    result.forEach(function (item) {
        if (!reg.test(item)) {
          callback(new Error('请按照提示输入'))
        }
    })
    callback()
  }
}
let ippool = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    let i,result = "", c, testList = []
    for (i = 0; i < value.length; i++) {
        c = value.substr(i, 1)
        if (c == "\n")
            result = result + "/"
        else if (c != "\r")
            result = result + c
    }
    result = result.split('/')
    result.forEach(function (item) {
        item.split('-').forEach(function (t) {
            testList.push(t)
        });
    });
    if (testList.length % 2 != 0) {
      callback(new Error('请按照提示输入'))
    }
    let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))?$/;
    testList.forEach(function (item) {
        let tet = reg.test(item);
        if (!tet) {
          callback(new Error('请按照提示输入'))
        }
    })
    callback()
  }
}
let ipV6 = (rule, value, callback) => {
  let reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/; ;

  if (reg.match(value)) {
    callback();
  } else if (value.split('/')) {
    let result = ipvalue.split('/');
    let ret1 = reg.test(result[0]);
    if (ret1 && (result[1]) && Number(result[1]) >= 0 && Number(result[1]) <= 128) return callback();
    else return callback(new Error('输入有误'));
  } else {
    callback(new Error('IP输入有误'));
  }
};
let mouthsround = (rule, value, callback) => {
  if (value >= 1) {
    callback();
  } else {
    callback(new Error('请输入正整数,最小为1'));
  }
};
let numbers = (rule, value, callback) => {
  if (parseInt(value) <= 4095 && parseInt(value) >= 0) {
    callback();
  } else {
    callback(new Error('范围(0-4095)'));
  }
};
let trunk = (rule, value, callback) => {
  if (value.split(',').length == 1) {

  } else {
    let list = value.split(',')
  }
};
let ip = (rule, value, callback) => {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('IP输入有误'));
  }
};

let number100 = (rule, value, callback) => {
  if (Number(value) >= 1 && Number(value) <= 100) {
    callback();
  } else {
    callback(new Error('最小为1，最大为100'));
  }
};
let number9999 = (rule, value, callback) => {
  if (Number(value) >= 1 && Number(value) <= 9999) {
    callback();
  } else {
    callback(new Error('最小为1，最大为9999'));
  }
};
let number10 = (rule, value, callback) => {
  if (Number(value) >= 1 && Number(value) <= 10) {
    callback();
  } else {
    callback(new Error('最小为1，最大为10'));
  }
};
let number = (rule, value, callback) => {
  if (Number(value) >= 1) {
    callback();
  } else {
    callback(new Error('最小为1'));
  }
};
let name = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9-_.]*$/;
  if (reg.test(value)) {
    console.log(reg.test(value))
    callback();
  } else {
    callback(new Error('仅支持数字、字母、下划线、中划线、点'));
  }
};
let port = (rule, value, callback) => {
  if (Number(value) >= 1 && Number(value) <= 65535) {
    callback();
  } else {
    callback(new Error('最小为1，最大为65535'));
  }
};
let remark = (rule, value, callback) => {
  if (value == '' || value == null || value.length <= 256) {
    callback();
  } else {
    callback(new Error('描述信息字节最大为256'));
  }
};
export function validateRules (formName, data, vue) {
  vue.$refs[formName].validate((valid) => {
    if (valid) {
      data()
    } else {
      return false
    }
  });
}
export function rules () {
  return {
	  defaultUser: [
      {required: true, message: '该字段为必填字段'},
      {validator: name}
	  ],
    name: [
      {validator: name},
      {required: true, message: '该字段为必填字段'}
    ],
    cpu: [
      {required: true, message: 'cpu不能为空'},
      {type: 'number', message: '该字段必须为数字值'}
    ],
    months: [
      {required: true, message: '月份不能为空'},
      {validator: mouthsround}
    ],
    monthss: [
      {validator: number9999},
      {required: true, message: '该字段不能为空'}
    ],
    memory: [
      {required: true, message: '内存不能为空'},
      {type: 'number', message: '该字段必须为数字值'}
    ],
    dnsName: [
      {validator: dns}
    ],
    ipPool: [
      {validator: ippool}
    ],
    hostRoute: [
      {validator: routerFilter}
    ],
    disk: [
      {required: true, message: '不能为空'},
    ],
    volumeId: [
      {required: true, message: '云硬盘不能为空'}
    ],
    newPasswd: [
      {required: true, message: '新密码不能为空'}
    ],
    oldPasswd: [
      {required: true, message: '原密码不能为空'}
    ],
    endPasswd: [
      {required: true, message: '确认密码不能为空'}
    ],
    vendorId: [
      {required: true, message: '该字段不能为空'}
    ],
    ruleIds: [
      {required: true, message: '规则不能为空'}
    ],
    ruleId: [
      {required: true, message: '规则不能为空'}
    ],
    projectId: [
      {required: true, message: '应用系统不能为空'}
    ],
    remark: [
      {validator: remark}
    ],
    osCategory: [
      {required: true, message: '系统类别不能为空'}
    ],
    osName: [
      {required: true, message: '系统名称不能为空'}
    ],
    osVersion: [
      {required: true, message: '系统版本不能为空'}
    ],
    yqflowId: [
      {required: true, message: '该字段不能为空'}
    ],
    osType: [
      {required: true, message: '镜像格式不能为空'}
    ],
    qgaInstalled: [
      {required: true, message: '该字段不能为空'}
    ],
    minDisk: [
      {type: 'number', message: '该字段必须为数字'}
    ],
    id: [
      {required: true, message: '该字段不能为空'}
    ],
    publicKey: [
      {required: true, message: '该字段不能为空'}
    ],
    protocol: [
      {required: true, message: '该字段不能为空'}
    ],
    direction: [
      {required: true, message: '该字段不能为空'}
    ],
    portMin: [
      {required: true, message: '端口不能为空'},
      {type: 'number', message: '端口只能为数字'}
    ],
    portMax: [
      {required: true, message: '端口不能为空'},
      {type: 'number', message: '端口只能为数字'}
    ],
    remoteIpPrefix: [
      {validator: ipCidr}
    ],
    size: [
      {required: true, message: '大小不能为空且只能为数字'}
    ],
    portId: [
      {required: true, message: '该字段为必填字段'}
    ],
    password: [
      {required: true, message: '密码不能为空'}
    ],
    confirmPassword: [
      {required: true, message: '确认密码不能为空'}
    ],
    newPassword: [
      {required: true, message: '密码不能为空'}
    ],
    endPassword: [
      {required: true, message: '确认密码不能为空'}
    ],
    hostId: [
      {required: true, message: '该字段不能为空'}
    ],
    imageId: [
      {required: true, message: '镜像不能为空'}
    ],
    flavorId: [
      {required: true, message: '配置实例不能为空'}
    ],
    rootSize: [
      {required: true, message: '根磁盘大小不能为空'},
      {type: 'number', message: '根磁盘只能为数字'}
    ],
    keypairName: [
      {required: true, message: '密钥不能为空'}
    ],
    groups: [
      {required: true, message: '安全组不能为空'}
    ],
    phyNetwork: [
      {required: true, message: '物理网络不能为空'}
    ],
    segmentationId: [
      {required: true, message: '段ID不能为空'}
    ],
    dhcpEnabled: [
      {required: true, message: 'DHCP不能为空'}
    ],
    cidr: [
      {validator: ipCidr},
      {required: true, message: '网络地址不能为空'}
    ],
    gateway: [],
    hostName: [],
    networkId: [],
    policyId: [
      {required: true, message: '策略不能为空'}
    ],
    routerIds: [

    ],
    action: [
      {required: true, message: '动作不能为空'}
    ],
    sourceIp: [
      {validator: ipCidr}
    ],
    destIp: [
      {validator: ipCidr}
    ],
    address: [
      {required: true, message: '平台地址不能为空'}
    ],
    sourcePort: [],
    destPort: [],
    port: [
      {required: true, message: '端口不能为空'}
    ],
    env: [
      {required: true, message: '所属环境不能为空'}
    ],
    portGroupNum: [
      {required: true, message: '分布式端口数不能为空'}
    ],
    vdcData: [
      {required: true, message: '数据中心不能为空'}
    ],
    clusterData: [

    ],
    hostIp: [
      {required: true, message: '主机IP不能为空'}
    ],
    username: [
      {required: true, message: '用户名不能为空'}
    ],
    hostData: [
      {required: true, message: '主机列表不能为空'}
    ],
    message: [
      {required: true, message: '消息模版不能为空'}
    ],
    remoteHost: [
      {required: true, message: '服务器不能为空'}
    ],
    remotePath: [
      {required: true, message: '文件夹不能为空'}
    ],
    VLANId: [
      {required: true, message: 'VLAN ID不能为空'},
      {validator: numbers}
    ],
    trunk: [
      {required: true, message: 'VLAN ID不能为空'}
      // {validator: trunk}
    ],
    portGroupName: [
      {required: true, message: '端口组名称不能为空'}
    ],
    months: [
      {validator: number100},
      {required: true, message: '该字段不能为空'}
    ],
    monthss: [
      {validator: number9999},
      {required: true, message: '该字段不能为空'}
    ],
    count: [
      {validator: number10},
      {required: true, message: '该字段不能为空'}
    ],
    vendorType: [
      {required: true, message: '平台类型不能为空'}
    ],
    diskType: [
      {required: true, message: '磁盘类型不能为空'}
    ],
    platform: [
      {required: true, message: '平台不能为空'}
    ],
    specId: [
      {required: true, message: '规格不能为空'}
    ],
    netLabel: [
      {required: true, message: '网络不能为空'}
    ],
    account: [
      {required: true, message: '该字段不能为空'}
    ],
  }
}
