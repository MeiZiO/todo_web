<template>
  <Poptip placement="right" width="400">
    <Button>Click</Button>
    <div class="api" slot="content">
      <CheckboxGroup v-model="fruit">
        <Checkbox v-for="item in serachTagData" :label="item.name" :></Checkbox>
      </CheckboxGroup>
    </div>
  </Poptip>
</template>