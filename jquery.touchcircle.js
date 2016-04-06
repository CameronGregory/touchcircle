/*!
 * jQuery Touch Circle
 * Copyright (c) 2016 Cameron Gregory http://www.bloke.com/
 * Display indicators for touch events
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";
		// Create the defaults once
		var createTouchDiv = function(me) {
			var touchPointDiv = $("<div class='touchcircle_point'></div");
			touchPointDiv.css("width",me.settings.radius*2);
			touchPointDiv.css("height",me.settings.radius*2);
			touchPointDiv.css("border","4px solid black");
			touchPointDiv.css("background","#999");
			touchPointDiv.css("opacity","0.5");
			touchPointDiv.css("border-radius","50%");
			return touchPointDiv;
		};
		var pluginName = "touchCircle",
			defaults = {
				enabled: true,
				radius: 50,
				createTouchDiv: createTouchDiv
			};

		function TouchCircle ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		$.extend( TouchCircle.prototype, {
			init: function() {
				if (!this.settings.enabled)
					return;
				var e =  $(this.element);
				var overlay = $("<div class='touchcircle_overlay'></div").appendTo(e);
				var touchDivs = {};
				var offset = e.offset();
				this.left = e.offset().left + parseInt(e.css("border-left-width")) + parseInt(e.css("padding-left"));
				this.top = e.offset().top + parseInt(e.css("border-top-width")) + parseInt(e.css("padding-top"));

				overlay.css("position","absolute");
				overlay.css("left",this.left);
				overlay.css("top",this.top);
				overlay.css("width",e.width());
				overlay.css("height",e.height());
				//overlay.css("background","#f00");
				overlay.css("pointer-events","none");
				//overlay.css("opacity",0.5);
				var data = {this:this,element:e,overlay:overlay,touchDivs:touchDivs};
                        	e.bind("touchstart",data,this.touchStartFn);
                        	e.bind("touchmove",data,this.touchMoveFn);
                        	e.bind("touchend",data,this.touchEndFn);
                        	e.bind("mousemove",data,this.mouseMoveFn);
			},
			touchStartFn: function(event) {
				console.log("touch start:");
				var me = event.data.this;
				var touchDivs = event.data.touchDivs;
				var settings = event.data.this.settings;
				var ct = event.originalEvent.changedTouches;
				var left = me.left;
				var top = me.top;
				for (var i =0;i<ct.length;i++) {
					var e1 = ct[i];
					var id = "tc_"+ e1.identifier;
					var touchPointDiv = settings.createTouchDiv(me);
					touchPointDiv.appendTo(event.data.overlay);
					touchPointDiv.css("position","absolute");
					touchPointDiv.attr("id",id);

					touchDivs[id] = touchPointDiv;
					touchPointDiv.css("left",e1.screenX-settings.radius-left);
					touchPointDiv.css("top",e1.screenY-settings.radius-top);
				}
			},
			touchMoveFn: function(event) {
				console.log("touch move:");
				var me = event.data.this;
				var touchDivs = event.data.touchDivs;
				var settings = event.data.this.settings;
				var ct = event.originalEvent.changedTouches;
				var left = me.left;
				var top = me.top;
				for (var i =0;i<ct.length;i++) {
					var e1 = ct[i];
					var id = "tc_"+ e1.identifier;
					var touchPointDiv = $("#"+id);
					touchPointDiv.css("left",e1.screenX-settings.radius-left);
					touchPointDiv.css("top",e1.screenY-settings.radius-top);
				}
			},
			touchEndFn: function(event) {
				console.log("touch end:");
				var me = event.data.this;
				var touchDivs = event.data.touchDivs;
				var settings = event.data.this.settings;
				var ct = event.originalEvent.changedTouches;
				for (var i =0;i<ct.length;i++) {
					var e1 = ct[i];
					var id = "tc_"+ e1.identifier;
					var touchPointDiv = $("#"+id).remove();
				}
			},
			mouseMoveFn: function(event) {
				console.log("mm:");
				var me = event.data.this;
				// var touchDivs = event.data.touchDivs;
				// touchDivs[0].css("left",event.offsetX-me.settings.radius);
				// touchDivs[0].css("top",event.offsetY-me.settings.radius);
			}
		} );


		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new TouchCircle( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
