<template>

    <div class="align-items-center flex-column d-flex mt-5">
        <h1>
            Book Counter
        </h1>

        <pre>
            {{ jsondata }}
        </pre>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const jsondata = ref(null);

const count = ref(null)
const error = ref(null)

const getBookCountAPI = async () => {
    try {
        const response = await axios.get('https://countbooks-nmj7vph2ea-uc.a.run.app');
        jsondata.value = JSON.stringify(response.data, null, 2);
        error.value = null;
    } catch (err) {
        error.value = 'Error fetching book count';
        jsondata.value = null;
    }
};

onMounted(() => {
  getBookCountAPI();
});

</script>