!function(e,r){e.App={alert:function(e,r,t){alert(e),"string"==typeof t?location.href=t:"function"==typeof t&&t()},ajax:function(e){var t=r.extend({type:"post",complete:function(r){if(r.status>=300&&r.status<400&&304!=r.status){var t=r.getResponseHeader("X-Redirect");r.responseText.length?(alert(r.responseText),location.href=t):location.href=t}e.complete&&e.complete(r)},error:function(e){alert(e.responseText)}},e);return r.ajax(t)},cookie:function(e,r,t){if("undefined"==typeof r){var a=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var i=jQuery.trim(n[o]);if(i.substring(0,e.length+1)==e+"="){a=decodeURIComponent(i.substring(e.length+1));break}}return a}t=t||{},null===r&&(r="",t.expires=-1);var s="";if(t.expires&&("number"==typeof t.expires||t.expires.toUTCString)){var p;"number"==typeof t.expires?(p=new Date,p.setTime(p.getTime()+24*t.expires*60*60*1e3)):p=t.expires,s="; expires="+p.toUTCString()}var c=t.path?"; path="+t.path:"",l=t.domain?"; domain="+t.domain:"",u=t.secure?"; secure":"";document.cookie=[e,"=",encodeURIComponent(r),s,c,l,u].join("")},loadParam:function(e){var a=location.pathname.substr(1);if(".htm"==a.substr(-4)&&(a+="l"),e==a||e+"l"==a)return{};var n=e.match(new RegExp("<\\w+:.+?>","g")),o=[];if(!n)return null;n.map(function(r){var t=r.replace(/<\w+:/,"("),a=r.match(/<(\w+)/);o.push(a[1]),t=t.replace(">",")"),e=e.replace(r,t)});var i=a.match(new RegExp(e));if(!i)return r.error("App.loadParam 加载请求参数失败"),null;for(var s={},p=1;p<i.length;p++)s[o[p-1]]=i[p];return t.aParams=r.extend(t.aParams,s),s},aParams:{},init:function(){var e=window.location.href,r=null;if(-1!=e.indexOf("?")){r={};var t=e.split("?")[1],a=t.split("&"),n=[];for(var o in a){n=a[o].split("=");var i=n[0],s=n[1];r[i]=s}}r&&(this.aParams=r)},showHeadBar:function(){var e=sessionStorage.getItem("userInfo");e?e=JSON.parse(e):t.ajax({url:"/worker/headbar.json",async:!1,success:function(r){return r.code?void App.alert(r.message,r.code,r.data):(e=r.data,void sessionStorage.setItem("userInfo",JSON.stringify(r.data)))}}),r("#mainOut").before('<header class="container-full">				<div class="left"><a href="/home.html">首页</a></div>				<div class="right">					<span class="glyphicon glyphicon-envelope"></span>					<a href="/worker/center.html">'+e.name+'</a>&nbsp;					<a href="/worker/logout.do">退出登陆</a>				</div>			</header>')}};var t=e.App;t.init()}(window,jQuery);