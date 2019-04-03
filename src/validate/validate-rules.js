/**
 * Created by Zhang Haijun on 2018/1/25.
 */
const trigger = null;
export default {
  vpcType: {pattern: /^vpc+-[a-zA-Z0-9]*$/, message: '请输入“vpc-xxxxxxxx”格式的私有网络ID', trigger: trigger},
  required: {required: true, message: '请输入内容', trigger: trigger},
  number: {type: 'number', trigger: trigger, message: '请输入数字'},
  email: {type: 'email', trigger: trigger, message: '请输入正确的邮箱'},
  name: {pattern: /^[a-zA-Z0-9-_.]*$/, message: '仅支持数字、字母、下划线、中划线、点', trigger: trigger},
  blankName: {pattern: /^[a-zA-Z 0-9-_.]+$/, message: '不可输入中文', trigger: trigger},
  spec: {pattern: /^[0-9]+\/[0-9]+\/[0-9]+$/, message: '请输入长/宽/高，中间以斜杠隔开', trigger: trigger},
  // 正整数
  positiveInteger: {
    validator: (rule, value, callback) => {
      if (/^[1-9][0-9]*$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正整数'));
      }
    },
    trigger: trigger
  },
  password: {
    validator: (rule, value, callback) => {
      let reg = /^[\x21-\x7ea-zA-Z0-9_]{1,18}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的密码格式'));
      }
    },
    trigger: trigger
  },
  // 手机
  mobile: {
    validator: (rule, value, callback) => {
      let reg = /^(13[0123456789]|14[57]|15[012356789]|18[0123456789]|17[067])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的手机号'));
      }
    },
    trigger: trigger
  },
  // 座机
  phone: {
    validator: (rule, value, callback) => {
      let reg = /^0\d{2,3}-?\d{7,8}|4\d{2,3}-?\d{7,8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的座机号'));
      }
    },
    trigger: trigger
  },
  // 手机或者座机
  mobileOrPhone: {
    validator: (rule, value, callback) => {
      let reg = /(^1[3|4|5|7|8]\d{9}$)|(^0\d{2,3}-?\d{7,8}$)/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的座机号或者手机号'));
      }
    },
    trigger: trigger
  },
  // ip地址
  ip: {
    validator: (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (reg.test(value) || !value) {
        callback();
      } else {
        callback(new Error('请输入正确的IP地址'));
      }
    },
    trigger: trigger
  },
  mac: {
    validator: (rule, value, callback) => {
      let reg = /^[A-F0-9]{2}(-[A-F0-9]{2}){5}$|^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的Mac地址'));
      }
    },
    trigger: trigger
  },
  // 端口号
  port: {
    validator: (rule, value, callback) => {
      let reg = /^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      if (reg.test(value) || !value) {
        callback();
      } else {
        callback(new Error('请输入正确的端口号'));
      }
    },
    trigger: trigger
  },
  // 英文
  english: {
    validator: (rule, value, callback) => {
      let reg = /^[a-zA-Z]+$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入英文'));
      }
    },
    trigger: trigger
  },
  // 中文
  chinese: {
    validator: (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]*$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入中文'));
      }
    },
    trigger: trigger
  },
  noChinese: {
    validator: (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9-_.]*$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('仅支持数字、字母、下划线、中划线、点'))
      }
    },
    trigger: trigger
  },
  hostName: {
    validator: (rule, value, callback) => {
      let pattern = '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,30}$';
      if (!value.match(pattern)) {
        callback(new Error('8-30字符,同时包含大写/小写字母，数字或特殊字符三项'));
      } else {
        callback();
      }
    },
    trigger: trigger
  },
  TcHostName: {
    validator: (rule, value, callback) => {
      let pattern = '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,16}$';
      if (!value.match(pattern)) {
        callback(new Error('8-16字符,同时包含大写/小写字母，数字或特殊字符三项'));
      } else {
        callback();
      }
    },
    trigger: trigger
  },
  muchDns: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        let i = '';
        let result = '';
        let c = ''
        for (i = 0; i < value.length; i++) {
          c = value.substr(i, 1)
          if (c == '\n') {
            result = result + '/'
          } else if (c != '\r') {
            result = result + c
          }
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
    },
    trigger: trigger
  },
  routerFilter: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        let i = '';
        let result = '';
        let c = ''
        for (i = 0; i < value.length; i++) {
          c = value.substr(i, 1)
          if (c == '\n') {
            result = result + '|'
          } else if (c != '\r') {
            result = result + c
          }
        }
        result = result.split('|')
        let reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))$/;
        result.forEach(function (item) {
          let list = item.split(',')
          let listOne = list[0].split('/')
          if (!reg.test(listOne[0])) {
            callback(new Error('请按照提示输入'))
          }
          if (parseInt(listOne[1]) < 0 || parseInt(listOne[1]) >= 32) {
            callback(new Error('请按照提示输入'))
          }
          if (!reg.test(list[1])) {
            callback(new Error('请按照提示输入'))
          }
        })
        callback()
      }
    },
    trigger: trigger
  },
  ipPool: {
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        let i, result = '', c, testList = []
        for (i = 0; i < value.length; i++) {
          c = value.substr(i, 1);
          if (c == '\n') {
            result = result + '/'
          } else if (c != '\r') {
            result = result + c
          }
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
    },
    trigger: trigger
  },
  specialNoChinese: {pattern: /^[\w%\-+._]{1,}$/, message: '不能输入中文和除.+=_空格外的其他特殊字符', trigger: trigger},
  // ipV6校验
  ipV6: {
    validator: (rule, value, callback) => {
      let reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
      if (reg.test(value)) {
        callback();
      } else if (value.split('/')) {
        let result = value.split('/');
        let ret1 = reg.test(result[0]);
        if (ret1 && (result[1]) && Number(result[1]) >= 0 && Number(result[1]) <= 128) return callback();
        else return callback(new Error('输入有误'));
      } else {
        callback(new Error('IP输入有误'));
      }
    },
    trigger: trigger
  },
  noOnlyNum: {
    validator: (rule, value, callback) => {
      let pattern = /^\d+$/g;
      if (value.match(pattern)) {
        callback(new Error('内容不能为纯数字'));
      } else {
        callback();
      }
    },
    trigger: trigger
  },
  headSlash: {pattern: /^\/.{0,}$/, message: '须以/开头', trigger: trigger},
  cidr: {pattern: /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/(\d{3}\d{2}|\d{1,2}\d|\d))?$/, message: '请输入192.168.1.1/24类型格式', trigger: trigger},
  vlanId: { validator: (rule, value, callback) => {
    if (/^[1-9][0-9]*$/.test(value) && parseInt(value) <= 4095 && parseInt(value) >= 1) {
      callback();
    } else if (value || value === 0) {
      callback(new Error('范围1-4095'));
    } else {
      callback();
    }
  },
  trigger: trigger},
  noChineseSpace: { validator: (rule, value, callback) => {
    if (/[\u4e00-\u9fa5\s]/.test(value)) {
      callback(new Error('输入的命令不能包含中文和空格'));
    } else {
      callback();
    }
  },
  trigger: trigger},
  // Int类型最大取值范围，配额输入值
  maxInt: { pattern: /^(?:[0-9]|[1-9]\d{1,8}|[1-3]\d{0}|21474836[0-3]\d|214748364[0-7])$/, message: '输入有误，范围是0-2147483647', trigger: trigger },
  nginxSet: { validator: (rule, value, callback) => {
    let pattern = new RegExp("[`!@#^&*()=|{}';',<>?！@#￥……&*（）——|{}【】‘；”“'。，、？]");
    if (pattern.test(value)) {
      callback(new Error('特殊字符仅支持/ \\ . ~:$'));
    } else {
      callback();
    }
  },
  trigger: trigger}
};
