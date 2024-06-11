/*
 * Copyright (c) 2020 Frenify
 * Author: Frenify
 * This file is made for CURRENT TEMPLATE
*/

(function($){
	"use strict";
	
	
	var Awilo = {
		
		init: function(){
			this.BgImg();
			this.imgToSvg();
			this.parallaxMaster();
			this.counter();
			this.portfOlioMasonry();
			this.reviewSlider();
			this.contactForm();
			this.toTopJumper();
			this.video();
			this.jarallax();
			this.anchor();
			this.menuOpener();
			this.niceScrollToSidebarNav();
		},
		// -----------------------------------------------------
		// ----------------    ALL FUNCTIONS    ----------------
		// -----------------------------------------------------
		niceScrollToSidebarNav: function(){
			var self		= this;
			var sidebar		= $('.awilo_fn_sidebar_header');
			var nav 		= sidebar.find('.menu_nav');
			if(nav.length){
				self.menuHeight__SidebarNav(sidebar);
				if($().niceScroll){
					nav.niceScroll({
						touchbehavior:false,
						cursorwidth:0,
						autohidemode:true,
						cursorborder:"0px solid #333"
					});
				}
			}
		},
		menuHeight__SidebarNav: function(sidebar){
			var menuBarH	= sidebar.outerHeight();
			var menuLogoH	= sidebar.find('.menu_logo').outerHeight();
			var menuNav		= sidebar.find('.menu_nav');
			var taglineH	= sidebar.find('.social_list').outerHeight();
			menuNav.css({height:menuBarH-menuLogoH-taglineH});
		},
		menuOpener: function(){
			var wrapper 	= $('.awilo_fn_wrapper');
			var hamb		= $('.awilo_fn_header').find('.hamburger');
			var li			= $('.awilo_fn_sidebar_header ul.vert_nav li');
			var hambCloser	= $('.awilo_fn_header .hamburger,.awilo_fn_sidebar_header .closer');
			hambCloser.on('click',function(){
				if(hamb.hasClass('is-active')){
					hamb.removeClass('is-active');
					wrapper.removeClass('opened');
				}else{
					hamb.addClass('is-active');
					wrapper.addClass('opened');
				}
				
				
				li.removeClass('fn_ready');
				clearTimeout();
				li.each(function(index,element){
					setTimeout(function(){
						$(element).addClass('fn_ready');
					},index*100+300);
				});
			});
		},
		anchor: function(){
			$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[href="#!"]').click(function(e){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var t=$(this.hash);(t=t.length?t:$("[name="+this.hash.slice(1)+"]")).length&&(e.preventDefault(),$("html, body").animate({scrollTop:t.offset().top},1e3,function(){var e=$(t);return!1;e.attr("tabindex","-1")}))}});
		},
		jarallax: function(){
			jQuery('.jarallax').each(function(){
				var element			= jQuery(this);
				var	customSpeed		= element.data('speed');

				if(customSpeed !== "undefined" && customSpeed !== ""){
					customSpeed 	= customSpeed;
				}else{
					customSpeed 	= 0.5;
				}
				element.jarallax({
					speed: customSpeed,
					automaticResize: true
				});
			});	
		},
		video: function(){
			$('.popup-youtube').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		},
		toTopJumper: function(){
			var totop		= $('span.awilo_fn_totop');
			if(totop.length){
				totop.on('click', function(e) {
					e.preventDefault();		
					$("html, body").animate(
						{ scrollTop: 0 }, 'slow');
					return false;
				});
			}
		},
		imgToSvg: function(){
			$('img.awilo_fn_svg').each(function(){
				var $img 		= $(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');
				$.get(imgURL, function(data) {
					var $svg = $(data).find('svg');
					if(typeof imgClass !== 'undefined') {$svg = $svg.attr('class', imgClass+' replaced-svg');}
					$svg = $svg.removeAttr('xmlns:a');
					$img.replaceWith($svg);
				}, 'xml');
			});
		},
		parallaxMaster: function(){
			$('#scene').parallax();
//			$('.awilo_fn_portfolio_grid .list_item').each(function(){
//				$(this).parallax();
//			});
		},
		BgImg: function(){
			var el = $('*[data-bg-img]');
			el.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
		counter: function(){
			var element = $('.awilo_fn_counter');
			if(element.length){
				element.each(function(){
					var el = $(this);
					el.waypoint({
						handler: function(){
							if(!el.hasClass('stop')){
								el.addClass('stop').countTo({
									refreshInterval: 50,
									formatter: function (value, options) {
										return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
									},	
								});
							}
						},
						offset:'90%'
					});
				});
			}
				
		},
		
		portfOlioMasonry: function(){
			var masonry = $('.awilo_fn_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  	itemSelector: '.awilo_fn_masonry_in',
						percentPosition: true,
					  	masonry: {
							columnWidth: '.grid-sizer'
						}
					});
				});
			}
		},
		
		reviewSlider: function(){
			$('.awilo_fn_reviews .r_list, .awilo_fn_partners .p_list').each(function(){
				var element 	= $(this);
				var container 	= element.find('.swiper-container');
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 1,
					spaceBetween: 0,
					loopAdditionalSlides: 2,
					autoplay: {
						delay: 8000,
					},
					on: {
						init: function(){
							if(element.hasClass('r_list')){
								element.closest('.awilo_fn_reviews').addClass('ready');
							}else if(element.hasClass('p_list')){
								element.closest('.awilo_fn_partners').addClass('ready');
							}
						},
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
						slideChange: function () {
							Awilo.imgToSvg();
						},
				  	},
					pagination: {
						el: '.awilo_fn_swiper_progress',
						type: 'custom', // progressbar
						renderCustom: function (swiper,current,total) {
							
							// opacity 
							var index 		= current - 1;
							var activeSlide = container.find('.swiper-slide[data-swiper-slide-index="'+index+'"]');
							container.find('.r_item').removeClass('fn_vision');
							activeSlide.find('.r_item').addClass('fn_vision');
							activeSlide.next().find('.r_item').addClass('fn_vision');
							activeSlide.next().next().find('.r_item').addClass('fn_vision');
							
							
							
							// progress animation
							var scale,translateX;
							var progressDOM	= container.find('.awilo_fn_swiper_progress');
							if(progressDOM.hasClass('fill')){
								translateX 	= '0px';
								scale		= parseInt((current/total)*100)/100;
							}else{
								scale 		= parseInt((1/total)*100)/100;
								translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
							}
							
							
							progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
							if(current<10){current = '0' + current;}
							if(total<10){total = '0' + total;}
							progressDOM.find('.current').html(current);
							progressDOM.find('.total').html(total);
						}
				  	},
					breakpoints: {
						700: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1200: {
							slidesPerView: 3,
							spaceBetween: 70,
						}
					}
			  	});
			});
			Awilo.imgToSvg();
		},
		
		
		reviewWidth: function(){
			$('.awilo_fn_review').each(function(){
				var element = $(this);
				var review	= element.data('stars');
				if(!review){review = 5;}
				var width	= review * (100/5) + 1;
				var pos		= 100 - width;
				element.find('.rating_relative').css({width:pos+'px'});
				element.find('.rating_absolute').css({width:width+'px'});
			});
		},
		
		contactForm: function(){
			$('.awilo_fn_contact_sendbtn').on('click', function(){

				var contactForm	= $(this).closest('.awilo_fn_contact_form');
				var name 		= contactForm.find('.name').val();
				var email 		= contactForm.find('.email').val();
				var message 	= contactForm.find('.message').val();
				var returnMess	= contactForm.find('.returnmessage');
				var success     = returnMess.data('success');

				returnMess.empty();
				if(name===''||email===''||message===''){
					contactForm.find('.empty_notice').slideDown(500).delay(2000).slideUp(500);
				}else{
					$.post(
						"modal/contact.php",
						{
							xx_name: name,
							xx_email: email,
							xx_message:message,
						},
						function(data) {
							returnMess.append(data);
							if(returnMess.find('span.contact_error').length){
								returnMess.slideDown(500).delay(2000).slideUp(500);		
							}else{
								returnMess.append("<span class='contact_success'>"+ success +"</span>");
								returnMess.slideDown(500).delay(4000).slideUp(500);
							}
							if(data===""){
								$("#contact_form")[0].reset();//To reset form fields on success
							}
						});
				}
				return false;

		});
		}
	};
	
	$( document ).ready(function(){Awilo.init();});
	$( window ).on('resize',function(){
		Awilo.portfOlioMasonry();
		Awilo.niceScrollToSidebarNav();
		setTimeout(function(){
			Awilo.portfOlioMasonry();
		},700);
	});
	$( window ).on('load',function(){
		Awilo.portfOlioMasonry();
	});
	
})(jQuery);