export const optionsChart = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
    scales: {
      x: {
          display: false, 
          grid: {
              display: false
          },
          ticks: {
              display: false 
          }
      },
      y: {
          display: false, 
          grid: {
              display: false 
          },
          ticks: {
              display: false 
          }
      }
    }
  }