import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslatePipe } from './translate.pipe';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

declare const layer: any;

@Injectable()
export class ServerService {
  public reqOptions = this.parseToken();
  public token: string;
  public isMobile: boolean;
  public isAndroid: boolean;
  public isNightMode: boolean;
  static layerPopup(content: string): void {
    layer.open({
      shade: false,
      content: content,
      className: 'popup-msg',
      // skin: 'msg',
      anim: 'scale',
      time: 2
    });
  }
  resetToken(accessToken: any) {
    this.token = accessToken;
  };
  parseToken(): any {
    const requestParam = new this.UrlSearch();
    const pathUrlMon = 'qar/qar';
    this.token = requestParam.access_token;
    this.isNightMode = !!(+requestParam.nightmode);
    let portalApiUrl = 'http://10.88.15.114/api';

    if (requestParam.appType && requestParam.appType === 'release') {
      portalApiUrl = 'https://sfa-crewportal.sf-express.com/api';
    } else if (requestParam.appType && requestParam.appType === 'uat') {
      portalApiUrl = 'http://10.88.18.72/api';
    }

    const headers = new Headers({
      'Authorization' : 'Bearer ' + this.token
    });
    const options = new RequestOptions({headers: headers});
    return {
      portalApiUrl: portalApiUrl,
      pathUrlMon: pathUrlMon,
      options: options
    };
  };

  getQar(param: any): Observable<any> {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization' : 'Bearer ' + this.token
      }),
      params: {
        month: param.month,
        pageSize: param.pageSize,
        pageIndex: param.pageIndex,
        sort: 'EVN_TIME',
        order: 'desc'
      }
    });
    return this.http
      .get(`${this.reqOptions.portalApiUrl}/${this.reqOptions.pathUrlMon}`, options)
      // .map(response => response.json() as any)
      .map(req => {
          console.log(req.json());
          return req.json();
        }
      )
      .timeout(20000)
      // .subscribe(data => console.log(data))
      .catch(this.handleError.bind(this));
  }
  /**
   * 异常处理
   */
  private handleError(this: any, error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    if (!error.stack) { // 不是超时引起的错误
      this.status = error.status;
      this.errTip = error.statusText || error.json().error_description || error.json().error;
      (this.status === -1 || this.status === 0) && ServerService.layerPopup(this.translateConfig.transform('networkErr'));
      this.status === 401 && NativeAppAPI.tokenExpired();
      console.log('status: ', this.status, 'errTip: ', this.errTip);
    } else {
      ServerService.layerPopup(error.message || this.translateConfig.transform('timeout'));
    }
    return Observable.throw(error.message || error);
  }

  private UrlSearch(): void {
    let name, value;
    let str = location.href; // 取得整个地址栏
    let num = str.indexOf('#');
    str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]

    const arr = str.split('&'); // 各个参数放到数组里
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        this[name] = value;
      }
    }
  }

  constructor(private http: Http, private translateConfig: TranslatePipe) {
    (<any>window).resetToken = this.resetToken;
    this.isMobile = /iPhone|iPod|Android|IEMobile|BlackBerry/.test(navigator.userAgent) && !(<any>window).MSStream;
    this.isAndroid = /Android|IEMobile|BlackBerry/.test(navigator.userAgent) && !(<any>window).MSStream;
    console.info('检测到的设备为 移动设备？', this.isMobile);
  }

}
