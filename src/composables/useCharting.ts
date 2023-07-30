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

  function getBmiChartDataset(items: any[]) {
    return {
      data: items,
      label: '', // No legend label for single chart
      backgroundColor: getPaletteColor('white'),
      borderColor: getPaletteColor('black'),
      segment: {
        borderColor: (ctx: any) => {
          if (ctx.p1.raw >= 30) {
            return getPaletteColor('negative')
          } else if (ctx.p1.raw >= 25) {
            return getPaletteColor('warning')
          } else if (ctx.p1.raw >= 18.5) {
            return getPaletteColor('positive')
          } else {
            return getPaletteColor('accent')
          }
        },
      },
    }
  }

  return {
    getSingleChartOptions,
    getSingleChartDataset,
    getBmiChartDataset,
  }
}
