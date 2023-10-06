const searchingByForm = document.getElementById("searchingByForm")
const theToggleTypeButton = document.getElementById("theToggleTypeButton")

const theSearchingFormer = document.getElementById("theSearchingFormer")

//get the defaulter search type to the users
let ourSearchingTypes = "users";

//Having the event listen kwa hii search form
searchingByForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Kutafuta the query search
    const searchingQuery = searchingByForm.querySelector("inpute[name='search']").value;

    //Clearing the search results
    theSearchingFormer.innerHTML = "";

    //Our reaquest to the Github  API

    const theResponseToGet = await fetch("htttps://api.github.com/search/${ourSearchingTypes}?q=${searchingQuery}")

    //Looking to see what is the responding status
    if (theResponseToGet.status === 200)
    {
        const ourResponseFromJson = await theResponseToGet.json();

        //Displaying all of it the results that is
         for (const item of ourResponseFromJson.items)
         {
            //Creating the items in the list
            const theListElement = document.createElement("li");

            //having the avatar from the user
            const imageAvatar = document.createElement("img");
            imageAvatar.src = item.avatar_url;
            theListElement.appendChild(imageAvatar);

            //the user name linking with the profile
            const profileNameLink = document.createElement("a");
            profileNameLink.href = item.html_url;
            profileNameLink.textContent = item.login;
            theListElement.appendChild(profileNameLink);

            theSearchingFormer.appendChild(theListElement);
         }   
    }
    else
    {
        //Displaying the error message
        const theErrorMessage = document.createElement("li");
        theErrorMessage.textContent = "Something went wrong";
        theSearchingFormer.appendChild(theErrorMessage);
    }
    console.error("Something went wrong");
});

theToggleTypeButton.addEventListener("click", () => {
    //Toggle the search type
    if (ourSearchingTypes === "users")
    {
        ourSearchingTypes = "repositories";
        theToggleTypeButton.textContent = "Search users";
    }
    else
    {
        ourSearchingTypes = "users";
        theToggleTypeButton.textContent = "Search repositories";
    }
});

searchingByForm.dispatchEvent(new Event("submit"));