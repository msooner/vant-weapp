<template>
  <van-doc
    active="小程序组件"
    :config="config"
    :github="github"
    :versions="versions"
    :simulator="simulator"
  >
    <router-view />
  </van-doc>
</template>

<script>
import docConfig, { github, versions } from './doc.config';

const UNSHARED = [
  'common',
  'quickstart',
  'changelog',
  'intro',
  'transition'
];

export default {
  data() {
    return {
      github,
      versions
    };
  },

  computed: {
    config() {
      return docConfig;
    },

    simulator() {
      let prefix = '';
      const { path } = this.$route.meta;

      if (location.hostname === '0.0.0.0' || location.hostname === 'localhost') {
        prefix = 'https://youzan.github.io';
      }

      if (!UNSHARED.includes(path)) {
        return `${prefix}/vant/mobile.html?hide_nav=1&weapp=1#/zh-CN/${path}`;
      }

      return `./preview.html#${path}`;
    }
  }
};
</script>

<style lang="less">
.van-doc-intro {
  text-align: center;
  padding-top: 20px;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;

  &__logo {
    width: 120px;
    height: 120px;
  }

  h2 {
    font-size: 32px;
    line-height: 60px;
    font-weight: normal;
  }

  p {
    font-size: 15px;
    color: #455a64;
    margin-bottom: 20px;
  }
}
</style>
