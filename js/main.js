$(function () {


    $.ajax({
        url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ce652fdef4f54825ad624cc67075d65b',
        method: 'GET',
        dataType: 'json'
    })

    .done(function(data){
        var imgFilter = data.results.filter(function(imgdata){
            return imgdata.multimedia.length;
        }).slice(0,12);
        $.each(imgFilter, function(index, value){
            var imgLink = '';
            imgLink = value.multimedia[4].url;

            $('.grid-list').append('<li class="results-wrap"><div class="h3-wrap"><h3 class="h3result">' + value.abstract + '</h3></div><img class="news-img" src=' + imgLink + ' /></li>');
        })

    })
})