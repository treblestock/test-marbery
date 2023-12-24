<template>
  <Layout>
    <template #fixed>
      <OrderSidebar 
        @update:search-queries="updateQuery"
      />
    </template>
    <template #default>
      <OrdersList
        :pending="!ordersToShow.length && pending"
        :orders="ordersToShow"
      />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { OrderSidebar, OrdersList, type Order, type Queries } from "~/components/manager/orders";

import Layout from "~/views/layout/fixed-left-column.vue";

type ApiResponese = {
  response: {
    data: {
      orders: Order[]
    }
  }
}

const route = useRoute()
const router = useRouter()

const selectedOrderId = computed(() => route.params.orderid[0])


function updateQuery(queries: Queries) {
  const url = new URL(route.path, import.meta.url)
  for (const query in queries) {
    const queryValue = queries[query as keyof Queries]
    if (typeof queryValue === "string") url.searchParams.append(query, queryValue)
  }
  router.push(route.path + '?' + url.searchParams.toString())
}


const {pending, data: orders} = useFetch<string>("method/orders.getTest");
const parsedOrders = computed<Order[]>(() => orders.value
  ? (JSON.parse(orders.value) as ApiResponese).response.data.orders
  : []
)
const ordersToShow = computed<Order[]>(() => selectedOrderId.value 
  ? parsedOrders.value.filter(order => order.id === selectedOrderId.value) 
  : parsedOrders.value
)

// watch(pending, () => {
//   if (!pending.value) console.log(parsedOrders.value)
// })


</script>