const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// ---------------------------------------------------
let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPass = document.querySelector("#signupPass");
let signupBtn = document.querySelector("#signupBtn");

let signinEmail = document.querySelector("#signinEmail");
let signiinPass = document.querySelector("#signinPass");
let signinBtn = document.querySelector("#signinBtn");

let userSignup = async (e) => {
  e.preventDefault();
  let name = signupName.value;
  let email = signupEmail.value;
  let pass = signupPass.value;

  const { data: existingUser, error: existingError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single(); 
   

    // if (existingError && existingError.code !== "PGRST116") {  // Ignore if no row found
    //     console.log("Error fetching user:", existingError);
    //     return;
    //   }
  if(existingUser){
    console.log('user already signup --->' , existingUser);
    Swal.fire('user already signup');

        signupName.value = "";
        signupEmail.value = "";
        signupPass.value = "";
    return
  }

  //signup user

  if(!name || !email || !pass){
      // Swal.fire("Enter the all fields!");
    }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    console.log("Error signup --->", error.message);
    Swal.fire(error.message);
    return;
  }

  //   if(!error){
  console.log(data.user.id);

  const { data: usersData, Dataerror: usersError } = await supabase
    .from("users")
    .insert({
      uid: data.user.id,
      name: name,
      email: email,
    });

  if (usersError) {
    console.log("userError ", usersError);
    return;
  }
  if (usersData) {
    console.log("users data ", usersData);
  }

  if (data) {
    console.log("data signup --->", data);
    Swal.fire("signUp successfully!");
    // return
  }

  signupName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
};


const userSignIn =async (e) =>{
    e.preventDefault()
    let signinEmailValue = signinEmail.value;
    let signinpassValue = signiinPass.value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: signinEmailValue,
        password: signinpassValue,
      })

      if(error){
        console.log('signin error', error.message);
        Swal.fire("Signin error", error.message);
        return
        
      }
      if(data){
        console.log('signin data', data);
        Swal.fire("signIn successfully!");

        window.location.href = '/dashboard.html'
        
      }


      
      signinEmail.value = "";
      signinPass.value = "";
      
}

signupBtn.addEventListener("click", userSignup);
signinBtn.addEventListener("click", userSignIn);


// ----------------------------------------------------------------------
