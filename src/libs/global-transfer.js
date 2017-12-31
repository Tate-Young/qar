/**
 * Created by tate on 27/09/2017.
 */
resetToken = function(accessToken){
  window.resetToken(accessToken);
};

changNightMode = function(isNightMode) {
  window.switchNightMode(isNightMode);
};

appBecomeActive = function () {
  if(typeof (window.refreshQarLists) === 'function'){
    window.refreshQarLists();
  }
};
viewWillAppear = function () { };
viewWillDisappear = appGotoBackground = appWillTerminate = appResignActive = function () { };
