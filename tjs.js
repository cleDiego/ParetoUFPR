$(document).ready(function() {
    $('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });
    $(".geral table:eq(2)").before("<p style='text-align: right'><img src='imagens/lupa.gif' class='status' /> <input id='searchProt' type='text' /></p>");
    
    (function () {
    
        var removeHighlight = function () {
            $('span.highlight').contents().unwrap();
        };

        var wrapContent = function (index, $el, text) {
            var $highlight = $('<span class="highlight"/>')
                .text(text.substring(0, index));
            //console.log(text.substring(0, index));
            var normalText = document.createTextNode(text.substring(index, text.length));
            //console.log(index, $highlight.text(), normalText);
            $el.html($highlight).append(normalText);
        };

        var highlightTextInTable = function ($tableElements, searchText) {
            // highlights if text found (during typing)
            var matched = false;
            //remove spans
            removeHighlight();

            $.each($tableElements, function (index, item) {
                var $el = $(item);
                if ($el.text().search(searchText) != -1 && !matched) {
                    //console.log("matched", $el, $el.html());
                    wrapContent(searchText.length, $el, $el.html());
                    //console.log(searchText, $el.text());
                    if (searchText == $el.text()) {
                        // found the entry
                        //console.log("matched");
                        matched = true;
                    }
                }
            });
        };

        $(function () {
            //load table into object
            var $tableRows = $('.geral table:eq(2) tr');
            var $tableElements = $tableRows.children();

            //console.log($tableRows, $tableElements);

            $('#searchProt').on('keyup', function (e) {
                var searchText = $(this).val();
                if (searchText.length == 0) {
                    // catches false triggers with empty input (e.g. backspace delete or case lock switch would trigger the function)
                    removeHighlight(); // remove last remaining highlight
                    return;
                }

                highlightTextInTable($tableElements, searchText);

            });
        });

    })();
});
