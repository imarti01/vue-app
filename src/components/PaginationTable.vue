<template>
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
        ‹‹
        </button>
      </li>
  
      <li class="pagintation-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
        ‹
        </button>
      </li>
  
      <li
        v-for="page in pages" :key="page.name"
        class="pagination-item"
      >
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
  
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
        >
        ›
        </button>
      </li>
  
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
        >
        ››
        </button>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
      },    
      totalPages: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            if (this.currentPage === this.totalPages) {
              const start = this.totalPages - (this.maxVisibleButtons - 1);

              if (start === 0) {
                return 1;
              } else {
                return start;
              }
            }

            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                name: i,
                isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    }
  };
  </script>

<style scoped>
.pagination {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #009879;
  color: #ffffff;
}

button {
  font-size: 18px;
  color: #2c3e50;
}

</style>