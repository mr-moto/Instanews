$(function () {


    $.ajax({
        url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ce652fdef4f54825ad624cc67075d65b',
        method: 'GET',
        dataType: 'json'
    })

        .done(function (data) {
            if (data.results.length > 0) {
                $.each(data.results, function (index, value) {
                    var newsImageLink = '';
                    //debugger;
                    if (value.multimedia.length) {
                        newsImageLink = value.multimedia[4].url;
                    }

                    $('.grid-list').append('<li class="results-wrap"><div class="h3-wrap"><h3 class="h3result">' + value.abstract + '</h3></div><img class="news-img" src=' + newsImageLink + ' /></li>');

                })

            }

            // else {
            //     alert('got no data back from server');
            // }
        })
})