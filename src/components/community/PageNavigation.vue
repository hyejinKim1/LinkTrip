<script setup>
const props = defineProps({
    currentPage: Number,
    totalPage : Number
})

const emit = defineEmits([
    'clickButton'
])

function onClick(pageNumber) {
    if (pageNumber < 1) {
        pageNumber = 1
    }
    if (pageNumber > props.totalPage) {
        pageNumber = props.totalPage
    }
    emit('clickButton', pageNumber)
}

console.log(props.currentPage)

</script>

<template>
    <div class="center">
        <div class="button" @click="() => onClick(1)">
        처음
        </div>
        <div class="button" @click="() => onClick(currentPage - 1)">
            이전
        </div>
        <template v-for="el in totalPage" :key="el">
            <div class="button" :class="{active : currentPage === el}" @click="() => onClick(el)">
                {{ el }}
            </div>
        </template>
        <div class="button" @click="() => onClick(currentPage + 1)">
            다음
        </div>
        <div class="button" @click="() => onClick(totalPage)">
            마지막
        </div>
    </div>
    
</template>

<style scoped>

.active {
    background-color: blue;
}

.button {
    width: 55px;
    height : 30px;
    text-align: center;
    display: inline-block;
    border: 2px solid rgb(202, 202, 202);
}
</style>