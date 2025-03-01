import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

VantComponent({
  mixins: [touch],

  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    },
    barHeight: {
      type: null,
      value: '2px'
    }
  },

  watch: {
    value(value: number) {
      this.updateValue(value, false);
    }
  },

  created() {
    this.updateValue(this.data.value);
  },

  methods: {
    onTouchStart(event: Weapp.TouchEvent) {
      if (this.data.disabled) return;

      this.touchStart(event);
      this.startValue = this.format(this.data.value);
    },

    onTouchMove(event: Weapp.TouchEvent) {
      if (this.data.disabled) return;

      this.touchMove(event);
      this.getRect('.van-slider').then((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
        const diff = this.deltaX / rect.width * 100;
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      });
    },

    onTouchEnd() {
      if (this.data.disabled) return;
      this.updateValue(this.newValue, true);
    },

    onClick(event: Weapp.TouchEvent) {
      if (this.data.disabled) return;

      const { min } = this.data;

      this.getRect('.van-slider').then((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
        const value = (event.detail.x - rect.left) / rect.width * this.getRange() + min;
        this.updateValue(value, true);
      });
    },

    updateValue(value: number, end: boolean, drag: boolean) {
      value = this.format(value);
      const { barHeight, min } = this.data;
      const width = `${((value - min) * 100) / this.getRange()}%`;

      this.setData({
        value,
        barStyle: `width: ${width}; height: ${addUnit(barHeight)};`
      });

      if (drag) {
        this.$emit('drag', { value });
      }

      if (end) {
        this.$emit('change', value);
      }
    },

    getRange() {
      const { max, min } = this.data;
      return max - min;
    },

    format(value: number) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});
