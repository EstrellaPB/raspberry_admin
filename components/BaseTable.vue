<template>
  <div>
    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap align-items-end">
      <base-dropdown-select
          label="Per page"
          :options="perPageOpts"
          placeholder="Select number of items"
          v-model="localPerPage">
      </base-dropdown-select>
      <div>
        <span placeholder="Search...">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
              <input type="text" placeholder="Search..." class="form-control" valid="true" v-model="localSearch">
            </div>
            <div class="valid-feedback">
            </div>
          </div>
        </span>
      </div>
    </div>
    <table class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
        <tr>
          <slot name="columns" :columns="columns">
            <th v-for="(column, index) in columns" :key="column.text" :aria-sort="ariaSorted(column, column.property)" @click="sortColumn(column.property)">{{ column.text }}</th>
          </slot>
        </tr>
      </thead>
      <tbody :class="tbodyClasses">
        <tr v-for="(item, index) in data" :key="index">
          <slot :row="item" :index="index">
            <td
              v-for="(column, index) in colsWithValue(item)"
              :key="index">
              {{ itemValue(item, column) }}
            </td>
          </slot>
        </tr>
        <tr v-if="!data || data.length <= 0">
          <td :colspan="columns.length">
            No results
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'base-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: 'Table columns'
    },
    data: {
      type: Array,
      default: () => [],
      description: 'Table data'
    },
    type: {
      type: String, // striped | hover
      default: '',
      description: 'Whether table is striped or hover type'
    },
    theadClasses: {
      type: String,
      default: '',
      description: '<thead> css classes'
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: '<tbody> css classes'
    },
    perPageOpts: {
      type: Array,
      default: () => [
        {value:5, name:'5'},
        {value:10, name: '10'},
        {value:15, name: '15'},
        {value:20, name: '20'},
        {value:25, name: '25'},
        {value:50, name: '50'},
        {value:100, name: '100'}
      ],
      description: 'Number of items shown per page'
    },
    perPage: {
      type: Number,
      default: 25,
      description: 'Number of items shown per page'
    },
    sortBy: {
      type: Object,
      default: () => ({
        column: '',
        sort: 'descending'
      }),
      description: 'Column to sort by'
    }
  },
  data() {
    return {
      localPerPage: this.perPage,
      localSearch: ''
    }
  },
  mounted() {
    var sortBy = this.sortBy;
    this.$emit('update', {sortBy})
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
    colsWithValue() {
      return (row) => {
        return this.columns.filter(column => this.hasValue(row, column))
      }
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.text.toLowerCase()] !== 'undefined';
    },
    itemValue(item, column) {
      return item[column.text.toLowerCase()];
    },
    sortColumn(columnIndex) {
      if (this.sortBy.column == columnIndex) {
        if (this.sortBy.sort == 'ascending') {
          this.sortBy.sort = 'descending';
        } else if (this.sortBy.sort == 'descending') {
          this.sortBy.column = '';
          this.sortBy.sort = 'none';
        } else {
          this.sortBy.sort = 'ascending';
        }
      } else {
        this.sortBy.column = columnIndex;
        this.sortBy.sort = 'ascending';
      }
      var sortBy = this.sortBy;
      this.$emit('update', {sortBy})
    },
    ariaSorted(column, index) {
      if (this.sortBy.column == index) {
        return this.sortBy.sort;
      } else {
        return 'none';
      }
    }
  },
  watch: {
    localPerPage (perPage) {
      this.$emit('update', {perPage})
    },
    localSearch (search) {
      this.$emit('update', {search})
    }
  }
};
</script>
<style>
  .table.tablesorter>tfoot>tr>[aria-sort], .table.tablesorter>thead>tr>[aria-sort] {
    cursor: pointer;
    background-image: none;
    background-repeat: no-repeat;
    background-size: .65em 1em;
  }

  .table.tablesorter>tfoot>tr>[aria-sort=none], .table.tablesorter>thead>tr>[aria-sort=none] {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22zm0 100l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
  }
  .table.tablesorter>tfoot>tr>[aria-sort=descending], .table.tablesorter>thead>tr>[aria-sort=descending] {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath opacity='.3' d='M51 1l25 23 24 22H1l25-22z'/%3E%3Cpath d='M51 101l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
  }
  .table.tablesorter>tfoot>tr>[aria-sort=ascending], .table.tablesorter>thead>tr>[aria-sort=ascending] {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' preserveAspectRatio='none'%3E%3Cpath d='M51 1l25 23 24 22H1l25-22z'/%3E%3Cpath opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3E%3C/svg%3E");
  }
  .table.tablesorter>tfoot>tr>[aria-sort]:not(.b-table-sort-icon-left), .table.tablesorter>thead>tr>[aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right .375rem center;
    padding-right: calc(.75rem + .65em);
  }
</style>
