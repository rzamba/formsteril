/**
 * $.include - script inclusion jQuery plugin
 * Based on idea from http://www.gnucitizen.org/projects/jquery-include/
 * @author Tobiasz Cudnik
 * @link http://meta20.net/.include_script_inclusion_jQuery_plugin
 * @license MIT
 */
// overload jquery's onDomReady
if ( jQuery.browser.mozilla || jQuery.browser.opera ) {
	document.removeEventListener( "DOMContentLoaded", jQuery.ready, false );
	document.addEventListener( "DOMContentLoaded", function(){ jQuery.ready(); }, false );
}
jQuery.event.remove( window, "load", jQuery.ready );
jQuery.event.add( window, "load", function(){ jQuery.ready(); } );
jQuery.extend({
	includeStates: {},
	include: function(url, callback, dependency){
		if ( typeof callback != 'function' && ! dependency ) {
			dependency = callback;
			callback = null;
		}
		url = url.replace('\n', '');
		jQuery.includeStates[url] = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = function () {
			jQuery.includeStates[url] = true;
			if ( callback )
				callback.call(script);
		};
		script.onreadystatechange = function () {
			if ( this.readyState != "complete" && this.readyState != "loaded" ) return;
			jQuery.includeStates[url] = true;
			if ( callback )
				callback.call(script);
		};
		script.src = url;
		if ( dependency ) {
			if ( dependency.constructor != Array )
				dependency = [dependency];
			setTimeout(function(){
				var valid = true;
				$.each(dependency, function(k, v){
					if (! v() ) {
						valid = false;
						return false;
					}
				})
				if ( valid )
					document.getElementsByTagName('head')[0].appendChild(script);
				else
					setTimeout(arguments.callee, 10);
			}, 10);
		}
		else
			document.getElementsByTagName('head')[0].appendChild(script);
		return function(){
			return jQuery.includeStates[url];
		}
	},
	readyOld: jQuery.ready,
	ready: function () {
		if (jQuery.isReady) return;
		imReady = true;
		$.each(jQuery.includeStates, function(url, state) {
			if (! state)
				return imReady = false;
		});
		if (imReady) {
			jQuery.readyOld.apply(jQuery, arguments);
		} else {
			setTimeout(arguments.callee, 10);
		}
	}
});

///// include js files ////////////
 $.include('js/coin-slider.js');
  <!-- floatdialog block -->
	$.include('js/floatdialog.js');
			   
  <!-- floatdialog block -->
  <!-- superfish menu begin -->
	$.include('js/hoverIntent.js');
	$.include('js/superfish.js');
  <!-- superfish menu end -->
  
  <!-- tooltip begin -->
	$.include('js/atooltip.jquery.js');
  <!-- tooltip end -->
  
  
  <!-- contact form begin -->
	$.include('js/runonload.js');
	$.include('js/contact-form.js');
  <!-- contact form end -->
  
	$.include('js/scrollTop.js');
	$.include('js/flashobject.js');
	
  <!-- tabs begin -->
	$.include('js/tabs.js');
  <!-- tabs end -->
  
  <!-- hover-image begin -->
	$.include('js/hover-image.js');
  <!-- hover-image -->

  <!-- prettyPhoto begin -->
	$.include('js/jquery.prettyPhoto.js');
  <!-- prettyPhoto end-->
  
  
  <!-- gallery -->
  $.include('js/jquery.galleriffic.js');
  $.include('js/jquery.opacityrollover.js');
  <!-- gallery -->
  
 
  
	<!-- twitter -->
	$.include('js/jquery.twitter.search.js');
	<!-- twitter -->
	
	
	$.include('js/jquery.cycle.all.latest.js');
 
	<!-- tooltip begin -->
	$.include('js/kwicks-1.5.1.pack.js');
	<!-- tooltip end -->  

	  
		
			
		$(document).ready(function() {
		
		//superfish menu init
		jQuery('ul.sf-menu').superfish();
		
		
		// initiate tool tip
		// basic usage  
		$('.normaltip').aToolTip();  
			
		// fixed tooltip  
		$('.fixedtip').aToolTip({  
				fixed: true  
		});
		$('.clicktip').aToolTip({  
				clickIt: true,  
				tipContent: 'Hello I am aToolTip with content from param'  
		}); 
		
		
		// coin slider
		$(document).ready(function(){
			if ($("#coin-slider").length) {
				$('#coin-slider').coinslider({
					width: 909, // width of slider panel
					height: 463 // height of slider panel
				});
			}
		});
		
		///// jumper ////////////
		$('.hr a').click(
			function (e) {
				$('html, body').animate({scrollTop: '0px'}, 800);
				return false;
			}
		);
		
		
		// accordion
		$("#accordion dt").eq().addClass("active");
		$("#accordion dd").eq().show();
	
		$("#accordion dt").click(function(){
			$(this).next("#accordion dd").slideToggle("slow")
			.siblings("#accordion dd:visible").slideUp("slow");
			$(this).toggleClass("active");
			$(this).siblings("#accordion dt").removeClass("active");
			return false;
		});
			
		// slideDown
		$(".slideDown dt").click(function(){
			$(this).toggleClass("active").parent(".slideDown").find("dd").slideToggle();
		})
			
			
		// kwicks gallery
		$('.kwicks').kwicks({
			max : 600,
			spacing : 0,
			event : 'mouseover'
		});
			
		///// code grabber ////////////
			$(".code a.code-icon").toggle(function(){
				$(this).find("i").text("-");
				$(this).next("div.grabber").slideDown().find("i").text("-");
			}, function(){
				$(this).find("i").text("+");
				$(this).next("div.grabber").slideUp();
			})
			
		});	
		
		
		$(document).ready(function(){
			if ($("#demo6").length) {
				$(document).ready(function(){
					$("#demo6").floatdialog("dialog6", {move: 'down', effect: false})
				})
			};
		});
	
	
		$(function(){

			// Twitter
			
			$(document).ready(function(){
				if ($("#twitter").length) {
					$("#twitter").getTwitter({
						userName: "lorem_ipsum_dol",
						numTweets: 3,
						loaderText: "Loading tweets...",
						slideIn: true,
						showHeading: false,
						headingText: "Latest Tweets",
						showProfileLink: true
					});
				}
			});
			
			
		});
		$(document).ready(function(){
			if ($("a[rel^='prettyPhoto']").length) {
			$(document).ready(function() {
				// prettyPhoto
				$("a[rel^='prettyPhoto']").prettyPhoto({theme:'facebook'});
				
				///// codegrabber ////////////
				$(".code a.code-icon").toggle(function(){
					$(this).addClass("minus").next("p").slideDown();
				}, function(){
					$(this).removeClass("minus").next("p").slideUp();
				})
			});
		}
			});
			
				function onAfter(curr, next, opts, fwd) {
				//get the height of the current slide
				var $ht = $(this).height();
				//set the container's height to that of the current slide
				$(this).parent().animate({height: $ht});
				};
				
			$(document).ready(function(){
				if ($("#shuffle").length) {	
					$.include('js/jquery.easing.1.3.js');
						$('#shuffle').cycle({
							fx:     'shuffle',
							easing: 'backout',
							delay:  -4000
						});
				}
			});	
			$(document).ready(function(){
				if ($("#zoom").length) {
					$('#zoom').cycle({
						fx:    'zoom',
						sync:  false,
						delay: -2000
					});
				}
			});	
			
			$(document).ready(function(){
				if ($("#fade").length) {
					$('#fade').cycle();
				}
			});
			
			$(document).ready(function(){
				if ($("#curtainX").length) {
					$('#curtainX').cycle({
						fx:    'curtainX',
						sync:  false,
						delay: -2000
					 });
				}
			});
			
			$(document).ready(function(){
				if ($("#scrollDown").length) {	
					$('#scrollDown').cycle({ 
							fx:      'scrollDown', 
							speedIn:  2000, 
							speedOut: 500, 
							easeIn:  'bounceout', 
							easeOut: 'backin', 
							delay:   -2000 
						});
				}
			});
			
			$(document).ready(function(){
				if ($("#fade_nav").length) {
					$('#fade_nav').cycle({ 
							fx:     'fade', 
							speed:  'fast', 
							timeout: 0, 
							next:   '#next', 
							prev:   '#prev' 
						});
				}
			});
			
			$(document).ready(function(){
				if ($("#text_slider").length) {	
					$('#text_slider').cycle({ 
						fx:     'scrollHorz', 
						height: 'auto',
						speed:  'slow', 
						timeout: 0, 
						next:   '#next2', 
						prev:   '#prev2',
						after: onAfter
					});
				}
			});
			$(document).ready(function(){
				if ($("#multi_effects").length) {
					$('#multi_effects').cycle({ 
						fx:      'all', 
						speed:  'slow',
						timeout: 2000
					});	
				}
			});
			
			
			
			$(document).ready(function(){
				if ($("#thumbs").length) {
					$('div.content').css('display', 'block');
					// Initially set opacity on thumbs and add
					// additional styling for hover effect on thumbs
					var onMouseOutOpacity = 1.0;
					$('#thumbs ul.thumbs li').opacityrollover({
						mouseOutOpacity:   onMouseOutOpacity,
						mouseOverOpacity:  0.5,
						fadeSpeed:         'fast',
						exemptionSelector: '.selected'
					});
			
				// Initialize Advanced Galleriffic Gallery
				var gallery = $('#thumbs').galleriffic({
					delay:                     2500,
					numThumbs:                 13,
					preloadAhead:              10,
					enableTopPager:            false,
					enableBottomPager:         false,
					maxPagesToShow:            7,
					imageContainerSel:         '#slideshow',
					controlsContainerSel:      '#controls',
					captionContainerSel:       '#caption',
					loadingContainerSel:       '#loading',
					renderSSControls:          false,
					renderNavControls:         false,
					playLinkText:              'Play Slideshow',
					pauseLinkText:             'Pause Slideshow',
					prevLinkText:              '&lsaquo; Previous Photo',
					nextLinkText:              'Next Photo &rsaquo;',
					nextPageLinkText:          'Next &rsaquo;',
					prevPageLinkText:          '&lsaquo; Prev',
					enableHistory:             false,
					autoStart:                 false,
					syncTransitions:           true,
					defaultTransitionDuration: 900,
					onSlideChange:             function(prevIndex, nextIndex) {
					// 'this' refers to the gallery, which is an extension of $('#thumbs')
					this.find('ul.thumbs').children()
						.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
						.eq(nextIndex).fadeTo('fast', 0.5);
					},
					onPageTransitionOut:       function(callback) {
						this.fadeTo('fast', 0.0, callback);
					},
					onPageTransitionIn:        function() {
						this.fadeTo('fast', 1.0);
					}
				});
				}
			});
