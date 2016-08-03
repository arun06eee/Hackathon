function initNavbar() {
    var scrollSpeed = 750;
    var scrollOffset = 50;
    var easing = 'swing';

    $('#navbar-top .navbar-default ul.nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: scrollSpeed,
        scrollOffset: scrollOffset,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: easing
    });

    $('.nav-external').click(function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - scrollOffset
        }, scrollSpeed, easing);
    });

    $('#navbar-top .navbar-default').affix({
        offset: {
            top: $('#home').height()
        }
    });
}

function initAnimations() {
    $('.animated').appear(function () {
        var el = $(this);
        var animation = el.data('animation');
        var delay = el.data('delay');
        if (delay) {
            setTimeout(function () {
                el.addClass(animation);
                el.addClass('showing');
                el.removeClass('hiding');
            }, delay);
        } else {
            el.addClass(animation);
            el.addClass('showing');
            el.removeClass('hiding');
        }
    }, {
        accY: -60
    });

    // Service hover animation
	$('.service').hover(function(){
		$('i', this).addClass('animated tada');
	},function(){	
        $('i', this).removeClass('animated tada');
	});
}

$(document).ready(function () {

    initNavbar();
    initAnimations();
/* 
	$(".faq-articles").click(function() {
		$('.faq-articles').find(".faq-content").removeClass('animated active fadeInDown').css('display', 'none');
		$(this).find(".faq-content").addClass('animated active fadeInDown').css('display', 'block');
	}); */

	$("#formSubmit").submit(function(e) {
		e.preventDefault();
		var bool = true;
		var storeData = {};
		$("#formSubmit input,#formSubmit select").each(function(){
			$(this).parent().find("span").remove();
			if($.trim($(this).val()) == "") {
				bool = false;
				$(this).parent().find("label").after( "<span class='fa fa-times red PL-10'>&nbsp;&nbsp;"+$(this).attr("placeholder") + " is required.</span>" );
			}else {
				if($(this).attr("id") == 'phonenumber'){
					if(isNaN($(this).val()) || $(this).val().length != 10) {
						bool = false;
						$(this).parent().find("label").after( "<span class='fa fa-times red PL-10'>&nbsp;&nbsp;"+$(this).attr("placeholder") + " is required.</span>" );
					}
				}

				storeData[$(this).attr("id")] = $(this).val();
			}
		});

		if(bool == true){
			$.ajax({
				url: "./assets/server/",
				method: "POST",
				data : storeData,
				success: function(data) {
					if(data.status == "Success") {
						$("#formSubmit input, #formSubmit select").each(function(){
							$(this).val("");
						});
					}

					$.notify({
						title: data.message,
					},{
						type: 'pastel-info',
						delay: 10000,
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
									'<span data-notify="title">{1}</span>' +
								'</div>'
					});
				},
				error: function (xhr, ajaxOptions, thrownError) {
					$.notify({
						title: xhr.status + " - " + thrownError,
					},{
						type: 'pastel-info',
						delay: 5000,
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
									'<span data-notify="title">{1}</span>' +
								'</div>'
					});
				}
			})
		}

		return false;
	});
});

$(window).load(function () {
	$(".loader .fading-line").fadeOut();
	$(".loader").fadeOut("slow");
});