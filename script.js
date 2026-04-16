document.addEventListener("DOMContentLoaded", function () {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");

    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const errorMsg = document.getElementById("error-msg");


    // 🔹 Update circle progress
    function updateProgress(solved, total, label, circle){
        if(!total || total === 0){
            label.textContent = "0/0";
            return;
        }

        const percent = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", percent + "%");
        label.textContent = `${solved}/${total}`;
    }


    // 🔹 Fetch user data (WORKING API)
    async function fetchUserDetails(username){
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            errorMsg.textContent = "";

            const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
            const data = await response.json();

            if(!data || data.status === "error"){
                throw new Error("User not found");
            }

            displayUserData(data);

        } catch(error){
            // errorMsg.textContent = "Failed to fetch";
            if(errorMsg){
                errorMsg.textContent = "Failed to fetch";
            }
            console.log(error);
        } finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }


    // 🔹 Display data
    function displayUserData(data){
        updateProgress(data.easySolved, data.totalEasy, easyLabel, easyProgressCircle);
        updateProgress(data.mediumSolved, data.totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(data.hardSolved, data.totalHard, hardLabel, hardProgressCircle);
    }


    // 🔹 Button click
    searchButton.addEventListener("click", function(){
        const username = usernameInput.value.trim();

        if(username === ""){
            errorMsg.textContent = "Enter username";
            return;
        }

        fetchUserDetails(username);
    });

});