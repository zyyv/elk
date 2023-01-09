<script setup lang="ts">
const { env } = useBuildInfo()
</script>

<template>
  <!-- Use external to force refresh page and jump to top of timeline -->
  <div flex justify-between>
    <NuxtLink
      flex items-end gap-4
      py2 px-5
      text-2xl
      focus-visible:ring="2 current"
      to="/"
      external
    >
      <img :alt="$t('app_logo')" src="/logo.svg" shrink-0 aspect="1/1" sm:h-8 xl:h-10 class="rtl-flip">
      <div hidden xl:block>
        {{ $t('app_name') }} <sup text-sm italic text-secondary mt-1>{{ env === 'release' ? 'alpha' : env }}</sup>
      </div>
    </NuxtLink>
    <div hidden xl:flex items-center me-8 mt-2>
      <NuxtLink
        key="back"
        :aria-label="$t('nav.back')"
        opacity-50 @click="$router.back()"
      >
        <div i-ri:arrow-left-line class="rtl-flip" btn-text />
      </NuxtLink>

      <NuxtLink
        key="home"
        :aria-label="$t('nav.home')"
        to="/home"
        outline-none
      >
        <div i-ri:home-5-line btn-text />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
