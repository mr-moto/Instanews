$(function() {

    $('.loader').hide();
    $('select').selectric();

    function toggleSmallHeader() {
        $('.site-header').addClass('site-header-up').removeClass('site-header');
    }

    $('select').on('change', function() {

        var category = this.value;

        toggleSmallHeader();
        $('.loader').show();
        $('.grid-list').empty();


        $.ajax({
            url: 'https://api.nytimes.com/svc/topstories/v2/' + category + '.json?api-key=ce652fdef4f54825ad624cc67075d65b',
            method: 'GET',
            dataType: 'json'
        })

        .done(function(data) {
            $('.loader').hide();

            function getFirstTwelveResults() {
                return data.results.filter(function(imgdata) {
                    return imgdata.multimedia.length > 4;
                }).slice(0, 12);
            }

            $.each(getFirstTwelveResults(), function(index, value) {
                var imgLink = '';
                imgLink = value.multimedia[4].url;

                var $articlelist = $('.grid-list');
                var listitem = '';

                listitem += '<li class="article"><a href="'
                listitem += value.url
                listitem += '"><img class="news-img" src="'
                listitem += imgLink
                listitem += '"/></a><div class="text-wrapper"><p class="article-text">'
                listitem += value.abstract
                listitem += '</p></div></li>'

                $articlelist.append(listitem)
            })
        })
    });

    $(document).on('click', 'a', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        window.open(url, '_blank');
    });
})