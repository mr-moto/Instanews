$(function () {

    $('.loader').hide();
    $('select').selectric();
        
    $('select').on('change', function () {
        $('.site-header').addClass('site-header-up').removeClass('site-header');
        $('.logo').addClass('logo-up').removeClass('logo');
        $('.logo-wrap').addClass('logo-wrap-up').removeClass('logo-wrap');

        $('.loader').show();


        var $news = $('.grid-list');
        $news.empty();

        var category = this.value;
        $.ajax({
            url: 'https://api.nytimes.com/svc/topstories/v2/' + category + '.json?api-key=ce652fdef4f54825ad624cc67075d65b',
            method: 'GET',
            dataType: 'json'
        })

            .done(function (data) { 
                $('.loader').hide(); 
                var imgFilter = data.results.filter(function (imgdata) { 
                    return imgdata.multimedia.length;
                }).slice(0, 12); 
                $.each(imgFilter, function (index, value) { 
                    var imgLink = ''; 
                    imgLink = value.multimedia[4].url; 


                    $('.grid-list').append('<li class="article"><a href="' + value.url + '"><img class="news-img" src="' + imgLink + '"/></a><div class="text-wrapper"><p class="article-text">' + value.abstract + '</p></div></li>')
                })

            })

    });
    $(document).on('click', 'a', function (event) {
        event.preventDefault(); 
        var url = $(this).attr('href'); 
        window.open(url, '_blank');

    });
})