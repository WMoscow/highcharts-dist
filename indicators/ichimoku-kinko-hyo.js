/*
 Highstock JS v8.0.4 (2020-04-22)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/indicators/ichimoku-kinko-hyo",["highcharts","highcharts/modules/stock"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(e,x,m,l){e.hasOwnProperty(x)||(e[x]=l.apply(null,m))}e=e?e._modules:{};l(e,"indicators/ichimoku-kinko-hyo.src.js",[e["parts/Globals.js"],e["parts/Color.js"],e["parts/Utilities.js"]],
function(e,l,m){function x(a){return a.reduce(function(a,b){return Math.max(a,b[1])},-Infinity)}function F(a){return a.reduce(function(a,b){return Math.min(a,b[2])},Infinity)}function y(a){return{high:x(a),low:F(a)}}function G(a){var d,b,t,e,h;a.series.forEach(function(a){if(a.xData)for(e=a.xData,h=b=a.xIncrement?1:e.length-1;0<h;h--)if(t=e[h]-e[h-1],d===p||t<d)d=t});return d}function H(a,d,b,e){if(a&&d&&b&&e){var t=d.plotX-a.plotX;d=d.plotY-a.plotY;var h=e.plotX-b.plotX;e=e.plotY-b.plotY;var l=a.plotX-
b.plotX,g=a.plotY-b.plotY;b=(-d*l+t*g)/(-h*d+t*e);h=(h*g-e*l)/(-h*d+t*e);if(0<=b&&1>=b&&0<=h&&1>=h)return{plotX:a.plotX+h*t,plotY:a.plotY+h*d}}return!1}function D(a){var d=a.indicator;d.points=a.points;d.nextPoints=a.nextPoints;d.color=a.color;d.options=B(a.options.senkouSpan.styles,a.gap);d.graph=a.graph;d.fillGraph=!0;u.prototype.drawGraph.call(d)}var C=l.parse,E=m.defined,I=m.isArray,B=m.merge,J=m.objectEach;l=m.seriesType;var p,u=e.seriesTypes.sma;e.approximations["ichimoku-averages"]=function(){var a=
[],d;[].forEach.call(arguments,function(b,t){a.push(e.approximations.average(b));d=!d&&"undefined"===typeof a[t]});return d?void 0:a};l("ikh","sma",{params:{period:26,periodTenkan:9,periodSenkouSpanB:52},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'},
tenkanLine:{styles:{lineWidth:1,lineColor:void 0}},kijunLine:{styles:{lineWidth:1,lineColor:void 0}},chikouLine:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanA:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanB:{styles:{lineWidth:1,lineColor:void 0}},senkouSpan:{styles:{fill:"rgba(255, 0, 0, 0.5)"}},dataGrouping:{approximation:"ichimoku-averages"}},{pointArrayMap:["tenkanSen","kijunSen","chikouSpan","senkouSpanA","senkouSpanB"],pointValKey:"tenkanSen",nameComponents:["periodSenkouSpanB","period",
"periodTenkan"],init:function(){u.prototype.init.apply(this,arguments);this.options=B({tenkanLine:{styles:{lineColor:this.color}},kijunLine:{styles:{lineColor:this.color}},chikouLine:{styles:{lineColor:this.color}},senkouSpanA:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpanB:{styles:{lineColor:this.color,fill:C(this.color).setOpacity(.5).get()}},senkouSpan:{styles:{fill:C(this.color).setOpacity(.2).get()}}},this.options)},toYData:function(a){return[a.tenkanSen,a.kijunSen,
a.chikouSpan,a.senkouSpanA,a.senkouSpanB]},translate:function(){var a=this;u.prototype.translate.apply(a);a.points.forEach(function(d){a.pointArrayMap.forEach(function(b){E(d[b])&&(d["plot"+b]=a.yAxis.toPixels(d[b],!0),d.plotY=d["plot"+b],d.tooltipPos=[d.plotX,d["plot"+b]],d.isNull=!1)})})},drawGraph:function(){var a=this,d=a.points,b=d.length,e=a.options,l=a.graph,h=a.color,m={options:{gapSize:e.gapSize}},g=a.pointArrayMap.length,n=[[],[],[],[],[],[]],c={tenkanLine:n[0],kijunLine:n[1],chikouLine:n[2],
senkouSpanA:n[3],senkouSpanB:n[4],senkouSpan:n[5]},v=[],f=a.options.senkouSpan,w=f.color||f.styles.fill,p=f.negativeColor,q=[[],[]],A=[[],[]],x=0,r,y,z;for(a.ikhMap=c;b--;){var k=d[b];for(r=0;r<g;r++)f=a.pointArrayMap[r],E(k[f])&&n[r].push({plotX:k.plotX,plotY:k["plot"+f],isNull:!1});p&&b!==d.length-1&&(f=c.senkouSpanB.length-1,k=H(c.senkouSpanA[f-1],c.senkouSpanA[f],c.senkouSpanB[f-1],c.senkouSpanB[f]),r={plotX:k.plotX,plotY:k.plotY,isNull:!1,intersectPoint:!0},k&&(c.senkouSpanA.splice(f,0,r),c.senkouSpanB.splice(f,
0,r),v.push(f)))}J(c,function(b,c){e[c]&&"senkouSpan"!==c&&(a.points=n[x],a.options=B(e[c].styles,m),a.graph=a["graph"+c],a.fillGraph=!1,a.color=h,u.prototype.drawGraph.call(a),a["graph"+c]=a.graph);x++});a.graphCollection&&a.graphCollection.forEach(function(b){a[b].destroy();delete a[b]});a.graphCollection=[];if(p&&c.senkouSpanA[0]&&c.senkouSpanB[0]){v.unshift(0);v.push(c.senkouSpanA.length-1);for(g=0;g<v.length-1;g++){f=v[g];k=v[g+1];b=c.senkouSpanB.slice(f,k+1);f=c.senkouSpanA.slice(f,k+1);if(1<=
Math.floor(b.length/2))if(k=Math.floor(b.length/2),b[k].plotY===f[k].plotY){for(z=r=k=0;z<b.length;z++)k+=b[z].plotY,r+=f[z].plotY;k=k>r?0:1}else k=b[k].plotY>f[k].plotY?0:1;else k=b[0].plotY>f[0].plotY?0:1;q[k]=q[k].concat(b);A[k]=A[k].concat(f)}["graphsenkouSpanColor","graphsenkouSpanNegativeColor"].forEach(function(b,c){q[c].length&&A[c].length&&(y=0===c?w:p,D({indicator:a,points:q[c],nextPoints:A[c],color:y,options:e,gap:m,graph:a[b]}),a[b]=a.graph,a.graphCollection.push(b))})}else D({indicator:a,
points:c.senkouSpanB,nextPoints:c.senkouSpanA,color:w,options:e,gap:m,graph:a.graphsenkouSpan}),a.graphsenkouSpan=a.graph;delete a.nextPoints;delete a.fillGraph;a.points=d;a.options=e;a.graph=l},getGraphPath:function(a){a=a||this.points;if(this.fillGraph&&this.nextPoints){var d=u.prototype.getGraphPath.call(this,this.nextPoints);d[0][0]="L";var b=u.prototype.getGraphPath.call(this,a);d=d.slice(0,b.length);for(var e=d.length-1;0<=e;e--)b.push(d[e])}else b=u.prototype.getGraphPath.apply(this,arguments);
return b},getValues:function(a,d){var b=d.period,e=d.periodTenkan;d=d.periodSenkouSpanB;var l=a.xData,h=a.yData,m=h&&h.length||0;a=G(a.xAxis);var g=[],n=[],c;if(!(l.length<=b)&&I(h[0])&&4===h[0].length){var v=l[0]-b*a;for(c=0;c<b;c++)n.push(v+c*a);for(c=0;c<m;c++){if(c>=e){var f=h.slice(c-e,c);f=y(f);f=(f.high+f.low)/2}if(c>=b){var w=h.slice(c-b,c);w=y(w);w=(w.high+w.low)/2;var x=(f+w)/2}if(c>=d){var q=h.slice(c-d,c);q=y(q);q=(q.high+q.low)/2}v=h[c][3];var u=l[c];g[c]===p&&(g[c]=[]);g[c+b]===p&&(g[c+
b]=[]);g[c+b][0]=f;g[c+b][1]=w;g[c+b][2]=p;g[c][2]=v;c<=b&&(g[c+b][3]=p,g[c+b][4]=p);g[c+2*b]===p&&(g[c+2*b]=[]);g[c+2*b][3]=x;g[c+2*b][4]=q;n.push(u)}for(c=1;c<=b;c++)n.push(u+c*a);return{values:g,xData:n,yData:g}}}});""});l(e,"masters/indicators/ichimoku-kinko-hyo.src.js",[],function(){})});
//# sourceMappingURL=ichimoku-kinko-hyo.js.map