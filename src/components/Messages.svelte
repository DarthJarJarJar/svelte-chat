<script>
    import { app } from "../firebase"
    import { collection, query, orderBy, limit, getFirestore, getDocs, doc, onSnapshot} from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { onMount } from "svelte";

    const db = getFirestore(app);
    const auth = getAuth(app);
    let currentUid;
    onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUid = user.uid
    } else {
        currentUid = null
    }
    });
    async function cg() {
        let listM = [];
        const messagesRef = collection(db, "messages")
        const q = query(messagesRef, orderBy("createdAt", "desc", limit(10)))
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        listM.push(doc.data())

    });
        messagesList = listM
        console.log(listM)
        
    }

    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
        cg()
    }
   
  });
});

    $: messagesList = [];
    onMount(async() => {
        cg()
    })

</script>
{#if messagesList}
{#each messagesList as message}
<p class="username">{message.name}</p>
    {#if (currentUid===message.uid)}
   
    <div class="message sen">
        
    <div class="item s">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={message.avatar}>
    </div>
    <div class=" item">
        {#if (currentUid===message.uid)}
        <p class="sender">{message.message}</p>
        {:else} <p class="notsender">{message.message}</p>
        {/if}
    </div>
    </div>
  
  
    {:else}
    <div class="message rec">
        <div class="item ns">
        <!-- svelte-ignore a11y-missing-attribute -->
        <img src={message.avatar}>
    </div>
    <div class="item">
        {#if (currentUid===message.uid)}
        <p class="sender">{message.message}</p>
        {:else} <p class="notsender">{message.message}</p>
        {/if}
    </div>
    </div>
    {/if}

    

{/each}
{:else} <div class="message"><p>Nothing to display</p></div>
{/if}




<style>
    .username {
        color: gray;
        margin-left: auto;
        font-size: 0.8rem;
        margin-top: -1rem;
    }

    .sen {
        align-self: right;
        align-items: right;
        align-content: right;
        justify-content: right;


    }

    .rec {
        justify-content: left;
    }




    .message {
        background-color: white;
        display: flex;
    }

    .message:hover {
        background-color: lighgray;
    }

    p {
        padding: 8px;
        border-radius: 0.5rem;
        width: fit-content;
        
        
    }
    .sender {
        background-color: lightblue;
        max-width: 10rem;
        overflow-wrap: break-word;
        
    }
    .notsender {
        background-color: lightgray;
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 1.2rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 0.5rem;

       
    }
    

    
</style>