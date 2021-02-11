function handleOneTap(code) {
    var xhr = new XMLHttpRequest();
    var url = "https://www.iqlevel.net/api/social-signin/google-one-tap";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            if(res.status == 1) {
                // login
                localStorage.setItem('token', res.token);
                if(res.level)
                    localStorage.setItem('level', res.level);
                else
                    localStorage.setItem('level', '1');

                // Navigate to level
                location.replace('/level');
            }
            else if(res.status == 2) {
                location.replace('/gauth?birthday=true');
            }
            else {
                return;
            }
        }
    };
    var data = JSON.stringify({"id_token": code.credential});
    xhr.send(data);
}
function googleSignOut() {
      google.accounts.id.disableAutoSelect();
}
function callVerification(res) {  
    window.angularComponentReference.zone.run(() => { window.angularComponentReference.callVerification(res); });  
}  