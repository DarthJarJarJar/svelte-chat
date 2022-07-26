<script>
    import { app } from "../firebase";
    import { getAuth, signOut, } from "firebase/auth"
    import { doc, setDoc, getFirestore, collection, addDoc } from "firebase/firestore"
    import Messages from "./Messages.svelte";

    const auth = getAuth(app)
    const db = getFirestore(app)
    let message;

    async function signOutUser() {
        await auth.signOut()
    }

    async function send() {
        const docRef = await addDoc(collection(db, "messages"), {
        createdAt: new Date(),
        uid: auth.currentUser.uid,
        message: message,
        avatar: auth.currentUser.photoURL,
        name: auth.currentUser.displayName
        });
        message = ""
    }

</script>
<main>
    <div class="container">
        <div class="item header">
            <h1>Chat room</h1>
            <button id="signout" on:click={signOutUser}>
                Sign out
            </button>
        </div>
        <div class="item mes">
            <Messages />
        </div>
        <div class="item text">
            <form on:submit|preventDefault={send}>
                <input type="text" bind:value={message} placeholder="Type your message">
                <button class="submitbutton">
                    Send
                </button>
            </form>
            
        </div>
    </div>
    
</main>


<style>

    main {
        border: 4px solid black;
        width: fit-content;
        height: 100%;
        border-radius: 0.7rem;
    }

    #signout {
        margin-left: auto;
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        
    }

    .header {
        grid-column: 1/ span 2;
        display: flex;
        background-color: black;
        margin-bottom: -10px;
        color: white;
    }
     * {
        font-family: Arial, Helvetica, sans-serif;
    }
    button {
        background-color:  #006FCD;
        border-radius: 0.5rem;
        color: white;
    }
    .submitbutton {
        background-color:  #006FCD;
        border-radius: 2rem;
        color: white;
        width: 16.94%;
        height: 2rem;
    }

.container {
  display: grid;
  grid-template-columns: 15rem 10rem;
  grid-template-rows: auto;
  grid-gap: 10px;
height: 100%;
}

.mes {
    grid-column: 1 / span 2;
    max-height: 60vh;
    overflow: scroll;
    display: flex;
    flex-direction: column-reverse;
}
.mes::-webkit-scrollbar {
  width: 0.25rem;
  display: none;
}

.text {
    grid-column: 1 / span 2;
}


.mes::-webkit-scrollbar-thumb {
  background: #6649b8;
}

.item {
  border-radius: 5px;
 padding: 1rem;

}


input {
    width: 75%;
    height: 2rem;
    border-radius: 2rem;
    padding-left: 20px;
}


</style>