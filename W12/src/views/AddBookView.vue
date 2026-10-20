<!-- Task 7.1: -->
<!-- <template>
    <div class="align-items-center flex-column d-flex mt-5">

        <div class="mb-5">
            <h1 class="mb-2">Add books</h1>

            <form @submit.prevent="addBook">

            <div class="mb-2">
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required>
            </div>

            <div class="mb-2">
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required>
            </div>

            <button type="submit">Add book</button>
            </form>
        </div>
        <Booklist></Booklist>
    </div>
</template>

<script setup>
import db from "../firebase/init.js"
import {ref, onMounted} from "vue"
import {collection, query, where, getDocs, addDoc} from "firebase/firestore"
import Booklist from "../components/Booklist.vue"


const isbn = ref('')
const name = ref('')

const addBook = async () => {
    try{
        await addDoc(collection(db, "books"), {
            isbn: Number(isbn.value),
            name: name.value
            });

        window.location.reload()

    } catch (error) {
        console.error(error)
    }
}

</script> -->

<!-- Task 9.2 -->
<template>
    <div class="align-items-center flex-column d-flex mt-5">

        <div class="mb-5">
            <h1 class="mb-2">Add books</h1>

            <form @submit.prevent="addBook">

            <div class="mb-2">
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required>
            </div>

            <div class="mb-2">
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required>
            </div>

            <button type="submit">Add book</button>
            </form>
            <p v-if="message" class="text-success mt-2">{{ message }}</p>
        </div>
        <Booklist></Booklist>
        <AlphaBookList></AlphaBookList>
    </div>
</template>

<script setup>
import db from "../firebase/init.js"
import {ref, onUnmounted} from "vue"
import {collection, query, where, getDocs, addDoc, onSnapshot} from "firebase/firestore"
import Booklist from "../components/Booklist.vue"
import AlphaBookList from "../components/AlphaBookList.vue"
const isbn = ref('')
const name = ref('')
const message = ref('')
let stopListening = null

const addBook = async () => {
    try{
       const book = await addDoc(collection(db, "books"), {
            isbn: Number(isbn.value),
            name: name.value,
            capitalised: false
            });

        isbn.value = ''
        name.value = ''
        message.value = 'Book added, converting name to upper case...'

        stopListening = onSnapshot(book, (bookSnapshot) => {
                const newBook = bookSnapshot.data()

                if (newBook?.capitalised === true) {
                    window.location.reload()
                    message.value = 'Book data capitalised!'
                    stopListening()
                    stopListening = null
                }
            }
        )
        
    } catch (error) {
        console.error(error)
        message.value = 'Error when adding book'
    }
}

onUnmounted(() => {
    if (stopListening) {
        stopListening()
    }
})
</script>