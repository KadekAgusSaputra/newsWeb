// Mengambil fungsi-fungsi yang ada di file api.js

import { getNews,getNewsById,updateNewsById,createNews,deleteNewsById } from "./api.js";
import { generateElement, formatingDate } from "./utils.js";

const postContainer = document.getElementById("post-container");
const inputTitle = document.getElementById("judul_berita");
const inputImg = document.getElementById("src_img");
const inputCategori = document.getElementById("category_berita");
const inputPublisdate = document.getElementById("tanggal_published");
const inputDeskripsi = document.getElementById("deskripsi_berita");
const inputImgProfil = document.getElementById("src_img_profil");
const inputNama = document.getElementById("nama_profil");
const buttonSubmit = document.getElementById("btn-submit");
const inputId = document.getElementById("form-id");


// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

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

// template

document.addEventListener("DOMContentLoaded", function () {
  // Mengambil semua data news dari fungsi `getNews`
  const handleGetNews = async () => {
    try {
      const response = await getNews();

      console.log({ response })

      response.forEach((news) => {
        // Buat pembungkus kartu nya
        const postBox = generateElement({
          tag: "div",
          className: "post-box tech",
        });

        const postImg = generateElement({
          tag: "img",
          src: news.images,
          className: "post-img",
        });

        const category = generateElement({
          tag: "h2",
          className: "category",
          value: "TECH",
        });

        const postTitle = generateElement({
          tag: "a",
          href: "#",
          className: "post-title",
          value: news.title,
        });

        const postDate = generateElement({
          tag: "span",
          value: formatingDate(news.published_at),
          className: "post-date",
        });

        const description = generateElement({
          tag: "p",
          value: news.content,
          className: "post-description",
        });

        // ========= Pembungkus div profile

        const profile = generateElement({
          tag: "div",
          className: "profile",
        });

        const profileImg = generateElement({
          tag: "img",
          src: news.avatar,
          className: "profile-img",
        });

        const profileName = generateElement({
          tag: "span",
          value: news.author,
          className: "profile-name",
        });

        // ========= Pembungkus div profile

        profile.append(...[profileImg, profileName]);
        postBox.append(
          ...[postImg, category, postTitle, postDate, description, profile]
        );

        postContainer.append(postBox);
      });
    } catch (error) {
      console.error({ error });
    }
  };

  handleGetNews();


  async function handleUpdateNewsId(id, payload) {
    try {
      const result = await updateNewsById({ id, payload });

      if (!result) return;

      if (result?.code === 200) {
        alert("Berhasil mengupdate data");

        window.location.reload();
      }
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  async function handleShowNewsById(id) {
    try {
      const result = await getNewsById({ id });

      if (!result) return;

      inputImg.src = result?.images;
      inputCategori.value = result?.category;
      inputTitle.value = result?.title;
      inputPublisdate.value = result?.published_at;
      inputDeskripsi.value = result?.content;
      inputImgProfil.src = result?.avatar;
      inputNama.value = result?.author;
      inputId.value = result?.id;

      buttonSubmit.classList.remove("button-submit");
      buttonSubmit.classList.add("button-submit-edit");

      submitButton.innerText = "Update";
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  handleShowNewsById()


  async function handleAddNews(payload) {
    try {
      /**
       * Kita akan panggil fungsi createQuestion yang sudah kita buat di file `api.js`
       * Lalu kita akan kirim payload ke dalam fungsi tersebut
       */
      const result = await createNews({ payload: payload });

      /**
       * Kita lakukan pengecekan jika ketika respon kode yang diberikan itu 201 (Created)
       * Maka munculkan alert "Berhasil menambahkan data", kosongkan inputan dan reload halaman
       */

      if (result?.code === 201) {
        alert("Berhasil menambahkan data");

        inputImg.src = "";
        inputCategori.value = "";
        inputTitle.value = "";
        inputPublisdate.value = "";
        inputDeskripsi.value = "",
        inputImgProfil.src = "";
        inputNama.value = "";

        window.location.reload();
      }
    } catch (error) {
      console.error("Error ngirim Nih: ", {
        error,
      });
    }
  }

  buttonSubmit.addEventListener("click", async (e) => {

  const payload = {
    images: inputImg?.src || "",
    category: inputCategori?.value || "",
    title: inputTitle?.value || "",
    published_at: inputPublisdate?.value || "",
    content: inputDeskripsi?.value || "",
    avatar: inputImgProfil?.src || "",
    author: inputNama?.value || "",
  };
  if (inputId.value === "") {
    handleAddNews(payload);
  } else {
    handleUpdateNewsId(inputId.value, payload);
  }
})
});

console.log("ini datanya",{buttonSubmit});




// "title": "...",
// "author": "...",
// "content": "...",
// "category": "...",
// "images": "...",
// "avatar": "...",
// "published_at": "..."