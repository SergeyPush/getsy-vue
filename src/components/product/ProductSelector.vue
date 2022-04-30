<template>
  <div
    class="wrapper pt-4"
    :class="[selected !== 'services' ? 'green' : 'pink']"
  >
    <Container>
      <p class="has-text-centered subtitle is-4">
        Find things you'll love. Support independent sellers.
      </p>
      <div class="items">
        <div class="item" @click="selectType('product')">
          <img src="/products.jpeg" alt="product" class="image" />
          <p
            class="subtitle is-5 has-text-centered mt-3"
            :class="[selected === 'products' && 'underline']"
          >
            Products
          </p>
        </div>
        <div class="item" @click="selectType('service')">
          <img src="/services.jpeg" alt="service" class="image" />
          <p
            class="subtitle is-5 has-text-centered mt-3"
            :class="[selected === 'services' && 'underline']"
          >
            Services
          </p>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '../Container.vue';

export default defineComponent({
  props: ['selected'],
  setup(_, context) {
    const selectType = (type: 'product' | 'service') => {
      context.emit('changeType', type);
    };
    return { selectType };
  },
  components: { Container },
});
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';
.wrapper {
  margin-bottom: 120px;
  min-height: 130px;
  position: relative;
  transition: all 0.5s linear;
  &.green {
    background-color: $headerColorOne;
  }
  &.pink {
    background-color: $headerColorTwo;
  }
}
.items {
  left: 0;
  right: 0;
  bottom: -80px;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  display: flex;
  justify-content: center;
}
.item {
  cursor: pointer;
  margin: 0 10px;
  @include tablet {
    margin: 0 20px;
  }
}
.image {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  object-fit: cover;
  transition: all 0.1s linear;
  border: 3px solid #fff;

  @include tablet {
    width: 110px;
    height: 110px;
  }
}

.image:hover {
  transform: scale(1.1);
}

.underline {
  text-decoration: underline;
}
</style>
