/** ** 13 Januari 2024 **
 * File: api.js
 *
 * Di file ini kita menaruh semua fungsi yang berhubungan dengan API
 * baik itu untuk mengambil data dari API atau mengirim data ke API
 * bahkan untuk update data dan delete data ke API
 */

const BASE_URL = "http://128.199.167.159/v1/idc";

export async function getNewsById({ id }) {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result?.data;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function getNews() {
  try {
    const response = await fetch(`${BASE_URL}/news`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function createNews({ payload = undefined }) {
  try {
    const response = await fetch(`${BASE_URL}/news`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function updateNewsById({ id = 1, payload = undefined }) {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}

export async function deleteNewsById({ id = 1 }) {
  try {
    const response = await fetch(`${BASE_URL}/news/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Nih: ", {
      error,
    });
  }
}
