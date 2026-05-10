import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function Chart({ pesoKg, grasaPct, masaMuscularKg }) {
  const option = {
    tooltip: {
      trigger: 'item',
    },

    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: `${pesoKg}\nkg`,
        fill: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    },

    series: [
      {
        name: 'Composición',
        type: 'pie',
        radius: ['55%', '75%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          { value: masaMuscularKg, name: 'Masa muscular' },
          { value: grasaPct, name: '% Grasa' },
          { value: 100 - grasaPct, name: 'Otros' },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 180, width: '100%' }}
    />
  );
}