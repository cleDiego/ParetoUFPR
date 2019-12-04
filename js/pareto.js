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

console.log(dados);

dados.data.sort(function(a,b){
    if(a.d < b.d) return 1
    if(a.d > b.d) return -1
    return 0;
 });
console.log(dados);

var categories = []; var values = [];
$.each(dados.data, function( index, value ) {
    categories.push(value.t);
    values.push(value.d);
});
console.log(categories);
console.log(values);



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

