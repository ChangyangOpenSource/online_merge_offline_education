"use strict";Object.defineProperty(exports,"__esModule",{value:true});var polyvLivePlayer={version:20180830,jsonHost:"https://router.polyv.net/proxy/",currentTime:0,state:"end",apiState:"end",wholeTime:0,time:0,detailTime:0,stateEverLive:false,streamName:"",timeStamp:0,uid:"",cid:"",pid:"",apiUrl:"",stateMode:0,param1:"",param2:"",param3:"",param4:"",param5:"webapp",renderTimeout:null,getVersion:function t(){return this.version},getVideo:function a(t){this.options=t;var a=this;var e={};if(t.uid==""||t.vid==""){e={code:0,error:"lack of uid/vid"};this.showError(e);return}a.videoContext=t.videoContext;a.uid=t.uid;a.cid=t.vid;a.pid=a.pid==""?a.getPlayId():a.pid;if(t.params){if(t.params.param1){a.param1=t.params.param1}if(t.params.param2){a.param2=t.params.param2}if(t.params.param3){a.param3=t.params.param3}if(t.params.param4){a.param4=t.params.param4}if(t.params.param5){a.param5=t.params.param5}}wx.request({url:"https://player.polyv.net/service/v1/channel_"+a.uid+"_"+a.cid+".json?ran="+Math.floor(Math.random()*9999999),method:"GET",success:function r(t){e.title=t.data.name;e.src=t.data.m3u8Url;e.poster=a.proxyUrl(t.data.coverImage);e.waitImage=a.proxyUrl(t.data.waitImage);e.logoImage=a.proxyUrl(t.data.logoImage);e.logoHref=a.proxyUrl(t.data.logoHref);e.logoOpacity=t.data.logoOpacity;e.logoPosition=t.data.logoPosition;if(t.data.isOnlyAudio=="Y"){if(src.indexOf("?")>-1){e.src=e.src+"&only-audio=1"}else{e.src=e.src+"?only-audio=1"}}e.flvSrc=t.data.url+t.data.stream+".flv";if(t.data.isNgbEnabled=="Y"){e.flvSrc=t.data.ngbUrl+t.data.stream+".flv"}else if(t.data.isUrlProtected=="Y"){e.flvSrc=t.data.bakUrl+t.data.stream+".flv"}if(t.data.isUrlProtected=="Y"){e.flvSrc=e.flvSrc+"?wsSecret="+t.data.streamSign+"&wsTime="+t.data.currentTimeSecs}if(a.options.success){a.options.success(e)}a.streamName=t.data.stream;a.apiUrl="https://api.polyv.net/live/live_status/query?stream="+a.streamName;a.render();if(a.countInterval){clearInterval(a.countInterval)}a.countInterval=setInterval(function(){a.countWholeTime()},1e3)},fail:function i(t){e={code:1,error:"load json fail"};showError(e)}})},getNewVideo:function e(t){this.getChannel().then(function(a){if(typeof t==="function"){t(a)}})},getChannel:function r(){var t=this;return new Promise(function(a,e){wx.request({url:"https://player.polyv.net/service/v1/channel_"+t.uid+"_"+t.cid+".json?ran="+Math.floor(Math.random()*9999999),method:"GET",success:function r(e){var r={};r.title=e.data.name;r.src=e.data.m3u8Url;r.poster=t.proxyUrl(e.data.coverImage);r.waitImage=t.proxyUrl(e.data.waitImage);r.logoImage=t.proxyUrl(e.data.logoImage);r.logoHref=t.proxyUrl(e.data.logoHref);r.logoOpacity=e.data.logoOpacity;r.logoPosition=e.data.logoPosition;if(e.data.isOnlyAudio==="Y"){if(src.indexOf("?")>-1){r.src=r.src+"&only-audio=1"}else{r.src=r.src+"?only-audio=1"}}r.flvSrc=e.data.url+e.data.stream+".flv";if(e.data.isNgbEnabled=="Y"){r.flvSrc=e.data.ngbUrl+e.data.stream+".flv"}else if(e.data.isUrlProtected=="Y"){r.flvSrc=e.data.bakUrl+e.data.stream+".flv"}if(e.data.isUrlProtected=="Y"){r.flvSrc=r.flvSrc+"?wsSecret="+e.data.streamSign+"&wsTime="+e.data.currentTimeSecs}a(r)}})})},timeUpdate:function i(t){if(t&&t.detail&&t.detail.currentTime){this.detailTime=t.detail.currentTime}},play:function n(){},pause:function o(){},ended:function s(){},render:function l(){var t=this;if(t.state=="end"&&!t.stateEverLive){}this.renderTimeout=setTimeout(function(){t.render()},5e3)},countWholeTime:function d(){var t=this;var a=(new Date).getTime();t.updateState();if(a-t.timeStamp>6*1e3){t.timeStamp=a;t.updateApiState();t.sendState()}if(t.apiState=="live"){t.wholeTime++}if(t.state=="live"){t.time++}},updateState:function u(){if(this.currentTime==this.detailTime){this.state="end"}else{this.stateMode=1;this.stateEverLive=true;this.state="live";this.currentTime=this.detailTime}},updateApiState:function f(){var t=this;if(t.streamName!=""){wx.request({url:t.apiUrl,dataType:"jsonp",success:function a(e){var r=false;if(t.apiState.indexOf("live")===-1&&e.data.indexOf("live")>-1){r=true}if(r&&t.options.onStartLive){t.options.onStartLive()}t.apiState=e.data.indexOf("live")>-1?"live":"end";if(t.options.onApiStatus){t.options.onApiStatus(t.apiState)}}})}},sendState:function c(){var t=this;var a=0;if(t.stateMode==0){a=t.wholeTime}else{a=t.time}if(a>0&&(t.state==="live"||t.apiState==="live")){var e=(new Date).getTime();var r="rtas.net"+t.pid+t.cid+"0"+a;var i=MD5(r)+"";var n={pid:t.pid,uid:t.uid,cid:t.cid,pd:a,sd:a,sign:i,flow:0,ts:e,param1:t.param1,param2:t.param2,param3:t.param3,param4:t.param4,param5:t.param5};wx.request({url:"https://rtas.videocc.net/v1/view",data:n})}},getPlayId:function p(){var t=(new Date).getTime()+"";var a=parseInt(Math.random()*1e6+1e6)+"";return t+"X"+a},proxyUrl:function m(t){t=t.replace(/.*?:\/\//g,"");if(t==""){return t}return"https://router.polyv.net/proxy/"+t},showError:function v(t){if(this.options.error){this.options.error(t)}},destroy:function h(){if(this.countInterval){clearInterval(this.countInterval)}if(this.renderTimeout){clearTimeout(this.renderTimeout)}}};var MD5=function g(t){function a(t,a){return t<<a|t>>>32-a}function e(t,a){var e,r,i,n,o;i=t&2147483648;n=a&2147483648;e=t&1073741824;r=a&1073741824;o=(t&1073741823)+(a&1073741823);if(e&r){return o^2147483648^i^n}if(e|r){if(o&1073741824){return o^3221225472^i^n}else{return o^1073741824^i^n}}else{return o^i^n}}function r(t,a,e){return t&a|~t&e}function i(t,a,e){return t&e|a&~e}function n(t,a,e){return t^a^e}function o(t,a,e){return a^(t|~e)}function s(t,i,n,o,s,l,d){t=e(t,e(e(r(i,n,o),s),d));return e(a(t,l),i)}function l(t,r,n,o,s,l,d){t=e(t,e(e(i(r,n,o),s),d));return e(a(t,l),r)}function d(t,r,i,o,s,l,d){t=e(t,e(e(n(r,i,o),s),d));return e(a(t,l),r)}function u(t,r,i,n,s,l,d){t=e(t,e(e(o(r,i,n),s),d));return e(a(t,l),r)}function f(t){var a;var e=t.length;var r=e+8;var i=(r-r%64)/64;var n=(i+1)*16;var o=Array(n-1);var s=0;var l=0;while(l<e){a=(l-l%4)/4;s=l%4*8;o[a]=o[a]|t.charCodeAt(l)<<s;l++}a=(l-l%4)/4;s=l%4*8;o[a]=o[a]|128<<s;o[n-2]=e<<3;o[n-1]=e>>>29;return o}function c(t){var a="",e="",r,i;for(i=0;i<=3;i++){r=t>>>i*8&255;e="0"+r.toString(16);a=a+e.substr(e.length-2,2)}return a}function p(t){t=t.replace(/\r\n/g,"\n");var a="";for(var e=0;e<t.length;e++){var r=t.charCodeAt(e);if(r<128){a+=String.fromCharCode(r)}else if(r>127&&r<2048){a+=String.fromCharCode(r>>6|192);a+=String.fromCharCode(r&63|128)}else{a+=String.fromCharCode(r>>12|224);a+=String.fromCharCode(r>>6&63|128);a+=String.fromCharCode(r&63|128)}}return a}var m=Array();var v,h,g,y,S,T,w,x,U;var I=7,C=12,P=17,O=22;var b=5,M=9,A=14,E=20;var L=4,Y=11,N=16,_=23;var j=6,q=10,D=15,H=21;t=p(t);m=f(t);T=1732584193;w=4023233417;x=2562383102;U=271733878;for(v=0;v<m.length;v+=16){h=T;g=w;y=x;S=U;T=s(T,w,x,U,m[v+0],I,3614090360);U=s(U,T,w,x,m[v+1],C,3905402710);x=s(x,U,T,w,m[v+2],P,606105819);w=s(w,x,U,T,m[v+3],O,3250441966);T=s(T,w,x,U,m[v+4],I,4118548399);U=s(U,T,w,x,m[v+5],C,1200080426);x=s(x,U,T,w,m[v+6],P,2821735955);w=s(w,x,U,T,m[v+7],O,4249261313);T=s(T,w,x,U,m[v+8],I,1770035416);U=s(U,T,w,x,m[v+9],C,2336552879);x=s(x,U,T,w,m[v+10],P,4294925233);w=s(w,x,U,T,m[v+11],O,2304563134);T=s(T,w,x,U,m[v+12],I,1804603682);U=s(U,T,w,x,m[v+13],C,4254626195);x=s(x,U,T,w,m[v+14],P,2792965006);w=s(w,x,U,T,m[v+15],O,1236535329);T=l(T,w,x,U,m[v+1],b,4129170786);U=l(U,T,w,x,m[v+6],M,3225465664);x=l(x,U,T,w,m[v+11],A,643717713);w=l(w,x,U,T,m[v+0],E,3921069994);T=l(T,w,x,U,m[v+5],b,3593408605);U=l(U,T,w,x,m[v+10],M,38016083);x=l(x,U,T,w,m[v+15],A,3634488961);w=l(w,x,U,T,m[v+4],E,3889429448);T=l(T,w,x,U,m[v+9],b,568446438);U=l(U,T,w,x,m[v+14],M,3275163606);x=l(x,U,T,w,m[v+3],A,4107603335);w=l(w,x,U,T,m[v+8],E,1163531501);T=l(T,w,x,U,m[v+13],b,2850285829);U=l(U,T,w,x,m[v+2],M,4243563512);x=l(x,U,T,w,m[v+7],A,1735328473);w=l(w,x,U,T,m[v+12],E,2368359562);T=d(T,w,x,U,m[v+5],L,4294588738);U=d(U,T,w,x,m[v+8],Y,2272392833);x=d(x,U,T,w,m[v+11],N,1839030562);w=d(w,x,U,T,m[v+14],_,4259657740);T=d(T,w,x,U,m[v+1],L,2763975236);U=d(U,T,w,x,m[v+4],Y,1272893353);x=d(x,U,T,w,m[v+7],N,4139469664);w=d(w,x,U,T,m[v+10],_,3200236656);T=d(T,w,x,U,m[v+13],L,681279174);U=d(U,T,w,x,m[v+0],Y,3936430074);x=d(x,U,T,w,m[v+3],N,3572445317);w=d(w,x,U,T,m[v+6],_,76029189);T=d(T,w,x,U,m[v+9],L,3654602809);U=d(U,T,w,x,m[v+12],Y,3873151461);x=d(x,U,T,w,m[v+15],N,530742520);w=d(w,x,U,T,m[v+2],_,3299628645);T=u(T,w,x,U,m[v+0],j,4096336452);U=u(U,T,w,x,m[v+7],q,1126891415);x=u(x,U,T,w,m[v+14],D,2878612391);w=u(w,x,U,T,m[v+5],H,4237533241);T=u(T,w,x,U,m[v+12],j,1700485571);U=u(U,T,w,x,m[v+3],q,2399980690);x=u(x,U,T,w,m[v+10],D,4293915773);w=u(w,x,U,T,m[v+1],H,2240044497);T=u(T,w,x,U,m[v+8],j,1873313359);U=u(U,T,w,x,m[v+15],q,4264355552);x=u(x,U,T,w,m[v+6],D,2734768916);w=u(w,x,U,T,m[v+13],H,1309151649);T=u(T,w,x,U,m[v+4],j,4149444226);U=u(U,T,w,x,m[v+11],q,3174756917);x=u(x,U,T,w,m[v+2],D,718787259);w=u(w,x,U,T,m[v+9],H,3951481745);T=e(T,h);w=e(w,g);x=e(x,y);U=e(U,S)}var k=c(T)+c(w)+c(x)+c(U);return k.toLowerCase()};exports.default=polyvLivePlayer;