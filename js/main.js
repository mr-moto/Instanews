$(function () {

$(".loader").hide();

$('select').on('change', function(){
    $('.site-header').toggleClass('site-header-up').removeClass('site-header');
    $('.logo').toggleClass('logo-up').removeClass('logo');
    $('.logo-wrap').toggleClass('logo-wrap-up').removeClass('logo-wrap');

    $('.loader').show();
    
    



    var $news = $('.grid-list');
    $news.empty();// emptys .grid-list

    var category = this.value; //takes value of option and puts it in api url
    $.ajax({
        url: 'https://api.nytimes.com/svc/topstories/v2/'+category+'.json?api-key=ce652fdef4f54825ad624cc67075d65b',
        method: 'GET',
        dataType: 'json'
    })

    .done(function(data){ //grabs data from api
        $('.loader').hide();
        var imgFilter = data.results.filter(function(imgdata){ // filter object -> results ->
            return imgdata.multimedia.length; //returns multimedia with length of 1 or more
        }).slice(0,12); // grabs the 0-12
        $.each(imgFilter, function(index, value){ //for each multimedia, function (index, value)
            var imgLink = ''; // assign empty var. will populate later
            imgLink = value.multimedia[4].url; //image url link


            $('.grid-list').append('<li class="article"><a href="'+value.url+'"><img class="news-img" src="'+imgLink+'"/><div class="text-wrapper"><p class="article-text">'+value.abstract+'</p></div></a></li>')
        })

    })

})
})