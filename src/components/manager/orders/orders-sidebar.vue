<template>
  <div class="orders-sidebar">
    <Button 
      to="/manager/orders"
      class="button"
      size="small" 
      color="purple-reverse"
      width="full"
    >назад</Button>

    <div class="block">
      <DateRange 
        class="date-range"
        @change="handleSelectDate"
      />
      <Search 
        :search-query="searchValue"
        :type="searchType"
        :types="searchOptions"
        @update:search-query="handleSearchValueUpdate"
        @update:type="handleSearchTypeUpdate"
      />
      
    </div>

    <div class="block">
      <Select 
        class="select-trigger"
        name="year"
        :model-value="selectedYear"
        :items="selectOptions"
        @update:model-value="handleYearSelect"
      />
      <!-- <div class="select-btns">
        <Button class="select-btn" color="purple">Показать</Button>
        <Button class="select-btn" color="purple-reverse">Сбросить</Button>
      </div> -->
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
const searchType = useState<keyof typeof searchOptions>(() => "order_number")
const searchValue = useState<string>(() => "")

function handleSearchValueUpdate(value: string) {
  searchValue.value = value
  if (value === "") {
    queries.value.search_type = undefined
    queries.value.search_value = undefined
  } else {
    queries.value.search_type = searchType.value
    queries.value.search_value = searchValue.value
  }
  emit('update:searchQueries', queries.value)
}

function handleSearchTypeUpdate(type: string) {
  searchValue.value = ""
  searchType.value = type
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