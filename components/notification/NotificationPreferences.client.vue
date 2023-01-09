<script setup lang="ts">
defineProps<{ show?: boolean }>()

const {
  pushNotificationData,
  saveEnabled,
  undoChanges,
  hiddenNotification,
  isSubscribed,
  isSupported,
  notificationPermission,
  updateSubscription,
  subscribe,
  unsubscribe,
} = usePushManager()
const { $t } = useFluent()

const pwaEnabled = useRuntimeConfig().public.pwaEnabled

let busy = $ref<boolean>(false)
let animateSave = $ref<boolean>(false)
let animateSubscription = $ref<boolean>(false)
let animateRemoveSubscription = $ref<boolean>(false)
let subscribeError = $ref<string>('')
let showSubscribeError = $ref<boolean>(false)

const hideNotification = () => {
  const key = currentUser.value?.account?.acct
  if (key)
    hiddenNotification.value[key] = true
}

const showWarning = $computed(() => {
  if (!pwaEnabled)
    return false

  return isSupported
      && (!isSubscribed.value || !notificationPermission.value || notificationPermission.value === 'prompt')
      && !(hiddenNotification.value[currentUser.value?.account?.acct ?? ''] === true)
})

const saveSettings = async () => {
  if (busy)
    return

  busy = true
  await nextTick()
  animateSave = true

  try {
    const subscription = await updateSubscription()
    // todo: handle error
  }
  finally {
    busy = false
    animateSave = false
  }
}

const doSubscribe = async () => {
  if (busy)
    return

  busy = true
  await nextTick()
  animateSubscription = true

  try {
    const result = await subscribe()
    if (result !== 'subscribed') {
      subscribeError = result === 'notification-denied'
        ? $t('settings_notifications_push_notifications_subscription_error_permission_denied')
        : $t('settings_notifications_push_notifications_subscription_error_request_error')

      showSubscribeError = true
    }
  }
  catch {
    subscribeError = $t('settings_notifications_push_notifications_subscription_error_request_error')
    showSubscribeError = true
  }
  finally {
    busy = false
    animateSubscription = false
  }
}
const removeSubscription = async () => {
  if (busy)
    return

  busy = true
  await nextTick()
  animateRemoveSubscription = true
  try {
    await unsubscribe()
  }
  finally {
    busy = false
    animateRemoveSubscription = false
  }
}
onActivated(() => (busy = false))
</script>

<template>
  <section v-if="pwaEnabled && (showWarning || show)" aria-labelledby="pn-s">
    <Transition name="slide-down">
      <div v-if="show" flex="~ col" border="b base">
        <h3 id="pn-settings" px6 py4 mt2 font-bold text-xl flex="~ gap-1" items-center>
          {{ $t('settings_notifications_push_notifications_label') }}
        </h3>
        <template v-if="isSupported">
          <div v-if="isSubscribed" flex="~ col">
            <form flex="~ col" gap-y-2 px6 pb4 @submit.prevent="saveSettings">
              <p id="pn-instructions" text-sm pb2 aria-hidden="true">
                {{ $t('settings_notifications_push_notifications_instructions') }}
              </p>
              <fieldset flex="~ col" gap-y-1 py-1>
                <legend>{{ $t('settings_notifications_push_notifications_alerts_title') }}</legend>
                <CommonCheckbox v-model="pushNotificationData.follow" hover :label="$t('settings_notifications_push_notifications_alerts_follow')" />
                <CommonCheckbox v-model="pushNotificationData.favourite" hover :label="$t('settings_notifications_push_notifications_alerts_favourite')" />
                <CommonCheckbox v-model="pushNotificationData.reblog" hover :label="$t('settings_notifications_push_notifications_alerts_reblog')" />
                <CommonCheckbox v-model="pushNotificationData.mention" hover :label="$t('settings_notifications_push_notifications_alerts_mention')" />
                <CommonCheckbox v-model="pushNotificationData.poll" hover :label="$t('settings_notifications_push_notifications_alerts_poll')" />
              </fieldset>
              <fieldset flex="~ col" gap-y-1 py-1>
                <legend>{{ $t('settings_notifications_push_notifications_policy_title') }}</legend>
                <CommonRadio v-model="pushNotificationData.policy" hover value="all" :label="$t('settings_notifications_push_notifications_policy_all')" />
                <CommonRadio v-model="pushNotificationData.policy" hover value="followed" :label="$t('settings_notifications_push_notifications_policy_followed')" />
                <CommonRadio v-model="pushNotificationData.policy" hover value="follower" :label="$t('settings_notifications_push_notifications_policy_follower')" />
                <CommonRadio v-model="pushNotificationData.policy" hover value="none" :label="$t('settings_notifications_push_notifications_policy_none')" />
              </fieldset>
              <div flex="~ col" gap-y-4 gap-x-2 py-1 sm="~ justify-between flex-row">
                <button
                  btn-solid font-bold py2 full-w sm-wa flex="~ gap2 center"
                  :class="busy || !saveEnabled ? 'border-transparent' : null"
                  :disabled="busy || !saveEnabled"
                >
                  <span :class="busy && animateSave ? 'i-ri:loader-2-fill animate-spin' : 'i-ri:save-2-fill'" />
                  {{ $t('settings_notifications_push_notifications_save_settings') }}
                </button>
                <button
                  btn-outline font-bold py2 full-w sm-wa flex="~ gap2 center"
                  type="button"
                  :class="busy || !saveEnabled ? 'border-transparent' : null"
                  :disabled="busy || !saveEnabled"
                  @click="undoChanges"
                >
                  <span aria-hidden="true" class="i-material-symbols:undo-rounded" />
                  {{ $t('settings_notifications_push_notifications_undo_settings') }}
                </button>
              </div>
            </form>
            <form flex="~ col" mt-4 @submit.prevent="removeSubscription">
              <span border="b base 2px" class="bg-$c-text-secondary" />
              <button
                btn-outline rounded-full font-bold py-4 flex="~ gap2 center" m5
                :class="busy ? 'border-transparent' : null"
                :disabled="busy"
              >
                <span aria-hidden="true" :class="busy && animateRemoveSubscription ? 'i-ri:loader-2-fill animate-spin' : 'i-material-symbols:cancel-rounded'" />
                {{ $t('settings_notifications_push_notifications_unsubscribe') }}
              </button>
            </form>
          </div>
          <template v-else>
            <NotificationEnablePushNotification
              :animate="animateSubscription"
              :busy="busy"
              @hide="hideNotification"
              @subscribe="doSubscribe"
            >
              <template #error>
                <Transition name="slide-down">
                  <NotificationSubscribePushNotificationError
                    v-model="showSubscribeError"
                    :message="subscribeError"
                  />
                </transition>
              </template>
            </NotificationEnablePushNotification>
          </template>
        </template>
        <div v-else px6 pb4 role="alert" aria-labelledby="n-unsupported">
          <p id="n-unsupported">
            {{ $t('settings_notifications_push_notifications_unsupported') }}
          </p>
        </div>
      </div>
    </Transition>
    <NotificationEnablePushNotification
      v-if="showWarning && !show"
      closeable-header
      px5
      py4
      :animate="animateSubscription"
      :busy="busy"
      @hide="hideNotification"
      @subscribe="doSubscribe"
    >
      <template #error>
        <Transition name="slide-down">
          <NotificationSubscribePushNotificationError
            v-model="showSubscribeError"
            :message="subscribeError"
          />
        </Transition>
      </template>
    </NotificationEnablePushNotification>
  </section>
</template>
