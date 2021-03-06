const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload = () => {
  const json = JSON.parse(req.responseText);
  const data = json.data;
  const width = 1000;
  const height = 500;
  const padding = 45;
  const svg = d3.select('#bar-graph').
  append('svg').
  attr('width', width).
  attr('height', height);
  const tooltip = d3.select('#bar-graph').
  append('div').
  attr('class', 'tooltip').
  attr('id', 'tooltip').
  style('opacity', 0);
  const minYear = parseInt(data[0][0].substring(0, 4));
  const maxYear = parseInt(data[data.length - 1][0].substring(0, 4));
  const xScale = d3.scaleLinear().
  domain([minYear, maxYear]).
  range([padding, width - padding]);
  const yScale = d3.scaleLinear().
  domain([0, d3.max(data, d => d[1])]).
  range([height - padding, padding]);
  const barWidth = 4;
  const mapping = {
    '01-01': 'Q1',
    '04-01': 'Q2',
    '07-01': 'Q3',
    '10-01': 'Q4' };

  svg.selectAll('rect').
  data(data).
  enter().
  append('rect').
  attr('x', (d, i) => xScale(minYear + i * 0.25)).
  attr('y', d => yScale(d[1])).
  attr('width', barWidth).
  attr('height', d => height - padding - yScale(d[1])).
  attr('class', 'bar').
  attr('data-date', d => d[0]).
  attr('data-gdp', d => d[1]).
  on("mouseover", function (d, i) {
    let money = String(parseInt(d[1]));
    if (money.length > 3) {
      money = money.substring(0, money.length % 3) +
      ',' +
      String(d[1]).substring(money.length % 3);
    } else {
      money = d[1];
    }
    const display = d[0].substring(0, 4) +
    " " +
    mapping[d[0].substring(5)] +
    "<br />$" +
    money +
    " Billion";
    d3.select(this).style("opacity", "0.2");
    tooltip.style("opacity", 0.9);
    tooltip.attr("id", "tooltip");
    tooltip.attr("data-date", d[0]);
    tooltip.html(display).
    style("left", d3.event.pageX + 10 + "px").
    style("top", d3.event.pageY - 60 + "px");
  }).
  on("mouseout", function () {
    d3.select(this).
    style("opacity", "0.7");
    tooltip.style("opacity", 0);
  });

  console.log(data);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);
  svg.append('g').
  attr('transform', 'translate(0,' + (height - padding) + ')').
  attr('id', 'x-axis').
  call(xAxis);
  svg.append('g').
  attr('transform', 'translate(' + padding + ',0)').
  attr('id', 'y-axis').
  call(yAxis);
  svg.append('text').
  attr('id', 'y-label').
  attr('class', 'y-label').
  attr("text-anchor", "end").
  attr("dy", "4em").
  attr('dx', '-10em').
  attr("transform", "rotate(-90)").
  text("Gross Domestic Product");
};