const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
req.send();
req.onload = () => {
  const json = JSON.parse(req.responseText);
  const baseTemp = json.baseTemperature;
  const data = json.monthlyVariance.map(d => {return {
      year: d.year,
      month: d.month,
      variance: d.variance.toFixed(1),
      date: new Date(d.year, d.month, 0, 0, 0, 0, 0),
      temp: (baseTemp + d.variance).toFixed(1) };
  });
  const formatMonth = d3.timeFormat("%B");
  const formatYear = d3.timeFormat("%Y");
  const formatYearMonth = d3.timeFormat('%Y- %B');
  const width = 1500;
  const height = 600;
  const svg = d3.select('#heatmap').
  append('svg').
  attr('height', height).
  attr('width', width).
  attr('class', 'svg').
  attr('id', 'svg');
  const tooltip = d3.select('#heatmap').
  append('div').
  attr('class', 'tooltip').
  attr('id', 'tooltip').
  style('opacity', 0);
  const monthOffset = 80;
  const yearOffset = 100;
  const xScale = d3.scaleTime().
  domain([d3.min(data, d => d.year),
  d3.max(data, d => d.year)]).
  range([monthOffset, width]);
  const yScale = d3.scaleTime().
  domain([d3.min(data, d => new Date(0, 0, 0, 0, 0, 0, 0)),
  d3.max(data, d => new Date(0, 12, 0, 0, 0, 0, 0))]).
  range([0, height - yearOffset]);
  const cellHeight = (height - yearOffset) / 12 + 1;
  const cellWidth = (width - monthOffset) / data.filter(d => d.month == 1).length;
  const heatScale = ['#1A237E', '#0D47A1', '#0277BD', '#039BE5', '#64B5F6', '#BBDEFB',
  '#FFF8E1', '#FFE0B2', '#FFAB91', '#FF7043', '#F4511E', '#D32F2F', '#B71C1C'];
  console.log(cellWidth);
  svg.selectAll('rect').
  data(data).
  enter().
  append('rect').
  attr('class', 'cell').
  attr('width', cellWidth).
  attr('height', cellHeight).
  attr('y', (d, i) => yScale(new Date(0, d.month - 1, 0, 0, 0, 0, 0))).
  attr('x', (d, i) => xScale(d.year)).
  attr('data-month', d => d.month).
  attr('data-year', d => d.year).
  attr('data-temp', d => d.temp).
  attr('fill', d => {
    if (d.temp <= 2)
    return heatScale[0];else
    if (d.temp <= 3)
    return heatScale[1];else
    if (d.temp <= 4)
    return heatScale[2];else
    if (d.temp <= 5)
    return heatScale[3];else
    if (d.temp <= 6)
    return heatScale[4];else
    if (d.temp <= 7)
    return heatScale[5];else
    if (d.temp <= 8)
    return heatScale[6];else
    if (d.temp <= 9)
    return heatScale[7];else
    if (d.temp <= 10)
    return heatScale[8];else
    if (d.temp <= 11)
    return heatScale[9];else
    if (d.temp <= 12)
    return heatScale[10];else

    return heatScale[11];
  }).
  on('mouseover', function (d, i) {
    d3.select(this).
    attr('stroke', 'black').
    style('stroke-with', '5');
    const variance = d.variance <= 0 ?
    d.variance :
    '+' + d.variance;
    tooltip.style('opacity', '0.9').
    attr('data-year', d.year).
    html(formatYearMonth(d.date) + '<br />' +
    d.temp + '&#8451<br />' +
    variance + '&#8451').
    style("left", d3.event.pageX - 70 + "px").
    style("top", d3.event.pageY - 120 + "px");;
  }).
  on('mouseout', function () {
    d3.select(this).
    attr('stroke', 'none');
    tooltip.style('opacity', '0').
    html('');
  });
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(formatMonth);
  svg.append('g').
  attr('id', 'x-axis').
  attr('transform', 'translate(0,' + (height - yearOffset) + ')').
  call(xAxis);
  svg.append('g').
  attr('id', 'y-axis').
  attr('transform', 'translate(' + monthOffset + ',' + cellHeight / 2 + ')').
  call(yAxis);

  svg.append('text').
  attr('id', 'y-label').
  attr('class', 'y-label').
  attr("text-anchor", "end").
  attr("dy", "2em").
  attr('dx', '-15em').
  attr("transform", "rotate(-90)").
  text("Month");

  svg.append('text').
  attr('id', 'x-label').
  attr('class', 'x-label').
  attr("text-anchor", "end").
  attr("x", width / 2).
  attr("y", height - 70).
  text("Year");
  const completeLengendWidth = 200;
  const completeLegendHeight = 50;
  const legend = svg.append('g').
  attr('class', 'legend').
  attr('id', 'legend').
  attr('transform', 'translate(0,' + (height - 50) + ')');
  const legendWidth = 30;
  const legendHeight = 30;
  const legendOffset = 100;
  legend.selectAll('rect').
  data(heatScale).
  enter().
  append('rect').
  attr('width', legendWidth).
  attr('height', legendHeight).
  attr('x', (d, i) => legendOffset + legendWidth * i).
  attr('y', 0).
  attr('stroke', 'black').
  style('stroke-width', 1).
  attr('fill', d => d);
  const legendScale = d3.scaleLinear().
  domain([2, 13]).
  range([legendOffset + legendWidth, legendOffset + legendWidth * 12]);
  const legendAxis = d3.axisBottom(legendScale);
  legend.append('g').
  attr('id', 'legend-labels').
  attr('transform', 'translate(0,' + legendHeight + ')').
  call(legendAxis);

};