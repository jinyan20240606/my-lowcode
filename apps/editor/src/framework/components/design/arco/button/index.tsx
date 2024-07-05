import { createReactMaterial } from '@huos/core'
import { ButtonView } from './view'
import { Panel } from './panel'

export const __ArcoButton__ = createReactMaterial(ButtonView, {
  displayName: '按钮',
  props: {
    size: "small",
    text: "{{props.size}}"
  },
  custom: {
    useResize: false
  },
  related: {
    settingRender: Panel
  }
})
