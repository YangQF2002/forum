import React from "react";
import getUserId from "../utils/getUserId.tsx";

function Logout() {
  function clearAuthCookies() {
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.reload();
  }

  return (
    <div>
      {getUserId() && (
        <button type="button" onClick={clearAuthCookies}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;
