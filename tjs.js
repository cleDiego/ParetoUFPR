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
        var value = $(this).val();
        // remove all highlighted text passing all em tags
        removeHighlighting($("table tr em"));
        $(".geral table:eq(2) tr").each(function(index) {
            if (index !== 0) {
                $row = $(this);
                var $tdElement = $row.find("td:first");
                var id = $tdElement.text();
                var matchedIndex = id.indexOf(value);

                if (matchedIndex != 0) {
                    $row.hide();
                }
                else {
                    //highlight matching text, passing element and matched text
                    addHighlighting($tdElement, value);
                    $row.show();
                }
            }
        });
    });
});
