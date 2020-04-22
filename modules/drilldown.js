/*
 Highcharts JS v8.0.4 (2020-04-22)

 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/drilldown",["highcharts"],function(m){c(m);c.Highcharts=m;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function m(c,m,u,x){c.hasOwnProperty(m)||(c[m]=x.apply(null,u))}c=c?c._modules:{};m(c,"modules/drilldown.src.js",[c["parts/Globals.js"],c["parts/Color.js"],c["parts/Point.js"],c["parts/Tick.js"],c["parts/Utilities.js"]],
function(c,m,u,x,l){var n=l.addEvent,E=l.removeEvent,A=l.animObject,t=l.extend,y=l.fireEvent,F=l.format,v=l.merge,B=l.objectEach,w=l.pick,G=l.syncTimeout,H=c.noop;l=c.defaultOptions;var p=c.Chart,r=c.seriesTypes,C=r.pie;r=r.column;var D=1;t(l.lang,{drillUpText:"\u25c1 Back to {series.name}"});l.drilldown={activeAxisLabelStyle:{cursor:"pointer",color:"#003399",fontWeight:"bold",textDecoration:"underline"},activeDataLabelStyle:{cursor:"pointer",color:"#003399",fontWeight:"bold",textDecoration:"underline"},
animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};c.SVGRenderer.prototype.Element.prototype.fadeIn=function(a){this.attr({opacity:.1,visibility:"inherit"}).animate({opacity:w(this.newOpacity,1)},a||{duration:250})};p.prototype.addSeriesAsDrilldown=function(a,b){this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown()};p.prototype.addSingleSeriesAsDrilldown=function(a,b){var d=a.series,f=d.xAxis,e=d.yAxis,g=[],h=[],q;var k=this.styledMode?{colorIndex:w(a.colorIndex,d.colorIndex)}:
{color:a.color||d.color};this.drilldownLevels||(this.drilldownLevels=[]);var c=d.options._levelNumber||0;(q=this.drilldownLevels[this.drilldownLevels.length-1])&&q.levelNumber!==c&&(q=void 0);b=t(t({_ddSeriesId:D++},k),b);var l=d.points.indexOf(a);d.chart.series.forEach(function(a){a.xAxis!==f||a.isDrilling||(a.options._ddSeriesId=a.options._ddSeriesId||D++,a.options._colorIndex=a.userOptions._colorIndex,a.options._levelNumber=a.options._levelNumber||c,q?(g=q.levelSeries,h=q.levelSeriesOptions):(g.push(a),
a.purgedOptions=v({_ddSeriesId:a.options._ddSeriesId,_levelNumber:a.options._levelNumber,selected:a.options.selected},a.userOptions),h.push(a.purgedOptions)))});a=t({levelNumber:c,seriesOptions:d.options,seriesPurgedOptions:d.purgedOptions,levelSeriesOptions:h,levelSeries:g,shapeArgs:a.shapeArgs,bBox:a.graphic?a.graphic.getBBox():{},color:a.isNull?(new m(k.color)).setOpacity(0).get():k.color,lowerSeriesOptions:b,pointOptions:d.options.data[l],pointIndex:l,oldExtremes:{xMin:f&&f.userMin,xMax:f&&f.userMax,
yMin:e&&e.userMin,yMax:e&&e.userMax},resetZoomButton:this.resetZoomButton},k);this.drilldownLevels.push(a);f&&f.names&&(f.names.length=0);b=a.lowerSeries=this.addSeries(b,!1);b.options._levelNumber=c+1;f&&(f.oldPos=f.pos,f.userMin=f.userMax=null,e.userMin=e.userMax=null);d.type===b.type&&(b.animate=b.animateDrilldown||H,b.options.animation=!0)};p.prototype.applyDrilldown=function(){var a=this.drilldownLevels;if(a&&0<a.length){var b=a[a.length-1].levelNumber;this.drilldownLevels.forEach(function(a){a.levelNumber===
b&&a.levelSeries.forEach(function(a){a.options&&a.options._levelNumber===b&&a.remove(!1)})})}this.resetZoomButton&&(this.resetZoomButton.hide(),delete this.resetZoomButton);this.pointer.reset();this.redraw();this.showDrillUpButton();y(this,"afterDrilldown")};p.prototype.getDrilldownBackText=function(){var a=this.drilldownLevels;if(a&&0<a.length)return a=a[a.length-1],a.series=a.seriesOptions,F(this.options.lang.drillUpText,a)};p.prototype.showDrillUpButton=function(){var a=this,b=this.getDrilldownBackText(),
d=a.options.drilldown.drillUpButton,f;if(this.drillUpButton)this.drillUpButton.attr({text:b}).align();else{var e=(f=d.theme)&&f.states;this.drillUpButton=this.renderer.button(b,null,null,function(){a.drillUp()},f,e&&e.hover,e&&e.select).addClass("highcharts-drillup-button").attr({align:d.position.align,zIndex:7}).add().align(d.position,!1,d.relativeTo||"plotBox")}};p.prototype.drillUp=function(){if(this.drilldownLevels&&0!==this.drilldownLevels.length){for(var a=this,b=a.drilldownLevels,d=b[b.length-
1].levelNumber,f=b.length,e=a.series,g,h,c,k,l=function(b){e.forEach(function(a){a.options._ddSeriesId===b._ddSeriesId&&(d=a)});var d=d||a.addSeries(b,!1);d.type===c.type&&d.animateDrillupTo&&(d.animate=d.animateDrillupTo);b===h.seriesPurgedOptions&&(k=d)};f--;)if(h=b[f],h.levelNumber===d){b.pop();c=h.lowerSeries;if(!c.chart)for(g=e.length;g--;)if(e[g].options.id===h.lowerSeriesOptions.id&&e[g].options._levelNumber===d+1){c=e[g];break}c.xData=[];h.levelSeriesOptions.forEach(l);y(a,"drillup",{seriesOptions:h.seriesPurgedOptions||
h.seriesOptions});k.type===c.type&&(k.drilldownLevel=h,k.options.animation=a.options.drilldown.animation,c.animateDrillupFrom&&c.chart&&c.animateDrillupFrom(h));k.options._levelNumber=d;c.remove(!1);k.xAxis&&(g=h.oldExtremes,k.xAxis.setExtremes(g.xMin,g.xMax,!1),k.yAxis.setExtremes(g.yMin,g.yMax,!1));h.resetZoomButton&&(a.resetZoomButton=h.resetZoomButton,a.resetZoomButton.show())}this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();
this.ddDupes.length=[];y(a,"drillupall")}};n(p,"afterInit",function(){var a=this;a.drilldown={update:function(b,d){v(!0,a.options.drilldown,b);w(d,!0)&&a.redraw()}}});n(p,"beforeShowResetZoom",function(){if(this.drillUpButton)return!1});n(p,"render",function(){(this.xAxis||[]).forEach(function(a){a.ddPoints={};a.series.forEach(function(b){var d,f=b.xData||[],e=b.points;for(d=0;d<f.length;d++){var c=b.options.data[d];"number"!==typeof c&&(c=b.pointClass.prototype.optionsToObject.call({series:b},c),
c.drilldown&&(a.ddPoints[f[d]]||(a.ddPoints[f[d]]=[]),a.ddPoints[f[d]].push(e?e[d]:!0)))}});B(a.ticks,x.prototype.drillable)})});r.prototype.animateDrillupTo=function(a){if(!a){var b=this,d=b.drilldownLevel;this.points.forEach(function(a){var b=a.dataLabel;a.graphic&&a.graphic.hide();b&&(b.hidden="hidden"===b.attr("visibility"),b.hidden||(b.hide(),a.connector&&a.connector.hide()))});G(function(){b.points&&b.points.forEach(function(a,b){b=b===(d&&d.pointIndex)?"show":"fadeIn";var f="show"===b?!0:void 0,
c=a.dataLabel;if(a.graphic)a.graphic[b](f);c&&!c.hidden&&(c.fadeIn(),a.connector&&a.connector.fadeIn())})},Math.max(this.chart.options.drilldown.animation.duration-50,0));delete this.animate}};r.prototype.animateDrilldown=function(a){var b=this,d=this.chart,f=d.drilldownLevels,c,g=A(d.options.drilldown.animation),h=this.xAxis,q=d.styledMode;a||(f.forEach(function(a){b.options._ddSeriesId===a.lowerSeriesOptions._ddSeriesId&&(c=a.shapeArgs,q||(c.fill=a.color))}),c.x+=w(h.oldPos,h.pos)-h.pos,this.points.forEach(function(a){var d=
a.shapeArgs;q||(d.fill=a.color);a.graphic&&a.graphic.attr(c).animate(t(a.shapeArgs,{fill:a.color||b.color}),g);a.dataLabel&&a.dataLabel.fadeIn(g)}),delete this.animate)};r.prototype.animateDrillupFrom=function(a){var b=A(this.chart.options.drilldown.animation),d=this.group,c=d!==this.chart.columnGroup,e=this;e.trackerGroups.forEach(function(a){if(e[a])e[a].on("mouseover")});c&&delete this.group;this.points.forEach(function(f){var h=f.graphic,g=a.shapeArgs,k=function(){h.destroy();d&&c&&(d=d.destroy())};
h&&(delete f.graphic,e.chart.styledMode||(g.fill=a.color),b.duration?h.animate(g,v(b,{complete:k})):(h.attr(g),k()))})};C&&t(C.prototype,{animateDrillupTo:r.prototype.animateDrillupTo,animateDrillupFrom:r.prototype.animateDrillupFrom,animateDrilldown:function(a){var b=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],d=this.chart.options.drilldown.animation,c=b.shapeArgs,e=c.start,g=(c.end-e)/this.points.length,h=this.chart.styledMode;a||(this.points.forEach(function(a,f){var k=a.shapeArgs;
h||(c.fill=b.color,k.fill=a.color);if(a.graphic)a.graphic.attr(v(c,{start:e+f*g,end:e+(f+1)*g}))[d?"animate":"attr"](k,d)}),delete this.animate)}});u.prototype.doDrilldown=function(a,b,d){var c=this.series.chart,e=c.options.drilldown,g=(e.series||[]).length;c.ddDupes||(c.ddDupes=[]);for(;g--&&!h;)if(e.series[g].id===this.drilldown&&-1===c.ddDupes.indexOf(this.drilldown)){var h=e.series[g];c.ddDupes.push(this.drilldown)}y(c,"drilldown",{point:this,seriesOptions:h,category:b,originalEvent:d,points:"undefined"!==
typeof b&&this.series.xAxis.getDDPoints(b).slice(0)},function(b){var d=b.point.series&&b.point.series.chart,c=b.seriesOptions;d&&c&&(a?d.addSingleSeriesAsDrilldown(b.point,c):d.addSeriesAsDrilldown(b.point,c))})};c.Axis.prototype.drilldownCategory=function(a,b){B(this.getDDPoints(a),function(d){d&&d.series&&d.series.visible&&d.doDrilldown&&d.doDrilldown(!0,a,b)});this.chart.applyDrilldown()};c.Axis.prototype.getDDPoints=function(a){return this.ddPoints&&this.ddPoints[a]};x.prototype.drillable=function(){var a=
this.pos,b=this.label,d=this.axis,c="xAxis"===d.coll&&d.getDDPoints,e=c&&d.getDDPoints(a),g=d.chart.styledMode;c&&(b&&e&&e.length?(b.drillable=!0,b.basicStyles||g||(b.basicStyles=v(b.styles)),b.addClass("highcharts-drilldown-axis-label"),b.removeOnDrillableClick&&E(b.element,"click"),b.removeOnDrillableClick=n(b.element,"click",function(b){b.preventDefault();d.drilldownCategory(a,b)}),g||b.css(d.chart.options.drilldown.activeAxisLabelStyle)):b&&b.drillable&&b.removeOnDrillableClick&&(g||(b.styles=
{},b.css(b.basicStyles)),b.removeOnDrillableClick(),b.removeClass("highcharts-drilldown-axis-label")))};n(u,"afterInit",function(){var a=this,b=a.series;a.drilldown&&n(a,"click",function(c){b.xAxis&&!1===b.chart.options.drilldown.allowPointDrilldown?b.xAxis.drilldownCategory(a.x,c):a.doDrilldown(void 0,void 0,c)});return a});n(c.Series,"afterDrawDataLabels",function(){var a=this.chart.options.drilldown.activeDataLabelStyle,b=this.chart.renderer,c=this.chart.styledMode;this.points.forEach(function(d){var e=
d.options.dataLabels,f=w(d.dlOptions,e&&e.style,{});d.drilldown&&d.dataLabel&&("contrast"!==a.color||c||(f.color=b.getContrast(d.color||this.color)),e&&e.color&&(f.color=e.color),d.dataLabel.addClass("highcharts-drilldown-data-label"),c||d.dataLabel.css(a).css(f))},this)});var z=function(a,b,c,f){a[c?"addClass":"removeClass"]("highcharts-drilldown-point");f||a.css({cursor:b})};n(c.Series,"afterDrawTracker",function(){var a=this.chart.styledMode;this.points.forEach(function(b){b.drilldown&&b.graphic&&
z(b.graphic,"pointer",!0,a)})});n(u,"afterSetState",function(){var a=this.series.chart.styledMode;this.drilldown&&this.series.halo&&"hover"===this.state?z(this.series.halo,"pointer",!0,a):this.series.halo&&z(this.series.halo,"auto",!1,a)})});m(c,"masters/modules/drilldown.src.js",[],function(){})});
//# sourceMappingURL=drilldown.js.map