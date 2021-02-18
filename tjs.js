$(document).ready(function() {
    $('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });
    $(".geral table:eq(2)").before("<p style='text-align: right'><img src='imagens/lupa.gif' class='status' /> <input id='searchProt' type='text' /></p>");
    
    function addHighlighting(element, textToHighlight){
       var text = element.text();
       var highlightedText = '<em>' + textToHighlight + '</em>';
       var newText = text.replace(textToHighlight, highlightedText);
       element.html(newText);
    }
    
    function removeHighlighting(highlightedElements){
       highlightedElements.each(function(){
           var element = $(this);
           element.replaceWith(element.html());
      })
    }
    
    $("#searchProt").on("keyup", function() {
        var value = $("#searchProt").val().toLowerCase();
        
        $(".geral table:eq(2) tr").each(function(index) {
            if(index > 2) {
                $(this).filter(function() {
                    if($(this).text().toLowerCase().indexOf(value) > -1) {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                });
            }

        });
    });

});
