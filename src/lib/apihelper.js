// apiHelper.js
import * as logoneLib from "@/lib/handlingHelper";

const sisipan  = "L1";
const p_system = logoneLib.encodeToBase64("WEB").substring(0, 3) + 
                 sisipan + 
                 logoneLib.encodeToBase64("WEB").substring(3);


export async function get_api(p_datatype, p_parameter, callback) {
  try {
    const url = logoneLib.v_urlapi + 
    "get_data.php?p_datatype=" + p_datatype + "&p_parameter=" + p_parameter;
    const response = await fetch(url);

    console.log(url);

    if (response.ok) {
      const responseData = await response.json();
      callback(responseData);
    } else callback("ERROR");
  } catch (error) {
    callback("ERROR");
    console.error("Gagal Mendapatkan Data:", error);
  }
}

export async function push_api(p_datatype, tdata, tclob, base64_tblob1, base64_tblob2, 
  base64_tblob3, base64_tblob4, callback) {
  try {
    const formData = new FormData();
    formData.append('datatype', p_datatype);
    formData.append('tdata', tdata);
    formData.append('tclob', tclob);
    formData.append('tblob1', logoneLib.validString(base64_tblob1));
    formData.append('tblob2', logoneLib.validString(base64_tblob2));
    formData.append('tblob3', logoneLib.validString(base64_tblob3));
    formData.append('tblob4', logoneLib.validString(base64_tblob4));


    const response = await fetch(logoneLib.v_urlapi + 'push_data.php', {
      method: 'POST',
      body: formData,
    });

    // Cek apakah status response sukses
    if (response.ok) {
      try {
        const json = await response.json();
        const status = json?.STATUS || "ERROR";
        callback(status === "OK" ? "JSONOK" : "ERROR");
      } catch (error) {
        callback("ERROR");
      }
    } else callback("ERROR");
  } catch (error) {
      console.error('Error saat mengirim data:', error.message);
  }
}

export async function push_get_api(p_datatype, p_parameter, p_token, callback) {
  try {
    const formData = new FormData();
    formData.append('p_datatype', p_datatype);
    formData.append('p_parameter', p_parameter);
    formData.append('p_token', p_token); // Ganti dengan token yang sesuai

    console.log(p_parameter);

    const response = await fetch(logoneLib.v_urlapi + 'push_get_data.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      try {
        const responseData  = await response.text();
        const decryptData   = logoneLib.decodeBase64(responseData);
        console.log('p_token:', p_token);

        const split         = p_token ? p_token.split(",") : [];
        p_token             = split[0] + split[1] + split[2];

        let keytoken        = logoneLib.encodeToBase64(p_token).substring(0, 9) + 'L1' + 
                              logoneLib.encodeToBase64(p_token).substring(9);

        if (p_datatype === 'STATUSUSER' || p_datatype === 'DATA_USER') {
          p_token           = split[0] + split[1];
          keytoken          = logoneLib.encodeToBase64(p_token).substring(0, 9) + 'L1' + 
                              logoneLib.encodeToBase64(p_token).substring(9);
        }

        console.log('keytoken:', keytoken + " || " + p_token);

        const decryptJson   = decryptData.substring(0, decryptData.length - keytoken.length);
        const datajson      = decryptJson.substring(0, 9) + decryptJson.substring(11);
        const dataAPI       = logoneLib.decodeBase64(datajson);
        
        console.log('decode datajson:', datajson);
        console.log('decode datajson:', dataAPI);

        if (dataAPI !== null) callback(JSON.parse(dataAPI));
        else callback('ERROR');

      } catch (error) {
        callback('ERROR');
      }    
    } else callback("ERROR");
  } catch (error) {
    callback("ERROR");
  }
}

async function pushgetdata(p_datatype, p_parameter, p_token, callback) {
  try {
    console.log('p_datatype: ', p_datatype);
    console.log('p_parameter: ', p_parameter);
    console.log('p_token: ', p_token);

    p_datatype = 
      logoneLib.encodeToBase64(p_datatype).substring(0, 3) + 
      sisipan + 
      logoneLib.encodeToBase64(p_datatype).substring(3);

    p_parameter = 
      logoneLib.encodeToBase64(p_parameter).substring(0, 3) + 
      sisipan + 
      logoneLib.encodeToBase64(p_parameter).substring(3);

    p_token = 
      logoneLib.encodeToBase64(p_token).substring(0, 3) + 
      sisipan + 
      logoneLib.encodeToBase64(p_token).substring(3);

    console.log('p_datatype base64: ', p_datatype);
    console.log('p_parameter base64: ', p_parameter);
    console.log('p_token base64: ', p_token);
    
    const p_ref = logoneLib.encodeToBase64(
      p_system + '#,#' + p_datatype + '#,#' + p_parameter + '#,#' + p_token
    );

    const formData = new FormData();
    formData.append('p_ref', p_ref);


    const response = await fetch(logoneLib.v_urlapi + 'push_get_data.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      try {
        const responseData  = await response.text();
        console.log('responseData:', responseData);

        // const decryptData   = logoneLib.decodeBase64(responseData);
        // console.log('p_token:', p_token);

        // const split         = p_token ? p_token.split(",") : [];
        // p_token             = split[0] + split[1] + split[2];

        // let keytoken        = logoneLib.encodeToBase64(p_token).substring(0, 9) + 'L1' + 
        //                       logoneLib.encodeToBase64(p_token).substring(9);

        // if (p_datatype === 'STATUSUSER' || p_datatype === 'DATA_USER') {
        //   p_token           = split[0] + split[1];
        //   keytoken          = logoneLib.encodeToBase64(p_token).substring(0, 9) + 'L1' + 
        //                       logoneLib.encodeToBase64(p_token).substring(9);
        // }

        // console.log('keytoken:', keytoken + " || " + p_token);

        // const decryptJson   = decryptData.substring(0, decryptData.length - keytoken.length);
        // const datajson      = decryptJson.substring(0, 9) + decryptJson.substring(11);
        // const dataAPI       = logoneLib.decodeBase64(datajson);
        
        // console.log('decode datajson:', datajson);
        // console.log('decode datajson:', dataAPI);

        // if (dataAPI !== null) callback(JSON.parse(dataAPI));
        // else callback('ERROR');

      } catch (error) {
        callback('ERROR');
      }    
    } else callback("ERROR");
  } catch (error) {
    callback("ERROR");
  }
}

async function getUserStatus(username) {
  const baseUrl = "http://103.121.213.173/api/get_data.php";
  const params = new URLSearchParams({
    p_datatype: "STATUSUSER",
    p_parameter: `MSAL,${username}`,
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data[0]; // Mengembalikan objek pertama dalam array
  } catch (error) {
    console.error("Failed to fetch user status:", error);
    throw error;
  }
}

function displayUserInfo(userInfo) {
  // Menampilkan informasi pengguna di HTML
  const userInfoDiv = document.getElementById('user-info');
  userInfoDiv.innerHTML = `
      <p>Username: ${userInfo.username}</p>
      <p>Role: ${userInfo.role}</p>
      <p>Full Name: ${userInfo.fullName}</p>
      <p>Phone: ${userInfo.phone}</p>
      <p>Email: ${userInfo.email}</p>
      <p>Permissions: ${userInfo.permissions}</p>
      <p>Department: ${userInfo.department}</p>
    `;
}

function displayUserImages(userStatus) {
  const userImagesDiv = document.getElementById('user-images');
  ["TBLOB1", "TBLOB2", "TBLOB3", "TBLOB4"].forEach((blobKey) => {
    if (userStatus[blobKey]) {
      const img = document.createElement("img");
      img.src = `data:image/png;base64,${userStatus[blobKey]}`;
      img.alt = blobKey;
      userImagesDiv.appendChild(img);
    }
  });
}

function displayUserQuery(tclob) {
  const userQueryDiv = document.getElementById('user-query');
  if (tclob) {
    userQueryDiv.textContent = tclob;
  }
}

function displayErrorMessage(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
}