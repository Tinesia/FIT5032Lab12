
<!-- 
 Task 7.1:
<template>
    <div class="align-items-center flex-column d-flex mt-5">
        <h1>Create an account</h1>
        <p>
            <input type="text" placeholder="Email" v-model="email" />
        </p>
        <p>
            <input type="password" placeholder="Password" v-model="password" />
        </p>
        <p>
            <button @click="register">Save to Firebase</button>
        </p>
    </div>
</template>

<script setup>

    import { ref } from 'vue'
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router'

    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const auth = getAuth()

    const register = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase register successfdul")
            router.push("/FireLogin")
        }).catch((error) => {
            console.log(error.code);
        })
    };
</script> -->


 <!-- Task 7.2: -->
<template>
    <div class="align-items-center flex-column d-flex mt-5">
        <h1>Create an account</h1>
        <p>
            <input type="text" placeholder="Email" v-model="email" />
        </p>
        <p>
            <input type="password" placeholder="Password" v-model="password" />
        </p>
        <p>
            <select id="userType" class="form-select" v-model="userType">
                <option value="userType1">User Type 1</option>
                <option value="userType2">User Type 2</option>
            </select>
            <label class="form-check-label" for="userType">Select user role</label>
        </p>
        <p>
            <button @click="register">Save to Firebase</button>
        </p>
    </div>
</template>

<script setup>

    import { ref } from 'vue'
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router'
    import { getFirestore, doc, setDoc } from 'firebase/firestore'

    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const auth = getAuth()
    const userType = ref('')
    const db = getFirestore()

    const register = () => {
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (data) => {
            
            await setDoc(doc(db, "users", data.user.uid), {
                roles: userType.value,
                email: email.value
            })

            console.log("Firebase register successfdul")
            router.push("/FireLogin")
        }).catch((error) => {
            console.log(error.code);
        })
    };
</script>