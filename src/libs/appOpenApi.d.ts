/**
 * Created by tate on 27/09/2017.
 * appOpenApi声明文件
 */
declare let NativeAppAPI: {
  scanLineCode: (param: any) => void;
  tokenExpired: (param?: any) => void;
  navigationGoback: (param?: any) => void;
  webAppEvent: (param: any) => void;
  addCalendarEvent: (param: any) => void;
  deleteCalendarEvent: (param: any) => void;
  openFlightDetail: (param: any) => void;
  interfaceJump: (jumpPath: any, title: any) => void;
  changeStatusBarColor: () => void;
  showTabBar: () => void;
  hideTabBar: () => void;
};
