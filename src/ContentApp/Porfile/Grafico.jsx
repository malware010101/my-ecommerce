import React from "react";
import ReactECharts from "echarts-for-react";

export default function Grafico({data}) {
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,

        pointer: {
          show: false
        },

        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646"
          }
        },

        axisLine: {
          lineStyle: {
            width: 30,
            color: [[1, "#1a1a1a"]]
          }
        },

        splitLine: {
          show: false
        },

        axisTick: {
          show: false
        },

        axisLabel: {
          show: false
        },

        data: [
          {
            value: data?.masa_muscular_pct ?? 0,
            name: "MUSCULO",
            itemStyle: {
              color: "#00B3FF"
            },
            title: {
              offsetCenter: ["0%", "-25%"],
              color: "#00B3FF",
              fontWeight: "bold"
            },
            detail: {
              offsetCenter: ["0%", "-10%"],
              formatter: " {value}%"
            }
          },
          {
            value: data?.grasa_pct ?? 0,
            name: "GRASA",
            itemStyle: {
              color: "#FF6D00"
            },
            title: {
              offsetCenter: ["0%", "10%"],
              color: "#FF6D00",
              fontWeight: "bold"
            },
            detail: {
              offsetCenter: ["0%", "25%"],
              formatter: " {value}%"
            }
          }
        ],

        title: {
          fontSize: 14,
          color: "#ffffff"
        },

        detail: {
          valueAnimation: false,
          fontSize: 18,
          color: "#fff",
          formatter: "{value}"
        }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{
        height: 400,
        width: "100%"
      }}
    />
  );
}