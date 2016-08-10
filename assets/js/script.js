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

function refreshCaptcha() {
	var url= "./assets/server/captcha.php";
	var img = document.images['captchaimg'];
	img.src = url;
}

$(document).ready(function () {

    initNavbar();
    initAnimations();
	
	$(".closeMessageBox").click(function(){
		$("#errormsg_display").hide();
	});

	$("#formSubmit").submit(function(e) {
		e.preventDefault();
		var bool = true;

		var storeData = {};
		$("#formSubmit input, #formSubmit select").each(function(){
			var id = $(this).attr("id");

			$("label[for='"+id+"']").next('span').remove();

			if($.trim($(this).val()) == "") {
				bool = false;
				$("label[for='"+id+"']").after( "<span class='yellow PL-10'>&nbsp;&nbsp;"+$(this).attr("placeholder") + " is required.</span>" );
			}else {
				if(id == 'phonenumber'){
					if(isNaN($(this).val()) || $(this).val().length != 10) {
						bool = false;
						$("label[for='"+id+"']").after( "<span class='yellow PL-10'>&nbsp;&nbsp;"+$(this).attr("placeholder") + " is required.</span>" );
					}
				}

				if(id == 'workexperience'){
					if(isNaN($(this).val()) || $(this).val().length >= 3) {
						bool = false;
						$("label[for='"+id+"']").after( "<span class='yellow PL-10'>&nbsp;&nbsp;"+$(this).attr("placeholder") + " is required.</span>" );
					}
				}

				storeData[id] = $(this).val();
			}
		});

		if(bool == true) {
			$("#formSubmit").hide();
			$("#img_loader").show();
			$("#errormsg_display").hide();

			$.ajax({
				url: "./assets/server/",
				method: "POST",
				data : storeData,
				success: function(data) {

					if(data.status == "Success") {
						$("#formSubmit input, #formSubmit select").each(function(){
							$(this).val("");
						});
						$("#errormsg_status").html("<u>Registration Success!!!</u>");
						$("#errormsg_display").removeClass("bggreen bgred").addClass("bggreen");
					}else {
						$("#errormsg_display").removeClass("bggreen bgred").addClass("bgred");
						$("#errormsg_status").html("<u>Registration failed!!!</u>");
					}

					$("#errormsg_message").html(data.message);
					$("#errormsg_display").show();
					$("#img_loader").hide();
					$("#formSubmit").show();
					refreshCaptcha();
				},
				error: function (xhr, ajaxOptions, thrownError) {
	
					$("#errormsg_display").addClass("bgred");
					$("#errormsg_status").html("<u>Registration failed!!!</u>");
					$("#errormsg_message").html( xhr.status + " - " + thrownError);

					$("#errormsg_display").show();
					refreshCaptcha();
				}
			});
		}

		return false;
	});
});

$(window).load(function () {
	$(".loader .fading-line").fadeOut();
	$(".loader").fadeOut("slow");
});