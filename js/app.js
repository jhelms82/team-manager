  // Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";


    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCfJIqeL58MMsjAYE5sA1LrWv7mUdfx6Pc",
        authDomain: "projectfirebase-259ac.firebaseapp.com",
        databaseURL: "https://projectfirebase-259ac-default-rtdb.firebaseio.com",
        projectId: "projectfirebase-259ac",
        storageBucket: "projectfirebase-259ac.appspot.com",
        messagingSenderId: "1064927987332",
        appId: "1:1064927987332:web:3a868e1bce3d8310fea4d1",
        measurementId: "G-EX7NE53703"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    import {getFirestore, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
         deleteField, onSnapshot, collection}
    from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js"



         const db = getFirestore();

   



            //Reference
                let number = document.getElementById("number");
                let name = document.getElementById("name");
                let age = document.getElementById("age");
                let parents = document.getElementById("parents");


                let insBtn = document.getElementById("Insbtn");
                let selBtn = document.getElementById("Selbtn");
                let updBtn = document.getElementById("Updbtn");
                let delBtn = document.getElementById("Delbtn");


//Adding Documents
async function AddDocument_AutoID(){
    var ref = collection(db, "ThePlayersList");

    const docRef = await addDoc(
        ref, {
            Number: number.value,
            Name: name.value,
            Age: age.value,
            ParentsName: parents.value,

        
        }
    )
    .then(()=> {
        alert("data added successfully");
    })
    .catch(()=>{
        alert("Unsuccessful operation, error:"+ error);
    })
    console.log("document id is "+ docRef.id)
}



    async function AddDocument_CustomID() {
        var ref = doc(db, "ThePlayersList", number.value);

             await setDoc(
            ref, {
            Number: number.value,
            Name: name.value,
            Age: age.value,
            ParentsName: parents.value,
           

        }
        )
            .then(() => {
                alert("data added successfully");
            })
            .catch(() => {
                alert("Unsuccessful operation, error:" + error);
            })
    }

//Retrieve a Document
    async function GetADocument(){
        var ref = doc(db, "ThePlayersList", number.value);
        const docSnap = await getDoc(ref);

        if(docSnap.exist()){
            name.value = docSnap.data().name;
            age.value = docSnap.data().age;
            parents.value = docSnap.data().parents;

        }
        else {
            alert("no such document");
        }
    }



    //Editing Data


        async function UpdateFieldsInADocument() {
                var ref = doc(db, "ThePlayersList", number.value);

                 await updateDoc(
                    ref, {
                    Name: name.value,
                    Age: age.value,
                    ParentsName: parents.value

                }
                )
                    .then(() => {
                        alert("data updated successfully");
                    })
                    .catch(() => {
                        alert("Unsuccessful operation, error:" + error);
                    })
            }


//Delete Documents


async function DeleteDocument(){
    var ref = doc(db, "ThePlayersList", number.value);
    const docSnap = await getDoc(ref);

    if(!docSnap.exists()){
        console.log('does not exist')
        return;
    }
    await deleteDoc(ref)
    .then(()=>{
        alert("data deleted");

    })
    .catch((error)=>{
        alert("unsuccessful operatio, error:"+ error);
    })
}
//Assign events to buttons

insBtn.addEventListener("click", AddDocument_CustomID);
selBtn.addEventListener("click", GetADocument);
updBtn.addEventListener("click", UpdateFieldsInADocument);
delBtn.addEventListener("click", DeleteDocument);

          






   
   

   
   
   
   
   
   
//    Filling the table

   

             var stdNo = 0;
             var tbody = document.getElementById('tbody1');

      function AddItemToTable(name, number, age, parents) {


            let trow = document.createElement("tr");
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');


            td1.innerHTML = ++stdNo;
            td2.innerHTML = number;
            td3.innerHTML = name;
            td4.innerHTML = age;
            td5.innerHTML = parents;



            trow.appendChild(td1);
            trow.appendChild(td2);
            trow.appendChild(td3);
            trow.appendChild(td4);
            trow.appendChild(td5);


            tbody.appendChild(trow);
        }


            function AddAllItemsToTable(ThePlayer){
               stdNo=0;
               tbody.innerHTML="";
               ThePlayer.forEach(element => {
                     AddItemToTable(element.Name, element.Number, element.Age, element.ParentsName);
               });
            }

// Get Data



 async function GetAllDataOnce(){
    const querySnapshot = await getDocs(collection(db, "ThePlayersList"));

    var players = [];

     querySnapshot.forEach(doc => {
        players.push(doc.data());
    })
     AddAllItemsToTable(players);

 }


 async function GetAllDataRealtime(){
    const dbRef = collection(db, "ThePlayersList");

    onSnapshot(dbRef, (querySnapshot)=>{
         var players = [];

         querySnapshot.forEach(doc => {
            players.push(doc.data());
        });
        AddAllItemsToTable(players);
     })
 }

 window.onload = GetAllDataRealtime;








