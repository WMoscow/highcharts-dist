/*
 Highcharts JS v8.0.4 (2020-04-22)

 (c) 2017-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/venn",["highcharts"],function(q){a(q);a.Highcharts=q;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function q(a,e,f,k){a.hasOwnProperty(e)||(a[e]=k.apply(null,f))}a=a?a._modules:{};q(a,"mixins/draw-point.js",[],function(){var a=function(e){var f,a=this,t=a.graphic,p=e.animatableAttribs,h=e.onComplete,z=e.css,q=e.renderer,
u=null===(f=a.series)||void 0===f?void 0:f.options.animation;if(a.shouldDraw())t||(a.graphic=t=q[e.shapeType](e.shapeArgs).add(e.group)),t.css(z).attr(e.attribs).animate(p,e.isNew?!1:u,h);else if(t){var r=function(){a.graphic=t=t.destroy();"function"===typeof h&&h()};Object.keys(p).length?t.animate(p,void 0,function(){r()}):r()}};return function(e){(e.attribs=e.attribs||{})["class"]=this.getClassName();a.call(this,e)}});q(a,"mixins/geometry.js",[],function(){return{getAngleBetweenPoints:function(a,
e){return Math.atan2(e.x-a.x,e.y-a.y)},getCenterOfPoints:function(a){var e=a.reduce(function(e,a){e.x+=a.x;e.y+=a.y;return e},{x:0,y:0});return{x:e.x/a.length,y:e.y/a.length}},getDistanceBetweenPoints:function(a,e){return Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-a.y,2))}}});q(a,"mixins/geometry-circles.js",[a["mixins/geometry.js"]],function(a){function e(c,b){b=Math.pow(10,b);return Math.round(c*b)/b}function f(c){if(0>=c)throw Error("radius of circle must be a positive number.");return Math.PI*
c*c}function k(c,b){return c*c*Math.acos(1-b/c)-(c-b)*Math.sqrt(b*(2*c-b))}function t(c,b){var a=v(c,b),g=c.r,f=b.r,h=[];if(a<g+f&&a>Math.abs(g-f)){g*=g;var k=(g-f*f+a*a)/(2*a);f=Math.sqrt(g-k*k);g=c.x;h=b.x;c=c.y;var p=b.y;b=g+k*(h-g)/a;k=c+k*(p-c)/a;c=f/a*-(p-c);a=f/a*-(h-g);h=[{x:e(b+c,14),y:e(k-a,14)},{x:e(b-c,14),y:e(k+a,14)}]}return h}function p(c){return c.reduce(function(c,a,e,f){f=f.slice(e+1).reduce(function(c,b,f){var g=[e,f+e+1];return c.concat(t(a,b).map(function(c){c.indexes=g;return c}))},
[]);return c.concat(f)},[])}function h(c,b){return v(c,b)<=b.r+1e-10}function z(c,b){return!b.some(function(b){return!h(c,b)})}function q(c){return p(c).filter(function(b){return z(b,c)})}var u=a.getAngleBetweenPoints,r=a.getCenterOfPoints,v=a.getDistanceBetweenPoints;return{getAreaOfCircle:f,getAreaOfIntersectionBetweenCircles:function(c){var b=q(c);if(1<b.length){var a=r(b);b=b.map(function(c){c.angle=u(a,c);return c}).sort(function(c,b){return b.angle-c.angle});var e=b[b.length-1];b=b.reduce(function(b,
a){var e=b.startPoint,f=r([e,a]),g=a.indexes.filter(function(c){return-1<e.indexes.indexOf(c)}).reduce(function(b,g){g=c[g];var h=u(g,a),k=u(g,e);h=k-(k-h+(k<h?2*Math.PI:0))/2;h=v(f,{x:g.x+g.r*Math.sin(h),y:g.y+g.r*Math.cos(h)});g=g.r;h>2*g&&(h=2*g);if(!b||b.width>h)b={r:g,largeArc:h>g?1:0,width:h,x:a.x,y:a.y};return b},null);if(g){var h=g.r;b.arcs.push(["A",h,h,0,g.largeArc,1,g.x,g.y]);b.startPoint=a}return b},{startPoint:e,arcs:[]}).arcs;if(0!==b.length&&1!==b.length){b.unshift(["M",e.x,e.y]);var f=
{center:a,d:b}}}return f},getCircleCircleIntersection:t,getCirclesIntersectionPoints:p,getCirclesIntersectionPolygon:q,getCircularSegmentArea:k,getOverlapBetweenCircles:function(c,b,a){var g=0;a<c+b&&(a<=Math.abs(b-c)?g=f(c<b?c:b):(g=(c*c-b*b+a*a)/(2*a),a-=g,g=k(c,c-g)+k(b,b-a)),g=e(g,14));return g},isCircle1CompletelyOverlappingCircle2:function(c,a){return v(c,a)+a.r<c.r+1e-10},isPointInsideCircle:h,isPointInsideAllCircles:z,isPointOutsideAllCircles:function(a,b){return!b.some(function(c){return h(a,
c)})},round:e}});q(a,"mixins/nelder-mead.js",[],function(){var a=function(a){a=a.slice(0,-1);for(var e=a.length,k=[],q=function(a,e){a.sum+=e[a.i];return a},p=0;p<e;p++)k[p]=a.reduce(q,{sum:0,i:p}).sum/e;return k};return{getCentroid:a,nelderMead:function(e,f){var k=function(a,b){return a.fx-b.fx},q=function(a,b,e,g){return b.map(function(c,b){return a*c+e*g[b]})},p=function(a,b){b.fx=e(b);a[a.length-1]=b;return a},h=function(a){var b=a[0];return a.map(function(a){a=q(.5,b,.5,a);a.fx=e(a);return a})},
t=function(a,b,f,g){a=q(f,a,g,b);a.fx=e(a);return a};f=function(a){var b=a.length,c=Array(b+1);c[0]=a;c[0].fx=e(a);for(var g=0;g<b;++g){var f=a.slice();f[g]=f[g]?1.05*f[g]:.001;f.fx=e(f);c[g+1]=f}return c}(f);for(var A=0;100>A;A++){f.sort(k);var u=f[f.length-1],r=a(f),v=t(r,u,2,-1);v.fx<f[0].fx?(u=t(r,u,3,-2),f=p(f,u.fx<v.fx?u:v)):v.fx>=f[f.length-2].fx?v.fx>u.fx?(r=t(r,u,.5,.5),f=r.fx<u.fx?p(f,r):h(f)):(r=t(r,u,1.5,-.5),f=r.fx<v.fx?p(f,r):h(f)):f=p(f,v)}return f[0]}}});q(a,"modules/venn.src.js",
[a["parts/Globals.js"],a["mixins/draw-point.js"],a["mixins/geometry.js"],a["mixins/geometry-circles.js"],a["mixins/nelder-mead.js"],a["parts/Color.js"],a["parts/Utilities.js"]],function(a,e,f,k,q,p,h){function t(a,b){var d=a.sets,m=b.reduce(function(a,b){var n=-1<d.indexOf(b.sets[0]);a[n?"internal":"external"].push(b.circle);return a},{internal:[],external:[]});m.external=m.external.filter(function(a){return m.internal.some(function(d){return!R(a,d)})});a=X(m.internal,m.external);b=J(a,m.internal,
m.external);return{position:a,width:b}}function A(a){var d={},b={};if(0<a.length){var m=K(a),n=a.filter(y);a.forEach(function(a){var l=a.sets,c=l.join();if(l=y(a)?m[c]:r(l.map(function(a){return m[a]})))d[c]=l,b[c]=t(a,n)})}return{mapOfIdToShape:d,mapOfIdToLabelValues:b}}var u=k.getAreaOfCircle,r=k.getAreaOfIntersectionBetweenCircles,v=k.getCircleCircleIntersection,c=k.getCirclesIntersectionPolygon,b=k.getOverlapBetweenCircles,R=k.isCircle1CompletelyOverlappingCircle2,g=k.isPointInsideAllCircles,
S=k.isPointInsideCircle,F=k.isPointOutsideAllCircles,T=q.nelderMead,U=p.parse;p=h.addEvent;var V=h.animObject,G=h.extend,x=h.isArray,w=h.isNumber,B=h.isObject,W=h.isString,H=h.merge;h=h.seriesType;var Y=f.getCenterOfPoints,C=f.getDistanceBetweenPoints;a=a.seriesTypes;var Z=function(a){return Object.keys(a).map(function(d){return a[d]})},aa=function(a){var d=0;2===a.length&&(d=a[0],a=a[1],d=b(d.r,a.r,C(d,a)));return d},L=function(a,b){return b.reduce(function(d,b){var n=0;1<b.sets.length&&(n=b.value,
b=aa(b.sets.map(function(b){return a[b]})),b=n-b,n=Math.round(b*b*1E11)/1E11);return d+n},0)},M=function(a,b,l,c,n){var d=a(b),m=a(l);n=n||100;c=c||1e-10;var e=l-b,f=1;if(b>=l)throw Error("a must be smaller than b.");if(0<d*m)throw Error("f(a) and f(b) must have opposite signs.");if(0===d)var g=b;else if(0===m)g=l;else for(;f++<=n&&0!==I&&e>c;){e=(l-b)/2;g=b+e;var I=a(g);0<d*I?b=g:l=g}return g},D=function(a,c,l){var d=a+c;return 0>=l?d:u(a<c?a:c)<=l?0:M(function(d){d=b(a,c,d);return l-d},0,d)},y=
function(a){return x(a.sets)&&1===a.sets.length},E=function(a,b,c){b=b.reduce(function(b,d){d=d.r-C(a,d);return d<=b?d:b},Number.MAX_VALUE);return b=c.reduce(function(b,d){d=C(a,d)-d.r;return d<=b?d:b},b)},X=function(a,b){var d=a.reduce(function(d,c){var l=c.r/2;return[{x:c.x,y:c.y},{x:c.x+l,y:c.y},{x:c.x-l,y:c.y},{x:c.x,y:c.y+l},{x:c.x,y:c.y-l}].reduce(function(d,c){var l=E(c,a,b);d.margin<l&&(d.point=c,d.margin=l);return d},d)},{point:void 0,margin:-Number.MAX_VALUE}).point;d=T(function(d){return-E({x:d[0],
y:d[1]},a,b)},[d.x,d.y]);d={x:d[0],y:d[1]};g(d,a)&&F(d,b)||(d=1<a.length?Y(c(a)):{x:a[0].x,y:a[0].y});return d},J=function(a,b,c){var d=b.reduce(function(a,b){return Math.min(b.r,a)},Infinity),l=c.filter(function(b){return!S(a,b)});c=function(d,c){return M(function(e){var n={x:a.x+c*e,y:a.y};n=g(n,b)&&F(n,l);return-(d-e)+(n?0:Number.MAX_VALUE)},0,d)};return 2*Math.min(c(d,-1),c(d,1))},N=function(a){var b=a.filter(function(a){return 2===a.sets.length}).reduce(function(a,b){b.sets.forEach(function(d,
c,e){B(a[d])||(a[d]={overlapping:{},totalOverlap:0});a[d].totalOverlap+=b.value;a[d].overlapping[e[1-c]]=b.value});return a},{});a.filter(y).forEach(function(a){G(a,b[a.sets[0]])});return a},O=function(a,b){return b.totalOverlap-a.totalOverlap},K=function(a){var b=[],d={};a.filter(function(a){return 1===a.sets.length}).forEach(function(a){d[a.sets[0]]=a.circle={x:Number.MAX_VALUE,y:Number.MAX_VALUE,r:Math.sqrt(a.value/Math.PI)}});var c=function(a,d){var c=a.circle;c.x=d.x;c.y=d.y;b.push(a)};N(a);
var e=a.filter(y).sort(O);c(e.shift(),{x:0,y:0});var g=a.filter(function(a){return 2===a.sets.length});e.forEach(function(a){var e=a.circle,f=e.r,l=a.overlapping,n=b.reduce(function(a,c,n){var m=c.circle,h=D(f,m.r,l[c.sets[0]]),k=[{x:m.x+h,y:m.y},{x:m.x-h,y:m.y},{x:m.x,y:m.y+h},{x:m.x,y:m.y-h}];b.slice(n+1).forEach(function(a){var b=a.circle;a=D(f,b.r,l[a.sets[0]]);k=k.concat(v({x:m.x,y:m.y,r:h},{x:b.x,y:b.y,r:a}))});k.forEach(function(b){e.x=b.x;e.y=b.y;var c=L(d,g);c<a.loss&&(a.loss=c,a.coordinates=
b)});return a},{loss:Number.MAX_VALUE,coordinates:void 0});c(a,n.coordinates)});return d},P=function(a){var b={};return B(a)&&w(a.value)&&-1<a.value&&x(a.sets)&&0<a.sets.length&&!a.sets.some(function(a){var c=!1;!b[a]&&W(a)?b[a]=!0:c=!0;return c})},Q=function(a){a=x(a)?a:[];var b=a.reduce(function(a,b){P(b)&&y(b)&&0<b.value&&-1===a.indexOf(b.sets[0])&&a.push(b.sets[0]);return a},[]).sort(),c=a.reduce(function(a,c){P(c)&&!c.sets.some(function(a){return-1===b.indexOf(a)})&&(a[c.sets.sort().join()]=
c);return a},{});b.reduce(function(a,b,c,d){d.slice(c+1).forEach(function(c){a.push(b+","+c)});return a},[]).forEach(function(a){if(!c[a]){var b={sets:a.split(","),value:0};c[a]=b}});return Z(c)},ba=function(a,b,c){var d=c.bottom-c.top,e=c.right-c.left;d=Math.min(0<e?1/e*a:1,0<d?1/d*b:1);return{scale:d,centerX:a/2-(c.right+c.left)/2*d,centerY:b/2-(c.top+c.bottom)/2*d}};h("venn","scatter",{borderColor:"#cccccc",borderDashStyle:"solid",borderWidth:1,brighten:0,clip:!1,colorByPoint:!0,dataLabels:{enabled:!0,
verticalAlign:"middle",formatter:function(){return this.point.name}},inactiveOtherPoints:!0,marker:!1,opacity:.75,showInLegend:!1,states:{hover:{opacity:1,borderColor:"#333333"},select:{color:"#cccccc",borderColor:"#000000",animation:!1},inactive:{opacity:.075}},tooltip:{pointFormat:"{point.name}: {point.value}"}},{isCartesian:!1,axisTypes:[],directTouch:!0,pointArrayMap:["value"],translate:function(){var a=this.chart;this.processedXData=this.xData;this.generatePoints();var b=Q(this.options.data);
b=A(b);var c=b.mapOfIdToShape,e=b.mapOfIdToLabelValues;b=Object.keys(c).filter(function(a){return(a=c[a])&&w(a.r)}).reduce(function(a,b){var d=c[b];b=d.x-d.r;var e=d.x+d.r,f=d.y+d.r;d=d.y-d.r;if(!w(a.left)||a.left>b)a.left=b;if(!w(a.right)||a.right<e)a.right=e;if(!w(a.top)||a.top>d)a.top=d;if(!w(a.bottom)||a.bottom<f)a.bottom=f;return a},{top:0,bottom:0,left:0,right:0});a=ba(a.plotWidth,a.plotHeight,b);var f=a.scale,g=a.centerX,h=a.centerY;this.points.forEach(function(a){var b=x(a.sets)?a.sets:[],
d=b.join(),l=c[d],k=e[d]||{};d=k.width;k=k.position;var n=a.options&&a.options.dataLabels;if(l){if(l.r)var m={x:g+l.x*f,y:h+l.y*f,r:l.r*f};else l.d&&(l=l.d,l.forEach(function(a){"M"===a[0]?(a[1]=g+a[1]*f,a[2]=h+a[2]*f):"A"===a[0]&&(a[1]*=f,a[2]*=f,a[6]=g+a[6]*f,a[7]=h+a[7]*f)}),m={d:l});k?(k.x=g+k.x*f,k.y=h+k.y*f):k={};w(d)&&(d=Math.round(d*f))}a.shapeArgs=m;k&&m&&(a.plotX=k.x,a.plotY=k.y);d&&m&&(a.dlOptions=H(!0,{style:{width:d}},B(n)&&n));a.name=a.options.name||b.join("\u2229")})},drawPoints:function(){var a=
this,b=a.chart,c=a.group,e=b.renderer;(a.points||[]).forEach(function(d){var f={zIndex:x(d.sets)?d.sets.length:0},g=d.shapeArgs;b.styledMode||G(f,a.pointAttribs(d,d.state));d.draw({isNew:!d.graphic,animatableAttribs:g,attribs:f,group:c,renderer:e,shapeType:g&&g.d?"path":"circle"})})},pointAttribs:function(a,b){var c=this.options||{};a=H(c,{color:a&&a.color},a&&a.options||{},b&&c.states[b]||{});return{fill:U(a.color).setOpacity(a.opacity).brighten(a.brightness).get(),stroke:a.borderColor,"stroke-width":a.borderWidth,
dashstyle:a.borderDashStyle}},animate:function(a){if(!a){var b=V(this.options.animation);this.points.forEach(function(a){var c=a.shapeArgs;if(a.graphic&&c){var d={},e={};c.d?d.opacity=.001:(d.r=0,e.r=c.r);a.graphic.attr(d).animate(e,b);c.d&&setTimeout(function(){a&&a.graphic&&a.graphic.animate({opacity:1})},b.duration)}},this)}},utils:{addOverlapToSets:N,geometry:f,geometryCircles:k,getLabelWidth:J,getMarginFromCircles:E,getDistanceBetweenCirclesByOverlap:D,layoutGreedyVenn:K,loss:L,nelderMead:q,
processVennData:Q,sortByTotalOverlap:O}},{draw:e,shouldDraw:function(){return!!this.shapeArgs},isValid:function(){return w(this.value)}});p(a.venn,"afterSetOptions",function(a){var b=a.options.states;this.is("venn")&&Object.keys(b).forEach(function(a){b[a].halo=!1})})});q(a,"masters/modules/venn.src.js",[],function(){})});
//# sourceMappingURL=venn.js.map