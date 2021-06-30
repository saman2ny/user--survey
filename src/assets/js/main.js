function sideMenuFunction() {
    $(document).ready(function() {

        $(".firstmenu > .has-menu").click(function() {
            $(".sidemenu > ul > li").removeClass("active");
        });


        $(".sidemenu > ul > li > a").click(function() {
            
            if ($(this).parents("li").hasClass("has-menu")) {
                $(".sidemenu > ul > li").removeClass("active");
                $(this).parents("li").addClass("active");
                $(".site-content").addClass("submenu-open");
                return false;
            } else {
                $(".sidemenu > ul > li").removeClass("active");
                $(".site-content").removeClass("submenu-open");
            }
        });

        $(".submenu-close").click(function() {
            $(".sidemenu > ul > li").removeClass("active");
            $(".site-content").removeClass("submenu-open");
        });

        $(".mobilemenu").click(function() {
            if ($(this).hasClass('menu-close')) {
                $('.sidebar').addClass('open');
                $("body").css("overflow", "hidden");
                setTimeout(function() {
                    // $(".sidemenu > ul > li").addClass("active");
                    $('.mobilemenu').removeClass('menu-close');
                    $('.mobilemenu').addClass('menu-open');
                }, 500);
            }
            if ($(this).hasClass('menu-open')) {
                $(".sidemenu > ul > li").removeClass("active");
                $("body").css("overflow", "inherit");
                $('.sidebar').removeClass('open');
                setTimeout(function() {
                    $('.mobilemenu').removeClass('menu-open');
                    $('.mobilemenu').addClass('menu-close');
                }, 500);
            }
        });



        $(".menuclose-icon").click(function() {
            $('.sidebar').removeClass('open');
            $("body").css("overflow", "");
            setTimeout(function() {
                $('.mobilemenu').removeClass('menu-open');
                $('.mobilemenu').addClass('menu-close');
            }, 500);
        });


        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
            });
        }, 1000);
    });
}

function selectSearchMethod() {
    // $(".styled-select select").select2({
    // 	placeholder: "Select",
    // 	allowClear: true
    // });
}

function myMethod() {

    $('.cdk-global-scrollblock') .css({'height': (($(window).height()) - 2)+'px'});

    $('.edit-toggle').click(function() {
        $(".show-editdiv").addClass('active');
        $(".edit-toggle").addClass('current');
        $('.show-content').addClass('active');
    });

    $('.toggle-cancel').click(function() {
        $(".show-editdiv").removeClass('active');
        $(".edit-toggle").removeClass('current');
        $('.show-content').removeClass('active');
    });

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 50) {
            jQuery('.object-scroll').addClass('scroll-fixed');

            if ($(window).scrollTop() + $(window).height() > ($(document).height() - 100)) {
                jQuery('.object-scroll').removeClass('scroll-fixed');
            }

        } else {
            jQuery('.object-scroll').removeClass('scroll-fixed');
        }
    });

    $(document).ready(function() {
        $(".firstmenu > .has-menu").click(function() {
            $(".sidemenu > ul > li").removeClass("active");
        });


        $(".sidemenu > ul > li > a").click(function() {
            
            if ($(this).parents("li").hasClass("has-menu")) {
                $(".sidemenu > ul > li").removeClass("active");
                $(this).parents("li").addClass("active");
                $(".site-content").addClass("submenu-open");
                return false;
            } else {
                $(".sidemenu > ul > li").removeClass("active");
                $(".site-content").removeClass("submenu-open");
            }
        });

        $(".submenu-close").click(function() {
            $(".sidemenu > ul > li").removeClass("active");
            $(".site-content").removeClass("submenu-open");
        });


        $("body").click(function() {
            $(".sidemenu > ul > li").removeClass("active");
            $(".site-content").removeClass("submenu-open");
        });
        $(".mobilemenu").click(function() {
            if ($(this).hasClass('menu-close')) {
                $('.sidebar').addClass('open');
                $("body").css("overflow", "hidden");
                setTimeout(function() {
                    // $(".sidemenu > ul > li").addClass("active");
                    $('.mobilemenu').removeClass('menu-close');
                    $('.mobilemenu').addClass('menu-open');
                }, 500);
            }
            if ($(this).hasClass('menu-open')) {
                $(".sidemenu > ul > li").removeClass("active");
                $("body").css("overflow", "inherit");
                $('.sidebar').removeClass('open');
                setTimeout(function() {
                    $('.mobilemenu').removeClass('menu-open');
                    $('.mobilemenu').addClass('menu-close');
                }, 500);
            }
        });



        $(".menuclose-icon").click(function() {
            $('.sidebar').removeClass('open');
            $("body").css("overflow", "");
            setTimeout(function() {
                $('.mobilemenu').removeClass('menu-open');
                $('.mobilemenu').addClass('menu-close');
            }, 500);
        });


        $('.main-search').click(function(e) {

            if ($(this).hasClass('search-remove')) {
                $('.search-box1').addClass('searchbox-open');
                setTimeout(function() {
                    $('.main-search').removeClass('search-remove');
                    $('.main-search').addClass('icon-plus').removeClass('icon-search');
                }, 500);
            }
            if ($(this).hasClass('icon-plus')) {
                $('.search-box1').removeClass('searchbox-open');
                setTimeout(function() {
                    $('.main-search').removeClass('icon-plus').addClass('icon-search');
                    $('.main-search').addClass('search-remove');
                }, 500);
            }
            return false;
        });
        $('.dt-remove').click(function() {
            $('.dt-box').hide();
            $(this).removeClass('active');
        });

        $('.dtmain-search').click(function() {
            $('.dt-box').show();
            $('.dt-remove').addClass('active');
        });





        $(".mobilpf").click(function() {
            $('.header-right').toggleClass("open");
        });


        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });

        if ($('.selectpicker').length) {
            $('.selectpicker').selectpicker();
        }




        // $("#multiple").select2({
        // 	placeholder: "Select a programming language",
        // 	allowClear: true
        // });

        var $owl = $(".total-slider").owlCarousel({
            rtl: true,
            autoplay: true,
            lazyLoad: true,
            loop: true,
            margin: 0,
            autoplayHoverPause: true,
            /*
		   animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   */
            responsiveClass: true,
            autoHeight: true,
            // autoplayTimeout: 7000,
            smartSpeed: 800,
            nav: false,
            pagination: true,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 1
                },
                600: {
                    items: 1
                },

                768: {
                    items: 1
                },

                1024: {
                    items: 1
                },

                1366: {
                    items: 1
                }
            }
        });
        $owl.trigger('refresh.owl.carousel');


    });

    $('.company-tabs a').click(function(e) {
        var tab_id = $(this).attr('data-tab');

        $('.company-tabs a').removeClass('active');
        $('.company-content').removeClass('active');

        $(this).addClass('active');
        $("#" + tab_id).addClass('active');
        e.preventDefault();
    });
    $("#upload-id").on("change", ".file-upload-field", function() {
        $(this).parent(".file-upload-wrapper").attr("data-text",
            $(this).val().replace(/.*(\/|\\)/, ''));
    });
    $('.st-change').on('click', function() {
        $('.staus-cont').toggleClass('status-cont-active');
    });



    
    // $(document).click(function(event) {
    //     if (!$(event.target).hasClass('filter-open')) {
    //       $(".table-checkfilter").removeClass("active");
    //     }
    //   });















}