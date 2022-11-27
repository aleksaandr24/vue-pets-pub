<template>
  <BaseCard
    class="progress-card"
  >
    <div
      class="progress-card__diagram"
    >
      <div
        v-show="goalsPercent.green > 0"
        class="progress-pie"
        :style="'--percent: ' + goalsPercent.total +
          '; --green: ' + goalsPercent.green +
          '; --yellow: ' + goalsPercent.yellow +
          '; --red: ' + goalsPercent.red"
      >
      </div>
      <div
        v-show="goalsPercent.yellow > 0"
        class="progress-pie"
        :style="'--percent: ' + goalsPercent.total +
          '; --green: ' + goalsPercent.green +
          '; --yellow: ' + goalsPercent.yellow +
          '; --red: ' + goalsPercent.red"
      >
      </div>
      <div
        v-show="goalsPercent.red > 0"
        class="progress-pie"
        :style="'--percent: ' + goalsPercent.total +
          '; --green: ' + goalsPercent.green +
          '; --yellow: ' + goalsPercent.yellow +
          '; --red: ' + goalsPercent.red"
      >
      </div>
      <div
        class="progress-pie"
        :style="'--percent: ' + goalsPercent.total +
          '; --green: ' + goalsPercent.green +
          '; --yellow: ' + goalsPercent.yellow +
          '; --red: ' + goalsPercent.red"
      >
        {{ goalsPercent.total }}%
      </div>
    </div>
    <div class="progress-card__goals">
      <h3 class="goals-title">Ежедневный прогресс</h3>
      <ul class="goals-list">
        <li
          v-for="(goalValue, goalIndex) in userGoals"
          :key="goalIndex"
          :class="['goals-list__item',
                  {'goals-list__item_in-progress': goalValue.status === 'in-progress'},
                  {'goals-list__item_half-complete': goalValue.status === 'half-complete'},
                  {'goals-list__item_complete': goalValue.status === 'complete'},
                  {'goals-list__item_cancel': goalValue.status === 'cancel'}]"
          @click="changeGoalStatus(goalValue)"
        >
          {{ goalValue.name }}
        </li>
      </ul>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard/BaseCard.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeProgress',

  components: {
    BaseCard
  },

  computed: {
    ...mapGetters({
      userGoals: 'getUserGoals'
    }),
    
    goalsPercent() {
      const totalGoals = this.userGoals.length
      let completedGoals = 0
      let greenGoals = 0
      let yellowGoals = 0
      let redGoals = 0
      this.userGoals.forEach(item => {
        if (item.status === 'complete') {
          completedGoals += 1
          greenGoals += 1
        }
        if (item.status === 'half-complete') {
          completedGoals += 1
          yellowGoals += 1
        }
        if (item.status === 'cancel') {
          completedGoals += 1
          redGoals += 1
        }
      })
      return {
        total: Math.ceil((completedGoals / totalGoals) * 100),
        green: Math.ceil((greenGoals / totalGoals) * 100),
        yellow: Math.ceil((yellowGoals / totalGoals) * 100),
        red: Math.ceil((redGoals / totalGoals) * 100)
      }
    }
  },

  methods: {
    ...mapActions([
      'changeUserGoal'
    ]),
    
    changeGoalStatus(goalItem) {
      switch (goalItem.status) {
        case 'in-progress':
          goalItem.status = 'half-complete'
          break
        case 'half-complete':
          goalItem.status = 'complete'
          break
        case 'complete':
          goalItem.status = 'cancel'
          break
        case 'cancel':
          goalItem.status = 'in-progress'
          break
      }
      this.changeUserGoal(goalItem)
    }
  }
}
</script>

<style lang="scss" src="./HomeProgress.scss"/>