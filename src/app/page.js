"use client";

import useLogin from "@/hooks/login"; // Import hook useLogin
import "./globals.css";
import "../css/variable.css";
import "../css/input.css";

export default function LoginPage() {
  const {
    userId,
    setUserId,
    password,
    setPassword,
    systemInfo,
    _clickLogin,
    _forgotpass,
    forgotUserInfo,
    maskedPhone,
  } = useLogin(); // Panggil hook useLogin

  const bg = systemInfo?.background || "/public/asset/img/bgweb.jpg";

  return (
    <>
      <div
        className="backgroundLogin"
        style={{
          backgroundImage: `url(${bg})`
        }}
      >
        <div className="center_main">
          <div className="theme_frame1" id="LOGIN_CL_FORM">
            <img
              id="logoSystem"
              alt="System Logo"
              src={systemInfo.logo || "/assets/img/defaultlogo.png"}
            />
            <div className="systemname" id="system-name">
              {systemInfo.name || "System Name"}
            </div>

            <div className="style_input_border_10">
              <input
                type="text"
                id="LOGIN_ET_USER"
                placeholder="User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)} // Set userId from hook
              />
            </div>

            <div className="style_input_border_10_pass">
              <input
                type="password"
                id="LOGIN_ET_PASS"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set password from hook
              />
            </div>

            <input
              className="login pull-right"
              type="submit"
              value="Log In"
              id="LOGIN_BTN_LOGIN"
              onClick={_clickLogin} // Call _clickLogin from hook
            />
            <a
              id="LOGIN_BTN_LUPAPASS"
              onClick={_forgotpass} // Call _forgotpass from hook
            >
              Lupa Password?
            </a>
            <div id="LOGIN_TV_VERSION">{systemInfo.version || "v1.0.0"}</div>
          </div>
        </div>

        {/* Forgot password dialog */}
        {forgotUserInfo && (
          <div className="popup" id="DLG_LUPAPASSWORD">
            <div className="dlg_content">
              <div className="dlg_header">
                <img
                  id="DLG_LUPAPASSWORD_IMG_LOGO"
                  src={systemInfo.logo || "/assets/img/defaultlogo.png"}
                  alt="System Logo"
                />
                <h1 id="DLG_LUPAPASSWORD_TV_SYSTEMNAME">{systemInfo.name}</h1>
                <a
                  href="#"
                  className="close_dlg"
                  onClick={() => setForgotUserInfo(null)} // Close dialog
                >
                  &times;
                </a>
              </div>

              {/* Display user info */}
              <div className="dlg_username">
                <h2>{forgotUserInfo.username}</h2>
                <h3>{forgotUserInfo.jabatan}</h3>
                <h4>{forgotUserInfo.email}</h4>
                <h5>{maskedPhone}</h5>
              </div>

              <div className="dlg_text">
                Apakah anda ingin mengirim permintaan ganti/buat password baru?
              </div>
              <a
                href="/frm_setpassword.html"
                className="dlg_btn"
                id="DLG_LUPAPASSWORD_BTN_SUBMIT"
              >
                Ya
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
