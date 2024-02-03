// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});

// Mengambil data dari API
fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-01-03&sortBy=publishedAt&apiKey=bb54a05ddc8644bda78a8ad6b22edfde')
  .then(response => response.json())
  .then(data => {
    // Memasukkan data ke dalam elemen HTML
    document.querySelector('.post-img').src = data.articles[0].urlToImage;
    document.querySelector('.category').textContent = data.articles[0].url;
    document.querySelector('.post-title').textContent = data.articles[0].title;
    document.querySelector('.post-date').textContent = data.articles[0].publishedAt;
    document.querySelector('.post-description').textContent = data.articles[0].description;
    document.querySelector('.profile-img').src = "url_gambar_profile"; // Tambahkan URL gambar profil
    document.querySelector('.profile-name').textContent = data.articles[0].source.name; // Tambahkan nama penulis
  })
  .catch(error => console.error(error));

//   // Mengambil data dari API
//   fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-01-02&sortBy=publishedAt&apiKey=bb54a05ddc8644bda78a8ad6b22edfde')
// .then(response => response.json())
// .then(data => {
//   // Memasukkan data ke dalam elemen HTML
//   document.querySelector('.post-box:nth-child(1) .post-img').src = data.articles[0].urlToImage;
//   document.querySelector('.post-box:nth-child(1) .category').textContent = data.articles[0].url;
//   document.querySelector('.post-box:nth-child(1) .post-title').textContent = data.articles[0].title;
//   document.querySelector('.post-box:nth-child(1) .post-date').textContent = data.articles[0].publishedAt;
//   document.querySelector('.post-box:nth-child(1) .post-description').textContent = data[0].description;
//   document.querySelector('.post-box:nth-child(1) .profile-img').src = "url_gambar_profile";
//   document.querySelector('.post-box:nth-child(1) .profile-name').textContent = data.articles[0].source.name;

//   // Mengatur data untuk post-box lainnya
//   // Ganti indeks dan selector sesuai dengan urutan dan struktur post-box
// })
// .catch(error => console.error(error));

// URL API
// const apiUrl = 'http://128.199.167.159/v1/idc/news';

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     const posts = document.querySelectorAll('.post-box');
//     posts.forEach((post, index) => {
//       const postData = data[index];
//       const postImg = post.querySelector('.post-img');
//       const category = post.querySelector('.category');
//       const postTitle = post.querySelector('.post-title');
//       const postDate = post.querySelector('.post-date');
//       const postDescription = post.querySelector('.post-description');

//       postImg.src = postData.data.images; // Mengisi elemen dengan data dari API
//       category.textContent = postData.category;
//       postTitle.textContent = postData.title;
//       postDate.textContent = postData.published_at;
//       postDescription.textContent = postData.content;
//     });
//   })
//   .catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
//   });