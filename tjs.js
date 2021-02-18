$(document).ready(function() {
    $('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });
    $(".geral table:eq(2)").prepend("<input id='searchProt' type='text' />");
    
    // removes highlighting by replacing each em tag within the specified elements with it's content
    function removeHighlighting(highlightedElements){
        highlightedElements.each(function(){
            var element = $(this);
            element.replaceWith(element.html());
        })
    }

    // add highlighting by wrapping the matched text into an em tag, replacing the current elements, html value with it
    function addHighlighting(element, textToHighlight){
        var text = element.text();
        var highlightedText = '<em>' + textToHighlight + '</em>';
        var newText = text.replace(textToHighlight, highlightedText);

        element.html(newText);
    }

    $("#searchProt").on("keyup", function() {
        $(".geral table:eq(2) tr").each(function(index) {
            if(index != 2) {
                $(this).filter(function() {
                  $(this).toggle($(this).text().toLowerCase().indexOf($("#searchProt").val()) > -1)
                });
            }

        });
    });
});
