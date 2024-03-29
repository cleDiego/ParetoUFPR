$(document).ready(function() {
    /*$('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });*/
    
    if($(".geral table:eq(2) tr:eq(2) th:eq(2)").text().replace(/\W/g, '') == "Protocolo") {
        $(".geral table:eq(2)").before("<p style='text-align: right' id='searchTable'><img src='imagens/lupa.gif' class='status' /> <input id='searchProt' type='text' /></p>");
    }
    
    function addHighlighting(element, textToHighlight){
        var thref = element.find('a').prop('href');
        if(!thref) {
            var highlightedText = "<span class='highlight'>" + textToHighlight + "</span>";
            element.html(element.html().replace(textToHighlight, highlightedText));
        }
    }
    
    function removeHighlighting(highlightedElement){
        /*highlightedElements.each(function(){
           var element = $(this);
           element.replaceWith(element.html());
        })*/
    }
    
    $("#searchProt").on("keyup", function() {
        $(".geral table:eq(2) tr > td span.highlight").each(function(){  
            $(this).replaceWith($(this).text());    
        });
        var value = $("#searchProt").val().toLowerCase();
        
        $(".geral table:eq(2) tr").each(function(etr) {
            if(etr > 2) {
                var show = false;
                var td = [];
                $(this).find('td').each (function(etd) {
                    if(etd > 1) {
                        removeHighlighting(this);
                        var pos = $(this).text().toLowerCase().indexOf(value);
                        if(pos > -1) {
                            show = true;
                            addHighlighting($(this), $(this).text().substring(pos, pos + value.length));
                        }
                    }
                });
                
                if(show) $(this).show();
                else $(this).hide();
            }
        });
    });

});
