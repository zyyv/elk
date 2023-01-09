<template>
  <div p8 lg:flex="~ col gap2" hidden>
    <p v-if="isMastoInitialised" text-sm>
      <i18n path="user_sign_in_notice_title">
        <template #server>
          <strong>{{ currentServer }}</strong>
        </template>
      </i18n>
    </p>
    <p text-sm text-secondary>
      {{ $t('user_sign_in_desc') }}
    </p>
    <button btn-solid rounded-3 text-center mt-2 @click="openSigninDialog()">
      {{ $t('action_sign_in') }}
    </button>
  </div>
</template>
