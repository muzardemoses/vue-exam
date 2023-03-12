import { computed } from 'vue'
import { mapGetters } from 'vuex'

export default function() {
  const { currentUser } = mapGetters(['currentUser'])

  const user = computed(() => currentUser)

  return { user }
}
