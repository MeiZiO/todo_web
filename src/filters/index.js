/**
 * Created by Zhang Haijun on 2017/8/30.
 */
// 截取小数位数
export function numberFilter (value, digit) {
  return value.toFixed(digit);
}
export function hisLogStatus (log) {
  const status = {
    0: '已完成',
    1: '已取消',
    2: '用户已终止',
    3: '用户错过',
  };
  return status[log] || '未知';
}

export function taskStatusFlilter (value, type) {
  let statusMap = {
    CREATED: '新创建',
    WAITTING: '等待中',
    RUNNING: '运行中',
    SUSPENDED: '已挂起',
    APPROVING: '审批中',
    REFUSED: '未批准',
    APPROVED: ' 已批准',
    UNAPPLY: '未申请',
    END: '已结束'
  };
  let colorMap = {
    CREATED: 'normal',
    WAITTING: 'primary',
    RUNNING: 'success',
    SUSPENDED: 'warning',
    APPROVING: 'primary',
    REFUSED: 'danger',
    APPROVED: 'success',
    UNAPPLY: 'normal',
    END: 'danger'
  };
  return type == 'color' ? colorMap[value] : statusMap[value];
}

export function vmStatusFilter (status) {
  const statusMap = {
    RUNNING: '运行中',
  };
  return statusMap[status] || '未知';
}

