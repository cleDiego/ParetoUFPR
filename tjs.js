$(document).ready(function() {
    $('input[type=checkbox], input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '1%'
    });
    $('.geral table:eq(3)').DataTable({
        "paging":   false,
        "order": [ 4, "asc" ],
        "info":     false
    });
});
