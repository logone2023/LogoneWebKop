"use client";

import CryptoJS from "crypto-js";

// Public Variable
export const v_urlapi = process.env.NEXT_PUBLIC_API_URL;
export const v_systemkey = process.env.NEXT_PUBLIC_SYSTEM_KEY;
export const v_systemname = process.env.NEXT_PUBLIC_SYSTEM_NAME;
export const v_versionName = "HRD 2024 v.1.0.0";
export const v_releaseDate = "2023-05-01 00:00:01";
export const flag = { v_status_dlg: "OFF" };
export let v_password_input1, v_password_input2;

// Public Function
export function datePicker() {
  if (typeof window === "undefined") return;

  return new Promise((resolve) => {
    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.style.position = "absolute";
    datePicker.style.visibility = "hidden";
    document.body.appendChild(datePicker);

    datePicker.addEventListener("change", function () {
      resolve(this.value); // Kirimkan tanggal yang dipilih
      document.body.removeChild(datePicker); // Hapus elemen setelah selesai
    });

    datePicker.click(); // Tampilkan date picker
  });
}

export function timePicker() {
  return new Promise((resolve) => {
    const timePicker = document.createElement("input");
    timePicker.type = "time";
    timePicker.style.position = "absolute";
    timePicker.style.visibility = "hidden";
    document.body.appendChild(timePicker);

    timePicker.addEventListener("change", function () {
      resolve(this.value); // Kirimkan waktu yang dipilih
      document.body.removeChild(timePicker); // Hapus elemen setelah selesai
    });

    timePicker.click(); // Tampilkan time picker
  });
}

export function encodeToBase64(inputString) {
  try {
    const base64String = btoa(inputString); // Encode string ke base64
    return base64String;
  } catch (error) {
    return null; // Kembalikan null jika terjadi error
  }
}

export function decodeBase64(base64String) {
  try {
    const decodedString = atob(base64String); // Menggunakan atob() untuk mendekode base64 menjadi string
    return decodedString;
  } catch (error) {
    return null; // Jika terjadi error, kembalikan null
  }
}

export function decodeBase64ToBlob(base64String, mimeType) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  // Membuat array byte dari decoded base64
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Membuat Blob dengan mimeType yang diberikan
  return new Blob(byteArrays, { type: mimeType });
}

export function encryptMD5(text) {
  return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex).toUpperCase();
}

export function moveHTML(fileHTML) {
  const pageContainer = document.getElementById("CL_BACKGROUND");
  // Tambahkan kelas fade-out
  pageContainer.classList.add("fade-out");

  // Tunggu hingga transisi selesai sebelum berpindah halaman
  setTimeout(() => {
    window.location.href = fileHTML;
  }, 500); // Sesuaikan dengan durasi animasi CSS (0.5s)
}

export function getdatenow(code) {
  const date = new Date();

  // Helper function untuk memastikan nilai dua digit
  const pad = (value) => value.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // getMonth() is 0-based, so add 1
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  switch (code) {
    case "fdaycode":
      return date.toLocaleString("en-us", { weekday: "short" }).toLowerCase(); // "u"
    case "fday":
      return date.toLocaleDateString("id-ID", { weekday: "long" }); // "EEEE"
    case "ftime":
      return `${hours}:${minutes}:${seconds}`; // "HH:mm:ss"
    case "fdate_en":
      return `${year}-${month}-${day}`; // "yyyy-MM-dd"
    case "fdate_id":
      return `${day}-${month}-${year}`; // "dd-MM-yyyy"
    case "fdate":
      return `${day} ${monthNames[month - 1]} ${year}`; // "dd MMMM yyyy"
    case "fdatetime_day":
      return `${date.toLocaleString("id-ID", {
        weekday: "long",
      })}, ${day}-${month}-${year}`; // "EEEE, dd-MM-yyyy"
    case "fdaydatetimeId":
      return `${date.toLocaleString("id-ID", { weekday: "long" })}, ${day} ${
        monthNames[month - 1]
      } ${year}`; // "EEEE, dd-MMMM-yyyy"
    case "fdatePrint":
      return `${day}-${month}-${year
        .toString()
        .slice(-2)} ${hours}:${minutes}:${seconds}`; // "dd-MM-yy HH:mm:ss"
    case "fdatetime_doc":
      return `${day}${month}${year
        .toString()
        .slice(-2)}/${hours}${minutes}${seconds}`; // "ddMMyy/HHmmss"
    case "fdatetime_otp":
      return `${year}${month}${day}${hours}${minutes}${seconds}`; // "yyyyMMddHHmmss"
    case "fdatetime_wb":
      return `${year
        .toString()
        .slice(-2)}${month}${day}${hours}${minutes}${seconds}`; // "yyMMddHHmmss"
    case "fdatetime_absen":
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`; // "dd-MM-yyyy HH:mm:ss"
    case "fdatetime_full":
      return `${day} ${
        monthNames[month - 1]
      } ${year} ${hours}:${minutes}:${seconds}`; // "dd MMMM yyyy HH:mm:ss"
    case "fdatetime_data":
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // "yyyy-MM-dd HH:mm:ss"
    case "fdatespb":
      return `${day}${month}${year
        .toString()
        .slice(-2)}${hours}${minutes}${seconds}`; // "ddMMyyHHmmss"
    case "fdatevkp":
      return `${day}${month}${year.toString().slice(-2)}`; // "ddMMyy"
    default:
      return null;
  }
}

export function saveCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Hitung waktu kedaluwarsa
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(";"); // Pisahkan semua cookie
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Hilangkan spasi tambahan
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1); // Kembalikan nilai cookie
    }
  }
  return null; // Jika cookie tidak ditemukan
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  });
  console.log(document.cookie);
}

export function isCookieExists(cookieName) {
  // Periksa apakah cookie dengan nama tertentu ada
  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith(`${cookieName}=`));
}

// Fungsi untuk menyimpan gambar ke cookies
export function saveImageToCookie(clobData, cookieName, days = 1) {
  if (!clobData) {
    showDialogInfo("WARNING", "Data gambar tidak valid!", null);
    return;
  }

  // Hitung waktu kedaluwarsa
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Tambahkan jumlah hari
  const expires = `expires=${date.toUTCString()}`;

  console.log(cookieName + ": " + clobData);

  // Simpan cookie dengan data gambar
  document.cookie = `${cookieName}=${clobData}; path=/; ${expires}`;
}

// Fungsi untuk mengambil gambar dari cookies
export function loadImageFromCookie(cookieName) {
  // Ambil data dari cookie
  const gambarBase64 = getCookie(cookieName);
  console.log(`Gambar dengan nama "${cookieName}" :\n` + gambarBase64);
  if (gambarBase64) {
    return `data:image/png;base64,${gambarBase64}`;
  } else {
    console.error(`Gambar dengan nama "${cookieName}" tidak ditemukan.`);
    return null;
  }
}

export function validString(v_text) {
  return v_text != null ? v_text : "";
}

export function encrypPass(systemcode, empcode, password) {
  v_password_input1 = encryptMD5(systemcode + empcode + password);
  v_password_input2 = encryptMD5("ALL" + empcode + password);
}

export function validPass(systemcode, empcode, password) {
  const pass_db = getCookie("v_password");
  encrypPass(systemcode, empcode, password);

  return v_password_input1 === pass_db || v_password_input2 === pass_db;
}

if (
  typeof window !== "undefined" &&
  window.location.pathname.endsWith("home.html")
) {
  console.log(document.cookie);

  document.getElementById("logout").addEventListener("click", async () => {
    window.location.href = "index.html";
  });
}

// DIALOG
export async function showDialogInfo(type, message, callback) {
  console.log("tipe dialog:", type);

  const existingModal = document.getElementById("dlg_text");
  if (existingModal) {
    existingModal.remove();
  }

  await _dialogInfo(type); // 🔥 Tambahkan `await` di sini

  const alertModal = document.getElementById("dlg_text");
  const alertMessage = document.getElementById("dlg_text_message");
  const alertButton = document.getElementById("dlg_text_button");

  alertMessage.textContent = message;
  alertModal.style.display = "flex";
  alertButton.style.display = "inline";

  if (type === "PROGRESS") {
    flag.v_status_dlg = "ON";
    alertButton.style.display = "none";
    const interval = setInterval(() => {
      if (flag.v_status_dlg === "OFF") {
        flag.v_status_dlg = "STOP";
        alertModal.style.display = "none";
        clearInterval(interval);
      }
    }, 500);
  }

  alertButton.addEventListener("click", () => {
    alertModal.style.display = "none";
    if (typeof callback === "function") callback("OK");
  });
}

async function _dialogInfo(type) {
  if (typeof window === "undefined") return;

  const lottie = (await import("lottie-web")).default;

  // Bikin elemen-elemen alert
  const customAlert = document.createElement("div");
  customAlert.id = "dlg_text";
  customAlert.classList.add("dlg_text");

  const customAlertContent = document.createElement("div");
  customAlertContent.classList.add("dlg_text_content");

  const alertGIF = document.createElement("div");
  alertGIF.id = "lottie-container";
  alertGIF.classList.add("dlg_text_gif");

  let gif;
  if (type === "FAIL")          gif = "/asset/gif/anim_failed.json";
  else if (type === "WARNING")  gif = "/asset/gif/anim_warning.json";
  else if (type === "SUCCESS")  gif = "/asset/gif/anim_success.json";
  else if (type === "QUESTION") gif = "/asset/gif/anim_questions.json";
  else if (type === "PROGRESS") gif = "/asset/gif/anim_loading.json";

  lottie.loadAnimation({
    container: alertGIF,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: gif,
  });

  const alertMessage = document.createElement("p");
  alertMessage.id = "dlg_text_message";
  alertMessage.textContent = "Pesan alert akan muncul di sini.";

  const alertButton = document.createElement("button");
  alertButton.id = "dlg_text_button";
  alertButton.textContent = "OK";

  customAlertContent.appendChild(alertGIF);
  customAlertContent.appendChild(alertMessage);
  customAlertContent.appendChild(alertButton);
  customAlert.appendChild(customAlertContent);

  document.body.appendChild(customAlert);
}


export function clearBrowserCache() {
  if ("caches" in window) {
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          return caches.delete(key);
        })
      );
    });
  }
  // Membersihkan localStorage dan sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  console.log("Browser cache cleared.");
}

// SETTING ELEMENT
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", setTitleIconPage);
}

function setTitleIconPage() {
  var systemName = getComputedStyle(document.documentElement).getPropertyValue(
    "--v_systemname"
  );
  document.title = systemName;
  var linkElement = document.createElement("link");
  linkElement.rel = "shortcut icon";
  linkElement.href = "assets/img/defaultlogo.png";
  linkElement.type = "image/x-icon";
  document.head.appendChild(linkElement);
}

if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(
      "input[et_type], textarea[et_type]"
    );

    inputs.forEach((input) => {
      const type = input.getAttribute("et_type");
      const wrapper = input.parentElement;

      if (type === "LOGIN") addCapsField(input, wrapper);
      else if (type === "PASS") addPassField(input, wrapper);
      else if (type === "TEXT") addTextField(input, wrapper);
      else if (type === "TIKET") addTiketField(input, wrapper);
      else if (type === "VOUCHER") addVoucherField(input, wrapper);
      else if (type === "CAPITAL") addCapsField(input, wrapper);
      else if (type === "REMARKS") addRemaksField(input, wrapper);
      else if (type === "NUMBER") addNumberField(input, wrapper);
      else if (type === "DECIMAL") addDecimalField(input, wrapper, 0);
      else if (type === "DECIMAL2") addDecimalField(input, wrapper, 2);
      else if (type === "DECIMAL3") addDecimalField(input, wrapper, 3);
      else if (type === "DECIMAL4") addDecimalField(input, wrapper, 4);

      input.addEventListener("input", (event) => {
        if (event.target.value !== "") event.target.classList.add("not-empty");
        else event.target.classList.remove("not-empty");
      });
    });

    function addLogo() {
      const div = document.createElement("div");
      const header = document.createElement("h1");
      const logo = document.createElement("img");
      logo.src = "assets/img/defaultlogo.png"; // Path ke gambar logo
      logo.alt = "Logo"; // Alt text untuk aksesibilitas
      logo.style.width = "10%";
      logo.style.height = "10%";

      header.appendChild(logo);
      header.appendChild(document.createTextNode(" LogOne"));
      div.appendChild(header);

      // Tambahkan header ke body atau kontainer lain
      const themeFrame = document.querySelector(".logoSystem");
      if (themeFrame) themeFrame.prepend(header);
    }

    function addCapsField(input, wrapper) {
      input.addEventListener("input", (event) => {
        event.target.value = event.target.value.toUpperCase();
      });

      const icon = createIcon("assets/img/ic_xml_user.png");
      wrapper.appendChild(createLabel(input));
      wrapper.appendChild(icon);
    }

    function addPassField(input, wrapper) {
      const icon = createIcon("assets/img/ic_xml_lock.png");
      // const eyeIcon = createTogglePass("assets/img/ic_img_toggle_view.png");

      wrapper.appendChild(createLabel(input));
      wrapper.appendChild(icon);
      // wrapper.appendChild(eyeIcon);
    }

    function addTextField(input, wrapper) {
      const icon = createIcon(input.getAttribute("icon"));
      wrapper.appendChild(createLabel(input));
      // wrapper.appendChild(icon);
    }

    function addTiketField(input, wrapper) {
      const icon = createIcon(input.getAttribute("icon"));
      input.setAttribute("maxlength", "9");
      wrapper.appendChild(createLabel(input));
    }

    function addVoucherField(input, wrapper) {
      const icon = createIcon(input.getAttribute("icon"));
      input.setAttribute("maxlength", "6");
      wrapper.appendChild(createLabel(input));
    }

    function addNumberField(input, wrapper) {
      input.addEventListener(
        "input",
        (event) =>
          (event.target.value = event.target.value.replace(/[^0-9]/g, ""))
      );
      wrapper.appendChild(createLabel(input));
    }

    function addDecimalField(input, wrapper, decimalFormat) {
      input.addEventListener("input", (event) => {
        let value = event.target.value;

        // Hapus karakter yang bukan angka atau titik desimal
        value = value.replace(/[^0-9.]/g, "");

        // Batasi input hanya memiliki jumlah desimal sesuai format
        if (decimalFormat > 0) {
          if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1);

          const parts = value.split(".");

          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (decimalFormat > 3) value = parts.join(".");
          else value = parts.join(".");

          if (parts[1] && parts[1].length > decimalFormat) {
            parts[1] = parts[1].slice(0, decimalFormat);
            value = parts.join(".");
          }
        } else {
          value = value.replace(/\./g, "");
          value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        event.target.value = value;
      });

      wrapper.appendChild(createLabel(input));
    }

    function addRemaksField(input, wrapper) {
      const icon = createIcon(input.getAttribute("icon"));
      const textarea = document.createElement("textarea");

      textarea.id = input.id;
      textarea.setAttribute("et_type", "REMARKS");
      textarea.placeholder = input.placeholder;
      textarea.addEventListener("input", (event) => {
        event.target.style.height = "auto"; // Reset tinggi
        // event.target.style.height = `${event.target.scrollHeight}px`; // Set tinggi sesuai konten
      });

      // wrapper.appendChild(icon);
      wrapper.appendChild(createLabel(input));
      wrapper.replaceChild(textarea, input);
    }

    function createLabel(input) {
      const label = document.createElement("label");
      label.htmlFor = input.getAttribute("id");
      label.textContent = input.getAttribute("label");
      return label;
    }

    function createIcon(src) {
      const icon = document.createElement("span");
      const img = document.createElement("img");

      icon.className = "icon";
      img.src = src;
      img.alt = "Icon";
      img.className = "icon";

      icon.appendChild(img);
      return icon;
    }

    function createTogglePass(src) {
      const icon = document.createElement("span");
      icon.className = "icon";

      const img = document.createElement("toggle_password");
      img.src = src;
      eyeIcon.alt = "Toggle Password";
      eyeIcon.addEventListener("click", togglePasswordVisibility());

      icon.appendChild(img);
      return icon;
    }

    function togglePasswordVisibility() {
      const passwordInput = document.getElementById("LOGIN_ET_PASS");

      if (passwordInput.type === "password") passwordInput.type = "text";
      else passwordInput.type = "password";
    }
  });
}
