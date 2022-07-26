<script>
    import { app } from '../firebase';
    import { getAuth, signInWithPopup ,GoogleAuthProvider } from 'firebase/auth'

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    async function signIn() {
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }
</script>
<h1>
  Login
</h1>
<button on:click={signIn}>
    Sign in with google
</button>
<style>
     * {
        font-family: Arial, Helvetica, sans-serif;
    }
    button {
        background-color: rgb(57, 57, 204);
        border-radius: 0.2rem;
        color: white;
    }
</style>