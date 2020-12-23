(function() {
  let width = 750;

        
var height = 500;

  let nodes = d3.range(200).map(() => {
            return {
                radius: Math.random() * 12 + 4
            };
        });

        
var root = nodes[0];

        
var color = d3.scale.category20c();

  root.radius = 0;
  root.fixed = true;

  var force = d3.layout
    .force()
    .gravity(0.05)
    .charge((d, i) => {
            return i ? 0 : -2000;
        })
    .nodes(nodes)
    .size([width, height]);

  force.start();

  var svg = d3
    .select('div#bubbles')
    .append('div')
    .classed('svg-container', true) // container class to make it responsive
    .append('svg')
    // responsive SVG needs these 2 attributes and no width and height attr
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 800 500')
    // class to make it responsive
    .classed('svg-content-responsive', true);

  svg
    .selectAll('circle')
    .data(nodes.slice(1))
    .enter()
    .append('circle')
    .attr('r', (d) => {
            return d.radius;
        })
    .style('fill', (d, i) => {
            return color(i % 3);
        });

  force.on('tick', (e) => {
        var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;

        while (++i < n) q.visit(collide(nodes[i]));

        svg.selectAll("circle")
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
    });

  svg.on('mousemove', function() {
    let p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    force.resume();
  });

  function collide(node) {
    let r = node.radius + 16;

            
var nx1 = node.x - r;

            
var nx2 = node.x + r;

            
var ny1 = node.y - r;

            
var ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== node) {
        let x = node.x - quad.point.x;

                    
var y = node.y - quad.point.y;

                    
var l = Math.sqrt(x * x + y * y);

                    
var r = node.radius + quad.point.radius;
        if (l < r) {
          l = ((l - r) / l) * 0.5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }
})();
