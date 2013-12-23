$('#mybtn').click(function(e) {
    e.preventDefault();
    $('.logo').toggleClass('flip');
    if($('span', this).hasClass('fui-cross')) {
        $('#mytext').val("");
        $('#draw').html("");
    }
    else {
        var text = $('#mytext').val();
        var $slider;
        $("#draw").dmak(text, {
            uri: 'kanji/',
            stroke: {
                attr : {
                    'active': '#E74C3C',
                    'stroke': '#BAC1C8',
                    'stroke-width': 2,
                }
            },
            loaded: function(strokes) {
                $(".wrap-draw").addClass("slideDown");
                $slider = $("#slider");
                if ($slider.length > 0) {
                    var p = 1;
                    $slider.slider({
                        min: 1,
                        max: strokes.length + 1,
                        value: 1,
                        orientation: "horizontal",
                        range: "min",
                        slide: function(event, ui) {
                        
                            var range = ui.value - p;
                            if(range < 0) {
                                $("#draw").dmak('rewind', range * -1);
                            }
                            else {
                                console.log(range);
                                $("#draw").dmak('forward', range);
                            }
                            p = ui.value;
                        }
                    }).addSliderSegments($slider.slider("option").max);
                }
            },
            erased: function(index) {
                if($slider.slider("value") > index) {
                     $slider.slider( "value", index + 1 );
                }
            },
            drew: function(index) {
                if($slider.slider("value") <= index) {
                     $slider.slider( "value", index  + 1 );
                }
            }
        });
    }
    $('span', this).toggleClass('fui-arrow-right');
    $('span', this).toggleClass('fui-cross');
});

$("#play").on("click", function(e){
     $('#draw').dmak('play');
});

$("#pause").on("click", function(e){
    $('#draw').dmak('pause');
});

$("#rewind").on("click", function(e){
    $('#draw').dmak('rewind', 1);
});

$("#forward").on("click", function(e){
    $('#draw').dmak('forward', 1);
});

$("#sample-words span").on("click", function(e){
    e.preventDefault();
    $('#mytext').val($(this).html());
});

// Add segments to a slider
$.fn.addSliderSegments = function (amount) {
  return this.each(function () {
    var segmentGap = 100 / (amount - 1) + "%"
      , segment = "<div class='ui-slider-segment' style='margin-left: " + segmentGap + ";'></div>";
    $(this).prepend(segment.repeat(amount - 2));
  });
};