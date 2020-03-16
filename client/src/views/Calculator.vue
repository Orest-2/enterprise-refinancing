<template>
  <div v-if="!hasresult" class="home mb-5">
    <h1>Обчислeння</h1>

    <div>
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
    </div>

    <div v-if="!models.length" class="text-center my-3">
      <p>Додати нове підприємство</p>
    </div>

    <div class="justify-content-center pb-5">
      <div v-for="(m, i) in models" :key="`model${i}`" class="mb-4">
        <b-card no-body class="mb-1">
          <b-card-header
            header-tag="header"
            class="p-1 d-flex justify-content-between"
            role="tab"
          >
            <b-col cols="3" class="p-0">
              <b-form-input
                v-model="m['name']"
                placeholder="Ведіть назву підприємства"
              ></b-form-input>
            </b-col>
            <b-col v-b-toggle="`accordion-${i}`"> </b-col>
            <b-button size="sm" variant="danger" @click="removeModel(i)">
              Видалити
            </b-button>
          </b-card-header>
          <b-collapse :id="`accordion-${i}`" visible role="tabpanel">
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
                    v-model.number="m['form'][cols * index + item[field.key]]"
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
      <div class="w-50 m-auto">
        <b-input-group class="my-3">
          <b-form-input
            v-model="name"
            placeholder="Ведіть назву підприємства"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="addModel">
              Додати підприємство
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <b-button
          block
          variant="success"
          :disabled="loading || models.length === 0"
          @click="calculate"
        >
          Обчислити
        </b-button>
      </div>
    </div>
  </div>
  <result v-else />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { chuncs, dc, rangeArr as range } from '../helpers/helpers';
import { exampleModels, exampleSettings } from '../constants/example-data';

import Result from '../components/Result.vue';

export default {
  name: 'Calculator',

  components: {
    Result,
  },

  data() {
    return {
      period: {
        from: new Date().getFullYear() - 3,
        to: new Date().getFullYear(),
      },
      test: false,
      name: '',
      tableNum: 1,
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
    hasresult(nv, ov) {
      if (!nv && ov) {
        this.models = [];
        this.tableNum = 1;
        this.period = {
          from: new Date().getFullYear() - 5,
          to: new Date().getFullYear(),
        };
      }
    },

    cols(nv, ov) {
      const { test, rows, models } = this;

      if (test) {
        this.test = false;
        return;
      }

      this.models = models.map((oel) => {
        let f = [];

        if (nv > ov) {
          f = Array(oel.form.length + rows).fill(0);
        } else if (nv < ov) {
          f = oel.form.splice(0, oel.form.length - rows);
        }

        return { name: oel.name, form: dc(f) };
      });
    },
  },

  mounted() {
    const { searchParams } = new URL(window.location.href);
    this.reset();

    if (searchParams.get('test')) {
      this.useTestData();
    }
  },

  methods: {
    ...mapActions({
      fetchCalc: 'result/fetchCalc',
      reset: 'result/reset',
    }),

    useTestData() {
      this.test = true;
      this.models = dc(exampleModels);
      this.$store.commit('settings/setData', exampleSettings);
    },

    removeModel(index) {
      this.models.splice(index, 1);
      if (!this.models.length) {
        this.tableNum = 1;
      }
    },

    addModel() {
      const { cols, rows, name } = this;

      const f = Array(cols * rows).fill(0);

      this.models.push(dc({
        name: name || `Підприємство ${this.tableNum}`,
        form: dc(f),
      }));

      this.tableNum += 1;
      this.name = '';
    },

    calculate() {
      const {
        yearsRange, settingsData, models, cols,
      } = this;

      const data = {
        range: yearsRange.map((el) => +el),
        criterions: settingsData.map((el) => ({ p: +el.p, t: +el.t })),
        models: models.map((el) => ({ name: el.name, data: chuncs(el.form, cols) })),
      };

      this.fetchCalc(data);
    },
  },
};
</script>
