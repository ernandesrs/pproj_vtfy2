/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import colors from 'vuetify/lib/util/colors'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    VListItem: {
      'rounded': true,
      'density': 'compact'
    },
    VSheet: {
      rounded: true
    },
    VBtn: {
      class: 'text-none',
      rounded: true
    },
    VBtnGroup: {
      rounded: true
    },
    VTextField: {
      variant: 'outlined'
    },
    VSelect: {
      variant: 'outlined'
    },
    VFileInput: {
      variant: 'outlined'
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: colors.lightBlue.darken2,
          secondary: colors.deepPurple.darken2,

          success: colors.teal.lighten1,
          info: colors.cyan.darken1,
          warning: colors.lime.darken3,
          danger: colors.red.lighten1,

          // custom
          'navigation-bg': colors.grey.darken4
        },
      }
    },
  },
})
