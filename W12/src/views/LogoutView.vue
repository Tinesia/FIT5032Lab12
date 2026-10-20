<template>
    <div class="align-items-center flex-column d-flex mt-5">
        <h1>Logout</h1>

        <p v-if="loading">Loading user information...</p>

        <div v-else-if="user">
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.roles }}</p>

            <button class="btn btn-primary" @click="logout">
                Logout
            </button>
        </div>

        <p v-else>No user is signed in.</p>
    </div>
</template>

<script setup>
import { isAuthenticated } from '../auth.js'
import { useRoute, useRouter } from 'vue-router'

import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, onUnmounted } from 'vue'


const router = useRouter()
const route = useRoute()

const auth = getAuth()
const db = getFirestore()

const user = ref(null)

const loading = ref(true)

const logout = async () => {
    try {
        await signOut(auth)
        console.log('logged out')
        router.push('/login')
    } catch (error) {
        console.log(error.code)
    }
}

const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    isAuthenticated.value = Boolean(currentUser)

    if (!currentUser) {
        user.value = null
        loading.value = false
        return
    }

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid))

        user.value = {...userDoc.data(), uid: currentUser.uid, email: currentUser.email}

        console.log('user:', { ...user.value })
        loading.value = false
})

onUnmounted(() => {
    unsubscribe()
})

</script>