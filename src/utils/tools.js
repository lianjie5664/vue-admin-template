import { Notification } from 'element-ui'
/**
 * @param {string} msg
 * @returns {Boolean}
 */
export function notice(title,msg,type) {
    Notification({
        title: title == 1?'成功': '失败',
        message: msg,
        type: type == 1?'success':'error'
    });
}