var speedScroll  = 500;     // скорость скроллинга по форме заказа

(function($) {

    $(document).ready(function() {

        $('.tickets-steps-container li').click(function() {
            if ($(this).hasClass('active')) {
                var curIndex = $('.tickets-steps-container li').index($(this));
                $.scrollTo('#tickets-' + curIndex, {offset: {'top': -40}, duration: speedScroll});
            }
        });

        $('.tickets-form-sector-inner area').mouseover(function() {
            var curName = $(this).attr('class').replace('-link', '');
            $('.' + curName).addClass('hover');
        });

        $('.tickets-form-sector-inner area').mouseout(function() {
            var curName = $(this).attr('class').replace('-link', '');
            $('.' + curName).removeClass('hover');
        });

        $('.tickets-form-sector-inner area').click(function() {
            var curName = $(this).attr('class').replace('-link', '');
            if (!$('.' + curName).hasClass('disabled')) {
                $('.tickets-sector').removeClass('active');
                $('.' + curName).addClass('active');
                // подгрузка карты мест
                $('.tickets-place-inner').load($(this).attr('href'), function() {
                    $('.tickets-place-sector').html('<strong>' + $('.' + curName).find('.tickets-sector-hint-title').text() + ',</strong> цена билета: <strong>'+ $('.' + curName).find('.tickets-sector-hint-price .tickets-sector-hint-value strong').text() + '</strong> <span>руб.</span>');
                    $('.tickets-cost strong').html('0');
                    $('.tickets-places').html('');
                    $('#tickets-3').slideDown(function() {
                        $.scrollTo('#tickets-3', {offset: {'top': -40}, duration: speedScroll});
                    });
                });
            }
            return false;
        });

        $('.tickets-content form').submit(function() {
            // здесь можно сформировать нужный запрос с перечислением всех выбранных мест
            // далее идет просто перебор выбранных мест
            $('.tickets-place-row a.active').each(function() {
                var curLink = $(this);
                var curRow = curLink.attr('rel');
                var curPlace = curLink.attr('rev');
            });
        });

        $('.tickets-place-row a').live('mouseover', function() {
            $(this).parent().addClass('hover');
            var curCol = $(this).parent().find('span, a').index($(this));
            $('.tickets-place-cols span').eq(curCol).addClass('hover');
        });

        $('.tickets-place-row a').live('mouseout', function() {
            $(this).parent().removeClass('hover');
            $('.tickets-place-cols span').removeClass('hover');
        });

        $('.tickets-place-row a').live('click', function() {
            var curLink = $(this);
            curLink.toggleClass('active');
            recalcTickets();
            return false;
        });

        $('.tickets-places-item a').live('click', function() {
            var curItem = $(this).parent();
            var curPlace = curItem.find('strong').eq(0).html();
            var curRow = curItem.find('strong').eq(1).html();
            $('.tickets-place-row a[rel="' + curRow + '"][rev="' + curPlace + '"]').removeClass('active');
            curItem.remove();
            recalcTickets();
            return false;
        });

        $('.ticket-form-next a').click(function() {
            if ($('#tickets-1:visible').length == 0) {
                $('.tickets-steps-container li').eq(1).addClass('active');
                $('#tickets-1').slideDown(function() {
                    $.scrollTo('#tickets-1', {offset: {'top': -40}, duration: speedScroll});
                });
            } else {
                $('.tickets-steps-container li').eq(2).addClass('active');
                $('#tickets-2').slideDown(function() {
                    $.scrollTo('#tickets-2', {offset: {'top': -40}, duration: speedScroll});
                });
                $('.ticket-form-next').slideUp();
            }
            return false;
        });

    });

    function recalcTickets() {
        var newHTML = '';
        var curCost = 0;
        $('.tickets-place-row a.active').each(function() {
            var curLink = $(this);
            newHTML += '<div class="tickets-places-item">Место <strong>' + curLink.attr('rev') + '</strong>, ряд <strong>' + curLink.attr('rel') + '</strong><a href="#"></a></div>';
            curCost += Number($('.tickets-place-sector strong').eq(1).html().replace(' ', ''));
        });
        $('.tickets-places').html(newHTML);
        $('.tickets-cost strong').html(String(curCost).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    }

    $(window).scroll(function() {
        var curScroll = $(window).scrollTop();
        if (curScroll > $('.tickets-steps').offset().top) {
            $('.tickets-steps').addClass('tickets-steps-fixed');
        } else {
            $('.tickets-steps').removeClass('tickets-steps-fixed');
        }
    });

})(jQuery);