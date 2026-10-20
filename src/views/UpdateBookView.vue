<template>
    <div class="align-items-center flex-column d-flex mt-5">

        <div class="mb-5">
            <h1 class="mb-2">Update books</h1>
           
            <li v-for="book in books" :key="book.id">
                <h3>Book ID: {{ book.id }}</h3>
                <div class="mb-2">
                    <p>ISBN: {{ book.isbn }}</p>
                    <label>Update ISBN:</label>
                    <input type="text" v-model="book.newIsbn">
                </div>

                <div class="mb-2">
                    <p>Name: {{ book.name }}</p>
                    <label>Update Name:</label>
                    <input type="text" v-model="book.newName">
                </div>

                <button type="button" @click="deleteBook(book)">Delete</button>
                <button type="button" @click="updateBook(book)">Update books</button>

            </li>
            
        </div>
        
    </div>
</template>

<script setup>
import db from "../firebase/init.js"
import {ref, onMounted} from "vue"
import {collection, query, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore"

const books = ref([])
const deleteBook = async (book) => {
    try {
        await deleteDoc(doc(db, 'books', book.id))
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

const updateBook = async (book) => {
    try{
        if (book.newIsbn.trim() !== '') {
            await updateDoc(doc(db, 'books', book.id), {
                isbn: Number(book.newIsbn)
            })
        }
        if (book.newName.trim() !== '') {
            await updateDoc(doc(db, 'books', book.id), {
                name: book.newName
            })
        }
        window.location.reload()
    } catch (error) {
        console.error(error)
    }
}

const getBooks = async () => { 
    try{
        const q = query(collection(db, "books"))
        const dic = await getDocs(q)
        const booksList = []

        dic.forEach((doc) => {booksList.push({id: doc.id, ...doc.data(), newIsbn: '', newName: ''})})
        
        books.value = booksList
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => { getBooks() })

</script>