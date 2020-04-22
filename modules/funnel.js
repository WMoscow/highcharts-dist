/*
 Highcharts JS v8.0.4 (2020-04-22)

 Highcharts funnel module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/funnel",["highcharts"],function(e){b(e);b.Highcharts=e;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function e(b,l,e,B){b.hasOwnProperty(l)||(b[l]=B.apply(null,e))}b=b?b._modules:{};e(b,"modules/funnel.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,l){var e=l.isArray,B=l.pick;l=b.seriesType;var F=
b.seriesTypes,K=b.fireEvent,G=b.addEvent,I=b.noop;l("funnel","pie",{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0,dataLabels:{connectorWidth:1,verticalAlign:"middle"},states:{select:{color:"#cccccc",borderColor:"#000000"}}},{animate:I,translate:function(){function a(b,a){return/%$/.test(b)?a*parseInt(b,10)/100:parseInt(b,10)}var b=0,d=this,g=d.chart,f=d.options,k=f.reversed,c=f.ignoreHiddenPoint,v=g.plotWidth;g=g.plotHeight;var e=
0,l=f.center,h=a(l[0],v),m=a(l[1],g),F=a(f.width,v),r,t=a(f.height,g),y=a(f.neckWidth,v),H=a(f.neckHeight,g),z=m-t/2+t-H;v=d.data;var C,D,G="left"===f.dataLabels.position?1:0,A,n,E,u,p,x,q;d.getWidthAt=function(b){var a=m-t/2;return b>z||t===H?y:y+(F-y)*(1-(b-a)/(t-H))};d.getX=function(b,a,c){return h+(a?-1:1)*(d.getWidthAt(k?2*m-b:b)/2+c.labelDistance)};d.center=[h,m,t];d.centerX=h;v.forEach(function(a){c&&!1===a.visible||(b+=a.y)});v.forEach(function(a){q=null;D=b?a.y/b:0;n=m-t/2+e*t;p=n+D*t;r=
d.getWidthAt(n);A=h-r/2;E=A+r;r=d.getWidthAt(p);u=h-r/2;x=u+r;n>z?(A=u=h-y/2,E=x=h+y/2):p>z&&(q=p,r=d.getWidthAt(z),u=h-r/2,x=u+r,p=z);k&&(n=2*m-n,p=2*m-p,null!==q&&(q=2*m-q));C=[["M",A,n],["L",E,n],["L",x,p]];null!==q&&C.push(["L",x,q],["L",u,q]);C.push(["L",u,p],["Z"]);a.shapeType="path";a.shapeArgs={d:C};a.percentage=100*D;a.plotX=h;a.plotY=(n+(q||p))/2;a.tooltipPos=[h,a.plotY];a.dlBox={x:u,y:n,topWidth:E-A,bottomWidth:x-u,height:Math.abs(B(q,p)-n),width:NaN};a.slice=I;a.half=G;c&&!1===a.visible||
(e+=D)});K(d,"afterTranslate")},sortByAngle:function(a){a.sort(function(a,b){return a.plotY-b.plotY})},drawDataLabels:function(){var a=this.data,b=this.options.dataLabels.distance,d,g=a.length;for(this.center[2]-=2*b;g--;){var f=a[g];var k=(d=f.half)?1:-1;var c=f.plotY;f.labelDistance=B(f.options.dataLabels&&f.options.dataLabels.distance,b);this.maxLabelDistance=Math.max(f.labelDistance,this.maxLabelDistance||0);var e=this.getX(c,d,f);f.labelPosition={natural:{x:0,y:c},"final":{},alignment:d?"right":
"left",connectorPosition:{breakAt:{x:e+(f.labelDistance-5)*k,y:c},touchingSliceAt:{x:e+f.labelDistance*k,y:c}}}}F[this.options.dataLabels.inside?"column":"pie"].prototype.drawDataLabels.call(this)},alignDataLabel:function(a,e,d,g,f){var k=a.series;g=k.options.reversed;var c=a.dlBox||a.shapeArgs,l=d.align,w=d.verticalAlign,J=((k.options||{}).dataLabels||{}).inside,h=k.center[1];k=k.getWidthAt((g?2*h-a.plotY:a.plotY)-c.height/2+e.height);k="middle"===w?(c.topWidth-c.bottomWidth)/4:(k-c.bottomWidth)/
2;h=c.y;var m=c.x;"middle"===w?h=c.y-c.height/2+e.height/2:"top"===w&&(h=c.y-c.height+e.height+d.padding);if("top"===w&&!g||"bottom"===w&&g||"middle"===w)"right"===l?m=c.x-d.padding+k:"left"===l&&(m=c.x+d.padding-k);g={x:m,y:g?h-c.height:h,width:c.bottomWidth,height:c.height};d.verticalAlign="bottom";J&&!a.visible||b.Series.prototype.alignDataLabel.call(this,a,e,d,g,f);J&&(!a.visible&&a.dataLabel&&(a.dataLabel.placed=!1),a.contrastColor&&e.css({color:a.contrastColor}))}});G(b.Chart,"afterHideAllOverlappingLabels",
function(){this.series.forEach(function(a){var b=a.options&&a.options.dataLabels;e(b)&&(b=b[0]);a.is("pie")&&a.placeDataLabels&&b&&!b.inside&&a.placeDataLabels()})});l("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",reversed:!0});""});e(b,"masters/modules/funnel.src.js",[],function(){})});
//# sourceMappingURL=funnel.js.map