<template>
    <div class="form-group"
         :class="[
       {'input-group': hasIcon},
       {'has-danger': error},
       {'focused': focused},
       {'has-label': label || $slots.label},
       {'has-success': valid === true},
       {'has-danger': valid === false}
       ]">
        <slot name="label">
            <label v-if="label" class="form-control-label" :class="labelClasses">
                {{label}}
                <span v-if="required">*</span>
            </label>
        </slot>

        <slot v-bind="slotData">
            <base-dropdown>
                <base-button slot="title" type="secondary" 
                    class="dropdown-toggle" 
                    v-bind="$attrs"
                    :class="[
                     {'is-valid': valid === true},
                     {'is-invalid': valid === false}, inputClasses]">
                    
                    <span v-if="value" class="text-muted">{{ selected }}</span>
                    <span v-if="!value && placeholder" class="text-muted">{{ placeholder }}</span>

                </base-button>
                <a class="dropdown-item" href="#" @click="updateValue(option.value)" v-for="(option, index) in options" :key="index">{{ option.name }}</a>
            </base-dropdown>
        </slot>

        <slot name="infoBlock"></slot>
        <slot name="helpBlock">
            <div class="text-danger invalid-feedback" style="display: block;" :class="{'mt-2': hasIcon}" v-if="error">
                {{ error }}
            </div>
        </slot>
    </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "base-dropdown-select",
  props: {
    required: {
      type: Boolean,
      description: "Whether input is required (adds an asterix *)"
    },
    valid: {
      type: Boolean,
      description: "Whether is valid",
      default: undefined
    },
    label: {
      type: String,
      description: "Input label (text before input)"
    },
    error: {
      type: String,
      description: "Input error (below input)"
    },
    labelClasses: {
      type: String,
      description: "Input label css classes"
    },
    inputClasses: {
      type: String,
      description: "Input css classes"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    addonRightIcon: {
      type: String,
      description: "Addon right icon"
    },
    addonLeftIcon: {
      type: String,
      description: "Addont left icon"
    },
    options: {
        type: Array,
        description: 'Options array'
    },
    placeholder: {
        type: String,
        description: 'Placeholder for the input'
    }
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur
      };
    },
    slotData() {
      return {
        focused: this.focused,
        ...this.listeners
      };
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    },
    selected() {
        let found = this.options.find(function(element){
            return element.value == this.value;
        }, this)
        return found.name;
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    onFocus(value) {
      this.focused = true;
      this.$emit("focus", value);
    },
    onBlur(value) {
      this.focused = false;
      this.$emit("blur", value);
    }
  }
};
</script>
<style>
</style>
