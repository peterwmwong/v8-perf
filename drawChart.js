module.exports = function(results) {
  const befores = results.map(r => r.before);
  const afters = results.map(r => r.after);
  const titles = results.map(r => encodeURI(`${r.name}${r.arg ? '*' : ''}`)).join('|');
  const beforePart = befores.join(',');
  const afterPart = results.map(r => r.after).join(',');
  const maxVal = Math.max(...[...befores, ...afters]);
  const chartTitle = encodeURI('Time in ms (less is better) [* est startup perf]');
  let resultsData = `chma=10,50&amp;chtt=${chartTitle}&amp;chdl=before|after&amp;chxl=0:|1:|${titles}&amp;chd=t:${beforePart}|${afterPart},_`;
  console.log(
    `\n\n![Results](https://image-charts.com/chart?cht=bhg&amp;chs=700x600&amp;chds=0,${maxVal}&amp;chco=c6d9fd,4d89f9&amp;chbh=a&amp;chxs=0,000000,0,0,_&amp;chxt=y,x&amp;chm=N,000000,0,,10|N,000000,1,,10&amp;${resultsData} "Results")`
  )
};
