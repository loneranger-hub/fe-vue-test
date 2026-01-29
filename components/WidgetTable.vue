<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="table-header">
      <h3 class="m-0 text-lg text-gray-800 font-semibold">{{ title }}</h3>
    </div>
    <div class="flex-1 overflow-y-auto border border-gray-300 rounded-lg">
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column"
              class="p-3 text-left font-semibold text-gray-800 border-b-2 border-gray-300"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in rows" 
            :key="index"
            class="hover:bg-gray-50"
          >
            <td 
              v-for="column in columns" 
              :key="column"
              :class="[
                'p-3 border-b border-gray-200 text-gray-600',
                index === rows.length - 1 ? 'border-b-0' : ''
              ]"
            >
              {{ row[column.toLowerCase()] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  columns: string[]
  rows: Record<string, any>[]
}

defineProps<Props>()
</script>
