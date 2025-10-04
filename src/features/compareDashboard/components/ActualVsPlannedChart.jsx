import { Spin } from "antd";
import { Bar } from "react-chartjs-2";

const ActualVsPlannedChart = ({ dataSource = [], isLoading = false }) => {
  const rows = Array.isArray(dataSource) ? dataSource : [];

  const labels = rows.map(r => r.period);
  const plan = rows.map(r => r?.planQuantity ?? 0);
  const actual = rows.map(r => r?.actualTotalQuantity ?? 0);

  const hasAnyValue = plan.some(v => v !== 0) || actual.some(v => v !== 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Plan",
        data: plan,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: actual,
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${(ctx.parsed.y ?? 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { stacked: false },
      y: {
        beginAtZero: true,
        suggestedMax: hasAnyValue ? undefined : 1, // ถ้าทั้งหมดเป็น 0 ให้เห็นแกน
        ticks: { callback: v => Number(v).toLocaleString() },
      },
    },
  };

  // plugin โชว์ "No data" เมื่อค่าเป็นศูนย์หมด
  const noDataPlugin = {
    id: "no-data",
    afterDraw(chart) {
      if (hasAnyValue) return;
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      ctx.save();
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "center";
      ctx.fillText(
        "No data",
        (chartArea.left + chartArea.right) / 2,
        (chartArea.top + chartArea.bottom) / 2
      );
      ctx.restore();
    },
  };

  return (
    <div style={{ width: "100%", height: "25vh", position: "relative" }}>
      <Spin spinning={isLoading} size="large">
        <div style={{ width: "100%", height: "25vh" }}>
          <Bar data={data} options={options} plugins={[noDataPlugin]} />
        </div>
      </Spin>
    </div>
  );
};

export { ActualVsPlannedChart };
