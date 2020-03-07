<template>
  <div class="settings">
    <div class="d-flex justify-content-between">
      <div>
        <h1>Критерії ефективності</h1>
      </div>
      <div align-v="center" class="align-items-center align-self-center">
        <b-button size="sm" variant="success" @click="openModal">
          Add new
        </b-button>
      </div>
    </div>

    <b-table :items="items" :fields="fields" stacked="sm">
      <template v-slot:cell(actions)="{ index }">
        <b-button
          size="sm"
          class="mr-1"
          variant="warning"
          @click="openModal('edit', index)"
        >
          Edit
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          variant="danger"
          @click="deleteSettings(index)"
        >
          Delete
        </b-button>
      </template>
    </b-table>

    <b-modal id="settings-modal" hide-footer centered title="Setting">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Назва критерія:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Вага (p):" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.p"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Точка задоволення (Т):" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.t"
            type="text"
            number
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success" class="float-right">
          {{ edit ? "Save" : "Add" }}
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const form = {
  name: '',
  p: 0,
  t: 0,
};

export default {
  name: 'Settings',

  data() {
    return {
      fields: [
        {
          key: 'k',
          label: 'Критерій',
        },
        {
          key: 'name',
          label: 'Назва критерія',
        },
        {
          key: 'p',
          label: 'Вага (p)',
        },
        {
          key: 't',
          label: 'Точка задоволення (Т)',
        },
        {
          key: 'actions',
        },
      ],
      edit: false,
      index: -1,
      form,
    };
  },

  computed: {
    ...mapState({
      items: (state) => state.settings.criterions,
    }),
  },

  methods: {
    ...mapActions({
      addSettings: 'settings/addSettings',
      editSettings: 'settings/editSettings',
      deleteSettings: 'settings/removeSettings',
    }),

    openModal(type = 'add', index) {
      if (type === 'edit') {
        this.edit = true;
        this.index = index;
        this.form = { ...this.items[index] };
      } else {
        this.edit = false;
        this.index = -1;
        this.form = { ...form };
      }

      this.$bvModal.show('settings-modal');
    },

    onSubmit() {
      if (this.edit) {
        this.editSettings([this.index, this.form]);
      } else {
        this.addSettings(this.form);
      }
      this.$bvModal.hide('settings-modal');
    },
  },
};
</script>
