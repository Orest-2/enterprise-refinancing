<template>
  <div class="text-center">
    <h3>Результат</h3>
    <div>
      <b-table class="m-auto w-50" :items="items">
        <template v-slot:cell(x)="{ index, item, value }">
          <span class="d-flex align-items-center justify-content-center h4">
            {{ value.k }}
            <b-icon
              icon="info-fill"
              variant="info"
              v-b-tooltip.hover
              :title="value.name"
            ></b-icon>
          </span>
        </template>
      </b-table>
    </div>
    <div
      class="align-items-center d-flex h4 table-borderless justify-content-center"
    >
      <div>Z =</div>
      <div>
        <table role="table" class="table b-table m-auto w-50">
          <tbody role="rowgroup">
            <tr v-for="(row, i) in z" :key="i + 'r'" role="row">
              <td
                v-for="(cell, j) in row"
                :key="j + 'c'"
                class="p-1"
                role="cell"
              >
                {{ cell.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="h3 my-3">a = ({{ `${alfa.map(el => el.toFixed(2))}` }})</p>
    <p class="h3">A = ({{ `${a.map(el => el.data.toFixed(2))}` }})</p>

    <div class="my-4">
      <p class="h3" v-for="(a, i) in a" :key="i">
        {{ `${a.name} - ${a.data.toFixed(2)}` }}
      </p>
    </div>

    <div class="w-50 m-auto">
      <b-btn class="mt-5" block variant="primary" @click="preReset">
        Нове обчислення
      </b-btn>
      <b-btn class="mt-2 mb-4" block variant="success" @click="save">
        Зберегти результат в файл
      </b-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { chuncs, csvContent } from '../helpers/helpers';

export default {
  computed: {
    ...mapState({
      resdata: (state) => state.result.data,
      settingsData: (state) => state.settings.criterions,
    }),

    items() {
      const a = this.settingsData
        .map(
          (el, i) => Object.fromEntries(
            [
              ['x', el],
              ...this.t[i].map((e, j) => [`x${j + 1}`, e.toFixed(2)]),
            ],
          ),
        );

      return a;
    },

    t() {
      return chuncs(this.resdata.table.Data, this.resdata.table.Stride);
    },

    z() {
      return chuncs(this.resdata.z.Data, this.resdata.z.Stride);
    },

    alfa() {
      return this.resdata.alfadata;
    },
    a() {
      const { adata } = this.resdata;
      return adata.sort((f, s) => (s.data - f.data));
    },
  },

  methods: {
    ...mapActions({
      reset: 'result/reset',
    }),

    preReset() {
      this.$router.push({ path: '/calculator' });
      this.reset();
    },

    save() {
      const name = `enterprise-refinsnsing-${Date.now()}.csv`;
      const rows = this.a.map((e) => Object.values(e));
      const content = csvContent(rows);
      // const encodedUri = encodeURIComponent(content);

      const link = document.createElement('a');
      link.setAttribute('href', content);
      link.setAttribute('download', name);
      document.body.appendChild(link);

      link.click();

      link.remove();
    },
  },
};
</script>

<style>
</style>
