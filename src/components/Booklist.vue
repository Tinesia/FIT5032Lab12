<template>
    <div>
        <h1>ISBN > 1000</h1>

        <ul>
            <li v-for="book in books" :key="book.id">
                <p>Name: {{ book.name }}</p>
                <p>ISBN: {{ book.isbn }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup> 
import db from "../firebase/init.js" 
import {ref, onMounted} from "vue"
import {collection, query, where, getDocs} from "firebase/firestore"

const books = ref([]);

const getBooks = async () => { 
    try{
        const q = query(collection(db, "books"), where("isbn", ">", 1000))
        const dic = await getDocs(q)
        const booksList = []
        dic.forEach((doc) => {booksList.push({id: doc.id, ...doc.data()})})
        books.value = booksList
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => { getBooks() })
</script>