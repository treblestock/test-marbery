<template>
  <Layout>
    <template #fixed>
      <OrderSidebar 
        @update:search-queries="updateQuery"
      />
    </template>
    <template #default>
      <OrdersList
        :pending="!ordersToShow.length"
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

const selectedOrderId = computed(() => route.params.orderid)


const updateQuery = (query: Queries) => router.replace({query})


const {data: response} = useFetch<string>("method/orders.getTest");
const parsedOrders = computed<Order[]>(() => response.value
  ? (JSON.parse(response.value) as ApiResponese).response.data.orders
  : []
)
const ordersToShow = computed<Order[]>(() => selectedOrderId.value
  ? parsedOrders.value.filter(order => order.id === selectedOrderId.value)
  : parsedOrders.value
)



</script>