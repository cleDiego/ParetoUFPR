var body = $("html, body");
var t = $("#tableDados").DataTable({
    "info": true,
    "paging": false,
    "order": []
});

$(".ziehharmonika").ziehharmonika({
    highlander: false,
    collapsible: true,
    scroll: false
});
//$('.ziehharmonika h3:eq(3)').ziehharmonika('open');
//$('.ziehharmonika h3:eq(0)').ziehharmonika('open');
        

var dados = {
    title: 'Motivos de cancelamento/devolução de pedidos em Nov/19',
    xAxisTitleLeft: 'Frequência em quantidade',
    xAxisTitleRight: 'Frequência Acumulada em %',
    seriesPercentName: '% Acumudado',
    seriesValName: 'Casos Identificados',
    data : [
        {t:'Sepração errada', d:45},
        {t:'Faturamento Inconrreto', d:60},
        {t:'Atraso na transportadora', d:125},
        {t:'Pedido Errado', d:30},
        {t:'Atraso na Entrega', d:140},
        {t:'Não Gostou', d:17},
        {t:'Danificado durante a entrega', d:10},
        {t:'Cliente pediu errado', d:18},
        {t:'Preço errado', d:20},
        {t:'Produto com defeito', d:65},
        {t:'Outros', d:8},
    ],
    classeA: 0, //80% de 20% dos itens 80/20
    classeB: 0, //15%
    classeC: 0 //5%
};


dados.classeA = dados.data.length*0.2;
dados.classeB = dados.data.length*0.5;

sortDesc();
tableUpdate();

categories = []; values = [];
$.each(dados.data, function( index, value ) {
    categories.push(value.t);
    values.push(value.d);
});



var chart = Highcharts.chart('graph', {
    chart: { renderTo: 'graph',   type: 'column' },
    title: { text: dados.title },
    tooltip: { shared: true },
    xAxis: {
        categories: categories,
        crosshair: true,
        plotLines: [
            { color: '#FF0000', width: 2,  zIndex: 3,  value: dados.classeA },
            { color: '#e94d0a', width: 1,  zIndex: 3,  value: dados.classeB }
        ]
    },
    yAxis: [
        { title: {  text: dados.xAxisTitleLeft }}, //eixo esquerdo
        { title: {  text: dados.xAxisTitleRight }, //eixo direito
            minPadding: 0,  maxPadding: 0,  max: 100,  min: 0,  opposite: true,  labels: {  format: "{value}%" }
        }
    ],
    series: [
        { type: 'pareto',  name: dados.seriesPercentName,  yAxis: 1,  zIndex: 10,  baseSeries: 1,  labels: {  format: "{value}%" }}, 
        { name: dados.seriesValName, type: 'column', zIndex: 2,  data: values  }]
});



function sortDesc(){
    dados.data.sort(function(a,b){
        if(a.d < b.d) return 1
        if(a.d > b.d) return -1
        return 0;
    });
}

function tableUpdate() {
    t.clear();
    $.each(dados.data, function( index, value ) {
        t.row.add([
            value.t, value.d, 
            "<a href='#' class='edit' title='"+index+"' data='"+index+"'><i class='fa fa-pencil-square-o'></i></a>", 
            "<a href='#' class='remove' title='"+index+"' data='"+index+"'><i class='fa fa-trash-o danger'></i></a>"
        ]).draw(false);
    });
}

function charUpdate() {
    categories = []; values = [];
    $.each(dados.data, function( index, value ) {
        categories.push(value.t);
        values.push(value.d);
    });

    chart.update({
        xAxis: { categories: categories },
        series: [
            { yAxis: 1, zIndex: 10, baseSeries: 1 }, 
            { data: values }
        ]
    });
}

$("#formInsert").submit(function(e) {
    let name = $("#nameInsert").val();
    let ok = true;
    $.each(dados.data, function( index, value ) {
        if(value.t == name){
            ok = false;
        }
    });

    if (ok) {
        let value = parseInt($("#valueInsert").val());
        let pos = dados.data.push({t: name, d: value});
        sortDesc();
        tableUpdate();
        charUpdate();
        alerts('success', name + ' adicionado com sucesso!', 2);
    } else {
        alerts('danger', name + ' já existe no gráfico, tente um nome diferente!', 2);
    }
    e.preventDefault();
});

$("#formUpdate").submit(function(e) {
    let name = $("#nameUpdate").val();
    let value = $("#valueUpdate").val();
    let index = $("#idUpdate").val();
    dados.data[index] = {t: name, d: value};
    tableUpdate();
    charUpdate();
    alerts('success', name  +':' + value + ', atualizado com sucesso!', 2);
    e.preventDefault();
});


$(document).on('click', '#tableDados td a.remove', function(e) {
    let index = $(this).attr('data');
    let dataRemove = dados.data[index];

    swal({
        title: "Tem certeza?",
        text: "Deseja mesmo remover " + dataRemove.t + ":" + dataRemove.d + " ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((res) => {
        if (res) {
            let remove = dados.data.splice(index, 1);
            tableUpdate();
            charUpdate();
            alerts('success', dataRemove.t  +', removido com sucesso!', 2);
        } else {
            $("#alerts").html("");
        }
    });
    e.preventDefault();
});



$("#rowUpdateCancel").click(function() {
    $("#formInsert").show("fast");
    $("#formUpdate").hide("fast");
    $("#nameUpdate").val("");
    $("#valueUpdate").val("");
    $("#idUpdate").val("");
});

$(document).on('click', '#tableDados td a.edit', function(e) {
    let index = $(this).attr('data');
    let dataEdit = dados.data[index];
    if(dataEdit) {
        $("#formInsert").hide("fast");
        $("#formUpdate").show("fast");
        $("#nameUpdate").val(dataEdit.t);
        $("#valueUpdate").val(dataEdit.d);
        $("#idUpdate").val(index);
    }
    e.preventDefault();
});


$(window).bind('beforeunload', function(){
    return "teste";
});

function alerts(type, msg, time) {
    $("#alerts").html(
        '<div class="alert alert-'+ type +' alert-dismissible fade show shadow2" role="alert">'
        +'<strong>'+ msg +'</strong> '
        +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
        +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +'</div>'
    );
    setTimeout(function() {
        $(".alert").alert('close');
    }, time);
}
