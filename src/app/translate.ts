/**
 * Created by tate on 25/09/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Translate {
  public isZh: boolean = navigator.language.indexOf('zh') !== -1;
  lanConfig: any = this.isZh ? {
    'qar': '安全事件',
    'noData': '暂无QAR数据',
    'bottom': '已到底部啦~',
    'networkErr': '网络不给力',
    'timeout': '请求超时'
  } : {
    'qar': 'QAR',
    'noData': 'No QAR Data',
    'bottom': 'No more data~',
    'networkErr': 'Network anomaly',
    'timeout': 'time out'
  };
}
