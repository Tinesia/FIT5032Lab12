<template>
    <div>
        <h1>Top 3 alphabetical order</h1>

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
import {collection, query, orderBy, getDocs, limit, where} from "firebase/firestore"

const books = ref([]);
const getBooks = async () => { 
    try{
        const q = query(collection(db, "books"), orderBy("name"), limit(3))
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