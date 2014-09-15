$(document).ready(function(){

	body = $("body");

	/*
	 * Append dynamic content to the skill list and portfolio
	*/ 

	$(".skill-list-2").append('<div class="label-beginner">Beginner</div><div class="label-inter">Intermediate</div><div class="label-adv">Advanced</div><div class="label-guru">Guru</div><div class="line-beginner"></div><div class="line-inter"></div><div class="line-adv"></div><div class="line-guru"></div>');

	$(".portfolio__grid__item__img").append('<div class="portfolio__grid__item__mask"></div>');
	$(".portfolio__detail").append('<div class="portfolio__detail__close"><span class="icon-cross"></span></div>');

    /* ================== Navigation ================== */

	$(".navigation-icon").click(function(){
		if ( body.hasClass("nav-active") ) {
			body.removeClass("nav-active");
			setTimeout(function(){
				$(".navigation-icon").css({"position":"fixed", "top":"0", "margin":"0.35em 0.6em"});
			},500);
		} else {
			$(this).css({"position":"absolute", "top":"100%", "margin":"0 0.6em"});
			body.addClass("nav-active");
		}
	});

	setTimeout(function(){
		$(".navigation-icon").addClass("animated fadeInRight");
	},1000);

	$('a:not(.more-link)[href*="#"]').bind("click", function(event) {
		event.preventDefault();
		var target = $(this).attr("href");
		var targetPos = $('[id='+target.replace(/#/g, "")+']').offset().top;

		$('html,body').animate({
			scrollTop: targetPos
		}, 1600, 'swing', function (){
			if(history.pushState) {
			    history.pushState(null, null, target);
			}
			else {
			    location.hash = target;
			}
		});
	});	

	/* ================== Portfolio ================== */

	/**
	 * Scroll effect 
	*/ 

	posPortfolio = $(".page__portfolio").offset();
	portfolioDetail = $(".portfolio__detail");

	scrollEffect();

	function scrollEffect() {
		posViewport = $(window).scrollTop();

		if ( posViewport > posPortfolio.top-300 && $(window).width() > 1000 ) {
			body.addClass("wide-view");
		} else if (posViewport < posPortfolio.top) {
			body.removeClass("wide-view");
		}
	}

	$(document).scroll(function(){
		scrollEffect();
	});

	/*
	 * Detail mode for the portfolio
	*/ 

	$(".portfolio__grid__item__desc__link").click(function(event) {
		event.preventDefault();

		if( body.hasClass("portfolio__detail-active") ) {
			body.removeClass("portfolio__detail-active");
		} else {
			// Apply Desc to DOM
			var activeItem = $(this).parent().parent(".portfolio__grid__item__img");
			var activeItemImg = activeItem.children("img").attr("src");
			activeItem.find(".portfolio__detail__desc img:eq(0)").attr("src", activeItemImg);
			var activeItemDesc = activeItem.children(".portfolio__detail__container").html();

			$(".portfolio__detail .portfolio__detail__desc").remove();
			portfolioDetail.append(activeItemDesc);

			body.addClass("portfolio__detail-active");

			$(".portfolio__detail__desc").show();
		}
	});

	$(".portfolio__detail__close").click(function(){
		body.removeClass("portfolio__detail-active");
		setTimeout(function(){
			$(".portfolio__detail__desc").slideUp(500);
		},800);
	});
});