function iOSVersion(){var e=navigator.appVersion.split("OS ");return e.length>1&&e[1].split(" ")[0].split("_").join(".")}function loadPackageInfo(){var urlSelfParts=window.location.href.split("info.html?id="),current_url_path=window.location.href.slice(0,window.location.href.lastIndexOf("/")),form_url=current_url_path+"/packageInfo/"+urlSelfParts[1];-1==navigator.userAgent.search(/Cydia/)&&($("#showAddRepo_").show(),$("#open_cydia").attr("href","cydia://url/https://cydia.saurik.com/api/share#?source=https://repo.tuandb.name.vn/&package="+urlSelfParts[1])),$.ajax({url:form_url,type:"GET",cache:!1,crossDomain:!0,success:function(returnhtml){$("#tweakStatusInfo").hide();var decodeResp=eval("("+returnhtml+")");if(decodeResp.name&&(document.title=decodeResp.name,$("#name").html(decodeResp.name),$("#name").show()),decodeResp.desc_short&&($("#desc_short").html(decodeResp.desc_short),$("#desc_short_").show()),decodeResp.warning&&($("#warning").html(decodeResp.warning),$("#warning_").show()),decodeResp.desc_long&&($("#desc_long").html(decodeResp.desc_long),$("#desc_long_").show()),decodeResp.compatitle){$("#compatitle_").show(),$("#compatitle").html(decodeResp.compatitle);var ios_ver=iOSVersion();ios_ver&&$(".cur_ios").html("iOS hiện tại: "+ios_ver)}decodeResp.changelog&&($("#changelog").html(decodeResp.changelog),$("#changelog_").show()),decodeResp.screenshot&&($("#screenshot").html(decodeResp.screenshot),$("#screenshot_").show()),1==decodeResp.open&&$("#is_open_source_").show()},error:function(e){$("#errorInfo").html("Mô tả không có sẵn cho "+urlSelfParts[1])}})}var allPackages=null,packagesSection={};function openSection(e){var t="";for(var a in t+='<li class="has-icon"><a onclick="loadMainSection()" role="button"><img style="border-radius: 20%;" href="/img/back.png" alt="" srcset="/img/back.png 2x, /img/back.png 3x" class="icon"/><label><< Back</label></a></li>',packagesSection[e]){var n=packagesSection[e][a],o="cydia://package/"+n.package;if(-1==navigator.userAgent.search(/Cydia/))o=window.location.href.slice(0,window.location.href.lastIndexOf("/"))+"/info.html?id="+n.package;t+='<li class="has-icon"><a href=\''+o+'\' target=\'_blank\' role="button"><img style="border-radius: 20%;" href="/img/'+encodeURI(e)+'.png" alt="" srcset="/img/'+encodeURI(e)+".png 2x, /img/"+encodeURI(e)+'.png 3x" class="icon"/><label>'+n.name+" v"+n.version+"</label></a></li>"}$("#browser").html(t)}function loadMainSection(){var e="";for(var t in packagesSection)e+='<li class="has-icon"><a onclick="openSection(\''+t+'\')" role="button"><img style="border-radius: 20%;" href="/img/'+encodeURI(t)+'.png" alt="" srcset="/img/'+encodeURI(t)+".png 2x, /img/"+encodeURI(t)+'.png 3x" class="icon"/><label>'+t+" ("+packagesSection[t].length+")</label></a></li>";$("#browser").html(e)}function getPackageWithID(e){for(var t in allPackages)if(allPackages[t].package==e)return allPackages[t];return null}function loadPackageDetail(){var e=getPackageWithID(window.location.href.split("info.html?id=")[1]);null!=e&&($("#pkg_").show(),$("#pkg_name").html(e.name),$("#pkg_id").html(e.package),$("#pkg_section").html(e.section),$("#pkg_version").html(e.version),$("#pkg_size").html(filesize(e.size)),$("#pkg_installedsize").html(filesize(1024*e.installedsize)),$("#pkg_time").html(timeago.format(1e3*e.time)),$("#pkg_timestamp").html(e.timestamp))}function loadRecentUpdates(){var e="",t=0;for(var a in allPackages){if(++t>10)break;var n="cydia://package/"+allPackages[a].package;if(-1==navigator.userAgent.search(/Cydia/))n=window.location.href.slice(0,window.location.href.lastIndexOf("/"))+"/info.html?id="+allPackages[a].package;e+='<li class="has-icon"><a href=\''+n+'\' target=\'_blank\' role="button"><img style="border-radius: 20%;" href="/img/'+encodeURI(allPackages[a].section)+'.png" alt="" srcset="/img/'+encodeURI(allPackages[a].section)+".png 2x, /img/"+encodeURI(allPackages[a].section)+'.png 3x" class="icon"/><label>'+allPackages[a].name+" v"+allPackages[a].version+"</label></a></li>"}$("#updates").html(e)}function loadPackages(){var current_url_path=window.location.href.slice(0,window.location.href.lastIndexOf("/")),form_url=current_url_path+"/all.packages";$.ajax({url:form_url,type:"GET",cache:!1,crossDomain:!0,success:function(returnhtml){allPackages=eval("("+returnhtml+")");var htmlnews="";for(var dicNow in allPackages){var section=allPackages[dicNow].section;null==section&&(section="Unknown"),null==packagesSection[section]&&(packagesSection[section]=[]),packagesSection[section].push(allPackages[dicNow])}loadMainSection(),loadRecentUpdates(),$("#browser_").show(),$("#updates_").show(),loadPackageDetail()},error:function(e){$("#browser_").hide(),$("#updates_").hide()}})}!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).filesize=t()}(this,function(){"use strict";const e=/^(b|B)$/,t={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},a={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function n(n,o={}){if(isNaN(n))throw new TypeError("Invalid number");let i=[],r=0,c=!0===o.bits,s=!0===o.unix,l=o.base||2,d=void 0!==o.round?o.round:s?1:2,g=void 0!==o.locale?o.locale:"",u=o.localeOptions||{},p=void 0!==o.separator?o.separator:"",h=void 0!==o.spacer?o.spacer:s?"":" ",f=o.symbols||{},m=2===l&&o.standard||"jedec",b=o.output||"string",k=!0===o.fullform,v=o.fullforms instanceof Array?o.fullforms:[],_=void 0!==o.exponent?o.exponent:-1,w=Number(n),$=w<0,y=l>2?1e3:1024;return $&&(w=-w),(-1===_||isNaN(_))&&(_=Math.floor(Math.log(w)/Math.log(y)))<0&&(_=0),_>8&&(_=8),"exponent"===b?_:(0===w?(i[0]=0,i[1]=s?"":t[m][c?"bits":"bytes"][_]):(r=w/(2===l?Math.pow(2,10*_):Math.pow(1e3,_)),c&&(r*=8)>=y&&_<8&&(r/=y,_++),i[0]=Number(r.toFixed(_>0?d:0)),i[0]===y&&_<8&&void 0===o.exponent&&(i[0]=1,_++),i[1]=10===l&&1===_?c?"kb":"kB":t[m][c?"bits":"bytes"][_],s&&(i[1]="jedec"===m?i[1].charAt(0):_>0?i[1].replace(/B$/,""):i[1],e.test(i[1])&&(i[0]=Math.floor(i[0]),i[1]=""))),$&&(i[0]=-i[0]),i[1]=f[i[1]]||i[1],!0===g?i[0]=i[0].toLocaleString():g.length>0?i[0]=i[0].toLocaleString(g,u):p.length>0&&(i[0]=i[0].toString().replace(".",p)),"array"===b?i:(k&&(i[1]=v[_]?v[_]:a[m][_]+(c?"bit":"byte")+(1===i[0]?"":"s")),"object"===b?{value:i[0],symbol:i[1]}:i.join(h)))}return n.partial=(e=>t=>n(t,e)),n}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).timeago={})}(this,function(e){"use strict";var t=[60,60,24,7,365/7/12,12];function a(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function n(e,a){for(var n=e<0?1:0,o=e=Math.abs(e),i=0;e>=t[i]&&i<t.length;i++)e/=t[i];return(0==(i*=2)?9:1)<(e=~~e)&&(i+=1),a(e,i,o)[n].replace("%s",e)}function o(e,t){return(+(t=t?a(t):new Date)-+a(e))/1e3}var i=["giây","phút","giờ","ngày","tuần","tháng","năm"];function r(e,t){if(0===t)return["vừa xong","ngay bây giờ"];var a=i[~~(t/2)];return 1<e&&(a+=""),[e+" "+a+" trước","trong "+e+" "+a]}var c=["giây","phút","giờ","ngày","tuần","tháng","năm"];function s(e){return l[e]||r}var l={en_US:r,zh_CN:function(e,t){if(0===t)return["vừa xong","ngay bây giờ"];var a=c[~~(t/2)];return[e+" "+a+"trước",e+" "+a+"trong"]}},d="timeago-id";function g(e){return parseInt(e.getAttribute(d))}var u={},p=function(e){clearTimeout(e),delete u[e]};e.cancel=function(e){e?p(g(e)):Object.keys(u).forEach(p)},e.format=function(e,t,a){return n(o(e,a&&a.relativeDate),s(t))},e.register=function(e,t){l[e]=t},e.render=function(e,a,i){var r=e.length?e:[e];return r.forEach(function(e){!function e(a,i,r,c){p(g(a));var s=c.relativeDate,l=c.minInterval,h=o(i,s);a.innerText=n(h,r);var f=setTimeout(function(){e(a,i,r,c)},Math.min(1e3*Math.max(function(e){for(var a=1,n=0,o=Math.abs(e);e>=t[n]&&n<t.length;n++)e/=t[n],a*=t[n];return o=(o%=a)?a-o:a,Math.ceil(o)}(h),l||1),2147483647));u[f]=0,function(e,t){e.setAttribute(d,t)}(a,f)}(e,function(e){return e.getAttribute("datetime")}(e),s(a),i||{})}),r},Object.defineProperty(e,"__esModule",{value:!0})});