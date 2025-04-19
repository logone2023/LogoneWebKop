"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearBrowserCache,
  getdatenow,
  saveCookie,
  showDialogInfo,
  encryptMD5,
  flag,
  v_systemkey,
  v_versionName,
} from "@/lib/handlingHelper";
import * as apihelper from "@/lib/apihelper";

export default function useLogin() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [systemInfo, setSystemInfo] = useState({
    name: "",
    version: "",
    logo: "",
    background: "",
  });
  const [forgotUserInfo, setForgotUserInfo] = useState(null);
  const [maskedPhone, setMaskedPhone] = useState(null);

  useEffect(() => {
    clearBrowserCache();
    showDialogInfo("PROGRESS", "Sinkronisasi system...", null);
    apihelper.push_get_api(
      "SYSTEM",
      `${v_systemkey},${getdatenow("fdatetime_data")}`,
      `${v_systemkey},DEVLOGONE02,F9841EC31073E123AC59880A46CB0FBB`,
      (responseAPI) => {
        if (!Array.isArray(responseAPI) || responseAPI.length === 0) {
          showDialogInfo("FAIL", "Gagal memuat system, harap coba lagi.");
          return;
        }
        const data = responseAPI[0];
        const splitdata = data.TDATA ? data.TDATA.split("#,#") : [];
        const name = splitdata[1] || "Default System Name";
        const version = splitdata[17] || v_versionName;
        const logo = data.TBLOB1
          ? `data:image/png;base64,${data.TBLOB1}`
          : null;
        const background = data.TBLOB2
          ? `data:image/jpeg;base64,${data.TBLOB2}`
          : null;

        setSystemInfo({ name, version, logo, background });
        saveCookie("v_systemname", name, 1);
        saveCookie("v_versionname", version, 1);
        flag.v_status_dlg = "OFF";
      }
    );

    // apihelper.push_get_api(
    //   "SYSTEM",
    //   `${v_systemkey},${getdatenow("fdatetime_data")}`,
    //   `${v_systemkey},DEVLOGONE02,F9841EC31073E123AC59880A46CB0FBB`,
    //   (responseAPI) => {
    //     if (!Array.isArray(responseAPI) || responseAPI.length === 0) {
    //       showDialogInfo("FAIL", "Gagal memuat system, harap coba lagi.");
    //       return;
    //     }
    //     const data = responseAPI[0];
    //     const splitdata = data.TDATA ? data.TDATA.split("#,#") : [];
    //     const name = splitdata[1] || "Default System Name";
    //     const version = splitdata[17] || v_versionName;
    //     const logo = data.TBLOB1
    //       ? `data:image/png;base64,${data.TBLOB1}`
    //       : null;
    //     const background = data.TBLOB2
    //       ? `data:image/jpeg;base64,${data.TBLOB2}`
    //       : null;

    //     setSystemInfo({ name, version, logo, background });
    //     saveCookie("v_systemname", name, 1);
    //     saveCookie("v_versionname", version, 1);
    //     flag.v_status_dlg = "OFF";
    //   }
    // );
  }, []);

  const _clickLogin = () => {
    if (!userId) {
      showDialogInfo("WARNING", "Harap masukkan User ID Anda!");
      return;
    }
    if (!password) {
      showDialogInfo("WARNING", "Harap masukkan Password Anda!");
      return;
    }

    apihelper.push_get_api(
      "STATUSUSER",
      `${v_systemkey},${userId}`,
      `${v_systemkey},${userId},`,
      (responseAPI) => {
        if (!Array.isArray(responseAPI) || responseAPI.length === 0) {
          showDialogInfo(
            "WARNING",
            "User ID belum teregistrasi atau belum terdaftar."
          );
          return;
        }

        const item = responseAPI[0];
        const split = item.TDATA.split("#,#");
        const passAPI = split[2];
        const status = split[9];

        const enc1 = encryptMD5(v_systemkey + userId + password).toUpperCase();
        const enc2 = encryptMD5("ALL" + userId + password).toUpperCase();

        if (status === "AKTIF") {
          if (passAPI === enc1 || passAPI === enc2) {
            saveCookie("v_password1", enc1, 1);
            saveCookie("v_password2", enc2, 1);
            router.push("/dashboard");
          } else {
            showDialogInfo(
              "WARNING",
              "Kata sandi tidak sesuai, silahkan ulangi."
            );
          }
        } else if (["REG", "RESET"].includes(status)) {
          showDialogInfo(
            "WARNING",
            "User dalam status belum aktif. Silakan reset password dulu."
          );
        } else {
          showDialogInfo(
            "WARNING",
            "User ID belum terdaftar untuk menggunakan sistem ini."
          );
        }
      }
    );
  };

  const _forgotpass = () => {
    if (!userId) {
      showDialogInfo("WARNING", "Harap masukkan User ID Anda!");
      return;
    }

    saveCookie("v_userid", userId, 1);
    const param = `${v_systemkey},${userId}`;
    const token = `${v_systemkey},${userId},`;

    apihelper.push_get_api("STATUSUSER", param, token, (responseAPI) => {
      if (!Array.isArray(responseAPI) || responseAPI.length === 0) {
        showDialogInfo(
          "WARNING",
          "User ID belum terdaftar. Silahkan hubungi HRD."
        );
        return;
      }

      const data = responseAPI[0];
      const splitdata = data.TDATA.split("#,#");
      const status = splitdata[9] || "INACTIVE";
      const notelp = splitdata[4] || "-";

      const userInfo = {
        username: splitdata[1] || "-",
        jabatan: splitdata[3] || "-",
        dept: splitdata[7] || "-",
        email: splitdata[5] || "",
        notelp,
        status,
        usertype: splitdata[10] || "-",
      };

      setForgotUserInfo(userInfo);

      const masked =
        notelp && notelp !== "-" && notelp.length >= 8
          ? `${notelp.slice(0, 4)}******${notelp.slice(-4)}`
          : notelp;
      setMaskedPhone(masked);

      if (["AKTIF", "REG", "RESET"].includes(status)) {
        showDialogInfo("INFO", "Silakan lanjutkan proses reset password");
      } else {
        showDialogInfo("WARNING", "User tidak aktif atau tidak terdaftar.");
      }
    });
  };

  return {
    userId,
    setUserId,
    password,
    setPassword,
    systemInfo,
    _clickLogin,
    _forgotpass,
    forgotUserInfo,
    maskedPhone,
  };
}
