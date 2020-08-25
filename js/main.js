let catalog = $('.catalog');
let subMenuAvailable = $('.submenu-available')
let mainSearchSelect = $('.search-form__select');
let popular = $('.popular');

$('.burger').on('click', function () {
	$(this).toggleClass('active')
})

$('.burger-mob').on('click', function () {

	$('.header__nav').toggleClass('active');
	$('body').toggleClass('active');

})

$('.catalog__burger').on('click', function () {

	catalog.toggleClass('closed');
	catalog.find('.catalog__nav').slideToggle(500);

	if (catalog.hasClass('closed')) {
		subMenuAvailable.removeClass('opened')
	}
})


subMenuAvailable.each(function () {

	$(this).on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('opened')

		if ($(window).width() <= 480) {
			$(this).siblings('.catalog-submenu').slideToggle(600);
			return false;
		} else if ($('.catalog-page').length > 0 || $('.product-page').length > 0 || $('.basket-page').length > 0) {
			if ($(window).width() <= 767) {
				$(this).siblings('.catalog-submenu').slideToggle(600);
				return false;
			}
		}

		subMenuAvailable.not($(this)).removeClass('opened');
	})

	$(this).removeAttr('href');

})



mainSearchSelect.on('click', function () {
	mainSearchSelect.toggleClass('opened')
})


$('.select__item').each(function () {

		let out = $('.search-form__select .select__text');
		let result = ''

		$(this).on('click', function () {

			$(this).prev().toggleClass('checked');

			if ($(this).prev().hasClass('checked')) {
				$(this).prev().attr('checked', true)
			} else {
				$(this).prev().attr('checked', false)
			}

			let checkedAmount = $('.select__checkbox.checked').length;

			result = 'выбрано: ' + checkedAmount;

			if (checkedAmount > 0 && checkedAmount < $('.select__checkbox').length) {
				out.text(result);

				if ($(window).width() <= 830) {
					out.css({
						'font-size': '16px'
					})
					out.text(checkedAmount);
				}

			} else {
				out.text('везде');
				out.css({
					'font-size': '14px'
				})
			}
		})
	})

$('.hover-info__basket').each(function () {

	let thisHrefVal = $(this).parents('.product__hover-info').attr('href')

	$(".hover-info__basket").hover(
		function () {
			$(this).parents('.product__hover-info').removeAttr('href')
		},
		function () {
			$(this).parents('.product__hover-info').attr('href', thisHrefVal)
		}
	);
	$(this).parent().siblings('.hover-info__compare').hover(
		function () {
			$(this).parents('.product__hover-info').removeAttr('href')
		},
		function () {
			$(this).parents('.product__hover-info').attr('href', thisHrefVal)
		}
	);
})



$(document).click(function (e) {
	let subMenuOpened = $(".submenu-available.opened");

	if ($(e.target).closest(catalog).length || $(e.target).closest(".search-form").length)
		return;
	subMenuOpened.removeClass('opened');
	$(".search-form__select.opened").removeClass('opened');
	e.stopPropagation();
});


if ($(".submenu-available.opened")) {
	$(".search-form").click(function () {
		$(".submenu-available.opened").removeClass('opened');
	})
}

if ($(".search-form__select.opened")) {
	catalog.click(function () {
		$(".search-form__select.opened").removeClass('opened');
	})
}



// ============ fixing .product and .product__hover-info heights when there is more content in .product__hover-info =============== 

if ($(window).width() > 992) {

	$('.product').each(function () {
		$(this).outerHeight($(this).find('.product__hover-info').outerHeight())
	})

	$('.product:nth-child(3n+1)').each(function () {
		if ($(this).outerHeight() < $(this).next().next().outerHeight()) {
			$(this).outerHeight($(this).next().next().outerHeight())
		}
	})

	$('.product:nth-child(3n+2)').each(function () {
		if ($(this).outerHeight() < $(this).next().outerHeight()) {
			$(this).outerHeight($(this).next().outerHeight())
		}
	})
}

//-------------------------------------------------------------------------


if ($(window).width() <= 992) {
	$('.slick-item__link').replaceWith('<span class="slick-item__link">подробнее</span>');
	$('.product-price .product__basket').replaceWith('<div class="hover-info__availability">в наличии</div>');
	$('.p-ladder').removeClass('p-ladder')
}

if ($('body.main-page').length > 0 && $(window).width() <= 767) {
	$('.main-slider').after($('.main-body__aside'));

	if ($(window).width() <= 480) {
		popular.after($('.aside__footer'));
	} else {
		$('.aside__body').after($('.aside__footer'));
	}
}



if ($('script[src*="slick"]').length > 0) {

	// slider 1

	$('.main-slider').slick({
		dots: true,
		infinite: true,
		autoplay: true,
		speed: 600,
		//	speed: 0,
		autoplaySpeed: 5000,
		arrows: false,
		adaptiveHeight: true,
		//	fade: true,
	})
	//

	// slider 2

	$(popular).find('.popular__slider').slick({
		dots: true,
		infinite: true,
		speed: 600,
		autoplaySpeed: 5000,
		adaptiveHeight: true,
		prevArrow: popular.find('.pages__prev'),
		nextArrow: popular.find('.pages__next'),
		appendDots: $('.pages__current')
	})
	// 

	// slider 3

	$('.brands__slider').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 2,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			}
		}, {
			breakpoint: 830,
			settings: {
				slidesToShow: 3,
			}
		}, {
			breakpoint: 640,
			settings: {
				slidesToShow: 2,
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}]
	})

	popular.find('.pages__amount').text('/ ' + (popular.find('.slick-item').length - 1) / 2)
	// 

	// ---------------------- product page slider -------------------------------------

	$('.product-page .product__main-slider').slick({
		arrows: false,
		fade: true,
		dots: true,
		zIndex: 99,
	})

	//=======
}




if ($('script[src*="nouislider"]').length > 0) {

	let slider = document.getElementById('slider');

	noUiSlider.create(slider, {
		start: [0, 200000],
		connect: true,
		range: {
			'min': 0,
			'max': 200000
		},
	});

	let upperHandle = $('.noUi-handle-upper');
	let lowerHandle = $('.noUi-handle-lower');
	let min = $('.price__input-min');
	let max = $('.price__input-max');

	min.val(0)
	max.val(200000)

	upperHandle.append('<span class="noUiSlider-price price-upper">200000</span>');
	lowerHandle.append('<span class="noUiSlider-price price-lower">0</span>');


	slider.noUiSlider.on('update', function () {
		let upperOut = +upperHandle.attr('aria-valuetext');
		let lowerOut = +lowerHandle.attr('aria-valuetext');
		let upperPrice = $('.price-upper')
		let lowerPrice = $('.price-lower')

		upperOut = Math.round(upperOut);
		lowerOut = Math.round(lowerOut);
		upperPrice.text(upperOut);
		max.val(upperOut);
		min.val(lowerOut);

		lowerPrice.text(lowerOut);

	})


	let upperPrice = $('.price-upper')
	let lowerPrice = $('.price-lower')

	min.on('input', function () {
		slider.noUiSlider.set([min.val(), null])
		lowerPrice.text(+min.val());

		if (+min.val() > 200000) {
			lowerPrice.text(200000);
		} else if (+min.val() < 0) {
			lowerPrice.text(0);
		}
	});

	max.on('input', function () {
		slider.noUiSlider.set([null, max.val()])
		upperPrice.text(+max.val());

		if (+max.val() > 200000) {
			upperPrice.text(200000);
		} else if (+max.val() < 0) {
			upperPrice.text(0);
		}
	});

}



if ($('body.catalog-page').length > 0) {

	catalog.find('.catalog__burger').addClass('active');
	catalog.find('.catalog__nav').slideUp(0);

	$('.filter-checkbox-name').on('click', function () {
		$(this).parent('.filter-checkbox--block').toggleClass('checked')
		if ($(this).parent().hasClass('checked')) {
			$(this).prev().attr('checked', true)
		} else {
			$(this).prev().attr('checked', false)
		}
	})

	$('.filter-spoiler-header').on('click', function () {
		$(this).children('.filter__spoiler').toggleClass('opened');
		$(this).toggleClass('opened');
		$(this).next('.filter-spoiler-body').slideToggle(500);
	})


	let sortGrid = popular.find('.sort__grid');

	sortGrid.on('click', function () {
		sortGrid.removeClass('active');
		$(this).addClass('active');
		if ($('.sort__grid').last().hasClass('active')) {
			popular.addClass('extra-grid')
		} else {
			popular.removeClass('extra-grid')
		}
	})

	if ($('script[src*="lightbox"]').length > 0) {
		lightbox.option({
			alwaysShowNavOnTouchDevices: true,
			positionFromTop: 100,
			wrapAround: true,
		});
	}

	if ($(window).width() <= 992) {
		$('.slick-item__link').replaceWith('<span class="slick-item__link">подробнее</span>');
		$('.product-price .hover-info__availability').replaceWith('<div class="hover-info__basket"><img src="img/icons/hover-info-basket.png"alt=""/></div>');
	}

	$('.filter__burger').click(function () {
		$(this).parent().next().slideToggle(500);
	})

}


if ($('body.basket-page').length > 0) {
	let tab = $('.tab');

	tab.click(function () {
		$('.order__checkout').removeClass('active');
		$(this).parents('.basket-page__content').find('.order__checkout').eq(tab.length - $(this).nextAll().length - 1).addClass('active');
		// .product__tabs sibling (.tab-body) under number of $(this).nth-child - 1
	})

	$('.amount__input').each(function () {
		let mainPricePerOne = $(this).parent().parent().find('.main-price-number');
		let itemPrice = $(this).parents('.order-item').find('.item-price-number').text();

		mainPricePerOne.text(itemPrice.split(" ").join(""));

		$(this).on('change', priceUpdate);

	})
	// ----------------------------------------------------------------------------
	let totalPrice = $('.order-total-price__number');
	let pricePerProduct = $('.total-price-number');
	let price = 0;

	function priceUpdate() {

		price = 0;
		for (let i = 0; i < pricePerProduct.length; i++) {
			price += +pricePerProduct[i].innerText;
		}
		totalPrice.text(price)
	}

	priceUpdate();
	// ----------------------------------------------------------------------------

}


if ($('body.product-page').length > 0) {
	if ($(window).width() <= 992) {
		$('.product-price .hover-info__availability').replaceWith('<div class="hover-info__basket"><img src="img/icons/hover-info-basket.png"alt=""/></div>');
	}
}


if ($('body.product-page').length > 0 || $('body.basket-page').length > 0) {

	let amountMinus = $('.amount__minus');
	let amountPlus = $('.amount__plus');
	let amountInput = $('.amount__input');

	amountInput.each(function () {
		let mainPricePerOne = +$(this).parent().parent().find('.main-price-number').text();
		let oldPricePerOne = +$(this).parent().parent().find('.old-price-number').text();

		$(this).on('input', function () {

			if (+$(this).val() <= 1) {
				+$(this).val(1);
				$(this).prev().addClass('disabled');
			} else if (+$(this).val() > 1) {
				$(this).prev().removeClass('disabled');
			}
			$(this).parent().parent().find('.main-price-number').text(+$(this).val() * mainPricePerOne);
			$(this).parent().parent().find('.old-price-number').text(+$(this).val() * oldPricePerOne);

		})
	})


	amountMinus.each(function () {
		let mainPricePerOne = +$(this).parent().parent().find('.main-price-number').text();
		let oldPricePerOne = +$(this).parent().parent().find('.old-price-number').text();

		$(this).on('click', function () {
			let count = +$(this).next().val();

			$(this).next().val(--count)
			if (+$(this).next().val() <= 1) {
				+$(this).next().val(1)
				$(this).addClass('disabled');
			}

			$(this).parent().parent().find('.main-price-number').text(+$(this).next().val() * mainPricePerOne);
			$(this).parent().parent().find('.old-price-number').text(+$(this).next().val() * oldPricePerOne);
		})
	})


	amountPlus.each(function () {
		let mainPricePerOne = +$(this).parent().parent().find('.main-price-number').text();
		let oldPricePerOne = +$(this).parent().parent().find('.old-price-number').text();

		$(this).on('click', function () {
			let count = +$(this).prev().val();

			$(this).prev().val(++count)
			$(this).prev().prev().removeClass('disabled');

			$(this).parent().parent().find('.main-price-number').text(+$(this).prev().val() * mainPricePerOne);
			$(this).parent().parent().find('.old-price-number').text(+$(this).prev().val() * oldPricePerOne);
		})
	})



	catalog.find('.catalog__burger').addClass('active');
	catalog.find('.catalog__nav').slideUp(0);


	if ($(window).width() <= 767) {
		$('.main-body__content').after($('.aside__footer'));
	} else {
		$('.aside__body').after($('.aside__footer'));
	}

	let tab = $('.tab');

	tab.click(function () {
		tab.removeClass('active');
		$(this).addClass('active');
		$(this).parent().siblings().removeClass('active');
		$(this).parent().siblings().eq(tab.length - $(this).nextAll().length - 1).addClass('active');
		// .product__tabs sibling (.tab-body) under number of $(this).nth-child - 1
	})

	if ($('body.basket-page').length > 0) {
		$('.amount-change').on('click', priceUpdate)
	}
}