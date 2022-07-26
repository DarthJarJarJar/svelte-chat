<script>
    import { app } from '../firebase';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { onMount } from 'svelte';
    import ChatRoom from '../components/ChatRoom.svelte';
    import Login from '../components/Login.svelte';
    
    const auth = getAuth(app);
    let isLoggedIn;
    onAuthStateChanged(auth, (user) => {
    if (user) {
        isLoggedIn = true
    } else {
        isLoggedIn = false
    }
    });


</script>
{#if (isLoggedIn)}
    <ChatRoom />
    {:else} <Login />
{/if}
