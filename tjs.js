$(document).ready(function() {
    $('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });
    $(".geral table:eq(2)").before("<p style='text-align: right'><img src='imagens/lupa.gif' class='status' /> <input id='searchProt' type='text' /></p>");
    
    function addHighlighting(element, textToHighlight){
       var text = element.text();
       var highlightedText = '<span class="highlight">' + textToHighlight + '</span>';
       var newText = text.replace(textToHighlight, highlightedText);
       element.html(newText);
    }
    
    function removeHighlighting(highlightedElement){
        /*highlightedElements.each(function(){
           var element = $(this);
           element.replaceWith(element.html());
        })*/
    }
    
    $("#searchProt").on("keyup", function() {
        $(".geral table:eq(2) tr > td span.highlight").each(function(){  
            $(this).replaceWith($( this ).text());    
        });
        var value = $("#searchProt").val().toLowerCase();
        
        $(".geral table:eq(2) tr").each(function(etr) {
            if(etr > 2) {
                var show = false;
                var td = [];
                $(this).find('td').each (function(etd) {
                    removeHighlighting(this);
                    var pos = $(this).text().toLowerCase().indexOf(value);
                    if(pos > -1) {
                        show = true;
                        addHighlighting($(this), $(this).text().substring(pos, pos + value.length));
                    }
                });
                
                if(show) $(this).show();
                else $(this).hide();
            }
        });
    });

});
