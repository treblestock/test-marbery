<template>
  <div class="orders-sidebar">
    <Button 
      to="/manager/orders"
      class="back-button"
      size="small" 
      color="light-purple-reverse"
      width="full"
    >назад</Button>

    <div class="block">
      <DateRange 
        class="date-range"
        @change="handleSelectDate"
      />
      <Search 
        class="product-search"
        :search-query="selectedSearchValue"
        :type="selectedSearchType"
        :types="searchOptions"
        @update:search-query="handleSearchValueUpdate"
        @update:type="handleSearchTypeUpdate"
      />
      <div class="search-sorts">
        <Button 
          v-for="(iconClass, searchType) in searchTypeToIcon" 
          :key="searchType"
          class="search-sort-icon"
          :class="{active: selectedSearchType === searchType}"
          size="small"
          color="purple-reverse"
          @click="selectedSearchType = searchType"
        >
          <i :class="['fa-solid', iconClass]"></i>
        </Button>
      </div>
      
    </div>

    <div class="block">
      <Select 
        class="year-select"
        name="year"
        :model-value="selectedYear"
        :items="selectOptions"
        @update:model-value="handleYearSelect"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Button } from "~/ui/button";
import { DateRange } from "~/ui/date-range";
import { Select, type SelectItems } from "~/ui/select";

import { Search, type SearchTypes } from "~/components/shared/search";

import type { DateRangeData, Queries } from "./type";


const emit = defineEmits<{
  "update:searchQueries": [Queries]
}>()

const queries = useState<Queries>(() => ({}))


// date picker
function handleSelectDate(dateRange: DateRangeData) {
  if (dateRange.date_start) queries.value.date_start = formatDate(dateRange.date_start)
  if (dateRange.date_finish) queries.value.date_finish = formatDate(dateRange.date_finish)
  emit('update:searchQueries', queries.value)
}

function formatDate(datestamp: number): string {
  const date = new Date(datestamp * 1000)
  const year = date.getFullYear() 
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}


// Search
const searchOptions: SearchTypes = {
  order_number: {
    placeholder: "номер заказа",
    title: "номер заказа",
  },
  psid: {
    placeholder: "номер фотосессии",
    title: "номер фотосессии",
  },
  client_id: {
    placeholder: "Клиент ID",
    title: "Клиент ID",
  },
  phone: {
    placeholder: "Телефон",
    title: "Телефон",
  },
  email: {
    placeholder: "Email",
    title: "Email",
  },
  payer: {
    placeholder: "Плательщик, ребенок",
    title: "Плательщик, ребенок",
  },
}
const searchTypeToIcon = {
  order_number: "fa-thumbs-up",
  psid: "fa-thumbs-down",
  client_id: "fa-redo-alt",
  phone: "fa-cog",
  email: "fa-cloud-upload",
  payer: "fa-briefcase",
} as const

const selectedSearchType = useState<keyof typeof searchOptions>(() => "order_number")
const selectedSearchValue = useState<string>(() => "")

function handleSearchValueUpdate(value: string) {
  selectedSearchValue.value = value
  if (value === "") {
    queries.value.search_type = undefined
    queries.value.search_value = undefined
  } else {
    queries.value.search_type = selectedSearchType.value
    queries.value.search_value = selectedSearchValue.value
  }
  emit('update:searchQueries', queries.value)
}

function handleSearchTypeUpdate(type: string) {
  selectedSearchType.value = type
  selectedSearchValue.value = ""
  queries.value.search_type = undefined
  queries.value.search_value = undefined
  emit('update:searchQueries', queries.value)
}

// select
const selectOptions: SelectItems = [
  {title: "2023", value: "2023" },
  {title: "2022", value: "2022" },
  {title: "2021", value: "2021" },
]
const selectedYear = useState(() => selectOptions[0].value)
function handleYearSelect(year: SelectItems[number]['value']) {
  queries.value.year = year
  selectedYear.value = year
  emit('update:searchQueries', queries.value)
}




</script>

<style lang="scss">
@import "~/assets/styles/components/orders-sidebar";
</style>