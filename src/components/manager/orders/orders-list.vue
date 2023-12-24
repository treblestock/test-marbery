<template>
  <div class="orders-list">
    <Empty v-if="pending" />
    <div class="orders-list__orders">
      <NuxtLink :to="`/manager/orders/${order.id}`"
        v-for="order in props.orders" :key="order.id"
      >
        <StatusCard class="orders-list__order">
          Id: {{ order.id }}
        </StatusCard>
      </NuxtLink>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { StatusCard } from "~/ui/status-card";
import { Empty } from "~/ui/empty";

import type { Order } from "./type";

const props = defineProps<{
  pending: boolean
  orders: Order[] | null
}>()

</script>


<style lang="scss">
@import "~/assets/styles/components/orders-list";

</style>