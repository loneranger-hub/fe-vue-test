<template>
  <div class="flex flex-col gap-4 h-full p-5 bg-white rounded-lg shadow-md">
    <div class="chart-header">
      <h1 class="m-0 text-lg text-gray-800">{{ title }}</h1>
    </div>
    <div class="flex-1 relative flex items-end py-5">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { CONFIG } from "~/constants/actionTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  title: string;
  data: number[];
  labels?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => [],
});

const chartData = computed(() => ({
  labels:
    props.labels.length > 0
      ? props.labels
      : props.data.map((_, i) => `Q${i + 1}`),
  datasets: [
    {
      label: props.title,
      data: props.data,
      backgroundColor: CONFIG.CHART_COLORS.BACKGROUND,
      borderColor: CONFIG.CHART_COLORS.BORDER,
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}));

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};
</script>
