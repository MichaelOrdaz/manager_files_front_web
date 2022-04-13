<template>
  <div class="user-data">
    <div class="user-data-item">
      <PLetterIcon
        iconSize="psm"
        :text="props.iconText"
      />
      <div class="texts">
        <PText
          class="title"
          variant="text-4"
        >
          {{ props.itemTitleText }}
        </PText>
        <PText variant="text-5">
          {{ props.itemSubtitleText }}
        </PText>
      </div>
    </div>
    <PText
      class="rol-text"
      variant="text-5"
    >
      {{ props.helpText }}
    </PText>
  </div>
</template>

<script setup lang="ts">
interface Props{
    itemTitleText?: string,
    itemSubtitleText?: string,
    iconText?: string,
    helpText?: string,
}
const props = withDefaults(defineProps<Props>(), {
    iconText: 'Text', itemSubtitleText: 'Subtitle', itemTitleText: 'Title', helpText: 'Suport text'
})
</script>

<style scoped lang="scss">
.user-data{
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
}
.rol-text{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-data-item{
    margin-left: 12px;
    width: 50%;
    height: 54px;
    display: flex;
    align-items: center;
    .texts{
        display: flex;
        flex-direction: column;
        .title{font-weight: 500}
        margin-left: 6px;
    }
}
.user-data:hover{
    background-color: #F1F1F2;
}
</style>
