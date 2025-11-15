/* -----------------------------------------
   SAFEWALK COMPLETE FRONTEND JS (FIXED)
------------------------------------------*/


/* ================================
   LOGIN PAGE
================================ */
if (document.getElementById("loginBtn")) {

    document.getElementById("loginBtn").addEventListener("click", () => {

        const email = document.getElementById("email").value.trim().toLowerCase();
        const pass = document.getElementById("password").value.trim();

        if (!email || !pass) {
            alert("Please enter email & password");
            return;
        }

        // Fetch saved user
        const savedUser = JSON.parse(localStorage.getItem("safewalkUser"));

        if (!savedUser) {
            alert("No registered user found! Please sign up first.");
            return;
        }

        // Normalize stored email
        const storedEmail = savedUser.email.trim().toLowerCase();
        const storedPassword = savedUser.password.trim();

        // Match credentials
        if (email === storedEmail && pass === storedPassword) {
            alert("Login successful");
            window.location.href = "dashboard.html";  
        } else {
            alert("Incorrect credentials");
        }
    });
}



/* ================================
   SIGNUP PAGE
================================ */
if (document.getElementById("registerBtn")) {

    document.getElementById("registerBtn").addEventListener("click", () => {

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim().toLowerCase();
        const phone = document.getElementById("reg-phone").value.trim();
        const pass = document.getElementById("reg-pass").value.trim();
        const cpass = document.getElementById("reg-cpass").value.trim();

        if (!name || !email || !phone || !pass || !cpass) {
            alert("Please fill all fields");
            return;
        }

        if (pass !== cpass) {
            alert("Passwords do not match");
            return;
        }

        const user = {
            name,
            email,
            phone,
            password: pass
        };

        localStorage.setItem("safewalkUser", JSON.stringify(user));

        alert("Registration successful! Please login.");
        window.location.href = "index.html";
    });
}



/* ================================
   MAP PAGE (Runs ONLY if map exists)
================================ */
if (typeof L !== "undefined" && document.getElementById("routeBtn")) {

    let startMarker, destMarker, routeLine;

    document.getElementById('routeBtn').addEventListener('click', () => {

        const s = [12.9716, 77.5946];
        const d = [12.9352, 77.6245];

        if (routeLine) map.removeLayer(routeLine);
        if (startMarker) map.removeLayer(startMarker);
        if (destMarker) map.removeLayer(destMarker);

        startMarker = L.marker(s).addTo(map).bindPopup('Start');
        destMarker = L.marker(d).addTo(map).bindPopup('Destination');
        routeLine = L.polyline([s, d], { color: '#00ffd5', weight: 5 }).addTo(map);

        map.fitBounds([s, d], { padding: [60, 60] });

        const score = (Math.random() * 5).toFixed(2);
        document.getElementById('score').innerText = score;

        if (parseFloat(score) < 2.5) {
            const a = document.createElement('div');
            a.className = 'alert';
            a.innerText = '⚠ Low safety area detected — score ' + score;
            document.getElementById('alerts').appendChild(a);

            setTimeout(() => a.remove(), 6000);
        }
    });

    document.getElementById('shareBtn')?.addEventListener('click', () => {
        alert('Location shared with trusted contacts (prototype)');
    });

    document.getElementById('sosBtn')?.addEventListener('click', () => {
        if (confirm('Confirm SOS?')) {
            alert('SOS sent to contacts and police (prototype)');
        }
    });
}



/* ================================
   REPORT PAGE
================================ */
if (document.getElementById('submitReport')) {

    document.getElementById('submitReport').addEventListener('click', () => {

        const loc = document.getElementById('rep-location').value.trim();
        const desc = document.getElementById('rep-desc').value.trim();

        if (!loc || !desc) {
            alert('Please fill location and description');
            return;
        }

        alert('Report submitted — thank you');
        document.getElementById('rep-location').value = '';
        document.getElementById('rep-desc').value = '';
    });
}



/* ================================
   PROFILE PAGE
================================ */
if (document.getElementById('editProfile')) {

    document.getElementById('editProfile').addEventListener('click', () => {
        const newName = prompt('Enter display name', 'SafeWalk User');
        if (newName) {
            document.getElementById('pfName').innerText = newName;
        }
    });
}
