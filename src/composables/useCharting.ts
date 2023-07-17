import { colors } from 'quasar'

export default function useCharting() {
  const { getPaletteColor } = colors

  function getChartOptions() {
    return {
      reactive: true,
      responsive: true,
      aspectRatio: 1,
      radius: 2,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (tooltipItem: any) => tooltipItem?.[0]?.label ?? '',
          },
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 70,
            minRotation: 70,
          },
        },
      },
    }
  }

  function getChartData(chartLabels: string[], chartData: any) {
    return {
      labels: chartLabels,
      datasets: [chartData],
    }
  }

  function getChartDataset(items: any[], upTrendColor: string, downTrendColor: string) {
    return {
      data: items,
      label: '', // Legend label
      backgroundColor: getPaletteColor('white'),
      borderColor: getPaletteColor('white'),
      segment: {
        borderColor: (ctx: any) => {
          return ctx.p0.parsed.y > ctx.p1.parsed.y
            ? getPaletteColor(downTrendColor)
            : undefined || getPaletteColor(upTrendColor)
        },
      },
    }
  }

  return {
    getChartOptions,
    getChartData,
    getChartDataset,
  }
}
