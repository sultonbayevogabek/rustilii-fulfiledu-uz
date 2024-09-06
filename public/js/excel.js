'use strict';

let user = JSON.parse(localStorage.getItem('user'));

if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();
    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    fetch('https://script.google.com/macros/s/AKfycbyYMLTf9gatN-a1mCHCc8Sxvyluq3oGo5ggO53quRqusSl74gBucxGlCqL3ixgWnZAF/exec', {
        method: 'POST',
        body: formData
    })
        .then()
        .then(() => {
            localStorage.clear();
        })
} else {
    localStorage.clear();
}
