var NativeAppAPI = {
    scanLineCode : function (param) {
        if(window.webkit && window.webkit.messageHandlers.scanLineCode) {
            window.webkit.messageHandlers.scanLineCode.postMessage(param);
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){//添加判断是否在android系统下面
            window.WebViewJavascriptBridge.callHandler(
                'qrcodeScanner'
                , param
                , function(responseData) {

                }
            );
        }
    },

    tokenExpired : function (param) {
        if(window.webkit && window.webkit.messageHandlers.tokenExpire) {
            window.webkit.messageHandlers.tokenExpire.postMessage({});
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'tokenExpired'
                , param
                , function(responseData) {

                }
            );
        }
    },

    navigationGoback : function (param) {
        if(window.webkit && window.webkit.messageHandlers.navigationGoback) {
            window.webkit.messageHandlers.navigationGoback.postMessage(param);
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){//判断
            window.WebViewJavascriptBridge.callHandler(
                'goExit'
                , {'param': 'value'}
                , function(responseData) {

                }
            );
        }
    },

    /*
    * 参数形式
    * {
    *   event:eventId,
    *   param:{paramKey1:paramVaule1}
    * }
    * {event} 是事件ID, 该ID为字符串类型，在友盟注册的应用可以添加。是必选参数
    * [param] 是该事件的额外参数，最多自能包含10个自动。如果没有额外参数，该字段可以不添加
    *比如
    * {
    * event:'nightMode'
    * }
    * 则是统计用户是否设置为夜间模式
    * */
    webAppEvent : function (event) {
        if(window.webkit && window.webkit.messageHandlers.webAppEvent) {
            window.webkit.messageHandlers.webAppEvent.postMessage(event);
        }else{
            MobclickAgent.onEvent(eventName);
        }
    },

    addCalendarEvent : function (newEvent) {
        if(window.webkit && window.webkit.messageHandlers.addCalendarEvent) {
            window.webkit.messageHandlers.addCalendarEvent.postMessage(newEvent);
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'addCalendarEvent'
                , newEvent
                , function(responseData) {

                }
            );
        }
    },

    deleteCalendarEvent : function (eventId) {
        if(window.webkit && window.webkit.messageHandlers.addCalendarEvent) {
            window.webkit.messageHandlers.deleteCalendarEvent.postMessage(eventId);
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'deleteCalendarEvent'
                , eventId
                , function(responseData) {

                }
            );
        }
    },

    openFlightDetail : function (flightId) {
        if(window.webkit && window.webkit.messageHandlers.openFlightDetail) {
            window.webkit.messageHandlers.openFlightDetail.postMessage({'flightId':flightId});
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'openFlightDetail'
                , {'flightId':flightId}
                , function(responseData) {

                }
            );
        }
    },

    addBadge:function (badge) {
        if(window.webkit && window.webkit.messageHandlers.addBadge) {
            window.webkit.messageHandlers.addBadge.postMessage(badge);
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'addBadge'
                , {'badge':badge}
                , function(responseData) {

                }
            );
        }
    },
    //jumpPath 格式: AppName://模块名字/额外参数(additionalParam)
    //title : 跳转页面的标题。如果未传递该参数，则表示无原生的顶端的返回按钮。
    interfaceJump:function (jumpPath,title,isUIWebView) {
        if(window.webkit) {
            if(window.webkit.messageHandlers.interfaceJump){
                window.webkit.messageHandlers.interfaceJump.postMessage({'jumpPath':jumpPath,'title':title,'isUIWebView':isUIWebView||0});
            }else if(window.webkit.messageHandlers.openFlightDetail){
                var index = jumpPath.lastIndexOf('/');
                var flightId = jumpPath.substr(index+1);
                window.webkit.messageHandlers.openFlightDetail.postMessage({'flightId':flightId});
            }
        }else if(typeof window.WebViewJavascriptBridge != 'undefined'){
            window.WebViewJavascriptBridge.callHandler(
                'interfaceJump'
                , {'jumpPath':jumpPath}
                , function(responseData) {

                }
            );
        }
    },
    focAuthJump:function (jumpPath,title) {
        if(window.webkit && window.webkit.messageHandlers.focAuthJump) {
                window.webkit.messageHandlers.focAuthJump.postMessage({'jumpPath':jumpPath,'title':title});
        }
    },
    changeStatusBarColor:function (r, g ,b) {
        if(window.webkit) {
            if(window.webkit.messageHandlers.changeStatusBarColor){
                window.webkit.messageHandlers.changeStatusBarColor.postMessage({'r':r,'g':g,'b':b});
            }
        }
    },

    showTabBar:function () {
        if(window.webkit) {
            if(window.webkit.messageHandlers.showTabBar){
                window.webkit.messageHandlers.showTabBar.postMessage({});
            }
        }
    },

    hideTabBar:function () {
        if(window.webkit) {
            if (window.webkit.messageHandlers.hideTabBar) {
                window.webkit.messageHandlers.hideTabBar.postMessage({});
            }
        }
    },

    setNightMode:function(beNightMode){
    	if(window.webkit) {
            if (window.webkit.messageHandlers.setNightMode) {
                window.webkit.messageHandlers.setNightMode.postMessage({nightMode:beNightMode});
            }
        }
    }
};
