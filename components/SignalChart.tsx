import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SignalChartProps {
  strength: number; // -100 to 0
}

export const SignalChart: React.FC<SignalChartProps> = ({ strength }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 200;
    const height = 20;
    const normalized = Math.max(0, Math.min(100, strength + 100)); // Convert -100..0 to 0..100

    // Background bar
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 4)
      .attr("fill", "#334155");

    // Fill bar
    svg.append("rect")
      .attr("width", (normalized / 100) * width)
      .attr("height", height)
      .attr("rx", 4)
      .attr("fill", normalized > 70 ? "#10b981" : normalized > 40 ? "#fbbf24" : "#ef4444")
      .transition()
      .duration(500)
      .attr("width", (normalized / 100) * width);

  }, [strength]);

  return (
    <svg ref={svgRef} width="100%" height="20" viewBox="0 0 200 20" className="w-full" />
  );
};
