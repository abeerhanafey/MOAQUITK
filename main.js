// start fetching api by axios library
const cities =[ 
    {
        arabName: "سوهاج",
        isoName: "SHG"
    },
    {
        arabName: "شمال سيناء",
        isoName: "SIN"
    },
    {
        arabName: "قنا",
        isoName: "KN"
    },
    {
        arabName: "مطروح",
        isoName: "MT"
    },
    {
        arabName: "كفر الشيخ",
        isoName: "KFS"
    },
    {
        arabName: "جنوب سيناء",
        isoName: "JS"
    },
    {
        arabName: "دمياط",
        isoName: "DT"
    },
    {
        arabName: "بورسعيد",
        isoName: "PTS"
    },
    {
        arabName: "بني سويف",
        isoName: "BNS"
    },
    {
        arabName: "أسيوط",
        isoName: "AST"
    },
    {
        arabName: "أسوان",
        isoName: "ASN"
    },
    {
        arabName: "الشرقية",
        isoName: "SHR"
    },
    {
        arabName: "السويس",
        isoName: "SUZ"
    },
    {
        arabName: "الوادي الجديد",
        isoName: "WAD"
    },
    {
        arabName: "الأقصر",
        isoName: "LX"
    },
    {
        arabName: "القليوبية",
        isoName: "KB"
    },
    {
        arabName: "القاهرة",
        isoName: "C"
    },
    {
        arabName: "المنيا",
        isoName: "MN"
    },
    {
        arabName: "المنُوفيّة",
        isoName: "MNF"
    },
    {
        arabName: "الجيزة",
        isoName: "GZ"
    },
    {
        arabName: "الإسماعيلية",
        isoName: "IS"
    },
    {
        arabName: "الإسكندرية",
        isoName: "ALX"
    },
    {
        arabName: "الغربية",
        isoName: "GH"
    },
    {
        arabName: "الفيوم",
        isoName: "FYM"
    },
    {
        arabName: "البحيرة",
        isoName: "BH"
    },
    {
        arabName: "البحر الأحمر",
        isoName: "BA"
    },
    {
        arabName: "الدقهلية",
        isoName: "DK"
    }
]

let City = document.querySelector(".city h2");
let select = document.querySelector("#select");

for (const city of cities) {
    document.querySelector("#select").innerHTML += `
        <option> ${city.arabName} </option>
    `
}

select.addEventListener("change", function () {
    City.innerHTML = select.value;
    // console.log(select.value);
    for (let city of cities) {
        if (city.arabName == this.value) {
            console.log(this.value);
            console.log(city.arabName);
            cityName = city.isoName;
            // break;
        }
        
    }   
    getCity(cityName);
    
});

let cityName = "SHG";
function getCity(cityName) {
    let parameters = {
        country: "EG",
        city: cityName
    }
    axios.get("http://api.aladhan.com/v1/timingsByCity",
        { params : parameters}
    ).then((response) => {

        // console.log(response);

        const date = response.data.data.date;
        const moaquit = response.data.data.timings;
        document.querySelector("#hegry").innerHTML = date.hijri.date;
        document.querySelector("#melady").innerHTML = date.gregorian.date;
        
    
        addAdanToDiv("#fgr", (moaquit.Fajr));
        addAdanToDiv("#shorouk", moaquit.Sunrise);
        addAdanToDiv("#duhr", moaquit.Dhuhr);
        addAdanToDiv("#asr", moaquit.Asr);
        addAdanToDiv("#magrp", moaquit.Maghrib);
        addAdanToDiv("#isha", moaquit.Isha);
    
    })
            .catch(console.log("error"))
    
    
}

function addAdanToDiv(id, adan) {
    document.querySelector(id).innerHTML = adan
}

getCity(cityName);