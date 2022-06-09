
$(window).on("load", function() {
    $('body').addClass('loaded');
});

$(function(){
    
    /*************** Navigation *****************/

    const tmMainNav = $("#tm-main-nav");

    tmMainNav.singlePageNav({
        filter: ':not(.external)'
    });

    $('.navbar-toggler').click(function(e) {
        e.stopPropagation();
        tmMainNav.toggleClass('show');
    });

    $("html").click(function(e) {
        $("#tm-main-nav").removeClass("show");
    });

    /****************** Smooth Scrolling *****************/

    $(".tm-btn-next").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // window.location.hash = hash;
            });
        }
    });


    /****************** Gallery ******************/

    const galleryItems = document.querySelector(".tm-gallery").children;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(galleryItems.length / itemsPerPage);
    const pageAttribute = 'data-page';

    function setPagination(currentPage) {
        for(let i = 1; i <= totalPages; i++) {
            var $pager = '';
            
            if(currentPage == i) {
                $pager = $('<a href="javascript:void(0);" class="active tm-paging-link" '+pageAttribute+'="'+i+'"></a>');
            } else {
                $pager = $('<a href="javascript:void(0);" class="tm-paging-link" '+pageAttribute+'="'+i+'"></a>');
            }

            $pager.html(i);

            $pager.click(function(){ 
                $('.tm-paging-link').removeClass("active");
                $(this).addClass('active');
                var page = $(this).eq(0).attr(pageAttribute);
                showItems(page);
            });

            $pager.appendTo($('.tm-paging'));
        }
    }

    function showItems(currentPage) {
        for(let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].classList.remove("show");
            galleryItems[i].classList.add("hide");

            if(i >= (currentPage * itemsPerPage) - itemsPerPage && i < currentPage * itemsPerPage) {
                galleryItems[i].classList.remove("hide");
                galleryItems[i].classList.add("show");
            }
        }
    }

    setPagination(1);
    showItems(1);

    /****************** Magnific Popup ***********/

    $('.tm-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

