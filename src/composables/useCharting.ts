import { colors } from 'quasar'

export default function useCharting() {
  const { getPaletteColor } = colors

  function getSingleChartOptions() {
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

  function getSingleChartDataset(
    items: any[],
    upTrendColor: string,
    downTrendColor: string,
    pointColor?: string
  ) {
    return {
      data: items,
      label: '', // No legend label for single chart
      backgroundColor: pointColor || getPaletteColor('white'),
      borderColor: pointColor || getPaletteColor('black'),
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
    getSingleChartOptions,
    getSingleChartDataset,
  }
}
