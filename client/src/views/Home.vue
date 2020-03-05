<template>
  <div v-if="!hasresult" class="home mb-5">
    <h1>Рефінансування підприємств</h1>

    <label>Період:</label>
    <b-row align-h="between" class="mb-2">
      <b-col>
        <b-input-group prepend="З">
          <b-form-input
            v-model.number="period.from"
            type="number"
          ></b-form-input>
        </b-input-group>
      </b-col>
      <b-col>
        <b-input-group prepend="По">
          <b-form-input v-model.number="period.to" type="number">
          </b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <b-btn @click="useTestData">Приклад</b-btn>

    <div class="justify-content-center pb-5">
      <div v-for="n in tabeleCnt" :key="`model${n - 1}`" class="mb-4">
        <b-card no-body class="mb-1">
          <b-card-header
            header-tag="header"
            class="p-1 d-flex justify-content-between"
            role="tab"
          >
            <b-col v-b-toggle="`accordion-${n}`">
              <span class="h4 m-0">Таблиця {{ n }}</span>
            </b-col>
            <!-- <b-button
              v-if="n > 1"
              size="sm"
              variant="danger"
              @click="tabeleCnt -= 1"
            >
              Delete
            </b-button> -->
          </b-card-header>
          <b-collapse :id="`accordion-${n}`" visible role="tabpanel">
            <b-card-body>
              <b-table
                :fields="fields"
                :items="items"
                thead-tr-class="text-center"
                stacked="sm"
                small
              >
                <template v-slot:cell()="{ index, item, value, field }">
                  <span
                    v-if="field.key === 'x'"
                    class="d-flex align-items-center justify-content-center h4"
                  >
                    {{ value.k }}
                    <b-icon
                      icon="info-fill"
                      variant="info"
                      v-b-tooltip.hover
                      :title="value.name"
                    ></b-icon>
                  </span>
                  <b-form-input
                    v-if="field.key !== 'x'"
                    v-model.number="
                      models[n - 1]['form'][cols * index + item[field.key]]
                    "
                    type="number"
                    step=".1"
                  >
                  </b-form-input>
                </template>
              </b-table>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
      <b-button
        v-if="tabeleCnt > 1"
        block
        variant="danger"
        @click="tabeleCnt -= 1"
      >
        Delete last
      </b-button>
      <b-button block variant="primary" @click="tabeleCnt += 1">
        + Add
      </b-button>
      <b-button block variant="success" :disabled="loading" @click="calculate">
        Calculate
      </b-button>
    </div>
  </div>
  <result v-else />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { chuncs, dc } from '../helpers/helpers';

import Result from '../components/Result.vue';

const range = (start, stop, step = 1) => Array(Math.ceil((stop - start + 1) / step))
  .fill(start)
  .map((x, y) => `${x + y * step}`);

export default {
  name: 'Home',

  components: {
    Result,
  },

  data() {
    return {
      period: {
        from: new Date().getFullYear() - 10,
        to: new Date().getFullYear() - 7,
      },
      tabeleCnt: 1,
      models: [],
    };
  },

  computed: {
    ...mapState({
      settingsData: (state) => state.settings.criterions,
      hasresult: (state) => state.result.hasresult,
      loading: (state) => state.result.loading,
    }),

    rows() { return this.settingsData.length; },
    cols() { return this.yearsRange.length; },

    yearsRange() {
      const { from, to } = this.period;
      return from <= to ? range(from, to) : [];
    },

    fields() {
      return ['x', ...this.yearsRange];
    },

    items() {
      const b = this.yearsRange.map((el, i) => [el, i]);
      const a = this.settingsData.map((el) => Object.fromEntries([['x', el], ...b]));

      return a;
    },
  },

  watch: {
    cols(nv, ov) {
      const { rows, models } = this;

      this.models = models.map((oel) => {
        let f = [];

        if (nv > ov) {
          f = Array(oel.form.length + rows).fill(0);
        } else {
          f = oel.form.splice(0, oel.form.length - rows);
        }

        return { form: dc(f) };
      });
    },

    tabeleCnt(n, o) {
      if (n > o) {
        this.addModel();
      } else {
        this.models.pop();
      }
    },
  },

  created() {
    this.addModel();
  },

  methods: {
    log: console.log,

    ...mapActions({
      fetchCalc: 'result/fetchCalc',
    }),

    useTestData() {
      this.period = { from: 2010, to: 2013 };
      this.tabeleCnt = 3;
      this.models = [
        {
          form: [0.4, 1.1, 0.6, 0.7, 0.8, 1, 1.2, 1.3, 0.9, 2.9, 4.1, 1.8, 0.06, 0.09, 0.12, 0.07],
        },
        {
          form: [0.3, 1.2, 1.3, 0.9, 0.8, 0.9, 1.2, 1, 0.5, 0.9, 2.1, 1.1, 0.06, 0.07, 0.06, 0.05],
        },
        {
          form: [0.5, 0.1, 0.6, 0.7, 1.4, 1, 1.6, 1.3, 1.9, 3, 3.2, 1.9, 0.1, 0.04, 0.05, 0.06],
        },
      ];
    },

    addModel() {
      const { cols, rows } = this;

      const f = Array(cols * rows).fill(0);

      this.models.push(dc({ form: dc(f) }));
    },

    calculate() {
      const {
        yearsRange, settingsData, models, cols,
      } = this;

      const data = {
        range: yearsRange.map((el) => +el),
        criterions: settingsData.map((el) => ({ p: +el.p, t: +el.t })),
        models: models.map((el) => ({ data: chuncs(el.form, cols) })),
      };

      this.fetchCalc(data);
    },
  },
};
</script>
